<template>
<v-container>
    <v-row justify="center">
        <v-col cols="12" class="text-center">
            <h2>The Benefits of Working with Us</h2>
            <p>Discover why our clients choose to partner with us for the development of their gardens.</p>
        </v-col>
    </v-row>

    <v-row justify="center">
        <v-col v-for="(card, index) in benefitCards" :key="index" cols="12" sm="4">
            <v-card outlined>
                <!-- Alinea el icono con el texto -->
                <v-card-title class="align-left">
                    <v-icon size="36px">{{ card.icon }}</v-icon> <!-- Icono a la izquierda -->
                    <h3 class="ml-2">{{ card.title }}</h3> <!-- Título con espacio a la izquierda -->
                </v-card-title>

                <v-card-text>
                    <v-list>
                       
                            <v-list-item v-for="(item, index) in card.benefits" :key="index">
                                <v-icon small class="mr-1">mdi-check</v-icon> <!-- Ícono de check -->
                                {{ item }}
                            </v-list-item>
                        
                    </v-list>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</v-container>
</template>

  
<script>
export default {
    data() {
        return {
            benefitCards: [{
                    title: "Expertise and Experience",
                    icon: "mdi-school", // Icono relacionado con la experiencia
                    benefits: [
                        "Certified professionals",
                        "Years of experience",
                        "Innovative solutions",
                    ],
                },
                {
                    title: "Quality and Durability",
                    icon: "mdi-hammer-wrench", // Icono relacionado con calidad y durabilidad
                    benefits: [
                        "Top-quality materials",
                        "Long-lasting results",
                        "Detailed craftsmanship",
                    ],
                },
                {
                    title: "Customer-Centric Approach",
                    icon: "mdi-account-group", // Icono para enfoque centrado en el cliente
                    benefits: [
                        "Personalized service",
                        "Responsive support",
                        "Satisfaction guaranteed",
                    ],
                },
            ],
        };
    },
};
</script>

  
<style scoped>
.v-card-title {
    justify-content: flex-start;
    /* Alinear el icono y el título a la izquierda */
    display: flex;
    align-items: center;
    /* Alinear verticalmente el icono y el título */
}

.ml-2 {
    margin-left: 8px;
    /* Añadir margen entre el icono y el título */
}
</style>
