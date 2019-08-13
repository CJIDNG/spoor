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
    <div class="content">
        <div class="container">

            <div v-if="userLoadStatus == 2 && user != {}" id="action-btn">
                <router-link :to="'/incidentTypes/add'">
					<button class="btn btn-success btn-lg btn-just-icon">
						<i class="fa fa-plus"></i>
					</button>
                </router-link>
            </div> 

            
            <div class="section">
				<h3 class="title text-center">
					Incident Types
				</h3>
                <div class="container">
					<action-loader class="text-center" :loading='incidentTypesLoadStatus == 1' 
						:color="'#4caf50'"></action-loader>
					
					<table role="table" id="types-table" 
						class="table table-bordered">
						<thead role="group">
							<tr>
								<th role="columnheader">Id</th>
								<th role="columnheader">Name</th>
								<th role="columnheader" v-if="userLoadStatus == 2 && user != {}">Action</th>
							</tr>
						</thead>
						<tbody role="rowgroup">
							<tr role="row" v-for="(type, index) in incidentTypes" v-bind:key="type.id">
								<td role="cell">
									{{ index + 1 }}
								</td>
								<td role="cell">
									{{ type.name }}
								</td>
								<td v-if="userLoadStatus == 2 && user != {}" class="td-actions">
									<router-link 
										:to="'/incidentTypes/edit/'+type.id" 
										rel="tooltip" class="btn btn-success btn-sm btn-round btn-icon">
										<i class="fa fa-edit"></i>
									</router-link>
									<button @click="deleteIncidentType(type.id)" type="button" rel="tooltip" 
										class="btn btn-danger btn-sm btn-round btn-icon">
										<i class="fa fa-times"></i>
									</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
            </div>
        </div>
    </div>
</template> 
<script>
    import { HELPERS } from '../../helpers.js';
    import ActionLoader from 'vue-spinner/src/ScaleLoader.vue';
    export default {
        components: {
            ActionLoader
        },
        data() {
            return {
                HF: HELPERS
            }
        },
        computed: {
            incidentTypes() {
                return this.$store.getters.getIncidentTypes;
            },
            incidentTypesLoadStatus() {
                return this.$store.getters.getIncidentTypesLoadStatus;
            },
            user() {
                return this.$store.getters.getUser;
            },
            userLoadStatus() {
                return this.$store.getters.getUserLoadStatus;
            },
            deleteIncidentTypeLoadStatus() {
                return this.$store.getters.getDeleteIncidentTypeLoadStatus;
            },
            deleteIncidentTypeResult() {
                return this.$store.getters.getDeleteIncidentTypeResult;
            }
        },
        created() {
            this.$store.dispatch('getIncidentTypes');
        },
        mounted() {
        },
        watch: {
            deleteIncidentTypeLoadStatus: function() {
                let vm = this;
                
                if(vm.deleteIncidentTypeLoadStatus == 3 && vm.deleteIncidentTypeResult.success == 0) {
                    vm.HF.showNotification(
                        'top', 
                        'center', 
                        vm.deleteIncidentTypeResult.message, 
                        'danger'
                    );
                } else if(vm.deleteIncidentTypeLoadStatus == 2 && vm.deleteIncidentTypeResult.success == 1) {
                    //reload Incident Types
                    this.$store.dispatch('getIncidentTypes');
                    vm.HF.showNotification(
                        'top', 
                        'center', 
                        vm.deleteIncidentTypeResult.message, 
                        'success'
                    );
                } 
            }
        },
        methods: {
            deleteIncidentType(id) {
                if(confirm('Are you sure?')) {
                    this.$store.dispatch('deleteIncidentType', {
                        id: id
                    });
                }
            }
        }
    }
</script>
