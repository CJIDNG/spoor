<style scoped>
    .el-main {
        padding: 0px;
    }

    #switch {
        position: relative;
        left: 20px;
        z-index: 3;
    }
    #switch .btn-group {
        position: fixed;
        bottom: 10%;
    }
    #action-btn {
        position: relative;
        right: 20px;
        z-index: 3;
    }
    #action-btn .btn {
        position: fixed;
        right: 30px;
        bottom: 10%;
    }
</style>
<template>
	<el-container>
        <el-aside>
            <h3 class="title text-center" style="margin-bottom: 0px">Incidents Map</h3>
            <hr >
            <form class="p-3">
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

                <div v-show="location_type === 'state' || location_type === 'lg'">
                    <label for="state">State</label>
                    <select v-model="state_slct" class="form-control">
                        <option class="disabled" disabled>choose state</option>
                        <option v-for="state in states" v-bind:key="state.id" :value="state.id">
                            {{ state.name }}
                        </option>
                    </select>
                </div><br>
                <div v-show="location_type === 'lg' || location_type === 'ra' || location_type === 'pu'">
                    <label for="lg">Local Government</label>
                    <select v-model="lg_slct" class="form-control">
                        <option class="disabled" disabled>choose Local Government</option>
                        <option v-for="lg in localGovernments" v-bind:key="lg.id" :value="lg.id">
                            {{ lg.name }}
                        </option>
                    </select>
                </div><br><br><br>
                <button v-if="incidentsLoadStatus != 1" @click="loadIncidents()" type="button" 
                    class="btn btn-success">Get Incidents</button>
                <button v-if="incidentsLoadStatus != 1" @click="reloadIncidents()" type="button" 
                    class="btn btn-success">Refresh</button>
                <action-loader class="text-left" :loading='incidentsLoadStatus == 1' 
                    :color="'#4caf50'"></action-loader>
            </form> 
            <hr>
            <div class="alert alert-warning alert-with-icon">
                <div class="alert-wrapper">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <i class="nc-icon nc-simple-remove"></i>
                    </button>
                    <div class="message">
                        <i class="nc-icon nc-bell-55"></i>
                        Filtering is As-Is. That is, it filters the locations as saved in the 
                        database.
                    </div>
                </div>
            </div>
        </el-aside>
        <el-main>
            <div id="switch">
                <div class="btn-group btn-group-default">
                    <button @click="toggleComponent('map')" type="button" 
                        class="btn btn-just-icon" :class="{'btn-success': map_active}">
                        <i class="fa fa-map"></i>
                    </button>
                </div>
            </div>
            <div id="action-btn">
                <router-link class="btn btn-success btn-round btn-just-icon btn-lg" 
                    :to="'/incidents/add'">
                    <i class="fa fa-plus"></i>
                </router-link>
            </div>
            <map-component v-if="active_component === 'map'"></map-component>
            <viz-component v-else-if="active_component === 'viz'"></viz-component>
        </el-main>
    </el-container>
</template>
<script>
import MapComponent from './Map.vue'
import ActionLoader from 'vue-spinner/src/ClipLoader.vue';

export default {
	components: {
        MapComponent,
        ActionLoader
    },
    data () {
        return {
            active_component: 'map',
            map_active: true,
            location_type: null,
            state_slct: null,
            lg_slct: null
        }
    },
    computed: {
        incidents() {
			return this.$store.getters.getIncidents;
		},
		incidentsLoadStatus() {
			return this.$store.getters.getIncidentsLoadStatus;
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
        state_slct: function(val) {
            if (val !== 'all') {
                this.$store.dispatch('getLocalGovernments', {
                    id: this.state_slct
                });
            } else if (val === 'all') {
                this.$store.commit('setLocalGovernments', [])
            }
        }
    },
    created () {
        this.$store.dispatch('getStates');
    },
    methods: {
        toggleComponent(component) {
            this.active_component = component;

            if(component === 'map') {
                this.map_active = true;
            } else if(component === 'viz') {
                this.map_active = false;
            }
        },
        loadIncidents () {
            if (this.location_type === 'state' && this.state_slct) {
                this.$store.dispatch('getStateIncidents', {
                    stateId: this.state_slct,
                    limit: 20000,
                    url: null
                });
            } else if (this.location_type === 'lg' && this.lg_slct) {
                this.$store.dispatch('getLocalGovernmentIncidents', {
                    localGovernmentId: this.lg_slct,
                    limit: 20000,
                    url: null
                });
            } else {
                alert('some required params are not set');
            }
        },
        reloadIncidents () {
            this.location_type = '';
            this.state_slct = '';
            this.lg_slct = '';

            this.$store.dispatch('getIncidents', {
                url: null,
                limit: 20000
            });
        }
    },
}
</script>