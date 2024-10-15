<template>
<v-card :loading="loading" class="mx-auto my-12" max-width="450">
    <template v-slot:loader="{ isActive }">
        <v-progress-linear :active="isActive" color="green-darken-3" height="4" indeterminate></v-progress-linear>
    </template>

    <!-- Primera fila con la imagen del servicio -->
    <v-img cover height="250" :src="service.img.secure_url"></v-img>

    <!-- Segunda fila con el título y el rating -->
    <v-card-item>
        <v-row>
            <v-col>
                <h3>{{ service.name }}</h3>
            </v-col>

            <v-col class="text-right">
                <v-rating :model-value="service.Calificacion.total" color="amber" density="compact" half-increments readonly size="small"></v-rating>

                <!-- <div class="text-grey ms-4"> -->
                    {{ service.Calificacion.total }} ({{ service.Calificacion.totales }})
                <!-- </div> -->

            </v-col>
        </v-row>
    </v-card-item>

    <v-card-text>
        {{ service.description }}
    </v-card-text>

    <v-card-actions>
        <v-btn color="green-darken-3" variant="elevated" block @click="reserve">
            {{ $t('servicesCard.btnString') }}
        </v-btn>
    </v-card-actions>
</v-card>
</template>

<script>
export default {
    props: {
        service: {
            type: Object,
        },
    },
    data: () => ({
        loading: false,
        selection: 1,
    }),
    methods: {
        reserve() {
            this.loading = true;
            setTimeout(() => (this.loading = false), 1000);
            const serviceId = this.service._id;
            this.$router.push({ name: 'services-Schedule', params: { id: serviceId } });
        },
    },
    mounted () {
        // console.log(this.service)
    }
};
</script>

<style scoped>
.text-grey {
    color: grey;
}

.ms-4 {
    margin-left: 16px;
}
</style>
