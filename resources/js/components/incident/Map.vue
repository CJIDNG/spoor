<style scoped>
	#map {
        position: fixed;
        width: 100%;
        height: 100vh;
        margin-top: 0px;
        z-index: 1;
    }

    #info-window {
        position: fixed;
        bottom:0;
        right:0;
        z-index: 4;
    }
</style>
<template>
	<div>
		<div id="map"></div>

		<!--info window-->
        <div v-loading="incidentLoadStatus === 1" 
			v-show="info_window_active" 
			id="info-window" class="col-md-4">
            <div class="card card-nav-tabs">
                <div class="card-header card-header-success">
                    <h4 class="card-title">{{ incident.title }}</h4>
                    <p class="category"></p> 
                    <span id="incident-type" class="badge badge-warning">
						{{ incident.incidentType.name }}
					</span>
                    <br>
                    <div>
                        <router-link class="btn btn-just-icon btn-sm btn-warning" 
                            :to="'/incidents/edit/'+incident.id">
                            <i class="fa fa-plus"></i>
                        </router-link>
                        <button @click="deleteIncident(incident.id)" class="btn btn-just-icon btn-sm btn-danger">
                            <i class="fa fa-times"></i>
                        </button>
                    </div>
                </div>
                <div v-html="incident.description" class="card-body"></div>
                <div class="card-footer">
                    <ul class="list-inline">
                        <li class="list-inline-item">
                            <button @click="closeInfoWindow" class="btn btn-success btn-sm">
                                <i class="fa fa-times"></i>
                                close
                            </button>
                        </li>
                        <li class="list-inline-item">
                            <div class="stats">
                                <i class="fa fa-clock-o"></i> 
                                <span class="created_at">
									{{ moment(incident.created_at, 'DD MMM YYYY H:m:s').format('lll') }}
								</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>




	</div>
</template>
<script>
import ActionLoader from 'vue-spinner/src/ScaleLoader.vue';
export default {
	components: {
		ActionLoader
	},
	data() {
		return {
			map: null,
			info_window_active: false,
			markers: null,
			map_first_init: true
		}
	},
	computed: {
		incidents() {
			return this.$store.getters.getIncidents;
		},
		incidentsLoadStatus() {
			return this.$store.getters.getIncidentsLoadStatus;
		},
		incident () {
			return this.$store.getters.getIncident;
		},
		incidentLoadStatus () {
			return this.$store.getters.getIncidentLoadStatus;
		},
		iPagination() {
			return this.$store.getters.getIPagination;
		},
		deleteIncidentLoadStatus() {
			return this.$store.getters.getDeleteIncidentLoadStatus;
		},
		deleteIncidentResult() {
			return this.$store.getters.getDeleteIncidentResult;
		}
	},
	watch: {
		incidents: function() {
			if(this.map_first_init) {
				this.initMap();
				this.map_first_init = false;
			}
			if(this.incidentsLoadStatus == 2 && !this.map_first_init) {
				this.clearMarkers();
				this.buildMarkers(this.map);
			}
		},
		deleteIncidentLoadStatus: function() {
			let vm = this;
			
			if(vm.deleteIncidentLoadStatus == 3 && vm.deleteIncidentResult.success == 0) {
				alert(vm.deleteIncidentResult.message);
			} else if(vm.deleteIncidentLoadStatus == 2 && vm.deleteIncidentResult.success == 1) {
				//reload updates
				this.closeInfoWindow();

				this.$store.dispatch('getIncidents', {
					url: null,
					limit: 20000
				});

				alert(vm.deleteIncidentResult.message);
			} 
		}
	},
	mounted() {
	},
	created() {
		this.$store.dispatch('getIncidents', {
			url: null,
			limit: 20000
		});
		L.map('map').setView([
				9.0765, 
				7.3986
			], 9);
	},
	methods: {
		initMap() {
			let vm = this;

			vm.map = L.map('map').setView([
				9.0765, 
				7.3986
			], 9);

			L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			}).addTo(vm.map);

			vm.buildMarkers(vm.map);
		},
		openInfoWindow() {
			this.info_window_active = true;
		},
		closeInfoWindow() {
			this.info_window_active = false;
		},
		buildMarkers(map) {
			let vm = this;
			vm.markers = L.markerClusterGroup({ chunkedLoading: true });
			for(let i = 0; i < vm.incidents.length; i++) {
				let incident = vm.incidents[i];
				let icon = new L.Icon.Default();
				icon.options.shadowSize = [0,0];
				let marker = L.marker([
					incident.location.latitude,
					incident.location.longitude
				], {
					icon : icon
				});
				marker.id = incident.id;
				marker.on('click', function() {
					this.$store.dispatch('getIncident', {
						id: this.id
					});
					vm.openInfoWindow();
				});
				marker.bindPopup(incident.location.name);
					//.openPopup();
				vm.markers.addLayer(marker);
			}
			map.addLayer(vm.markers);
		},
		clearMarkers() {
			let vm = this;
			vm.map.removeLayer(vm.markers);                
		},
		getIncidents(url) {
			this.$store.dispatch('getIncidents', {
				url: url,
				limit: null
			});
		},
		searchIncidents(id) {
			let vm = this;
			for (let i = 0; i < vm.incidents.length; i++) {
				if (vm.incidents[i].id === id) {
					return vm.incidents[i];
				}
			}
		},
		deleteIncident(data) {
			if(confirm("are you sure?")) {
				this.$store.dispatch('deleteIncident', {
					id: data
				});
			}
		}
	}
}
</script>