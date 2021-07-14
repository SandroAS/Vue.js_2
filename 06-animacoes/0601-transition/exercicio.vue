<template>
  <div>
    <button @click="modal =!modal">Ativar</button>
    <transition name="testetransition">
      <div v-show="modal">Teste</div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modal: false
    };
  }
}
</script>

<style>
.testetransition-enter, .testetransition-leave-to {
  opacity: 0;
}
.testetransition-enter-active, .testetransition-leave-to {
  transition: opacity 0.3s;
}
</style>