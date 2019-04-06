<style>

</style>
<template>
    <footer class="footer footer-black footer-big">
        <div class="container">
            <div class="row">
                <div class="col-md-3 text-center col-sm-3 col-12 ml-auto mr-auto">
                    <h4>{{ config.site_title }}</h4>
                    <div class="social-area">
                        <a :href="config.facebook_url" class="btn btn-just-icon btn-round btn-facebook">
                            <i class="fa fa-facebook" aria-hidden="true"></i>
                        </a>
                        <a :href="config.twitter_url" class="btn btn-just-icon btn-round btn-twitter">
                            <i class="fa fa-twitter" aria-hidden="true"></i>
                        </a>
                        <a :href="config.instagram_url" class="btn btn-just-icon btn-round btn-instagram">
                            <i class="fa fa-instagram" aria-hidden="true"></i>
                        </a>
                        <a :href="config.linkedin_url" class="btn btn-just-icon btn-round btn-linkedin">
                            <i class="fa fa-linkedin" aria-hidden="true"></i>
                        </a>
                    </div>
                </div>
                <div class="col-md-9 col-sm-9 col-12 ml-auto mr-auto">
                    <div class="row">
                        <div class="col-md-3 col-sm-3 col-6">
                            <div class="links">
                                <ul class="uppercase-links stacked-links">
                                    <li>
                                        <router-link to="/">
                                            Home
                                        </router-link>
                                    </li>
                                    <li>
                                        <router-link to="/investigation">
                                            Research
                                        </router-link>
                                    </li>
                                    <li>
                                        <router-link to="/blog">
                                            Stories
                                        </router-link>
                                    </li>
                                    <li>
                                        <router-link to="/member">
                                            Members
                                        </router-link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-3 col-6">
                            <div class="links">
                                <ul class="uppercase-links stacked-links">
                                    <li>
                                        <router-link to="/contact">
                                            Contact Us
                                        </router-link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-3 col-6">
                            <div class="links">
                                <ul class="uppercase-links stacked-links">
                                    <li>
                                        <router-link to="/be-a-member">
                                            Be A Member
                                        </router-link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-3 col-6">
                            <div class="links">
                                <ul class="stacked-links">
                                    <li>
                                        <h4>{{ investigationPagination.total }}
                                        <br>
                                        <small>Researches</small>
                                        </h4>
                                    </li>
                                    <li>
                                        <h4>{{ postPagination.total }}
                                        <br>
                                        <small>Stories</small>
                                        </h4>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div class="copyright">
                        <div class="pull-left">
                            © 2019 {{ config.site_title }}, All rights reserved.
                        </div>
                        <div class="links pull-right">
                            <ul>
                                <li>
                                    <a href="#">
                                        Terms
                                    </a>
                                </li>
                                |
                                <li>
                                    <a href="#">
                                        Privacy
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>
<script>
    export default {
        created() {
            this.$store.dispatch('loadConfig');
            this.$store.dispatch('loadInvestigations', {
                url: null
            });
            this.$store.dispatch('loadPosts', {
                url: null,
                investigationId: null,
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
        }
    }
</script>
