<style scoped>
    .el-aside {
        border: 1px solid;
    }

    .el-main {
        border: 1px solid;
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
            <h1>Hello World</h1>
        </el-aside>
        <el-main>
            <div id="switch">
                <div class="btn-group">
                    <button @click="toggleComponent('map')" type="button" 
                        class="btn btn-just-icon" :class="{'btn-success': map_active}">
                        <i class="fa fa-map"></i>
                    </button>
                    <button @click="toggleComponent('timeline')" type="button" 
                        class="btn btn-just-icon" :class="{'btn-success': viz_active}">
                        <i class="fa fa-bar-chart"></i> 
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
import VizComponent from './Viz.vue'

export default {
	components: {
        MapComponent,
        VizComponent
    },
    data () {
        return {
            active_component: 'map',
            map_active: true,
            viz_active: false
        }
    },
    methods: {
        toggleComponent(component) {
            this.active_component = component;

            if(component === 'map') {
                this.map_active = true;
                this.viz_active = false;
            } else if(component === 'viz') {
                this.map_active = false;
                this.viz_active = true;
            }
        }
    }
}
</script>