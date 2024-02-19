<template>
  <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <h2>{{ $t('faqs.titleString') }}</h2>
        <div class="text-center d-flex pb-4">
          <v-btn class="ma-2" @click="all">
            Show All
          </v-btn>
          <v-btn class="ma-2" @click="none">
            Hide All
          </v-btn>
        </div>
        <v-expansion-panels
          color="green-darken-3"
          v-model="panel"
          variant="inset"
          multiple
        >
          <v-expansion-panel
            v-for="(item, i) in faqs"
            :key="i"
            :title="item.question"
            :text="item.answer"
            :value="item.question"
          ></v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: 'Home',
          disabled: false,
          href: '/home/homeuser',
        },
        {
          title: 'Answers',
          disabled: false,
          href: '/home/answers',
        },
      ],
      panel: [],
      faqs: [
        { question: '¿Cuáles son los servicios de diseño de jardines que ofrecen?', answer: 'Ofrecemos servicios de diseño de jardines personalizados, incluyendo planificación, selección de plantas, paisajismo y creación de áreas temáticas.' },
        { question: '¿Cuáldes son los servicios de diseño de jardines que ofrecen?', answer: 'Ofrecemos servicios de diseño de jardines personalizados, incluyendo planificación, selección de plantas, paisajismo y creación de áreas temáticas.' },
        { question: '¿Cuáles son los servicios dwe diseño de jardines ques ofrecen?', answer: 'Ofrecemos servicios de diseño de jardines personalizados, incluyendo planificación, selección de plantas, paisajismo y creación de áreas temáticas.' },
        { question: '¿Cuáles son los servicios de dwiseño de jardines que ofrecen?', answer: 'Ofrecemos servicios de diseño de jardines personalizados, incluyendo planificación, selección de plantas, paisajismo y creación de áreas temáticas.' },
        { question: '¿Cuáles son los servicios de disweño de jardines que ofrecen?', answer: 'Ofrecemos servicios de diseño de jardines personalizados, incluyendo planificación, selección de plantas, paisajismo y creación de áreas temáticas.' },
        { question: '¿Cuáles son los servicios de diseñwo de jardines que ofrecen?', answer: 'Ofrecemos servicios de diseño de jardines personalizados, incluyendo planificación, selección de plantas, paisajismo y creación de áreas temáticas.' },
        { question: '¿Cuáles son los servicios de diseño dwe jardines que ofrecen?', answer: 'Ofrecemos servicios de diseño de jardines personalizados, incluyendo planificación, selección de plantas, paisajismo y creación de áreas temáticas.' },
        { question: '¿Cuáles son los servicios de diseño de jwardines que ofrecen?', answer: 'Ofrecemos servicios de diseño de jardines personalizados, incluyendo planificación, selección de plantas, paisajismo y creación de áreas temáticas.' },
        { question: '¿Cuáles son los servicios de diseño de jarwdines que ofrecen?', answer: 'Ofrecemos servicios de diseño de jardines personalizados, incluyendo planificación, selección de plantas, paisajismo y creación de áreas temáticas.' },
        { question: '¿Cuáles son los servicios de diseño de jardiwnes que ofrecen?', answer: 'Ofrecemos servicios de diseño de jardines personalizados, incluyendo planificación, selección de plantas, paisajismo y creación de áreas temáticas.' },
        { question: '¿Cuáles son los servicios de diseño de jardinews que ofrecen?', answer: 'Ofrecemos servicios de diseño de jardines personalizados, incluyendo planificación, selección de plantas, paisajismo y creación de áreas temáticas.' },
        { question: '¿Cuáles son los servicios de diseño de jardines wque ofrecen?', answer: 'Ofrecemos servicios de diseño de jardines personalizados, incluyendo planificación, selección de plantas, paisajismo y creación de áreas temáticas.' },
        // Agrega más preguntas y respuestas aquí
      ],
    };
  },
  methods: {
    all() {
      this.panel = this.faqs.map(faq => faq.question);
    },
    none() {
      this.panel = [];
    },
  },
};
</script>
