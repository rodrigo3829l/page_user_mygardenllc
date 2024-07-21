<template>
<v-container fluid class="grey lighten-3">
    <v-container >
        <v-row align="center" justify="space-between" gap="4">
            <!-- Column with image -->
            <v-col cols="12" md="6" class="d-flex justify-center mb-md-6">
                <v-img class="img" src="https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990267/logos/nhqsptfuorp4dkmutlcm.jpg" alt="Gardening" height="300px" />
            </v-col>

            <!-- Column for text divided into two rows -->
            <v-col cols="12" md="6">
                <!-- First row -->
                <v-row>
                    <v-col cols="12">
                        <h6>About Us</h6>
                        <h2>Our mission: delivering quality services</h2>
                        <p>
                            As a family-owned business, we fully understand the importance of building
                            strong connections with our people. We focus on providing top-notch work that
                            stands the test of time, using high-quality materials, and paying attention
                            to every detail. When you choose Mi Jardín LLC, you're not just getting gardening
                            services, you're getting a committed partner to help you create an outdoor
                            space you'll enjoy for years to come. Trust us, it will be amazing!
                        </p>
                    </v-col>
                </v-row>

                <!-- Second row with two columns -->
                <v-row>
                    <v-col cols="6">
                        <h6>Our Vision</h6>
                        <p>To create exceptional green spaces</p>
                    </v-col>
                    <v-col cols="6">
                        <h6>Our Values</h6>
                        <p>Integrity, Innovation, Collaboration, and Continuous Improvement</p>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</v-container>
</template>

<script>
export default {};
</script>

<style scoped>
.grey {
    background-color: #f1f1f1;
    /* Color gris claro */
}

/* Styles for smaller titles */
h6 {
    font-size: 1rem;
    /* Small title size */
}

h2 {
    font-size: 1.5rem;
    /* Large title size */
}

p {
    font-size: 1rem;
    /* Paragraph text size */
}

.img {
    border-radius: 18%;
}
</style>
