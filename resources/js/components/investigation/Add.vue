<style scoped>
    
</style>
<template>
    <div class="section">
        <div class="container">

            <div class="row">
                <div class="col-md-8 ml-auto mr-auto">
                    <h1 class="title text-center">
                        New Investigation
                    </h1>
                    <hr>
                    <form v-show="show_form" action="">
                        <div class="form-group">
                            <label for="">
                                title
                                <sup>
                                    (required)
                                </sup>
                            </label>
                            <input type="text" class="form-control" v-model="investigation.title" />
                            <small v-show="!validations.title.is_valid" 
                                class="form-text text-muted text-danger">
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
                                    (required)
                                </sup>
                            </label>
                            <input type="text" class="form-control" v-model="investigation.tags" />
                            <small v-show="!validations.tags.is_valid" class="form-text text-muted text-danger">
                                {{ validations.tags.text }}
                            </small>
                        </div>
                        <button v-loading="addInvestigationLoadStatus == 1" @click="addInvestigation(investigation)" type="button" 
                            class="btn btn-success">
                            Add
                        </button>
                    </form>
                    <div v-show="!show_form" class="alert alert-success" role="alert">
                        investigation added successfully!
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

    export default {
        data() {
            return {
                investigation: {
                    title: '',
                    thumbnail: '',
                    tags: ''
                },
                validations: {
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
                show_form: true,
                fileList: [],
            };
        },
        components: {
            
        },
        created() {
            this.$store.dispatch('getAuthUser');
            //this.$store.commit('setAddInvestigationLoadStatus', 0);
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
            addInvestigationLoadStatus() {
                return this.$store.getters.getAddInvestigationLoadStatus;
            },
            addInvestigationResponse() {
                return this.$store.getters.getAddInvestigationResponse;
            }
        },
        watch: {
            addInvestigationLoadStatus: function(val) {
                if(val == 2 && this.addInvestigationResponse.success == 1) {
                    this.show_form = false;
                    this.$message({
                        title: 'Success',
                        message: 'Investigation Added Successfully',
                        type: 'success'
                    });
                } else if(val == 3 || this.addInvestigationResponse.success == 0) {
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
                
                this.investigation.thumbnail = file.raw;
            },
            handleRemove(file, fileList) {
                this.investigation.thumbnail = '';
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
            addInvestigation(data) {
                if(this.validateFields(data)) {
                    this.$store.dispatch('addInvestigation', data);
                }
            }
        }
    }
</script>
