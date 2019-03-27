<style scoped>
    
</style>
<template>
    <div class="section">
        <div class="container">

            <div class="row">
                <div class="col-md-8 ml-auto mr-auto">
                    <h1 class="title text-center">
                        Update Investigation
                    </h1>
                    <hr>
                    <form action="">
                        <div class="form-group">
                            <label for="">
                                title
                                <sup>
                                    <i class="fa fa-asterisk small" style="color:red"></i>
                                </sup>
                            </label>
                            <input type="text" class="form-control" v-model="buffer_investigation.title" />
                            <small v-show="!validations.title.is_valid" class="form-text text-muted text-danger">
                                {{ validations.title.text }}
                            </small>
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
                            <input type="text" class="form-control" v-model="buffer_investigation.tags" />
                            <small v-show="!validations.tags.is_valid" class="form-text text-muted text-danger">
                                {{ validations.tags.text }}
                            </small>
                        </div>
                        <button v-loading="updateInvestigationLoadStatus == 1" @click="updateInvestigation(buffer_investigation)" type="button" 
                            class="btn btn-success">
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                buffer_investigation: {
                    id: '',
                    title: '',
                    thumbnail: '',
                    tags: ''
                },
                validations: {
                    id: {
                        is_valid: true,
                        text: ''
                    },
                    title: {
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
                fileList: [],
            };
        },
        components: {
            
        },
        created() {
            this.$store.dispatch('getAuthUser');
            this.$store.dispatch('loadInvestigation', {
                id: this.$route.params.investigationId
            });
        },
        mounted() {

        },
        computed: {
            user() { 
                return this.$store.getters.getUser;
            },
            userLoadStatus() {
                return this.$store.getters.getUserLoadStatus;
            },
            investigation() {
                return this.$store.getters.getInvestigation;
            },
            investigationLoadStatus() {
                return this.$store.getters.getInvestigationLoadStatus;
            },
            updateInvestigationLoadStatus() {
                return this.$store.getters.getUpdateInvestigationLoadStatus;
            },
            updateInvestigationResponse() {
                return this.$store.getters.getUpdateInvestigationResponse;
            }
        },
        watch: {
            investigationLoadStatus: function(val) {
                if(val == 2) {
                    this.buffer_investigation.id = this.investigation.id;
                    this.buffer_investigation.title = this.investigation.title;
                    this.buffer_investigation.tags = this.investigation.tags;
                }
            },
            updateInvestigationLoadStatus: function(val) {
                if(val == 2 && this.updateInvestigationResponse.success == 1) {
                    this.$router.push('/investigation/view/'+this.investigation.id)
                    this.$message({
                        title: 'Success',
                        message: 'investigation updated Successfully',
                        type: 'success'
                    });
                } else if(val == 3 || this.updateInvestigationResponse.success == 0) {
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
                
                this.buffer_investigation.thumbnail = file.raw;
            },
            handleRemove(file, fileList) {
                this.buffer_investigation.thumbnail = '';
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

                if(!data.id) {
                    valid = false;
                    validations.id.is_valid = false;
                    validations.id.text = "author cant be empty";
                }

                if(!data.title) {
                    valid = false;
                    validations.author.is_valid = false;
                    validations.author.text = "title cant be empty";
                }

                if(!data.tags) {
                    valid = false;
                    validations.tags.is_valid = false;
                    validations.tags.text = "tags cant be empty";
                }

                return valid;
            },
            updateInvestigation(data) {
                if(this.validateFields(data)) {
                    this.$store.dispatch('updateInvestigation', data);
                }
            }
        }
    }
</script>
