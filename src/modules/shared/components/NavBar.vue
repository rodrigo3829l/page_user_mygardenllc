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
<v-dialog v-model="surveyDialog" max-width="600px">
    <v-card>
        <v-card-title class="text-h5 font-weight-bold">Customer Satisfaction Survey</v-card-title>

        <!-- Subtítulo ajustado -->
        <v-card-text>
            We noticed you recently completed a service. Please answer the following survey to help us improve.
        </v-card-text>

        <!-- Preguntas de la encuesta -->
        <v-card-item>
            <p>How easy was it to use our website to find and book a service?</p>
            <v-radio-group v-model="survey.q1" row>
                <v-radio label="1 - Very Difficult" value="1"></v-radio>
                <v-radio label="2 - Somewhat Difficult" value="2"></v-radio>
                <v-radio label="3 - Regular" value="3"></v-radio>
                <v-radio label="4 - Somewhat Easy" value="4"></v-radio>
                <v-radio label="5 - Very Easy" value="5"></v-radio>
            </v-radio-group>

            <p>Was it easy to see your service information and the personalized prices?</p>
            <v-radio-group v-model="survey.q2" row>
                <v-radio label="1 - Very Difficult" value="1"></v-radio>
                <v-radio label="2 - Somewhat Difficult" value="2"></v-radio>
                <v-radio label="3 - Regular" value="3"></v-radio>
                <v-radio label="4 - Somewhat Easy" value="4"></v-radio>
                <v-radio label="5 - Very Easy" value="5"></v-radio>
            </v-radio-group>

            <p>How satisfied are you with the notifications and updates about your services?</p>
            <v-radio-group v-model="survey.q3" row>
                <v-radio label="1 - Very Dissatisfied" value="1"></v-radio>
                <v-radio label="2 - Dissatisfied" value="2"></v-radio>
                <v-radio label="3 - Regular" value="3"></v-radio>
                <v-radio label="4 - Satisfied" value="4"></v-radio>
                <v-radio label="5 - Very Satisfied" value="5"></v-radio>
            </v-radio-group>
        </v-card-item>

        <!-- Acciones con los botones alineados -->
        <v-card-actions>
            <v-btn text @click="closeSurvey" color="red darken-1">Close</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="green darken-3" @click="submitSurvey">Submit</v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>
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
import {
    api
} from '@/axios/axios';
import {
    toast
} from 'vue3-toastify';
const userStore = useUserStore();
import axios from 'axios';

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
        // const userStore = useUserStore();

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
            surveyDialog: false, // Controla la visualización de la encuesta
            drawer: true,
            urveyDialog: false, // Controla la visualización de la encuesta
            survey: {
                q1: null, // Pregunta 1
                q2: null, // Pregunta 2
                q3: null // Pregunta 3
            },
            surveyInterval: null, // Intervalo para controlar la ejecución periódica
        };
    },
    mounted() {
        // Iniciar el intervalo de verificación cada 20 segundos
        this.startSurveyInterval();
        this.requestNotificationPermission();
        // this.surveyInterval = setInterval(this.checkSurveyEligibility, 20000); // 20 segundos
    },
    beforeUnmount() {
        // Limpiar el intervalo cuando el componente se desmonte
        clearInterval(this.surveyInterval);

    },
    methods: {
        requestNotificationPermission() {
            if (!("Notification" in window)) {
                console.log("Este navegador no soporta notificaciones.");
                return;
            }

            // Verificar el estado del permiso
            if (Notification.permission === "granted") {
                console.log("El permiso de notificación ya ha sido concedido.");
                // this.showNotification("¡Gracias por habilitar las notificaciones!");

            } else if (Notification.permission !== "denied") {
                // Si no ha sido denegado, solicitar el permiso
                Notification.requestPermission().then((permission) => {
                    if (permission === "granted") {
                        this.showNotification("¡Gracias por habilitar las notificaciones!");
                    } else {
                        console.log("Permiso de notificación rechazado.");
                        // Si el usuario rechaza, intentamos solicitarlo nuevamente después de 5 minutos
                        setTimeout(this.requestNotificationPermission, 3000); // 5 minutos
                    }
                });
            } else {
                // Si el permiso fue denegado previamente, solicitarlo de nuevo periódicamente
                console.log("Permiso de notificación previamente denegado.");
                setTimeout(this.requestNotificationPermission, 3000); // 5 minutos
            }
        },
        // Método para mostrar notificación
        showNotification(message) {
            if (Notification.permission === "granted") {
                new Notification("Notificación importante", {
                body: message,
                icon: "https://res.cloudinary.com/dui4i9f4e/image/upload/v1709677547/logos/jb7aaqsuesjivzmiz5mg.png",
                requireInteraction: true, // Para mantener la notificación en pantalla
                silent: false // Asegúrate de que no esté en modo silencioso
                });
            } else {
                console.log("No se pueden mostrar notificaciones, el permiso no ha sido concedido.");
            }
        },


        startSurveyInterval() {
            this.surveyInterval = setInterval(this.checkSurveyEligibility, 20000);
        },
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
        async checkSurveyEligibility() {
            const token = localStorage.getItem('token');
            const role = 'client';

            if (!token) {
                console.log("no hay token")
                return
            } // Si no hay token, no se muestra la encuesta

            try {
                // Verificar si el usuario tiene algún servicio finalizado
                const {
                    data: serviceData
                } = await api({
                    method: 'GET',
                    url: '/schedule/userservicesbystatus/finish',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        rol: role
                    }
                });

                if (!serviceData.success || serviceData.services.length === 0 || serviceData.services.some(service => service.pending !== 0)) {
                    console.log("nno mostrar")
                    return; // No mostrar la encuesta si no hay servicios o si algún servicio tiene pagos pendientes
                }

                // Verificar si el usuario ya ha contestado una encuesta
                const {
                    data: satisfactionData
                } = await api({
                    method: 'GET',
                    url: '/satisfaction/user',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        rol: role
                    }
                });

                if (!satisfactionData.success) {
                    console.log("si mostrar")
                    // Mostrar la encuesta si el usuario no la ha contestado
                    this.surveyDialog = true;
                }
                console.log("hola")
            } catch (error) {
                console.error('Error checking survey eligibility:', error);
            }
        },
        async submitSurvey() {
            const token = localStorage.getItem('token');
            const role = 'client';
            try {
                const datos = {
                    question1: this.survey.q1,
                    question2: this.survey.q2,
                    question3: this.survey.q3
                };

                // Realizar la petición POST al servidor Flask para obtener el nivel de satisfacción
                const response = await axios.post('https://sentiments-and-recomendatios.onrender.com/predict/satisfaction', datos);

                // Imprimir la respuesta del servidor en la consola
                console.log('Respuesta del servidor:', response.data);

                // Obtener el nivel de satisfacción predicho
                const satisfactionLevel = response.data.satisfaction_level;
                let message = '';

                // Asignar mensaje personalizado según el nivel de satisfacción
                switch (satisfactionLevel) {
                    case 1:
                        message = 'Lamentamos no haber cumplido tus expectativas, trabajaremos para mejorar.';
                        break;
                    case 2:
                        message = 'Sentimos que no hayas quedado satisfecho, haremos mejoras.';
                        break;
                    case 3:
                        message = 'Gracias por tu feedback, continuaremos mejorando.';
                        break;
                    case 4:
                        message = 'Nos alegra que hayas quedado satisfecho, seguiremos mejorando.';
                        break;
                    case 5:
                        message = '¡Gracias por tu confianza! Nos complace haber superado tus expectativas.';
                        break;
                    default:
                        message = 'Respuesta no reconocida';
                        break;
                }

                // Mostrar el mensaje personalizado
                console.log('Mensaje personalizado:', message);

                // Cerrar el diálogo de la encuesta
                this.surveyDialog = false;

                // Añadir el nivel de satisfacción a los datos antes de enviar al API de satisfacción
                datos.satisfactionLevel = satisfactionLevel;

                // Realizar la petición POST al API para guardar la satisfacción
                const {
                    data
                } = await api({
                    method: 'POST',
                    url: '/satisfaction/save',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        rol: role
                    },
                    data: datos
                });

                if (!data.success) {
                    toast.error(data.msg);
                } else {
                    // Mostrar el mensaje personalizado con una notificación
                    toast.success(message);
                }

                // Limpiar el intervalo después de enviar la encuesta
                clearInterval(this.surveyInterval);

                // Reiniciar el intervalo para la encuesta
                this.startSurveyInterval();
            } catch (error) {
                console.error('Error al enviar la encuesta:', error);
            }
        },

        closeSurvey() {
            this.surveyDialog = false; // Solo cierra el modal
            this.startSurveyInterval();
        }
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
