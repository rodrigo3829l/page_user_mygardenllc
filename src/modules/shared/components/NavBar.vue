<template>
<nav class="navbar navbar-expand-lg navbar-light bg-green-darken-3 navbar-transition" clipped-left>
    <v-container fluid>
        <v-row align="center" justify="space-between">
            <!-- Primera Columna: Logo -->
            <v-col cols="auto" class="ml-2">
                <router-link to="/" class="navbar-brand">
                    <img src="https://res.cloudinary.com/dui4i9f4e/image/upload/v1709677547/logos/jb7aaqsuesjivzmiz5mg.png" alt="Logo" class="logo" />
                </router-link>
            </v-col>

            <!-- Segunda Columna: Nombre de la Empresa y Subtítulo -->
            <v-col cols="auto" class="d-flex flex-column ml-2 mr-auto company-info">
                <span class="company-name">My Garden LLC</span>
                <span class="subtitle d-none d-sm-block">Landscaping services and more.</span>
            </v-col>

            <!-- Tercera Columna: Enlaces de Navegación -->
            <v-col class="d-none d-md-flex justify-center" cols="auto">
                <div class="navbar-collapse">
                    <ul class="navbar-nav">
                        <router-link v-for="link in links" :key="link.to" :to="{ name: link.to }" class="nav-link" :class="{ 'is-active': $route.name === link.to }">
                            {{ link.name }}
                        </router-link>
                        <router-link v-if="userStore.token === null" :to="{ name: 'login-login' }" class="nav-link">
                            Login
                        </router-link>
                        <router-link v-if="userStore.token !== null" :to="{ name: 'recomendations' }" class="nav-link is-active">
                                Recomendations
                        </router-link>
                    </ul>
                </div>
            </v-col>

            <!-- Cuarta Columna: Idioma, Tema y Menú del Usuario -->
            <v-col cols="auto" class="d-none d-md-flex justify-end align-center">
                <!-- Icono para cambiar idioma -->
                <v-btn icon variant="text" @click="changeLanguage('en')" v-if="this.$i18n.locale === 'es'" class="mx-1">
                    <v-img src="https://flagcdn.com/16x12/us.webp" alt="USA" width="16" height="12"></v-img>
                </v-btn>
                <v-btn icon variant="text" @click="changeLanguage('es')" v-if="this.$i18n.locale === 'en'" class="mx-1">
                    <v-img src="https://flagcdn.com/16x12/mx.webp" alt="Mexico" width="16" height="12"></v-img>
                </v-btn>

                <!-- Icono para cambiar el tema -->
                <v-btn icon variant="text" @click="toggleTheme">
                    <v-icon v-if="theme.global.name.value === 'light'">mdi-moon-waning-crescent</v-icon>
                    <v-icon v-if="theme.global.name.value === 'dark'">mdi-white-balance-sunny</v-icon>
                </v-btn>

                <!-- Menú del usuario -->
                <v-menu v-if="userStore.token" min-width="200px" rounded>
                    <template v-slot:activator="{ props }">
                        <v-btn icon v-bind="props">
                            <v-avatar color="light-blue-darken-4" size="large">
                                <v-img :src="userStore.image || 'https://cdn.vuetifyjs.com/images/john.jpg'" />
                            </v-avatar>
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-text>
                            <div class="mx-auto text-center">
                                <v-avatar color="light-blue-darken-4">
                                    <v-img :src="userStore.image || 'https://cdn.vuetifyjs.com/images/john.jpg'" />
                                </v-avatar>
                                <h3>{{ userStore.name }}</h3>
                                <p class="text-caption mt-1">
                                    {{ userStore.email }}
                                </p>
                                <v-divider class="my-3"></v-divider>
                                <v-btn rounded variant="text" @click="profile">Your Account</v-btn>
                                <v-divider class="my-3"></v-divider>
                                <v-btn rounded variant="text" @click="services">Your Services</v-btn>
                                <v-divider class="my-3"></v-divider>
                                <v-btn rounded variant="text" @click="logout" color="red">Logout</v-btn>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-menu>
            </v-col>

            <!-- Icono de menú para pantallas pequeñas -->
            <v-col cols="auto" class="d-md-none mr-2">
                <v-btn icon variant="text" @click="drawer = !drawer">
                    <v-icon>mdi-menu</v-icon>
                </v-btn>
            </v-col>
        </v-row>
    </v-container>

    <!-- Drawer para navegación en pantallas pequeñas -->
    <v-navigation-drawer v-model="drawer" temporary right>
        <template v-if="userStore.token">
            <v-list-item :prepend-avatar="userStore.image || 'https://cdn.vuetifyjs.com/images/john.jpg'" :title="userStore.name" :subtitle="userStore.email"></v-list-item>
        </template>
        <template v-else>
            <v-container>
                <v-row>
                    <v-col cols="10" class="d-flex align-center">
                        <v-icon color="green-darken-3" left class="mr-2">mdi-human-greeting</v-icon>
                        <span>Welcome to My Garden</span>
                    </v-col>
                    <v-col cols="2" class="d-flex justify-end">
                        <v-btn variant="text" icon @click="drawer = false">
                            <v-icon color="red-darken-3">mdi-close</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>

            </v-container>
        </template>

        <v-divider></v-divider>

        <v-list-item v-for="(link, index) in links" :key="index" :title="link.name" @click="$router.push({ name: link.to })" :value="link.to">
            <template v-slot:prepend>
                <v-icon color="green-darken-3">{{ link.icon }}</v-icon>
            </template>
        </v-list-item>

        <!-- <v-list-item v-if="!userStore.token" @click="$router.push({ name: 'login-login' })" prepend-icon="mdi-login" :title="$t('navbar.loginString')"></v-list-item> -->

        <div v-if="userStore.token">
            <v-list-item @click="$router.push({ name: 'profile-profile' })" :title="$t('navbar.yourAccountString')">
                <template v-slot:prepend>
                    <v-icon color="green-darken-3">mdi-account</v-icon>
                </template>
            </v-list-item>

            <v-list-item @click="$router.push({ name: 'profile-myservices' })" :title="$t('navbar.yourServices')">
                <template v-slot:prepend>
                    <v-icon color="green-darken-3">mdi-cogs</v-icon>
                </template>
            </v-list-item>

        </div>

        <v-list-item v-if="theme.global.name.value === 'dark'" @click="toggleTheme" title="Light">
            <template v-slot:prepend>
                <v-icon color="green-darken-3">mdi-white-balance-sunny</v-icon>
            </template>
        </v-list-item>

        <v-list-item v-if="theme.global.name.value === 'light'" @click="toggleTheme" title="Dark">
            <template v-slot:prepend>
                <v-icon color="green-darken-3">mdi-weather-night</v-icon>
            </template>
        </v-list-item>

        <v-list-item v-if="this.$i18n.locale === 'en'" @click="changeLanguage('es')" title="Español">
            <template v-slot:prepend>
                <v-icon color="green-darken-3">mdi-translate</v-icon>
            </template>
        </v-list-item>

        <v-list-item v-if="this.$i18n.locale === 'es'" @click="changeLanguage('en')" title="Inglish">
            <template v-slot:prepend>
                <v-icon color="green-darken-3">mdi-translate</v-icon>
            </template>
        </v-list-item>

        <template v-slot:append v-if="userStore.token">
            <div class="pa-2">
                <v-btn color="red-darken-3" block @click="logout">
                    {{ $t('navbar.logoutString') }}
                </v-btn>
            </div>
        </template>
        <template v-slot:append v-else>
            <div class="pa-2">
                <v-btn color="green-darken-3" block @click="$router.push({ name: 'login-login' })">
                    {{ $t('navbar.loginString') }}
                </v-btn>
            </div>
        </template>
    </v-navigation-drawer>

</nav>
</template>

<script>
import {
    useUserStore
} from '@/store/store';
import {
    setLanguage
} from '@/store/languajeStore';
import {
    useDisplay
} from 'vuetify';
import {
    useTheme
} from 'vuetify';

const userStore = useUserStore();

export default {
    setup() {
        const {
            width
        } = useDisplay();
        const theme = useTheme();

        const toggleTheme = () => {
            theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
        };

        const navigate = (route) => {
            this.$router.push({
                name: route
            });
            this.drawer = false;
        };

        return {
            theme,
            toggleTheme,
            width,
            userStore,
            navigate,

        };
    },

    data() {
        return {
            links: [{
                    name: 'Home',
                    to: 'home-home',
                    icon: 'mdi-home'
                },
                {
                    name: 'Services',
                    to: 'services-services',
                    icon: 'mdi-hammer-screwdriver'
                },
                {
                    name: 'Projects',
                    to: 'proyects-view',
                    icon: 'mdi-briefcase'
                },
                {
                    name: 'Contact',
                    to: 'home-contact',
                    icon: 'mdi-email'
                },
                {
                    name: 'FAQS',
                    to: 'home-answers',
                    icon: 'mdi-help-circle'
                },
            ],
            drawer: true,
        };
    },

    methods: {
        profile() {
            this.$router.push({
                name: 'profile-profile'
            });
        },
        services() {
            this.$router.push({
                name: 'profile-myservices'
            });
        },
        logout() {
            userStore.logout();
            this.$router.push('/');
        },
        changeLanguage(lang) {
            this.$i18n.locale = lang;
            setLanguage(lang);
        },
    },
};
</script>

<style scoped>
.logo {
    width: 120px;
    margin-left: 8px;
}

.company-info {
    display: flex;
    flex-direction: column;
}

@media (max-width: 420px) {
    .company-info {
        display: none !important;
    }
}

.company-name {
    font-weight: bold;
    font-size: 18px;
    margin: 0;
}

.subtitle {
    font-size: 14px;
}

.navbar-transition {
    position: sticky;
    top: 0;
    z-index: 1000;
    transition: opacity 0.5s;
}

.nav-link {
    padding: 0.5rem 1rem;
    color: #ffffff;
}

.is-active {
    color: #f5f5f5;
}

.d-flex {
    display: flex;
}

.justify-center {
    justify-content: center;
}

.justify-end {
    justify-content: flex-end;
}

.ml-2 {
    margin-left: 0.5rem;
}

.mr-2 {
    margin-right: 0.5rem;
}
</style>
