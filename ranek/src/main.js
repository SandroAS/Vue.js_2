import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import PaginaCarregando from "@/components/PaginaCarregando.vue"
// import LoginCriar from "@/components/LoginCriar.vue"

Vue.config.productionTip = false

Vue.component("PaginaCarregando", PaginaCarregando);
// Vue.component("LoginCriar", LoginCriar);

Vue.filter("numeroPreço", valor => {
  valor = Number(valor);
  if(!isNaN(valor)) {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    })
  } else {
    return "";
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')