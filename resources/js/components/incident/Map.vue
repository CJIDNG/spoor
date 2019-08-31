<style scoped>
	#map {
        width: 100%;
        height: 91vh;
        margin: 0 auto;
		z-index: 1;
		border: 1px  solid #eeeeee;
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
		<div id="map" ref="mapElement"></div>

		<!--info window-->
        <div v-show="info_window_active" 
			id="info-window" class="col-md-4">
			<div class="card" data-background="color" data-color="orange">
				<div class="card-body">
					<div class="author">
						<span>{{ incident.title }}</span>
						<small>
							<span id="incident-type" class="badge badge-warning">
								{{ incident.incidentType.name }}
							</span>
						</small>
					</div>
					<span v-if="userLoadStatus == 2 && user != {}" class="category-social pull-right">
						<router-link class="btn btn-just-icon btn-sm btn-warning" 
                            :to="'/incidents/edit/'+incident.id">
                            <i class="fa fa-edit"></i>
                        </router-link>
                        <button @click="deleteIncident(incident.id)" class="btn btn-just-icon btn-sm btn-danger">
                            <i class="fa fa-times"></i>
                        </button>
					</span>
					<div class="clearfix"></div>
					<div>
						<span class="badge badge-info">Victim: {{ incident.victim }}</span>
						<span class="badge badge-info">Affiliation: {{ incident.affiliation }}</span>
						<span class="badge badge-info">Assailant: {{ incident.assailant }}</span>
					</div>
					<p v-html="incident.description" class="card-description"></p><br>
					<column-chart :data="{'Death Count': incident.death_count, 'Injured Count': incident.injured_count}"></column-chart><br>
					<button @click="closeInfoWindow" class="btn btn-success btn-sm">
						<i class="fa fa-times"></i>
						close
					</button>
					<span class="created_at">
						<i class="fa fa-clock-o"></i>
						{{ moment(incident.incident_date).format('ll') }}
					</span>
					<span>
						<i class="fa fa-map-marker"></i>
						{{ incident.location.name }}
					</span>
				</div>
			</div>
        </div>




	</div>
</template>
<script>
import ActionLoader from 'vue-spinner/src/ScaleLoader.vue';
import moment from 'moment';

export default {
	components: {
		ActionLoader
	},
	data() {
		return {
			incident: {
				"id":null,
				"title":"",
				"description":"",
				"death_count":null,
				"injured_count":null,
				"incidentType":{
					"id":null,
					"name":"",
					"created_at":"",
					"updated_at":""
				},
				"location":{
					"id":null,
					"name":"",
					"latitude":"",
					"longitude":"",
					"code":"",
					"created_at":"",
					"updated_at":""
				},
				"incident_date":"",
				"created_at":"",
				"updated_at":""
			},
			map: null,
			info_window_active: false,
			markers: null,
			map_first_init: true,
			moment: moment
		}
	},
	computed: {
		user() {
			return this.$store.getters.getUser;
		},
		userLoadStatus() {
			return this.$store.getters.getUserLoadStatus;
		},
		incidents() {
			return this.$store.getters.getIncidents;
		},
		incidentsLoadStatus() {
			return this.$store.getters.getIncidentsLoadStatus;
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
	},
	methods: {
		initMap() {
			let vm = this;

			vm.map = L.map(vm.$refs['mapElement']).setView([
				9.0765, 
				7.3986
			], 6);

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
			for(let i = 0; i < vm.incidents.data.length; i++) {
				let incident = vm.incidents.data[i];
				let icon = L.icon({
					iconUrl: '/images/vendor/leaflet/dist/marker-icon.png',
					//shadowUrl: 'leaf-shadow.png',

					//iconSize:     [38, 95], // size of the icon
					//shadowSize:   [50, 64], // size of the shadow
					//iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
					//shadowAnchor: [4, 62],  // the same for the shadow
					//popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
				});
				icon.options.shadowSize = [0,0];
				let marker = L.marker([
					incident.location.latitude,
					incident.location.longitude
				], {
					icon : icon
				});
				marker.id = incident.id;
				marker.on('click', () => {
					//this.$store.dispatch('getIncident', {
					//	id: incident.id
					//});
					this.incident = incident;
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