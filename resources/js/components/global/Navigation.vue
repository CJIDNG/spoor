<style>
</style>
<template>
    <nav class="navbar navbar-expand-lg bg-black">
        <div class="container">
            <div class="navbar-translate">
                <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" 
                    data-target="#navbar-menu" aria-controls="navbarSupportedContent" aria-expanded="false" 
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    <span class="navbar-toggler-icon"></span>
                    <span class="navbar-toggler-icon"></span>
                </button>
                <router-link class="navbar-brand" to="/">
                    <img height="50" src="/img/spoor_white.png" alt="" srcset="">
                </router-link>
            </div>
            <div class="collapse navbar-collapse" id="navbar-menu">
                <ul class="navbar-nav ml-auto">
                    <div class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" data-toggle="dropdown" id="dropdownIMenuButton" 
                            href="#pk" role="button" aria-haspopup="true" 
                            aria-expanded="false">
                            <i class="fa fa-th"></i>
                            Research
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="dropdownIMenuButton">
                            <!--<li class="dropdown-header">Dropdown header</li>-->
                            <a class="dropdown-item" href="/blog">
                                News/Investigations
                            </a>
                            <a class="dropdown-item" href="/blog">
                                Quaterly Reports
                            </a>
                            <a class="dropdown-item" href="/blog">
                                Analysis
                            </a>
                            <a class="dropdown-item" href="/blog">
                                Policy Brief
                            </a>
                        </ul>
                    </div>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/incidents">
                            <i class="fa fa-map-marker"></i>
                            Incidents
                        </router-link>
                    </li>
                    <!-- <div class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" data-toggle="dropdown" id="dropdownMenuButton" 
                            href="#pk" role="button" aria-haspopup="true" 
                            aria-expanded="false">
                            <i class="fa fa-file-text"></i>
                            Resources
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <router-link class="dropdown-item" to="/resources">
                                Downloads
                            </router-link>
                        </ul>
                    </div> -->
                    <!-- <div class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" data-toggle="dropdown" id="dropdownMenuButton" 
                            href="#pk" role="button" aria-haspopup="true" 
                            aria-expanded="false">
                            <i class="fa fa-exclamation-triangle"></i>
                            Get Involved
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <router-link class="dropdown-item" to="/be-a-member">
                                Be a Member
                            </router-link>
                        </ul>
                    </div> -->
                    <li class="nav-item">
                        <router-link class="nav-link" to="/member">
                            <i class="fa fa-users"></i>
                            Team
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/contact">
                            <i class="fa fa-address-book"></i>
                            Contact
                        </router-link>
                    </li>
                    <div v-if="user.name" class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" data-toggle="dropdown" id="dropdownMenuButton" 
                            href="#pk" role="button" aria-haspopup="true" 
                            aria-expanded="false">
                            <i class="fa fa-user-circle-o"></i>
                            {{ user.name }}
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a class="dropdown-item" href="/blogadmin/posts">
                                Posts
                            </a>
                            <a class="dropdown-item" href="/blogadmin/tags">
                                Tags
                            </a>
                            <a class="dropdown-item" href="/blogadmin/topics">
                                Topics
                            </a>
                            <a class="dropdown-item" href="/blogadmin">
                                Stats
                            </a>
                            <div class="dropdown-divider"></div>
                            <router-link to="/admin" class="dropdown-item">
                                Admin
                            </router-link>
                            <router-link to="/incidentTypes" class="dropdown-item">
                                Incident Types
                            </router-link>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" onclick="event.preventDefault();
                                document.getElementById('logout-form').submit();">
                                Logout
                            </a>
                            <form id="logout-form" :action="'/logout'" 
                                    method="POST" style="display: none;">
                                <input type="hidden" name="_token" id="csrf-token" :value="csrf_token" />
                            </form>
                        </ul>
                    </div>
                    <!--<li v-else class="nav-item">
                        <a class="nav-link" href="/login">
                            <i class="fa fa-user-circle-o"></i>
                            Login
                        </a>
                    </li>-->
                </ul>
            </div>
        </div>
        <hr/>
    </nav>
</template>
<script>
     export default {
        components: {},
        data () {
            return {
                csrf_token: $('meta[name="csrf-token"]').attr('content'),
                loginStatus: 0
            };
        },
        computed: {
            user () {
                return this.$store.getters.getUser;
            },
            userLoadStatus () {
                return this.$store.getters.getUserLoadStatus;
            }
        },
        watch: {
            userLoadStatus: function (val) {
                this.loginStatus = val;
            }
        },
        mounted () {},
        created () {
            this.$store.dispatch('getAuthUser')
        }
    };
</script> 
