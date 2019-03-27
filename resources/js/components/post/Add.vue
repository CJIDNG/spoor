<style scoped>
    
</style>
<template>
    <div class="section">
        <div class="container">

            <div class="row">
                <div class="col-md-8 ml-auto mr-auto">
                    <h1 class="title text-center">
                        New post
                    </h1>
                    <hr>
                    <form v-show="show_form" action="">
                        <div class="form-group">
                            <label for="">
                                Author
                                <sup>
                                    (required)
                                </sup>
                            </label>
                            <input type="text" class="form-control" v-model="post.author" />
                            <small v-show="!validations.author.is_valid" class="form-text text-muted text-danger">
                                {{ validations.author.text }}
                            </small>
                        </div>
                        <div class="form-group">
                            <label for="">
                                title
                                <sup>
                                    (required)
                                </sup>
                            </label>
                            <input type="text" class="form-control" v-model="post.title" />
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
                            <el-select
                                class="form-control"
                                v-model="post.investigations"
                                multiple
                                filterable
                                remote
                                reserve-keyword
                                placeholder="Please enter a keyword"
                                :remote-method="remoteMethod"
                                :loading="loading">
                                <el-option
                                    v-for="item in suggestions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
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
                                    (required)
                                </sup>
                            </label>
                            <input type="text" class="form-control" v-model="post.tags" />
                            <small v-show="!validations.tags.is_valid" class="form-text text-muted text-danger">
                                {{ validations.tags.text }}
                            </small>
                        </div>
                        <button v-loading="addPostLoadStatus == 1" @click="addPost(post)" type="button" 
                            class="btn btn-success">
                            Add
                        </button>
                    </form>
                    <div v-show="!show_form" class="alert alert-success" role="alert">
                        post added successfully!
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
                post: {
                    author: '',
                    title: '',
                    content: '',
                    thumbnail: '',
                    tags: '',
                    investigations: []
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
                fileList: [],
                suggestions: [],
                list: [],
                loading: false
            };
        },
        components: {
            
        },
        created() {
            this.$store.dispatch('getAuthUser');
            this.$store.dispatch('loadInvestigations', {
                url: null
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
            addPostLoadStatus() {
                return this.$store.getters.getAddPostLoadStatus;
            },
            addPostResponse() {
                return this.$store.getters.getAddPostResponse;
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
            addPostLoadStatus: function(val) {
                if(val == 2 && this.addPostResponse.success == 1) {
                    this.$router.push('/blog/view/'+this.addPostResponse.id)
                    this.$message({
                        title: 'Success',
                        message: 'Post Added Successfully',
                        type: 'success'
                    });
                } else if(val == 3 || this.addPostResponse.success == 0) {
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
                
                this.post.thumbnail = file.raw;
            },
            handleRemove(file, fileList) {
                this.post.thumbnail = '';
            },
            handlePreview(file) {
                //console.log(file);
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
            remoteMethod(query) {
                if (query !== '') {
                    this.loading = true;
                    setTimeout(() => {
                        this.loading = false;
                        this.suggestions = this.list.filter(item => {
                            return item.label.toLowerCase()
                                .indexOf(query.toLowerCase()) > -1;
                        });
                    }, 200);
                } else {
                    this.suggestions = [];
                }
            },
            addPost(data) {
                data.content = this.contentEditor.root.innerHTML;
                if(this.validateFields(data)) {
                    this.$store.dispatch('addPost', data);
                }
            }
        }
    }
</script>