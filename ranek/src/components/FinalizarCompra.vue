<template>
  <section>
    <h2>Endereço de Envio Compra</h2>
    <UsuarioForm>
      <button class="btn" @click.prevent="finalizarCompra">Finalizar Compra</button>
    </UsuarioForm>
  </section>
</template>

<script>
import UsuarioForm from "@/components/UsuarioForm.vue";
import {api} from "@/services.js";
import {mapState} from "vuex";

export default {
  name: "FinalizarCompra",
  components: {
    UsuarioForm
  },
  props: ["produto"],
  computed: {
    ...mapState(["usuario"]),
    compra() {
      return {
        comprador_id: this.usuario.email,
        vendedor_id: this.produto.usuario_id,
        porduto: this.produto,
        endereco: {
          cep: this.usuario.cep,
          rua: this.usuario.rua,
          numero: this.usuario.numero,
          numero: this.usuario.bairro,
          bairro: this.usuario.cidade,
          estado: this.usuario.estado
        }
      };
    }
  },
  methods: {
    criarTransacao() {
      api.post("/transacao", this.compra).then(() => {
        this.$router.push({name: "compras"});
      })
    },
    async criarUsuario() {
      try {
        await this.$store.dispatch("criarUsuario", this.$store.state.usuario);
        // await this.$store.dispatch("logarUsuario", this.$store.state.usuario);
        await this.$store.dispatch(
          "getUsuario",
          this.$store.state.usuario.email
        );
        await this.criarTransacao();
      } catch (error) {
        this.erros.push(error.response.data.message);
        console.log(error);
      }
    },
    finalizarCompra() {
      this.erros = [];
      if(this.$store.state.login) {
        this.criarTransacao();
      } else {
        this.criarUsuario();
      }
    }
  }
};
</script>

<style scoped>
h2 {
  margin-top: 40px;
  margin-bottom: 20px;
}

.btn {
  background: #e80;
}
</style>