const consoleWarn = console.warn;
const consoleError = console.error;

console.warn = (message, ...args) => {
  if (message.includes('Vuetify') || message.includes('already provides property')) return;
  consoleWarn(message, ...args);
};

console.error = (message, ...args) => {
  if (message.includes('Vuetify')) return;
  consoleError(message, ...args);
};
