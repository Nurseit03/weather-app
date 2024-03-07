import { boot } from 'quasar/wrappers';
import Vue3Lottie from 'vue3-lottie';

export default boot(({ app }) => {
  app.use(Vue3Lottie, { name: 'LottieAnimation' });
});