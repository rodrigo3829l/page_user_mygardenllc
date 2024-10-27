<template>
  <v-breadcrumbs :items="items">
    <template v-slot:divider>
      <v-icon icon="mdi-chevron-right"></v-icon>
    </template>
  </v-breadcrumbs>
  <v-container>
    <h2>{{ $t("faqs.titleString") }}</h2>
    <div class="text-center d-flex pb-4">
      <v-btn v-if="!allShow" class="ma-2" @click="all">
        {{ $t("faqs.buttonShowAllString") }}
      </v-btn>
      <v-btn v-if="allShow" class="ma-2" @click="none">
        {{ $t("faqs.buttonHideAllString") }}
      </v-btn>
    </div>
    <v-row>
      <v-col cols="12" md="6">
        <v-expansion-panels
          multiple
          color="green-darken-3"
          v-model="panel"
          variant="inset"
        >
          <v-expansion-panel
            v-for="(item, i) in faqs.slice(0, faqs.length / 2)"
            :key="i"
            :title="item.question"
            :text="item.answer"
            :value="item.question"
          >
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
      <v-col cols="12" md="6">
        <v-expansion-panels
          multiple
          color="green-darken-3"
          v-model="panel"
          variant="inset"
        >
          <v-expansion-panel
            v-for="(item, i) in faqs.slice(faqs.length / 2)"
            :key="i"
            :title="item.question"
            :text="item.answer"
            :value="item.question"
          >
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { api } from "@/axios/axios.js";
export default {
  data() {
    return {
      allShow: false,
      items: [
        {
          title: "Home",
          disabled: false,
          href: "/home/homeuser",
        },
        {
          title: "Answers",
          disabled: false,
          href: "/home/answers",
        },
      ],
      panel: [],
      faqs: [],
    };
  },
  methods: {
    all() {
      this.allShow = true;
      this.panel = this.faqs.map((faq) => faq.question);
    },
    none() {
      this.allShow = false;
      this.panel = [];
    },
    async getQuestions() {
      try {
        const { data } = await api.get("/answer/get");
        this.faqs = data.asnwers;
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getQuestions();
  },
};
</script>
