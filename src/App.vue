<template>
  <router-view />
</template>

<script lang="ts">
import { QSpinnerFacebook, useQuasar } from 'quasar';
import { onMounted } from 'vue';
import { onBeforeMount } from 'vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  setup() {
    const $q = useQuasar();

    $q.dark.set(false);

    const showLoading = () => {
      $q.loading.show({
        spinner: QSpinnerFacebook,
        spinnerColor: 'black',
        spinnerSize: 140,
        backgroundColor: 'inherit',
        messageColor: 'black',
      });
    };

    const hideLoading = () => {
      $q.loading.hide();
    };

    const infoForMobileDevices = () => {
      if (/Mobi|Android/i.test(navigator.userAgent)) {
        $q.loading.show({
          spinner: QSpinnerFacebook,
          spinnerColor: 'black',
          spinnerSize: 140,
          message: 'В данное время сервис доступен только для ПК, баг с версией для смартфона исправляется',
          backgroundColor: 'inherit',
          messageColor: 'black',
        });
      }
    };

    onBeforeMount(() => {
      showLoading();
    });

    onMounted(() => {
      // if (/Mobi|Android/i.test(navigator.userAgent)) {
      //   infoForMobileDevices();
      // } else {
        setTimeout(() => {
          hideLoading();
        }, 2000);
      // }
    });
  },
});
</script>
