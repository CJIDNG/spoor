<style>
</style>
<template>
    <nav class="navbar navbar-expand-md navbar-default">
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
                    Spoor
                </router-link>
            </div>
            <div class="collapse navbar-collapse" id="navbar-menu">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/investigation">
                            <i class="fa fa-search"></i>
                            Research
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/blog">
                            <i class="fa fa-th"></i>
                            Stories
                        </router-link>
                    </li>
                    <div class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" data-toggle="dropdown" id="dropdownMenuButton" 
                            href="#pk" role="button" aria-haspopup="true" 
                            aria-expanded="false">
                            <i class="fa fa-exclamation-triangle"></i>
                            Get Involved
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <!--<li class="dropdown-header">Dropdown header</li>-->
                            <router-link class="dropdown-item" to="/be-a-member">
                                Be a Member
                            </router-link>
                        </ul>
                    </div>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/member">
                            <i class="fa fa-users"></i>
                            Members
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/contact">
                            <i class="fa fa-address-book"></i>
                            Contact
                        </router-link>
                    </li>
                    <div v-if="loginStatus == 2" class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" data-toggle="dropdown" id="dropdownMenuButton" 
                            href="#pk" role="button" aria-haspopup="true" 
                            aria-expanded="false">
                            <i class="tim-icons icon-single-02"></i>
                            {{ user.name }}
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <!--<li class="dropdown-header">Dropdown header</li>-->
                            <router-link to="/admin" class="dropdown-item">
                                Admin
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
                </ul>
            </div>
        </div>
        <hr/>
    </nav>
</template>
<script>
     export default {
        components: {

        },
        data() {
            return {
                csrf_token: $('meta[name="csrf-token"]').attr('content'),
                loginStatus: 0
            };
        },
        computed: {
            user() {
                return this.$store.getters.getUser;
            },
            userLoadStatus() {
                return this.$store.getters.getUserLoadStatus;
            },
        },
        watch: {
            userLoadStatus: function(val) {
                this.loginStatus = val;
            }
        },
        mounted() {

        },
        created() {
            this.$store.dispatch('getAuthUser');
        }
    };
</script> 
