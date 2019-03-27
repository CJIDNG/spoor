<style scoped>
    
</style>
<template>
    <div class="section">
        <div class="container">

            <div class="row">
                <div class="col-md-8 ml-auto mr-auto">
                    <h1 class="title text-center">
                        Update post
                    </h1>
                    <hr>
                    <form v-show="show_form" action="">
                        <div class="form-group">
                            <label for="">
                                Author
                                <sup>
                                    <i class="fa fa-asterisk small" style="color:red"></i>
                                </sup>
                            </label>
                            <input type="text" class="form-control" v-model="buffer_post.author" />
                            <small v-show="!validations.author.is_valid" class="form-text text-muted text-danger">
                                {{ validations.author.text }}
                            </small>
                        </div>
                        <div class="form-group">
                            <label for="">
                                title
                                <sup>
                                    <i class="fa fa-asterisk small" style="color:red"></i>
                                </sup>
                            </label>
                            <input type="text" class="form-control" v-model="buffer_post.title" />
                            <small v-show="!validations.title.is_valid" class="form-text text-muted text-danger">
                                {{ validations.title.text }}
                            </small>
                        </div>
                        <div class="form-group">
                            <label for="">
                                content
                                <sup>
                                    (required)
                                </sup>
                            </label>
                            <div id="content"></div>
                            <small v-show="!validations.content.is_valid" class="form-text text-muted text-danger">
                                {{ validations.content.text }}
                            </small>
                        </div>
                        <div class="form-group">
                            <label for="">
                                Investigations
                            </label>
                            <div>
                                <label v-for="(investigation,index) in post.investigations" :key="index" 
                                    class="badge badge-pill badge-danger ml-1">{{investigation.title}}</label>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="site_logo">thumbnail</label><br><br>
                            <el-upload
                                ref="upload"
                                action="undefined"
                                :auto-upload="false"
                                :on-change="processFile"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :before-remove="beforeRemove"
                                multiple
                                :limit="1"
                                :accept="'image/*'"
                                :on-exceed="handleExceed"
                                :file-list="fileList">
                                <el-button size="small" type="primary">
                                    Click to upload
                                </el-button>
                                <div slot="tip" class="el-upload__tip">
                                    jpg/png files with a size less than 500kb
                                </div>
                            </el-upload>
                        </div>
                        <div class="form-group">
                            <label for="">
                                tags(seperated by commas)
                                <sup>
                                    <i class="fa fa-asterisk small" style="color:red"></i>
                                </sup>
                            </label>
                            <input type="text" class="form-control" v-model="buffer_post.tags" />
                            <small v-show="!validations.tags.is_valid" class="form-text text-muted text-danger">
                                {{ validations.tags.text }}
                            </small>
                        </div>
                        <button v-loading="updatePostLoadStatus == 1" @click="updatePost(buffer_post)" type="button" 
                            class="btn btn-success">
                            Update
                        </button>
                    </form>
                    <div v-show="!show_form" class="alert alert-success" role="alert">
                        post updated successfully!
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { HELPERS } from '../../helpers.js';
    export default {
        data() {
            return {
                HF: HELPERS,
                buffer_post: {
                    id: '',
                    author: '',
                    title: '',
                    content: '',
                    thumbnail: '',
                    tags: ''
                },
                contentEditor: null,
                validations: {
                    author: {
                        is_valid: true,
                        text: ''
                    },
                    title: {
                        is_valid: true,
                        text: ''
                    },
                    content: {
                        is_valid: true,
                        text: ''
                    },
                    thumbnail: {
                        is_valid: true,
                        text: ''
                    },
                    tags: {
                        is_valid: true,
                        text: ''
                    }
                },
                show_form: true,
                fileList: []
            };
        },
        components: {
            
        },
        created() {
            this.$store.dispatch('getAuthUser');
            this.$store.dispatch('loadPost', {
                id: this.$route.params.postId
            });
        },
        mounted() {
            this.contentEditor = HELPERS.initQuillEditor('content');
        },
        computed: {
            user() { 
                return this.$store.getters.getUser;
            },
            userLoadStatus() {
                return this.$store.getters.getUserLoadStatus;
            },
            post() {
                return this.$store.getters.getPost;
            },
            postLoadStatus() {
                return this.$store.getters.getPostLoadStatus;
            },
            updatePostLoadStatus() {
                return this.$store.getters.getUpdatePostLoadStatus;
            },
            updatePostResponse() {
                return this.$store.getters.getUpdatePostResponse;
            },
            investigations() {
                return this.$store.getters.getInvestigations;
            },
            investigationsLoadStatus() {
                return this.$store.getters.getInvestigationsLoadStatus;
            },
        },
        watch: { 
            investigationsLoadStatus: function(val) {
                if(val == 2) {
                    this.list = this.investigations.map(item => {
                        return { 
                            value: item.id, 
                            label: item.title 
                        };
                    });
                }
                //console.log(this.list);
            },
            postLoadStatus: function(val) {
                if(val == 2) {
                    this.buffer_post.id = this.post.id;
                    this.buffer_post.author = this.post.author;
                    this.buffer_post.title = this.post.title;
                    this.contentEditor.root.innerHTML = this.post.content;
                    this.buffer_post.tags = this.post.tags;
                }
            },
            updatePostLoadStatus: function(val) {
                if(val == 2 && this.updatePostResponse.success == 1) {
                    this.show_form = false;
                    this.$message({
                        title: 'Success',
                        message: 'Post updated Successfully',
                        type: 'success'
                    });
                    this.$router.push('/blog/view/'+this.$route.params.postId);
                } else if(val == 3 || this.updatePostResponse.success == 0) {
                    this.$message({
                        title: 'Warning',
                        message: 'Something went wrong. Try again!',
                        type: 'warning'
                    });
                }
            }
        },
        methods: {
            processFile(file) {
                let checkSize = (size) => {
                    if(size > 500000)  {
                        this.$refs.upload.clearFiles();
                        this.$message({
                            title: 'Warning',
                            message: 'image file can not be more than 500kb',
                            type: 'warning'
                        });
                        return false;
                    }
                    return true;
                }
                console.log(file);
                
                this.buffer_post.thumbnail = file.raw;
            },
            handleRemove(file, fileList) {
                this.buffer_post.thumbnail = '';
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`The limit is 1, you selected ${files.length} files this time, add up to ${files.length + fileList.length} totally`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`are you sure you want to delete ${ file.name }？`);
            },
            validateFields(data) {
                let valid = true;
                let validations = this.validations;
                if(!data.author) {
                    valid = false;
                    validations.author.is_valid = false;
                    validations.author.text = "author cant be empty";
                }
                if(!data.title) {
                    valid = false;
                    validations.author.is_valid = false;
                    validations.author.text = "title cant be empty";
                }
                if(!data.content) {
                    valid = false;
                    validations.content.is_valid = false;
                    validations.content.text = "content cant be empty";
                }
                if(!data.tags) {
                    valid = false;
                    validations.tags.is_valid = false;
                    validations.tags.text = "tags cant be empty";
                }
                return valid;
            },
            updatePost(data) {
                data.content = this.contentEditor.root.innerHTML;
                if(this.validateFields(data)) {
                    this.$store.dispatch('updatePost', data);
                }
            }
        }
    }
</script>
