<template>
  <div class="spinner-background">
    <spinner class="spinner" size="massive" :message="msg" />
  </div>
</template>

<script>
import Spinner from 'vue-simple-spinner'
export default {
  name: 'spinnerr',
  components: {
    Spinner
  },
  props: {
    msg: {
      type: String,
      default: 'Carregando...'
    }
  }
}
</script>

<style lang="css">

  .spinner {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

  }

  .spinner-background {
    background: rgba(0,0,0,0.2);
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

</style>
