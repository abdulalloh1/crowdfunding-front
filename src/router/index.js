import {createRouter, createWebHistory, RouterView} from 'vue-router'
import {i18n} from "../i18n";
import Home from '../views/Home.vue'

import Dashboard from "../views/Dashboard";
import UserProjects from "../views/Dashboard/UserProjects";
import UserProjectsForRefund from "../views/Dashboard/UserProjectsForRefund";
import Investments from "../views/Dashboard/Investments";
import Donations from "../views/Dashboard/Donations";
import Favorites from "../views/Dashboard/Favorites";
import Profile from "../views/Dashboard/Profile";

import SignUp from "../views/Auth/SignUp";
import SignIn from "../views/Auth/SignIn";
import ForgotPassword from "../views/Auth/ForgotPassword";

import ProjectIndex from "../views/Projects/ProjectIndex";
import ProjectSingle from "../views/Projects/ProjectSingle";
import ProjectCreate from "../views/Projects/ProjectCreate";
import ProjectEdit from "../views/Projects/ProjectEdit";

import About from "../views/About";
import Contacts from "../views/Contacts";
import Security from "../views/Dashboard/Security";

import ServiceRules from "../views/ServiceRules";
import UserAgreement from "../views/UserAgreement";
import PPDAgreement from "../views/PPDAgreement";
import NotificationSettings from "../views/Dashboard/NotificationSettings";

import Admin from "../views/Admin/Admin";
import UserIndex from "../views/Admin/Users/UserIndex";
import UserSingle from "../views/Admin/Users/UserSingle";
import AdminProjectIndex from "../views/Admin/Projects/AdminProjectIndex";
import AdminProjectSingle from "../views/Admin/Projects/AdminProjectSingle";

import CategoryIndex from "../views/Admin/Categories/CategoryIndex";
import CategoryCreate from "../views/Admin/Categories/CategoryCreate";

import FaqIndex from "../views/Admin/Faqs/FaqIndex";
import FaqSingle from "../views/Admin/Faqs/FaqSingle";
import FaqCreate from "../views/Admin/Faqs/FaqCreate";
import CategorySingle from "../views/Admin/Categories/CategorySingle";
import UserWithRequestToSubmittedStatusIndex from "../views/Admin/Users/UserWithRequestToSubmittedStatusIndex";
import FaQ from "../views/FaQ";
import AdminProjectOnModerationIndex from "../views/Admin/Projects/AdminProjectOnModerationIndex";
import AdminProjectNewIndex from "../views/Admin/Projects/AdminProjectNewIndex";

import Page404 from "../views/Page404";

const {t} = i18n.global;

const routes = [
    {
        path: '',
        redirect: localStorage.getItem('lang')
    },
    {
        path: `/:lang`,
        component: RouterView,
        children: [
            {
                path: '',
                name: "Home",
                component: Home,
                meta: {
                    title: t('nav.home')
                }
            },
            {
                path: 'projects',
                name: 'Project Index',
                component: ProjectIndex,
                meta: {
                    title: t('nav.projects')
                }
            },

            {
                path: 'projects/:projectID',
                name: 'Project Single',
                component: ProjectSingle,
                meta: {
                    title: t('common.project')
                }
            },
            {
                path: 'projects/:projectID/edit',
                name: 'Project Edit',
                component: ProjectEdit,
                meta: {
                    title: t('title.editProject')
                }
            },
            {
                path: 'projects/create',
                name: 'Project Create',
                component: ProjectCreate,
                meta: {
                    title: t('button.createProject')
                }
            },
            {
                path: 'faq',
                name: 'Faq',
                component: FaQ,
                meta: {
                    title: t('nav.faq')
                }
            },
            {
                path: 'service-rules',
                name: 'Service Rules',
                component: ServiceRules,
                meta: {
                    title: t('nav.serviceRules')
                }
            },
            {
                path: 'about',
                name: 'About',
                component: About,
                meta: {
                    title: t('nav.about')
                }
            },
            {
                path: 'contacts',
                name: 'Contacts',
                component: Contacts,
                meta: {
                    title: t('nav.contacts')
                }
            },
            {
                meta: {
                    requiresAuth: true
                },
                path: 'dashboard',
                name: 'Dashboard',
                component: Dashboard,
                children: [
                    {
                        path: 'profile',
                        name: 'Dashboard Profile',
                        component: Profile,
                        meta: {
                            title: t('nav.profile')
                        }
                    },
                    {
                        path: 'projects',
                        name: 'Dashboard Projects',
                        component: UserProjects,
                        meta: {
                            title: t('nav.myProjects')
                        }
                    },
                    {
                        path: 'projects-for-refund',
                        name: 'Dashboard Projects For Refund',
                        component: UserProjectsForRefund,
                        meta: {
                            title: t('nav.myProjectsForRefund')
                        }
                    },
                    {
                        path: 'investments',
                        name: 'Dashboard Investments',
                        component: Investments,
                        meta: {
                            title: t('nav.myInvestments')
                        }
                    },
                    {
                        path: 'donations',
                        name: 'Dashboard Donations',
                        component: Donations,
                        meta: {
                            title: t('nav.donations')
                        }
                    },
                    {
                        path: 'favorites',
                        name: 'Dashboard Favorites',
                        component: Favorites,
                        meta: {
                            title: t('nav.favorites')
                        }
                    },
                    {
                        path: 'security',
                        name: 'Dashboard Security',
                        component: Security,
                        meta: {
                            title: t('nav.security')
                        }
                    },
                    {
                        path: 'notification-settings',
                        name: 'Dashboard Notification Settings',
                        component: NotificationSettings,
                        meta: {
                            title: t('nav.notificationSettings')
                        }
                    },
                ]
            },
            {
                path: 'sign-up',
                name: 'Sign Up',
                component: SignUp,
                meta: {
                    title: t('sign.up'),
                    hideForAuth: true
                }
            },
            {
                path: 'sign-in',
                name: 'Sign In',
                component: SignIn,
                meta: {
                    title: t('sign.in'),
                    hideForAuth: true
                }
            },
            {
                path: 'recovery',
                name: 'Password Recovery',
                component: ForgotPassword,
                meta: {
                    title: t('title.recoveryPassword.title'),
                    hideForAuth: true
                }
            },
            {
                path: 'user-agreement',
                name: 'User Agreement',
                component: UserAgreement,
                meta: {
                    title: t('agreement.user')
                }
            },
            {
                path: 'ppd-agreement',
                name: 'Agreement on the Processing of Personal Date',
                component: PPDAgreement,
                meta: {
                    title: t('agreement.ppd')
                }
            },
            {
                path: 'admin',
                name: 'Admin',
                component: Admin,
                meta: {
                    title: 'Admin'
                },
                children: [
                    {
                        path: 'categories',
                        name: 'Admin Category Index',
                        component: CategoryIndex,
                        meta: {
                            title: 'common.categories'
                        }
                    },
                    {
                        path: 'categories/create',
                        name: 'Admin Category Create',
                        component: CategoryCreate,
                        meta: {
                            title: 'title.createNewCategory'
                        }
                    },
                    {
                        path: 'categories/:categoryID',
                        name: 'Admin Category Single',
                        component: CategorySingle,
                        meta: {
                            title: 'common.category'
                        }
                    },
                    {
                        path: 'faqs',
                        name: 'Admin FaQ Index',
                        component: FaqIndex,
                        meta: {
                            title: 'nav.faq'
                        }
                    },
                    {
                        path: 'faqs/create',
                        name: 'Admin FaQ Create',
                        component: FaqCreate,
                        meta: {
                            title: t('title.createNewFaq')
                        }
                    },
                    {
                        path: 'faqs/:faqID',
                        name: 'Admin FaQ Single',
                        component: FaqSingle,
                        meta: {
                            title: t('nav.faq')
                        }
                    },
                    {
                        path: 'users',
                        name: 'Admin User Index',
                        component: UserIndex,
                        meta: {
                            title: t('common.users')
                        }
                    },
                    {
                        path: 'users/:userID',
                        name: 'Admin User Single',
                        component: UserSingle,
                        meta: {
                            title: t('common.user')
                        }
                    },
                    {
                        path: 'users/new',
                        name: 'Admin User RequestsToAccreditation Index',
                        component: UserWithRequestToSubmittedStatusIndex,
                        meta: {
                            title: t('common.requestToSubmittedStatusIndex')
                        }
                    },


                    {
                        path: 'projects',
                        name: 'Admin Project Index',
                        component: AdminProjectIndex,
                        meta: {
                            title: t('nav.projects')
                        }
                    },
                    {
                        path: 'projects/new',
                        name: 'Admin Project New Index',
                        component: AdminProjectNewIndex,
                        meta: {
                            title: t('title.newProjects')
                        }
                    },
                    {
                        path: 'projects/on-moderation',
                        name: 'Admin Project OnModeration Index',
                        component: AdminProjectOnModerationIndex,
                        meta: {
                            title: t('common.moderation')
                        }
                    },
                    {
                        path: 'projects/:projectID',
                        name: 'Admin Project Single',
                        component: AdminProjectSingle,
                        meta: {
                            title: t('common.project')
                        }
                    }
                ]
            },
            {
                path: '404',
                name: 'Page not found',
                component: Page404
            }
        ]
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(import.meta.env.BASE_URL),
})

export default router
