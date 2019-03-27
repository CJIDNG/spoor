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
                    :to="'/investigation/add'">
                    <i class="fa fa-plus"></i>
                </router-link>
            </div>
            <div class="row">
                <div class="col-md-6 ml-auto mr-auto text-center title">
                    <h2>Latest investigations</h2>
                </div>
            </div>
            <i v-show="investigationsLoadStatus == 1" class="now-ui-icons loader_refresh spin"></i>
            <div>
                <div class="row">
                    <div v-for="investigation in investigations" v-bind:key="investigation.id" class="col-md-6">
                        <div class="card" data-background="image" 
                            :style="'background-image: url(/storage/'+investigation.thumbnail+')'">
                            <div class="card-body">
                                <label v-for="(tag,index) in investigation.tags.split(',')" :key="index" 
                                    class="badge badge-pill badge-info ml-1">
                                    {{tag}}
                                </label>
                                <a href="#pablo">
                                    <h3 class="card-title">
                                        <router-link class="card-title" :to="'/investigation/view/'+investigation.id">
                                            {{ investigation.title }}
                                        </router-link>
                                    </h3>
                                </a>
                                <div class="card-footer">
                                    <ul class="list-inline" v-if="userLoadStatus == 2 && user != {}">
                                        <li class="list-inline-item">
                                            <router-link :to="'/investigation/edit/'+investigation.id" 
                                                class="btn btn-info btn-round btn-sm">
                                                edit
                                            </router-link>
                                        </li>
                                        <li class="list-inline-item">
                                            <button @click="deleteInvestigation(investigation.id)" 
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
                            @click="loadInvestigations(pagination.prev_page_url)" 
                            class="btn btn-link btn-default btn-move-left btn-sm"> 
                        <i class="fa fa-angle-left"></i> Older investigations
                    </button>
                </div>
                <div class="pull-right">
                    <button v-bind:class="[{disabled: !pagination.next_page_url}]" 
                            @click="loadInvestigations(pagination.next_page_url)" 
                            class="btn btn-link btn-default btn-move-right btn-sm">
                        Newer investigations <i class="fa fa-angle-right"></i>
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
            this.$store.dispatch('loadInvestigations', {
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
            investigations() {
                return this.$store.getters.getInvestigations;
            },
            investigationsLoadStatus() {
                return this.$store.getters.getInvestigationsLoadStatus;
            },
            pagination() {
                return this.$store.getters.getInvestigationPagination;
            },
            deleteInvestigationLoadStatus() {
                return this.$store.getters.getDeleteInvestigationLoadStatus;
            },
            deleteInvestigationResponse() {
                return this.$store.getters.getDeleteInvestigationResponse;
            }
        },
        watch: {
            deleteInvestigationLoadStatus: function(val) {
                let vm = this;
                if(val == 3 || vm.deleteInvestigationResponse.success == 0) {
                    this.$message({
                        title: 'Danger',
                        message: 'Something went wrong. Try again!',
                        type: 'danger'
                    });
                } else if(val == 2 && vm.deleteInvestigationResponse.success == 1) {
                    //reload investigations
                    vm.$store.dispatch('loadInvestigations', {
                        url: null
                    });
                    this.$message({
                        title: 'Success',
                        message: 'investigation deleted successfully',
                        type: 'success'
                    });
                } 
            }
        },
        methods: {
            loadInvestigations(url) {
                this.$store.dispatch('loadInvestigations', {
                    url: url
                });
            },
            deleteInvestigation(id) {
                if(confirm('Are you sure?')) {
                    this.$store.dispatch('deleteInvestigation', {
                        id: id
                    });
                }
            },
        }
    }
</script>
