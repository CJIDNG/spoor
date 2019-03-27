<style scoped>
</style>
<template>
    <div class="wrapper">
        <div class="section">
            <div class="container">
                <div class="row mb-5">
                    <div class="col-md-4">
                        <img class="img img-fluid" :src="'/storage/'+investigation.thumbnail" alt="">
                    </div>
                    <div class="col-md-8">
                        <h1 class="title">
                            {{ investigation.title }}
                        </h1>
                        <h4>
                            <b>Created At:</b> 
                            <small>{{ investigation.created_at }}</small>
                        </h4>
                        <h4>
                            <b>Updated At:</b> 
                            <small>{{ investigation.updated_at }}</small>
                        </h4>
                    </div>
                </div>
                <el-tabs type="card" @tab-click="handleClick">
                    <el-tab-pane class="pt-5" :label="'Related Posts('+investigation.posts.length+')'">
                        <div class="row">
                            <div v-for="post in investigation.posts" :key="post.id" class="col-md-4">
                                <div class="card">
                                    <div class="card-image">
                                        <router-link :to="'/blog/view/'+post.id">
                                            <img class="img" :src="'storage/'+post.thumbnail">
                                        </router-link>
                                    </div>
                                    <div class="card-body">
                                        <label v-for="(tag,index) in post.tags.split(',')" :key="index" 
                                            class="badge badge-pill badge-warning ml-1">{{tag}}</label>
                                        <h5 class="card-title">
                                            <router-link class="card-title" :to="'/blog/view/'+post.id">
                                                {{ post.title }}
                                            </router-link>
                                        </h5>
                                        <hr>
                                        <div class="card-footer">
                                            <div class="author">
                                                <span>{{ post.author }}</span>
                                            </div>
                                            <!--<div class="stats">
                                                <i class="fa fa-heart" aria-hidden="true"></i> 5.3k
                                            </div>-->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                activeTab: "first"
            };
        },
        components: {
            
        },
        created() {
            this.$store.dispatch( 'getAuthUser' );
            this.$store.dispatch( 'loadInvestigation', {
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
            deletePostLoadStatus() {
                return this.$store.getters.getDeletePostLoadStatus;
            },
            deletePostResponse() {
                return this.$store.getters.getDeletePostResponse;
            }
        },
        watch: {
            deletePostLoadStatus: function(val) {
                let vm = this;
                if(val == 3 || vm.deletePostResponse.success == 0) {
                    this.$message({
                        title: 'Warning',
                        message: 'Something went wrong. Try again!',
                        type: 'warning'
                    }); 
                } else if(val == 2 && vm.deletePostResponse.success == 1) {
                    //reload posts
                    vm.$store.dispatch('loadPosts', {
                        url: null,
                        investigationId: this.$route.params.investigationId
                    });
                    this.$message({
                        title: 'Success',
                        message: 'post Deleted Successfully',
                        type: 'success'
                    });
                } 
            }
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            deletePost(id) {
                if(confirm('Are you sure?')) {
                    this.$store.dispatch('deletePost', {
                        id: id
                    });
                }
            },
        }
    }
</script>