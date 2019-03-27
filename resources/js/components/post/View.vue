<style scoped>

</style>
<template>
    <div class="wrapper">
        <div class="page-header page-header-small">
            <div class="page-header-image" data-parallax="true" 
                :style="'background-image: url('+'/storage/'+post.thumbnail+')'"></div>

            <div class="content-center">
                <div class="row">
                    <div class="col-md-8 ml-auto mr-auto text-center">
                        <h2 class="title">
                            {{ post.title }} by
                            {{ post.author }}
                        </h2>
                        <h4>
                            <i v-show="postLoadStatus == 1" class="now-ui-icons loader_refresh spin"></i>
                        </h4>
                        <h4>{{ post.created_at }}</h4>
                    </div>
                </div>
            </div>
        </div>
        <div class="section">
            <div class="container">
                <div class="row">
                    <div v-html="post.content" class="col-md-8 ml-auto mr-auto"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                
            };
        },
        components: {
            
        },
        created() {
            this.$store.dispatch( 'getAuthUser' );
            this.$store.dispatch( 'loadPost', {
                id: this.$route.params.postId
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
            post() {
                return this.$store.getters.getPost;
            },
            postLoadStatus() {
                return this.$store.getters.getPostLoadStatus;
            }
        },
        watch: {
            
        },
        methods: {

        }
    }
</script>
