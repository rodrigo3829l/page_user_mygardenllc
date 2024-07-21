<template>
    <v-container fluid class="grey lighten-3">
        <v-container>
        <!-- Título y subtítulo -->
        <v-row justify="center" class="text-center my-4">
            <v-col cols="12">
            <h2>Frequently Asked Questions</h2>
            <p>Get answers to the most common questions about our services and solutions.</p>
            </v-col>
        </v-row>
    
        <!-- Expansion panels con el formato preferido -->
        <v-expansion-panels 
            multiple 
            v-model="panel" 
            variant="inset"
        >
            <!-- Divide el array de preguntas y respuestas para mostrar la mitad -->
            <v-expansion-panel v-for="(item, i) in faqs.slice(0, faqs.length)" 
            :key="i" 
            :title="item.question" 
            :text="item.answer" 
            :value="item.question"
            >
            </v-expansion-panel>
        </v-expansion-panels>
        </v-container>
    </v-container>
  </template>
  
  <script>
  export default {
    name: 'FAQ',
    data() {
      return {
        panel: [], // Controla el estado de los paneles
        faqs: [
          {
            question: "What types of gardening services do you offer?",
            answer: "We offer a wide range of services including landscape design, lawn care, tree trimming, irrigation systems, and more.",
          },
          {
            question: "Do you offer organic gardening options?",
            answer: "Yes, we provide organic gardening services upon request. We use natural fertilizers and environmentally friendly practices.",
          },
          {
            question: "How can I request a quote for your services?",
            answer: "You can request a quote by contacting us through our website, calling our office, or visiting our location in person.",
          },
          {
            question: "Do you offer maintenance services for existing gardens?",
            answer: "Yes, we offer regular maintenance services to keep your garden in optimal condition, including pruning, weeding, and more.",
          },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .text-center {
    text-align: center;
  }
  .grey {
        background-color: #f1f1f1;

    }

  </style>
  