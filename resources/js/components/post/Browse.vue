<style scoped>
    #action-btn {
        position: relative;
        right: 20px;
        z-index: 4;
    }
    #action-btn .btn {
        position: fixed;
        right: 30px;
        bottom: 10%;
    }
</style>
<template>
    <div class="section section-white">
        <div class="container">
            <div v-if="userLoadStatus == 2 && user != {}" id="action-btn">
                <router-link class="btn btn-success btn-round btn-just-icon btn-lg" 
                    :to="'/blog/add'">
                    <i class="fa fa-plus"></i>
                </router-link>
            </div>
            <div class="row">
                <div class="col-md-6 ml-auto mr-auto text-center title">
                    <h2>Latest Posts</h2>
                    <h3 class="title-uppercase">
                        <small>Written by Investigative Journalists</small>
                    </h3>
                </div>
            </div>
            <i v-show="postsLoadStatus == 1" class="now-ui-icons loader_refresh spin"></i>
            <div v-for="post in posts" v-bind:key="post.id" class="article">
                <div class="row">
                    <div class="col-md-8 ml-auto mr-auto">
                        <div class="card card-blog card-plain text-center">
                            <div class="card-image">
                                <router-link :to="'/blog/view/'+post.id">
                                    <img v-if="post.thumbnail" class="img img-raised" :src="'/storage/'+post.thumbnail">
                                    <img v-else class="img img-raised" src="/public/img/image_placeholder.jpg">
                                </router-link>
                            </div>
                            <div class="card-body">
                                <div class="card-category">
                                    <span v-for="(tag,index) in post.tags.split(',')" :key="index" 
                                        class="badge badge-primary main-tag ml-2">
                                        {{ tag }}
                                    </span>
                                </div>
                                <a href="javascrip: void(0);">
                                    <h3 class="card-title">
                                        <router-link class="card-title" :to="'/blog/view/'+post.id">
                                            {{ post.title }}
                                        </router-link>
                                    </h3>
                                </a>
                                <div v-html="post.description" class="card-description"></div>
                            </div>
                            <ul class="list-inline" v-if="userLoadStatus == 2 && user != {}">
                                <li class="list-inline-item">
                                    <router-link class="btn btn-primary btn-round btn-sm" 
                                        :to="'/blog/view/'+post.id">
                                        Read more
                                    </router-link>
                                </li>
                                <li class="list-inline-item">
                                    <router-link :to="'/blog/edit/'+post.id" 
                                        class="btn btn-info btn-round btn-sm">
                                        edit
                                    </router-link>
                                </li>
                                <li class="list-inline-item">
                                    <button @click="deletePost(post.id)" 
                                        class="btn btn-danger btn-round btn-sm">
                                        Delete
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div><hr><br/><br/>
            <div class="row">
                <div class="col-md-12">
                <div class="pull-left">
                    <button v-bind:class="[{disabled: !pagination.prev_page_url}]" 
                            @click="loadPosts(pagination.prev_page_url)" 
                            class="btn btn-link btn-default btn-move-left btn-sm"> 
                        <i class="fa fa-angle-left"></i> Older Posts
                    </button>
                </div>
                <div class="pull-right">
                    <button v-bind:class="[{disabled: !pagination.next_page_url}]" 
                            @click="loadPosts(pagination.next_page_url)" 
                            class="btn btn-link btn-default btn-move-right btn-sm">
                        Newer Posts <i class="fa fa-angle-right"></i>
                    </button>
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

            };
        },
        components: {
            
        },
        created() {
            this.$store.dispatch('getAuthUser');
            this.$store.dispatch('loadPosts', {
                url: null,
                investigationId: null,
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
            posts() {
                return this.$store.getters.getPosts;
            },
            postsLoadStatus() {
                return this.$store.getters.getPostsLoadStatus;
            },
            pagination() {
                return this.$store.getters.getPostPagination;
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
                        url: null
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
            loadPosts(url) {
                this.$store.dispatch('loadPosts', {
                    url: url,
                    investigationId: null
                });
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
