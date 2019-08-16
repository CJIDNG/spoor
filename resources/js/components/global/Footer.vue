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
                        <div class="col-md-4 col-sm-4 col-6">
                            <div class="links">
                                <ul class="uppercase-links stacked-links">
                                    <li>
                                        <router-link to="/">
                                            Home
                                        </router-link>
                                    </li>
                                    <li>
                                        <a href="/blog">
                                            Stories
                                        </a>
                                    </li>
                                    <li>
                                        <router-link to="/incidents">
                                            Incidents
                                        </router-link>
                                    </li>
                                    <li>
                                        <router-link to="/resources">
                                            Resources
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
                        <div class="col-md-4 col-sm-4 col-6">
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
                        <div class="col-md-4 col-sm-4 col-6">
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
        },
        computed: {
            config() {
                return this.$store.getters.getConfig;
            },
            configLoadStatus() {
                return this.$store.getters.getConfigLoadStatus;
            },
        }
    }
</script>
