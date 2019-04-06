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
                    :to="'/member/add'">
                    <i class="fa fa-plus"></i>
                </router-link>
            </div>
            <div class="row">
                <div class="col-md-6 ml-auto mr-auto text-center title">
                    <h2>Members</h2>
                </div>
            </div>
            <i v-show="membersLoadStatus == 1" class="now-ui-icons loader_refresh spin"></i>
            <div>
                <div class="row">
                    <div v-for="member in members" v-bind:key="member.id" class="col-md-6">
                        <div class="card" data-background="image" 
                            :style="'background-image: url(/storage/'+member.thumbnail+')'">
                            <div class="card-body">
                                <label class="badge badge-pill badge-info ml-1">
                                    {{ member.designation }}
                                </label>
                                <a href="#pablo">
                                    <h3 class="card-title">
                                        <router-link class="card-title" :to="'/member/view/'+member.id">
                                            {{ member.full_name }}
                                        </router-link>
                                    </h3>
                                </a>
                                <div class="card-footer">
                                    <ul class="list-inline" v-if="userLoadStatus == 2 && user != {}">
                                        <li class="list-inline-item">
                                            <router-link :to="'/member/edit/'+member.id" 
                                                class="btn btn-info btn-round btn-sm">
                                                edit
                                            </router-link>
                                        </li>
                                        <li class="list-inline-item">
                                            <button @click="deleteMember(member.id)" 
                                                class="btn btn-danger btn-round btn-sm">
                                                Delete
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div><hr><br/><br/>
            <div class="row">
                <div class="col-md-12">
                <div class="pull-left">
                    <button v-bind:class="[{disabled: !pagination.prev_page_url}]" 
                            @click="loadMembers(pagination.prev_page_url)" 
                            class="btn btn-link btn-default btn-move-left btn-sm"> 
                        <i class="fa fa-angle-left"></i> Older members
                    </button>
                </div>
                <div class="pull-right">
                    <button v-bind:class="[{disabled: !pagination.next_page_url}]" 
                            @click="loadMembers(pagination.next_page_url)" 
                            class="btn btn-link btn-default btn-move-right btn-sm">
                        Newer members <i class="fa fa-angle-right"></i>
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
            this.$store.dispatch('loadMembers', {
                url: null
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
            members() {
                return this.$store.getters.getMembers;
            },
            membersLoadStatus() {
                return this.$store.getters.getMembersLoadStatus;
            },
            pagination() {
                return this.$store.getters.getMemberPagination;
            },
            deleteMemberLoadStatus() {
                return this.$store.getters.getDeleteMemberLoadStatus;
            },
            deleteMemberResponse() {
                return this.$store.getters.getDeleteMemberResponse;
            }
        },
        watch: {
            deleteMemberLoadStatus: function(val) {
                let vm = this;
                if(val == 3 || vm.deleteMemberResponse.success == 0) {
                    this.$message({
                        title: 'Danger',
                        message: 'Something went wrong. Try again!',
                        type: 'danger'
                    });
                } else if(val == 2 && vm.deleteMemberResponse.success == 1) {
                    //reload members
                    vm.$store.dispatch('loadMembers', {
                        url: null
                    });
                    this.$message({
                        title: 'Success',
                        message: 'member deleted successfully',
                        type: 'success'
                    });
                } 
            }
        },
        methods: {
            loadMembers(url) {
                this.$store.dispatch('loadMembers', {
                    url: url
                });
            },
            deleteMember(id) {
                if(confirm('Are you sure?')) {
                    this.$store.dispatch('deleteMember', {
                        id: id
                    });
                }
            },
        }
    }
</script>
