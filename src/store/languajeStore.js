import { ref } from 'vue';

export const currentLanguage = ref('en'); // Inicializa con el idioma predeterminado

export function setLanguage(language) {
  currentLanguage.value = language;
}