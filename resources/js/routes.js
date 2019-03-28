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
            path: '/blog',
            components: {
                default: Vue.component('BlogComponent', require('./pages/Post.vue').default),
                header: Vue.component('HeaderComponent', HeaderComponent),
                footer: Vue.component('FooterComponent', FooterComponent)
            },
            children: [
                {
                    path: '',
                    name: 'Blog',
                    component: Vue.component('BrowsePosts', require('./components/post/Browse.vue').default)
                },
                {
                    path: 'edit/:postId',
                    name: 'Edit Post',
                    component: Vue.component(
                        'EditPost', 
                        require('./components/post/Update.vue').default
                    ),
                    beforeEnter: requireAuth,
                    meta: {
                        permitted: ['Super-admin', 'Admin']
                    }
                },
                {
                    path: 'view/:postId',
                    name: 'View Post',
                    component: Vue.component(
                        'ViewPost',
                        require('./components/post/View.vue').default
                    )
                },
                {
                    path: 'add',
                    name: 'Add Post',
                    component: Vue.component(
                        'AddPost', 
                        require('./components/post/Add.vue').default
                    ),
                    beforeEnter: requireAuth,
                    meta: {
                        permitted: ['Super-admin','Admin']
                    }
                }
            ]
        },
        {
            path: '/investigation',
            components: {
                default: Vue.component('InvestigationComponent', require('./pages/Investigation.vue').default),
                header: Vue.component('HeaderComponent', HeaderComponent),
                footer: Vue.component('FooterComponent', FooterComponent)
            },
            children: [
                {
                    path: '',
                    name: 'Investigation',
                    component: Vue.component('BrowseInvestigations', require('./components/investigation/Browse.vue').default)
                },
                {
                    path: 'edit/:investigationId',
                    name: 'Edit Investigation',
                    component: Vue.component(
                        'EditInvestigation', 
                        require('./components/investigation/Update.vue').default
                    ),
                    beforeEnter: requireAuth,
                    meta: {
                        permitted: ['Super-admin', 'Admin']
                    }
                },
                {
                    path: 'view/:investigationId',
                    name: 'View Investigation',
                    component: Vue.component(
                        'ViewInvestigation',
                        require('./components/investigation/View.vue').default
                    )
                },
                {
                    path: 'add',
                    name: 'Add Investigation',
                    component: Vue.component(
                        'AddInvestigation', 
                        require('./components/investigation/Add.vue').default
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