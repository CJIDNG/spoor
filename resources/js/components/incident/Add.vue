<style scoped>
    
</style>
<template>
	<div class="section">
		<div class="content">
			<div class="container">
				<div class="row">
					<div class="col-md-10 ml-auto mr-auto">
						<h3 class="title text-center">
							New Incident
						</h3>
						<form v-show="show_form">
							<div class="form-group">
								<label for="">
									Incident Type
									<sup>
										<i class="fa fa-asterisk small" style="color:red"></i>
									</sup>
								</label>
								<select v-model="incident.incident_type_id" class="form-control">
									<option v-for="type in incidentTypes" v-bind:key="type.id" :value="type.id">
										{{ type.name }}
									</option>
								</select>
								<small v-show="!validations.incident_type_id.is_valid" class="form-text text-muted text-danger">
									{{ validations.incident_type_id.text }}
								</small>
							</div>
							<div class="form-group">
								<label for="">
									Title
									<sup>
										<i class="fa fa-asterisk small" style="color:red"></i>
									</sup>
								</label>
								<input type="text" class="form-control" v-model="incident.title" />
								<small v-show="!validations.title.is_valid" class="form-text text-muted text-danger">
									{{ validations.title.text }}
								</small>
							</div>
							<div class="form-group">
								<label for="descriptioneditor">
									Description
									<sup>
										<i class="fa fa-asterisk small" style="color:red"></i>
									</sup>
								</label>
								<div id="descriptioneditor"></div>
								<small v-show="!validations.description.is_valid" class="form-text text-muted text-danger">
									{{ validations.description.text }}
								</small>
							</div>
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label for="">
											Death Count
										</label>
										<input type="number" class="form-control" v-model="incident.death_count" />
										<small v-show="!validations.death_count.is_valid" 
											class="form-text text-muted text-danger">
											{{ validations.death_count.text }}
										</small>
									</div>
								</div>
								<div class="col-md-6">
									<div class="form-group">
										<label for="">
											Injured Count
										</label>
										<input type="number" class="form-control" v-model="incident.injured_count" />
										<small v-show="!validations.injured_count.is_valid" 
											class="form-text text-muted text-danger">
											{{ validations.injured_count.text }}
										</small>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-4">
									<div class="form-group">
										<label for="">
											Victim
										</label>
										<input type="text" class="form-control" v-model="incident.victim" />
									</div>
								</div>
								<div class="col-md-4">
									<div class="form-group">
										<label for="">
											Affiliation
										</label>
										<input type="text" class="form-control" v-model="incident.affiliation" />
									</div>
								</div>
								<div class="col-md-4">
									<div class="form-group">
										<label for="">
											Assailant
										</label>
										<input type="text" class="form-control" v-model="incident.assailant" />
									</div>
								</div>
							</div>
							<div class="form-group">
								<label for="">
									Location
									<sup>
										<i class="fa fa-asterisk small" style="color:red"></i>
									</sup>
								</label><br>
								<div class="form-check form-check-radio form-check-inline">
									<label class="form-check-label">
										<input class="form-check-input" type="radio" 
											name="pu-location_type" value="state" v-model="location_type">
											State
										<span class="form-check-sign"></span>
									</label>
								</div>
								<div class="form-check form-check-radio form-check-inline">
									<label class="form-check-label">
										<input class="form-check-input" type="radio" 
											value="lg" v-model="location_type">
											Local Government
										<span class="form-check-sign"></span>
									</label>
								</div>
							</div>

							<div class="form-row">
								<div v-show="location_type === 'state' || location_type === 'lg'" 
									class="col">
									<label for="state">State</label>
									<select v-model="state_slct" class="form-control">
										<option class="disabled" disabled>choose state</option>
										<option v-for="state in states" v-bind:key="state.id" :value="state.id">
											{{ state.name }}
										</option>
									</select>
								</div>
								<div v-show="location_type === 'lg' || location_type === 'ra' || location_type === 'pu'" 
									class="col">
									<label for="lg">Local Government</label>
									<select v-model="lg_slct" class="form-control">
										<option class="disabled" disabled>choose Local Government</option>
										<option v-for="lg in localGovernments" v-bind:key="lg.id" :value="lg.id">
											{{ lg.name }}
										</option>
									</select>
								</div>
							</div>
							<small v-show="!validations.location_id.is_valid" class="form-text text-muted text-danger">
								{{ validations.location_id.text }}
							</small>
							<small v-show="!validations.location_type.is_valid" class="form-text text-muted text-danger">
								{{ validations.location_type.text }}
							</small><br><br>
							<div class="form-group">
								<label for="">
									Incident Date(YYYY/MM/DD)
									<sup>
										<i class="fa fa-asterisk small" style="color:red"></i>
									</sup>
								</label>
								<el-date-picker
									v-model="incident.incident_date"
									type="date"
									format="yyyy-MM-dd"
									value-format="yyyy-MM-dd"
									placeholder="Pick a day">
								</el-date-picker>
								<small v-show="!validations.incident_date.is_valid" class="form-text text-muted text-danger">
									{{ validations.incident_date.text }}
								</small>
							</div>
							<br>
							<button v-if="addIncidentLoadStatus != 1" @click="addIncident(incident)" type="button" 
								class="btn btn-success">Submit</button>
							<action-loader class="text-left" :loading='addIncidentLoadStatus == 1' 
								:color="'#4caf50'"></action-loader>
						</form>
						<div v-show="!show_form" class="alert alert-success" role="alert">
							{{ addIncidentResult.message }}
							<a href="#" @click="addAnother()" class="alert-link">
								&nbsp;Add Another Update
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
    import { HELPERS } from '../../helpers.js';
    import ActionLoader from 'vue-spinner/src/ClipLoader.vue';
    export default {
        components: {
            ActionLoader
        },
        data() {
            return {
                incident: {
                    title: '',
					description: '',
					death_count: 0,
					injured_count: 0,
					victim: '',
					affiliation: '',
					assailant: '',
                    incident_type_id: '',
                    location_id: '',
					location_type: '',
					incident_date: ''
                },
                description_editor: null,
                show_form: true,
                validations: {
                    title: {
                        is_valid: true,
                        text: ''
                    },
                    description: {
                        is_valid: true,
                        text: ''
					},
					death_count: {
						is_valid: true,
						text: ''
					},
					injured_count: {
						is_valid: true,
						text: ''
					},
                    incident_type_id: {
                        is_valid: true,
                        text: ''
                    },
                    location_id: {
                        is_valid: true,
                        text: ''
                    },
                    location_type: {
                        is_valid: true,
                        text: ''
					},
					incident_date: {
						is_valid: true,
						text: ''
					}
                },
                location_type: null,
                state_slct: null,
                lg_slct: null
            }
        },
        computed: {
            user() {
                return this.$store.getters.getUser;
            },
            userLoadStatus() {
                return this.$store.getters.getUserLoadStatus;
            },
            incidentTypes() {
                return this.$store.getters.getIncidentTypes;
            },
            addIncidentLoadStatus() {
                return this.$store.getters.getAddIncidentLoadStatus;
            },
            addIncidentResult() {
                return this.$store.getters.getAddIncidentResult;
            },
            states() {
                return this.$store.getters.getStates;
            },
            statesLoadStatus() {
                return this.$store.getters.getStatesLoadStatus;
            },
            localGovernments() {
                return this.$store.getters.getLocalGovernments;
            },
            localGovernmentsLoadStatus() {
                return this.$store.getters.getLocalGovernmentsLoadStatus;
            }
        },
        watch: {
            addIncidentLoadStatus: function() {
                let vm = this;
                if(vm.addIncidentLoadStatus == 3 && vm.addIncidentResult.success == 0) {
                    vm.show_form = true;
					this.$message({
                        title: 'Warning',
                        message: vm.addIncidentResult.message,
                        type: 'warning'
                    });
                } else if(vm.addIncidentLoadStatus == 2 && vm.addIncidentResult.success == 1) {
                    vm.show_form = false;
					vm.clearIncidentForm();
					this.$message({
                        title: 'Success',
                        message: vm.addIncidentResult.message,
                        type: 'success'
                    });
                } 
            },
            location_type: function() {
                
            },
            state_slct: function() {
                this.$store.dispatch('getLocalGovernments', {
                    id: this.state_slct
                });
            }
        },
        created() {
			this.$store.dispatch('getIncidentTypes');
			this.$store.dispatch('getStates');
        },
        mounted() {
            this.description_editor = HELPERS.initQuillEditor('descriptioneditor')
        },
        methods: {
            addIncident(data) {
                switch (this.location_type) {
                    case "state":
                        data.location_id = this.state_slct;
                        data.location_type = "state";
                        break;
                    case "lg":
                        data.location_id = this.lg_slct;
                        data.location_type = "localGovernment";
                        break;
                
                    default:
                        data.location_id = "";
                        data.location_type = "";
                        break;
                }
                data.description = this.description_editor.getText();
                if(this.validateIncident(data)) {
                    this.$store.dispatch('addIncident', data);
                }
            },
            addAnother() {
                this.addIncidentResult.result = 0;
                this.addIncidentResult.message = '';
                this.show_form = true;
            },
            validateIncident(incident) {
                let validIncident = true;
				let validations = this.validations;
				
                if(!incident.title) {
                    validIncident = false;
                    validations.title.is_valid = false;
                    validations.title.text = "title can not be empty";
				}
				
                if(!incident.description || incident.description === '\n') {
                    validIncident = false;
                    validations.description.is_valid = false;
                    validations.description.text = "description can not be empty";
				}
				
                if(!incident.incident_type_id) {
                    validIncident = false;
                    validations.incident_type_id.is_valid = false;
                    validations.incident_type_id.text = "incident type can not be empty";
				}
				
                if(!incident.location_id) {
                    validIncident = false;
                    validations.location_id.is_valid = false;
                    validations.location_id.text = "location id can not be empty";
				}
				
                if(!incident.location_type) {
                    validIncident = false;
                    validations.location_type.is_valid = false;
                    validations.location_type.text = "location type can not be empty";
				}

				if(!incident.incident_date) {
					validIncident = false;
					validations.incident_date.is_valid = false;
					validations.incident_date.text = "incident date cant be empty";
				}

                return validIncident;
            },
            clearIncidentForm() {
				this.incident.title = '';
				this.incident.death_count = null;
				this.incident.injured_count = null;
				this.incident.victim = '';
				this.incident.affiliation = '';
				this.incident.assailant = '';
                this.incident.incident_type_id = '';
                this.incident.location_id = '';
                this.incident.location_type = '';
                this.description_editor.setText('');
				this.location_type = '';
				this.incident.incident_date = '';
				this.state_slct = null;
				this.lg_slct = null;

                this.validations = {
                    title: {
                        is_valid: true,
                        text: ''
                    },
                    description: {
                        is_valid: true,
                        text: ''
					},
					death_count: {
						is_valid: true,
						text: ''
					},
					injured_count: {
						is_valid: true,
						text: ''
					},
                    incident_type_id: {
                        is_valid: true,
                        text: ''
                    },
                    location_id: {
                        is_valid: true,
                        text: ''
                    },
                    location_type: {
                        is_valid: true,
                        text: ''
					},
					incident_date: {
						is_valid: true,
						text: ''
					}
                }
            }
        }
    }
</script>