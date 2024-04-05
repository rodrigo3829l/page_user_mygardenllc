<template>
    <v-card>
      <v-date-picker
        width="400"
        color="green-darken-3"
        v-model="date"
        :allowed-dates="allowedDates"
        :min="minDate"
      ></v-date-picker>
  
      <v-card-actions class="justify-end">
        <v-btn color="primary" @click="closeCalendar">{{ ($t('profile.components.calendarCard.cancelString')) }}</v-btn>
        <v-btn color="error" @click="reagendar">{{ ($t('profile.components.calendarCard.rescheduleString')) }}</v-btn>
      </v-card-actions>
    </v-card>
  </template>

<script>
import { api } from '@/axios/axios.js';

export default {
    data() {
        return {
            date: new Date(),
            minDate: new Date(),
            unavailableDates: [],
        };
    },
    mounted() {
        this.getDates();
    },
    methods: {
        async getDates() {
            try {
                const { data } = await api.get('/dates/get');
                this.unavailableDates = data.dates.map(item => item.date.split('T')[0]);
            } catch (error) {
                console.log(error);
            }
        },
        allowedDates(val) {
            return !this.unavailableDates.includes(this.$vuetify.date.toISO(val));
        },
        closeCalendar() {
            this.$emit('updateData', '', 'reschedule');
        },
        reagendar(){
            this.$emit('updateData', this.date, 'confirmreschedule');
        }
        
    },
};
</script>