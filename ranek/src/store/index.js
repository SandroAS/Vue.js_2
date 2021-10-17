import Vue from 'vue'
import Vuex from 'vuex'
import { api } from "@/services.js"

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    login: false,
    usuario: {
      id: "",
      nome: "",
      email: "",
      senha: "",
      cep: "",
      rua: "",
      numero: "",
      bairro: "",
      cidade: "",
      estado: ""
    },
    usuario_produtos: null
  },
  mutations: {
    UPDATE_LOGIN(state, payload) {
      state.login = payload;
    },
    UPDATE_USUARIO(state, payload) {
      state.usuario = Object.assign(state.usuario, payload);
    },
    UPDATE_USUARIO_PRODUTOS(state, payload) {
      state.usuario_produtos.unshift(payload)
    }
  },
  actions: {
    getUsuarioProdutos(context) {
      api.get(`/produto?usuario_id=${context.state.usuario.id}`).then(response => {
        context.commit("UPDATE_USUARIO_PRODUTOS", response.data)
      })
      .ADD_USUARIO_PRODUTOS
    },
    getUsuario(context, payload) {
      return api.get(`/ranekusers/${payload}`).then(response => { // return api.get(`/usuario`).then(response => {
        context.commit("UPDATE_USUARIO", response.data);
        context.commit("UPDATE_LOGIN", true);
      });
    },
    criarUsuario(context, payload) {
      context.commit("UPDATE_USUARIO", {id: payload.id})
      return api.post("/ranekusers", context.state.usuario);
    },
  },
  /**
    logarUsuario(context, payload) {
      return api
      .login({
        username: payload.email,
        username: payload.senha
      })
      .then(response => {
        window.localStorage.token = `Bearer ${response.data.token}`
      })
    }
   */
  deslogarUsuario(context) {
    context.commit("UPDATE_USUARIO", {
      id: "",
      nome: "",
      email: "",
      senha: "",
      cep: "",
      rua: "",
      numero: "",
      bairro: "",
      cidade: "",
      estado: ""
    });
    //window.localStorage.removeItem("token")
    context.commit("UPDATE_LOGIN", false);
  },
  modules: {
  }
})
