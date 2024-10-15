<template>
    <v-dialog width="500">
        <template>

            <v-sheet elevation="12" max-width="600" rounded="lg" width="100%" class="pa-4 text-center mx-auto">
                <div>
                    <v-icon class="mb-5" :color="color" :icon="icon" size="112"></v-icon>

                    <h2 class="text-h5 mb-6">{{ tittle }}</h2>

                    <p class="mb-4 text-medium-emphasis text-body-2">
                        {{ message }}
                    </p>

                    <v-divider class="mb-4"></v-divider>

                    <div class="text-end">
                        <v-btn class="text-none" :color="color" rounded variant="flat" width="90" @click="close">
                            okey
                        </v-btn>
                    </div>
                </div>
            </v-sheet>
        </template>
    </v-dialog>
</template>

<script>
export default {
    props: {
        color: {
            type: String,
            default: 'primary'
        },
        icon: {
            type: String,
            default: 'mdi-information'
        },
        title: {
            type: String,
            default: 'Title'
        },
        message: {
            type: String,
            default: 'Message'
        },
    }
}
</script>

<style></style>