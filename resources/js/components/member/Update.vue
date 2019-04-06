<style scoped>
    
</style>
<template>
    <div class="section">
        <div class="container">

            <div class="row">
                <div class="col-md-8 ml-auto mr-auto">
                    <h1 class="full_name text-center">
                        Update Member
                    </h1>
                    <hr>
                    <form action="">
                        <div class="form-group">
                            <label for="">
                                full name
                                <sup>
                                    (required)
                                </sup>
                            </label>
                            <input type="text" class="form-control" v-model="buffer_member.full_name" />
                            <small v-show="!validations.full_name.is_valid" 
                                class="form-text text-muted text-danger">
                                {{ validations.full_name.text }}
                            </small>
                        </div>
                        <div class="form-group">
                            <label for="">
                                country
                                <sup>
                                    (required)
                                </sup>
                            </label>
                            <input type="text" class="form-control" v-model="buffer_member.country" />
                            <small v-show="!validations.country.is_valid" 
                                class="form-text text-muted text-danger">
                                {{ validations.country.text }}
                            </small>
                        </div>
                        <div class="form-group">
                            <label for="">
                                designation
                                <sup>
                                    (required)
                                </sup>
                            </label>
                            <input type="text" class="form-control" v-model="buffer_member.designation" />
                            <small v-show="!validations.designation.is_valid" 
                                class="form-text text-muted text-danger">
                                {{ validations.designation.text }}
                            </small>
                        </div>
                        <div class="form-group">
                            <label for="">
                                bio
                                <sup>
                                    (required)
                                </sup>
                            </label>
                            <div id="bio"></div>
                            <small v-show="!validations.bio.is_valid" class="form-text text-muted text-danger">
                                {{ validations.bio.text }}
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
                        <button v-loading="updateMemberLoadStatus == 1" @click="updateMember(member)" type="button" 
                            class="btn btn-success">
                            Add
                        </button>
                    </form>
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
                buffer_member: {
                    id: '',
                    full_name: '',
                    thumbnail: '',
                    country: '',
                    designation: '',
                    bio: ''
                },
                bioEditor: null,
                validations: {
                    id: {
                        is_valid: true,
                        text: ''
                    },
                    full_name: {
                        is_valid: true,
                        text: ''
                    },
                    thumbnail: {
                        is_valid: true,
                        text: ''
                    },
                    country: {
                        is_valid: true,
                        text: ''
                    },
                    designation: {
                        is_valid: true,
                        text: ''
                    },
                    bio: {
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
            this.$store.dispatch('loadMember', {
                id: this.$route.params.memberId
            });
        },
        mounted() {
            this.bioEditor = HELPERS.initQuillEditor('bio');
        },
        computed: {
            user() { 
                return this.$store.getters.getUser;
            },
            userLoadStatus() {
                return this.$store.getters.getUserLoadStatus;
            },
            member() {
                return this.$store.getters.getMember;
            },
            memberLoadStatus() {
                return this.$store.getters.getMemberLoadStatus;
            },
            updateMemberLoadStatus() {
                return this.$store.getters.getUpdateMemberLoadStatus;
            },
            updateMemberResponse() {
                return this.$store.getters.getUpdateMemberResponse;
            }
        },
        watch: {
            memberLoadStatus: function(val) {
                if(val == 2) {
                    this.buffer_member.id = this.member.id;
                    this.buffer_member.full_name = this.member.full_name;
                    this.buffer_member.country = this.member.country;
                    this.buffer_member.designation = this.member.designation;
                    this.bioEditor.root.innerHTML = this.member.bio;
                }
            },
            updateMemberLoadStatus: function(val) {
                if(val == 2 && this.updateMemberResponse.success == 1) {
                    this.$router.push('/member/view/'+this.member.id)
                    this.$message({
                        full_name: 'Success',
                        message: 'member updated Successfully',
                        type: 'success'
                    });
                } else if(val == 3 || this.updateMemberResponse.success == 0) {
                    this.$message({
                        full_name: 'Warning',
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
                            full_name: 'Warning',
                            message: 'image file can not be more than 500kb',
                            type: 'warning'
                        });
                        return false;
                    }
                    return true;
                }

                console.log(file);
                
                this.buffer_member.thumbnail = file.raw;
            },
            handleRemove(file, fileList) {
                this.buffer_member.thumbnail = '';
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

                if(!data.full_name) {
                    valid = false;
                    validations.author.is_valid = false;
                    validations.author.text = "full_name cant be empty";
                }

                if(!data.country) {
                    valid = false;
                    validations.country.is_valid = false;
                    validations.country.text = "country cant be empty";
                }

                if(!data.designation) {
                    valid = false;
                    validations.designation.is_valid = false;
                    validations.designation.text = "designation cant be empty";
                }

                if(!data.bio) {
                    valid = false;
                    validations.bio.is_valid = false;
                    validations.bio.text = "bio cant be empty";
                }

                return valid;
            },
            updateMember(data) {
                data.bio = this.bioEditor.root.innerHTML;

                if(this.validateFields(data)) {
                    this.$store.dispatch('updateMember', data);
                }
            }
        }
    }
</script>
