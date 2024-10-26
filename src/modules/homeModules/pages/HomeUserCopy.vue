<template>
<v-container fluid class="pa-0">
    <v-row>
        <v-col cols="12" class="position-relative pa-0">
            <!-- Carousel -->
            <v-carousel show-arrows="hover" hide-delimiters height="450" cycle interval="2500">
                <v-carousel-item v-for="(image, i) in images" :key="i" :src="image" cover></v-carousel-item>
            </v-carousel>

            <!-- Texto y botón sobre el carousel -->
            <div class="overlay-content">
                <v-col cols="12" md="12" class="white--text text-content">
                    <h1>Professional Gardening Services</h1>
                    <p>
                        Trust us to keep your garden in the best condition.
                    </p>
                    <p>Our team has years of experience and guarantees quality results.</p>
                    <v-btn color="green-darken-3" dark>
                        Schedule a Service
                    </v-btn>
                </v-col>
            </div>

        </v-col>
    </v-row>
    <About></About>
    <br><br>
    <Benefits></Benefits>
    <br><br>
    <Comments></Comments>
    <br>
    <Contact></Contact>
    <br><br>
    <Faqs></Faqs>
</v-container>
</template>

<script>
import {
    defineAsyncComponent
} from 'vue';

export default {
    components: {
        About: defineAsyncComponent(() => import('@/modules/homeModules/pages/AboutView.vue')),
        Benefits: defineAsyncComponent(() => import('@/modules/homeModules/pages/BenefitsView.vue')),
        Comments: defineAsyncComponent(() => import('@/modules/homeModules/pages/CommentsClients.vue')),
        Faqs: defineAsyncComponent(() => import('@/modules/homeModules/pages/FAQSView.vue')),
        Contact: defineAsyncComponent(() => import('@/modules/homeModules/pages/ContacUser.vue')),
    },
    data() {
        return {
            images: [
                "https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990267/logos/nhqsptfuorp4dkmutlcm.jpg",
                "https://png.pngtree.com/background/20230611/original/pngtree-picturesque-garden-in-a-lawn-with-trees-and-flowers-picture-image_3160419.jpg",
                "https://img.freepik.com/foto-gratis/foto-banco-blanco-parque_181624-48161.jpg?t=st=1709034581~exp=1709035181~hmac=35d9b81bf3f82969cf1cfc4a1f063871cfec03ead125adb4531bd5ce226d291a",
                "https://plantesdecor.com/wp-content/uploads/2024/05/img02.jpg",
                // "https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990267/logos/nhqsptfuorp4dkmutlcm.jpg"
            ]
        }
    }
};
</script>

<style scoped>
.display-2 {
    font-size: 2.8rem;
}

p {
    font-size: 1.2rem;
}

.overlay-content {
    position: absolute;
    top: 20%;
    left: 5%;
    width: 90%;
    text-align: left;
    z-index: 2;
    color: white;
}

.text-content h1 {
    font-size: 2.5rem;
    text-shadow: 2px 2px 3px black;
    /* Ajusta el tamaño del título */
}

.text-content p {
    font-size: 1.2rem;
    text-shadow: 2px 2px 3px black;
    /* Ajusta el tamaño del texto */
}

.v-carousel-item {
    height: 450px;
}

.carousel {
    height: 450px;
}

.pa-0 {
    padding: 0;
}

.no-gutters {
    margin: 0;
}

@media (max-width: 600px) {
    .overlay-content {
        top: 10%;
        left: 2%;
        width: 96%;
    }

    .text-content h1 {
        font-size: 2.5rem;
        /* Tamaño del título en pantallas pequeñas */
    }

    .text-content p {
        font-size: 1.2rem;
        /* Tamaño del texto en pantallas pequeñas */
    }

    .v-btn {
        font-size: 0.9rem;
    }
}
</style>
