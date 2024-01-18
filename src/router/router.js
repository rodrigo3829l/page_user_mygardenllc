import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: {name: 'home-home'}
    },
    {
        path: '/home',
        name: 'home',
        component: () => import ( /* webpackChunkName: "HomeLayout" */ '@/modules/homeModules/layouts/HomeLayout.vue'),
        children: [
            {
                path: 'homeuser',
                name: 'home-home',
                component: () =>  import( /* webpackChunkName: "HomeUser" */ '@/modules/homeModules/pages/HomeUser.vue'),
            },
            {
                path: 'contact',
                name: 'home-contact',
                component: () => import( /* webpackChunkName: "ContactUser" */ '@/modules/homeModules/pages/ContacUser.vue'),
            },
            {
                path: 'answers',
                name: 'home-answers',
                component: () =>  import( /* webpackChunkName: "FreqAnswers" */ '@/modules/homeModules/pages/FreqAnswers.vue'),
            },
            {
                path: '',
                name: 'default-home',
                redirect: {name: 'home-home'},
            },

        ]
    },
    {
        path: '/proyects',
        name: 'proyects',
        component: () => import ( /* webpackChunkName: "Proyect Layout" */ '@/modules/passProjects/layout/ProjectsLayout.vue'),
        children: [
            {
                path: 'destacados',
                name: 'proyects-view',
                component: () =>  import( /* webpackChunkName: "ProjectDetacados" */ '@/modules/passProjects/pages/ProjectDestacados.vue'),
            },
            {
                path: 'info',
                name: 'proyects-info',
                component: () => import( /* webpackChunkName: "InfoProject" */ '@/modules/passProjects/pages/InfoProject.vue'),
            },
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import ( /* webpackChunkName: "LoginLayout" */ '@/modules/login/layouts/LoginLayout.vue'),
        children: [
            {
                path: 'loginuser',
                name: 'login-login',
                component: () => import ( /* webpackChunkName: "LoginUser" */ '@/modules/login/pages/LoginUser.vue'),
            },
            {
                path: 'confirm',
                name: 'login-confirm',
                component: () => import ( /* webpackChunkName: "ConfirmPassword" */ '@/modules/login/pages/ConfirmPassword.vue'),
            },
            // {
            //     path: 'location',
            //     name: 'login-location',
            //     component: () => import ( /* webpackChunkName: "LocationData" */ '@/modules/login/pages/LocationData.vue'),
            // },
            // {
            //     path: 'personal',
            //     name: 'login-personal',
            //     component: () => import ( /* webpackChunkName: "PersonalData" */ '@/modules/login/pages/PersonalData.vue'),
            // },
            {
                path: 'mail',
                name: 'login-mail',
                component: () => import ( /* webpackChunkName: "SendMail" */ '@/modules/login/pages/SendMail.vue'),
            },
            // {
            //     path: 'userdata',
            //     name: 'login-userdata',
            //     component: () => import ( /* webpackChunkName: "UserData" */ '@/modules/login/pages/UserData.vue'),
            // },
            {
                path: 'optconfirm',
                name: 'login-optconfirm',
                component: () => import ( /* webpackChunkName: "UserData" */ '@/modules/login/pages/OPTInput.vue'),
            },
            {
                path: 'reistration',
                name: 'login-reistration',
                component: () => import ( /* webpackChunkName: "UserData" */ '@/modules/login/pages/StepperRegistration.vue'),
            },
            {
                path: '',
                name: 'default-login',
                redirect: {name: 'login-login'}
            },

        ]
    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import ( /* webpackChunkName: "ProfileLayout" */ '@/modules/profile/layouts/ProfileLayout.vue'),
        children: [
            {
                path: 'editprofile',
                name: 'profile-edit',
                component: () => import ( /* webpackChunkName: "EditProfile" */ '@/modules/profile/pages/EditProfile.vue'),
            },
            {
                path: 'pay',
                name: 'profile-pay',
                component: () => import ( /* webpackChunkName: "PayPage" */ '@/modules/profile/pages/PayPage.vue'),
            },
            {
                path: 'profilepage',
                name: 'profile-profile',
                component: () => import ( /* webpackChunkName: "ProfilePages" */ '@/modules/profile/pages/ProfilePage.vue')
            },
            {
                path: '',
                name: 'default-profile',
                redirect: {name: 'profile-profile'}
            },

        ]
    },
    {
        path: '/services',
        name: 'services',
        component: () => import ( /* webpackChunkName: "ServicesLayout" */ '@/modules/services/layouts/ServicesLayout.vue'),
        children: [
            {
                path: 'servicespage',
                name: 'services-services',
                component: () => import ( /* webpackChunkName: "ServicesWindow" */ '@/modules/services/pages/ServicesWindow.vue'),
            },
            {
                path: 'schedule',
                name: 'services-Schedule',
                component: () => import ( /* webpackChunkName: "ScheduleService" */ '@/modules/services/pages/ScheduleService.vue'),
                
            },
            {
                path: '',
                name: 'default-services',
                redirect: {name: 'services-services'}
            },
        ]
    },
    { 
        path: '/:pathMatch(.*)*', 
        component: () => import(/* webpackChunkName: "NoPageFound" */ '@/modules/shared/pages/NotFoundPage.vue'),
    },
    {
        path: '/cookies',
        name: 'cookies',
        component: () => import ( /* webpackChunkName: "cookiesPage" */ '@/modules/shared/pages/cookiesPage.vue'),
    },
    {
        path: '/privacity',
        name: 'privacity',
        component: () => import ( /* webpackChunkName: "cookiesPage" */ '@/modules/shared/pages/privacityPage.vue'),
    },
    {
        path: '/terms',
        name: 'terms',
        component: () => import ( /* webpackChunkName: "termsPage" */ '@/modules/shared/pages/termsPage.vue'),
    },
    {
        path: '/bina',
        name: 'bina',
        component: () => import ( /* webpackChunkName: "bina datos" */ '@/modules/shared/pages/binaData.vue'),
    },
    {
        path: '/accesibility',
        name: 'accesibility',
        component: () => import ( /* webpackChunkName: "accesibility" */ '@/modules/accesibility/pages/navegationPage.vue'),
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router