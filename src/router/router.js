import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/store/store';

const routes = [
    {
        path: '/',
        meta: {
            title: 'No se',
        },
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
                meta: {
                    title: 'Home',
                },
                component: () =>  import( /* webpackChunkName: "HomeUser" */ '@/modules/homeModules/pages/HomeUser.vue'),
            },
            {
                path: 'contact',
                name: 'home-contact',
                meta: {
                    title: 'Contact',
                },
                component: () => import( /* webpackChunkName: "ContactUser" */ '@/modules/homeModules/pages/ContacUser.vue'),
            },
            {
                path: 'answers',
                name: 'home-answers',
                meta: {
                    title: 'Answers',
                },
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
                meta: {
                    title: 'Featured projects',
                },
                component: () =>  import( /* webpackChunkName: "ProjectDetacados" */ '@/modules/passProjects/pages/ProjectDestacados.vue'),
            },
            {
                path: '/categorie/:category',
                name: 'categorie-view',
                meta: {
                    title: 'categorie-vie',
                },
                component: () =>  import( /* webpackChunkName: "ProjectDetacados" */ '@/modules/passProjects/pages/projectCategorie.vue'),
            },
            {
                path: 'info',
                name: 'proyects-info',
                meta: {
                    title: 'Project information',
                },
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
                meta: {
                    title: 'Login',
                },
                component: () => import ( /* webpackChunkName: "LoginUser" */ '@/modules/login/pages/LoginUser.vue'),
            },
            {
                path: 'confirm',
                name: 'login-confirm',
                meta: {
                    title: 'Confirm Password',
                },
                component: () => import ( /* webpackChunkName: "ConfirmPassword" */ '@/modules/login/pages/ConfirmPassword.vue'),
            },
            {
                path: 'mail',
                name: 'login-mail',
                meta: {
                    title: 'Send email',
                },
                component: () => import ( /* webpackChunkName: "SendMail" */ '@/modules/login/pages/SendMail.vue'),
            },
            {
                path: 'phone',
                name: 'login-phone',
                meta: {
                    title: 'Send phone',
                },
                component: () => import ( /* webpackChunkName: "SendMail" */ '@/modules/login/pages/SendPhoneCode.vue'),
            },
            {
                path: 'optconfirm',
                name: 'login-optconfirm',
                meta: {
                    title: 'Otp code',
                },
                component: () => import ( /* webpackChunkName: "UserData" */ '@/modules/login/pages/OPTinput.vue'),
            },
            {
                path: 'reistration',
                name: 'login-reistration',
                meta: {
                    title: 'Registration',
                },
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
        meta:{
            requireAuth: true
        },
        component: () => import ( /* webpackChunkName: "ProfileLayout" */ '@/modules/profile/layouts/ProfileLayout.vue'),
        children: [
            {
                path: 'editprofile',
                name: 'profile-edit',
                meta: {
                    title: 'Edit profile',
                },
                component: () => import ( /* webpackChunkName: "EditProfile" */ '@/modules/profile/pages/EditProfile.vue'),
            },
            {
                path: 'myservices',
                name: 'profile-myservices',
                component: () => import ( /* webpackChunkName: "EditProfile" */ '@/modules/profile/pages/MyServices.vue'),
            },
            {
                path: 'infomyservices/:id',
                name: 'profile-infomyservices',
                component: () => import ( /* webpackChunkName: "EditProfile" */ '@/modules/profile/pages/InfoMyService.vue'),
            },
            {
                path: 'pay',
                name: 'profile-pay',
                meta: {
                    title: 'Pay service',
                },
                component: () => import ( /* webpackChunkName: "PayPage" */ '@/modules/profile/pages/PayPage.vue'),
            },
            {
                path: 'profilepage',
                name: 'profile-profile',
                meta: {
                    title: 'Profile',
                },
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
                meta: {
                    title: 'Services',
                },
                component: () => import ( /* webpackChunkName: "ServicesWindow" */ '@/modules/services/pages/ServicesWindow.vue'),
            },
            {
                path: 'schedule/:id',
                name: 'services-Schedule',
                meta: {
                    title: 'Services information',
                    requireAuth: true
                },
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
        path: '/badRequest',
        name: 'badRequest',
        meta: {
            title: 'badRequest',
        },
        component: () => import ( /* webpackChunkName: "cookiesPage" */ '@/modules/shared/pages/BadRequestView.vue'),
    },
    {
        path: '/forbidden',
        name: 'forbidden',
        meta: {
            title: 'forbidden',
        },
        component: () => import ( /* webpackChunkName: "cookiesPage" */ '@/modules/shared/pages/ForbiddenView.vue'),
    },
    {
        path: '/serverError',
        name: 'serverError',
        meta: {
            title: 'serverError',
        },
        component: () => import ( /* webpackChunkName: "cookiesPage" */ '@/modules/shared/pages/ServerErrorView.vue'),
    },
    {
        path: '/privacity',
        name: 'privacity',
        meta: {
            title: 'Privacity',
        },
        component: () => import ( /* webpackChunkName: "cookiesPage" */ '@/modules/shared/pages/privacityPage.vue'),
    },
    {
        path: '/terms',
        name: 'terms',
        meta: {
            title: 'Terms and conditions',
        },
        component: () => import ( /* webpackChunkName: "termsPage" */ '@/modules/shared/pages/termsPage.vue'),
    },
    {
        path: '/bina',
        name: 'bina',
        meta: {
            title: 'Bina',
        },
        component: () => import ( /* webpackChunkName: "bina datos" */ '@/modules/shared/pages/binaData.vue'),
    },

    {
        path: '/successverified',
        name: 'successverified',
        meta: {
            title: 'successverified',
        },
        component: () => import ( /* webpackChunkName: "bina datos" */ '@/modules/shared/pages/verifiedView.vue'),
    },

    {
        path: '/resendemail',
        name: 'resendemail',
        meta: {
            title: 'resendemail',
        },
        component: () => import ( /* webpackChunkName: "bina datos" */ '@/modules/shared/pages/resendCorrect.vue'),
    },

    {
        path: '/notverified',
        name: 'notverified',
        meta: {
            title: 'notverified',
        },
        component: () => import ( /* webpackChunkName: "bina datos" */ '@/modules/shared/pages/notVerifiedView.vue'),
    },

    {
        path: '/recover',
        name: 'recover',
        meta: {
            title: 'recover',
        },
        component: () => import ( /* webpackChunkName: "bina datos" */ '@/modules/shared/pages/recoverCount.vue'),
    },
    
    
    {
        path: '/accesibility',
        name: 'accesibility',
        meta: {
            title: 'accesibility',
        },
        component: () => import ( /* webpackChunkName: "accesibility" */ '@/modules/accesibility/pages/navegationPage.vue'),
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.afterEach(() => {
    window.scrollTo(0, 0);
});

router.beforeEach( async (to, from, next) =>{

    const userStore = useUserStore();

    const auth = userStore.token !== null;
    const needAuth = to.meta.requireAuth;

    if(needAuth && !auth){
        next('forbidden')
    } else{
        next()
    }
})
export default router