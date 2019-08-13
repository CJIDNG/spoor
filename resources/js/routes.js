/*
|-------------------------------------------------------------------------------
| routes.js
|-------------------------------------------------------------------------------
| Contains all of the routes for the application
*/

/*
    Imports Vue and VueRouter to extend with the routes.
*/
import Vue from 'vue';
import VueRouter from 'vue-router';
import { routerHistory } from 'vue-router-back-button';
import HeaderComponent from './components/global/Navigation.vue';
import FooterComponent from './components/global/Footer.vue';

import store from './store.js';

/*
    Extends Vue to use Vue Router
*/
Vue.use( VueRouter );
Vue.use(routerHistory);

/*
	This will cehck to see if the user is authenticated or not.
*/
function requireAuth (to, from, next) {
	/*
		Determines where we should send the user.
	*/
	function proceed () {
		/*
			If the user has been loaded determine where we should
			send the user.
		*/
        if ( store.getters.getUserLoadStatus == 2 ) { 
            next();
        } else if(store.getters.getUserLoadStatus == 3) {
            //user is not logged in
            console.log('you are not logged in');
        }
    }
    
    proceed();
}

const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'Home',
            components: {
                default: Vue.component('HomeComponent', require('./pages/Home.vue').default),
                header: Vue.component('HeaderComponent', HeaderComponent),
                footer: Vue.component('FooterComponent', FooterComponent)
            }
        },
        {
            path: '/incidentTypes',
            components: {
                default: Vue.component('IncidentType', require('./pages/IncidentType.vue').default),
                header: Vue.component('HeaderComponent', HeaderComponent),
                footer: Vue.component('FooterComponent', FooterComponent)
            },
            children: [
                {
                    path: '',
                    name: 'Incident Types',
                    component: Vue.component(
                        'BrowseIncidentType',
                        require('./components/incidentType/Browse.vue').default
                    ),
                    meta: {
                        permittedToMakeChanges: ['Super-admin', 'Admin']
                    }
                },
                {
                    path: 'edit/:incidentTypeId',
                    name: 'Edit Incident Type',
                    component: Vue.component(
                        'EditIncidentType', 
                        require('./components/incidentType/Update.vue').default
                    ),
                    beforeEnter: requireAuth,
                    meta: {
                        permitted: ['Super-admin', 'Admin']
                    }
                },
                {
                    path: 'add',
                    name: 'Add Incident Type',
                    component: Vue.component(
                        'AddIncidentType', 
                        require('./components/incidentType/Add.vue').default
                    ),
                    beforeEnter: requireAuth,
                    meta: {
                        permitted: ['Super-admin', 'Admin']
                    }
                }
            ]
        },
        {
            path: 'incidents',
            components: {
                default: Vue.component('Incidents', require('./pages/Incident.vue').default),
                header: Vue.component('HeaderComponent', HeaderComponent),
                footer: Vue.component('FooterComponent', FooterComponent)
            },
            beforeEnter: function(to, from, next) {
                if(to.params.id !== "undefined") {
                    next();
                }
            },
            children: [
                {
                    path: '',
                    name: 'Browse Incidents',
                    component: Vue.component('BrowseIncidents', require('./components/incidents/BrowseIncidents.vue')),
                    meta: {
                        isElectionPage: true,
                        isMap: true,
                        permittedToMakeChanges: ['Super-admin', 'Admin', 'Tracking Officer']
                    }
                },
                {
                    path: 'edit/:incidentId',
                    name: 'Edit Incident',
                    component: Vue.component('EditIncident', require('./components/incidents/EditIncident.vue')),
                    beforeEnter: requireAuth,
                    meta: {
                        permitted: ['Super-admin', 'Admin', 'Tracking Officer'],
                        isElectionPage: true
                    }
                },
                {
                    path: 'add',
                    name: 'Add Incident',
                    component: Vue.component('AddIncident', require('./components/incidents/AddIncident.vue')),
                    beforeEnter: requireAuth,
                    meta: {
                        permitted: ['Super-admin', 'Admin', 'Tracking Officer'],
                        isElectionPage: true
                    }
                }
            ]
        },
        {
            path: '/member',
            components: {
                default: Vue.component('MemberComponent', require('./pages/Member.vue').default),
                header: Vue.component('HeaderComponent', HeaderComponent),
                footer: Vue.component('FooterComponent', FooterComponent)
            },
            children: [
                {
                    path: '',
                    name: 'Member',
                    component: Vue.component('BrowseMembers', require('./components/member/Browse.vue').default)
                },
                {
                    path: 'edit/:memberId',
                    name: 'Edit Member',
                    component: Vue.component(
                        'EditMember', 
                        require('./components/member/Update.vue').default
                    ),
                    beforeEnter: requireAuth,
                    meta: {
                        permitted: ['Super-admin', 'Admin']
                    }
                },
                {
                    path: 'view/:memberId',
                    name: 'View Member',
                    component: Vue.component(
                        'ViewMember',
                        require('./components/member/View.vue').default
                    )
                },
                {
                    path: 'add',
                    name: 'Add Member',
                    component: Vue.component(
                        'AddMember', 
                        require('./components/member/Add.vue').default
                    ),
                    beforeEnter: requireAuth,
                    meta: {
                        permitted: ['Super-admin','Admin']
                    }
                }
            ]
        },
        {
            path: '/be-a-member',
            name: 'Be A Member',
            components: {
                default: Vue.component('BeMemberComponent', require('./pages/BeMember.vue').default),
                header: Vue.component('HeaderComponent', HeaderComponent),
                footer: Vue.component('FooterComponent', FooterComponent)
            }
        },
        {
            path: '/contact',
            name: 'Contact',
            components: {
                default: Vue.component('ContactComponent', require('./pages/Contact.vue').default),
                header: Vue.component('HeaderComponent', HeaderComponent),
                footer: Vue.component('FooterComponent', FooterComponent)
            }
        },
        {
            path: '/admin',
            components: {
                default: Vue.component('AdminComponent', require('./pages/Admin.vue').default),
                header: Vue.component('HeaderComponent', HeaderComponent),
                footer: Vue.component('FooterComponent', FooterComponent)
            },
            children: [
                {
                    path: '',
                    redirect: '/admin/users',
                    name: 'Admin Dashboard',
                    components: {
                        default: Vue.component('UsersComponent', require('./pages/Dashboard.vue').default),
                        header: Vue.component('HeaderComponent', HeaderComponent),
                        footer: Vue.component('FooterComponent', FooterComponent)
                    }
                },
                {
                    path: 'users',
                    components: {
                        default: Vue.component('UsersComponent', require('./pages/Users.vue').default),
                        header: Vue.component('HeaderComponent', HeaderComponent),
                        footer: Vue.component('FooterComponent', FooterComponent)
                    },
                    children: [
                        {
                            path: '',
                            name: 'Users',
                            component: Vue.component(
                                'BrowseUsers',
                                require('./components/users/BrowseUsers.vue').default
                            ),
                            beforeEnter: requireAuth,
                            meta: {
                                permitted: ['Super-admin'],
                                permittedToMakeChanges: ['Super-admin']
                            }
                        },
                        {
                            path: 'edit/:userId',
                            name: 'Edit User',
                            component: Vue.component(
                                'EditUser', 
                                require('./components/users/EditUser.vue').default
                            ),
                            beforeEnter: requireAuth,
                            meta: {
                                permitted: ['Super-admin']
                            }
                        },
                        {
                            path: 'add',
                            name: 'Add User',
                            component: Vue.component(
                                'AddUser', 
                                require('./components/users/AddUser.vue').default
                            ),
                            beforeEnter: requireAuth,
                            meta: {
                                permitted: ['Super-admin']
                            }
                        }
                    ]
                },
                {
                    path: 'config',
                    name: 'Config',
                    components: {
                        default: Vue.component('ConfigComponent', require('./pages/Config.vue').default),
                        header: Vue.component('HeaderComponent', HeaderComponent),
                        footer: Vue.component('FooterComponent', FooterComponent)
                    }
                }
            ]
        },
    ],
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { x: 0, y: 0 };
        }
    }
});

router.beforeEach((to, from, next) => {
    /*let cont = true;
    let onlyAdminPaths = [];
    let st = store;
    /**
     * make sure only admins are allowed to navigate to this route
     */
    
    /*if(onlyAdminPaths.length > 0 && (onlyAdminPaths.includes(to.name) || onlyAdminPaths.includes(to.meta.name)) && 
        st.getters.getSession.userCtx.roles.indexOf('_admin') === -1) {
        cont = false;
    }
    if(cont) {
        next();
    } else {
        next('/');
    }*/
    next();
});

export default router;