<style scoped>

</style>

<template>
    <div class="wrapper">
        <!--<div class="page-header" style="background-image: url('/img/pattern.jpg')">
            <div class="filter"></div>
            <div class="content-center">
                <div class="motto">
                    <h1 class="text-center">Paper Kit 2 Pro</h1>
                    <h3 class="text-center">Components</h3>
                </div>
            </div>
        </div>-->
        <div class="main">
            <div class="container">
                <div v-if="posts.length > 0" style="border: 0px;" 
                        class="card card-plain card-blog text-center">
                    <div class="card-body">
                        <h3 style="border: 0px; padding: 20px;" class="card-title">
                            <router-link :to="'/blog/view/'+posts[0].id">
                                {{ posts[0].title }}
                            </router-link>
                        </h3>
                    </div>
                    <div class="card-image">
                        <router-link :to="'/blog/view/'+posts[0].id">
                            <img v-if="posts[0].thumbnail" class="img img-raised" :src="'/storage/'+posts[0].thumbnail">
                            <img v-else class="img img-raised" src="/public/img/image_placeholder.jpg">
                        </router-link>
                    </div>
                </div>
            </div>

            <footer style="padding: 40px 0px;" class="footer footer-black footer-big">
                <div class="container">
                    <div class="row">
                        <div class="col-md-8 col-sm-8 ml-auto mr-auto">
                            <div class="logo text-center">
                                <h3>Key Facts</h3>
                            </div><br>
                            <div class="text-center">
                                <ul class="list-inline">
                                    <li class="list-inline-item">
                                        <h1>{{ investigationPagination.total }}</h1> Researches
                                    </li>
                                    <li class="list-inline-item">
                                        <h1>{{ postPagination.total }}</h1> Stories
                                    </li>
                                    <li class="list-inline-item">
                                        <h1>{{ memberPagination.total }}</h1> Members
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>


            <div class="features-5 section-image" style="background-image: url('/img/sections/the-how-photographer.jpg')">
                <div class="container">
                    <div class="row">
                        <div class="ml-auto mr-auto">
                            <h2 class="title text-center">Who We Are</h2>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-5 ml-auto">
                            <div class="info">
                                <div class="icon">
                                    <i class="nc-icon nc-atom" aria-hidden="true"></i>
                                </div>
                                <h4 class="title">For Developers</h4>
                                <p>
                                    While everyone technically has the feature now, 
                                    that doesn’t mean you’ll see it all the time. 
                                    But in this case, the feature wasn’t just 
                                    randomly A/B tested.
                                </p>
                            </div>
                        </div>
                        <div class="col-sm-5 mr-auto">
                            <div class="info">
                                <div class="icon">
                                    <i class="nc-icon nc-ruler-pencil" aria-hidden="true"></i>
                                </div>
                                <h4 class="title">For Designers</h4>
                                <p>
                                    Loveflutter has actually been around for a while, 
                                    pivoting from matches based on shared interests 
                                    (innovative!) to now focus on analyzing.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="row bottom-line">
                        <div class="col-sm-5 ml-auto">
                            <div class="info">
                                <div class="icon">
                                    <i class="nc-icon nc-paper" aria-hidden="true"></i>
                                </div>
                                <h4 class="title">Example Pages Included</h4>
                                <p>
                                    As for the user backlash, it comes to the challenges 
                                    faces in building features to aid newcomers, which 
                                    can impact its growth and bottom line.
                                </p>
                            </div>
                        </div>
                        <div class="col-sm-5 mr-auto">
                            <div class="info">
                                <div class="icon">
                                    <i class="nc-icon nc-time-alarm" aria-hidden="true"></i>
                                </div>
                                <h4 class="title">Save Time</h4>
                                <p>
                                    The feature itself had been developed via experimental 
                                    account, where it had tested how to better 
                                    personalize its service to end users.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

    export default {
        components: {

        },
        data() {
            return {

            } 
        },
        created() {
            this.$store.dispatch('loadConfig');
            this.$store.dispatch('loadInvestigations', {
                url: null
            });
            this.$store.dispatch('loadPosts', {
                url: null,
                investigationId: null,
            });
            this.$store.dispatch('loadMembers', {
                url: null
            });
        },
        computed: {
            config() {
                return this.$store.getters.getConfig;
            },
            configLoadStatus() {
                return this.$store.getters.getConfigLoadStatus;
            },
            investigations() {
                return this.$store.getters.getInvestigations;
            },
            investigationsLoadStatus() {
                return this.$store.getters.getInvestigationsLoadStatus;
            },
            investigationPagination() {
                return this.$store.getters.getInvestigationPagination;
            },
            posts() {
                return this.$store.getters.getPosts;
            },
            postsLoadStatus() {
                return this.$store.getters.getPostsLoadStatus;
            },
            postPagination() {
                return this.$store.getters.getPostPagination;
            },
            members() {
                return this.$store.getters.getMembers;
            },
            membersLoadStatus() {
                return this.$store.getters.getMembersLoadStatus;
            },
            memberPagination() {
                return this.$store.getters.getMemberPagination;
            },
        }
    }
</script>


