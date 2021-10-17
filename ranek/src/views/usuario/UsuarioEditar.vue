<template>
  <section>
    <ErrorNotificacao :error="erros"/>
    <UsuarioForm>
      <button class="btn" @click.prevent="atualizarUsuario">Ativar Usuário</button>
    </UsuarioForm>
  </section>
</template>

<script>
import UsuarioForm from "@/components/UsuarioForm.vue";
import {api} from "@/services.js"

export default {
  name: "UsuarioEditar",
  components: {
    UsuarioForm
  },
  data() {
    return {
      erros: []
    }
  },
  methods: {
    atualizarUsuario() {
      api
      .put(`/usuario/${this.$store.state.usuario.id}`, this.$store.state.usuario)//.put(`/usuario, this.$store.state.usuario)
      .then(() => {
        this.$store.dispatch("getUsuario");
        this.$router.push({name: "usuario"});
      })
      .catch(error => {
        this.erros.push(error.response.data.message);
        console.log(error.response);
      });
    }
  }
}
</script>

<style>

</style>