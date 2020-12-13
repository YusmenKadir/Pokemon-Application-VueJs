import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'; 
import PokemonList from './components/PokemonList.vue';
import Modal from './components/Modal.vue';
import BattleField from './components/BattleField.vue'
import {store} from './store/store.js'; 

Vue.use(VueRouter); 

const routes = [
  {name: 'modal',path: '/', component: Modal},
  {name: 'name', path:'/pokemonList',component: PokemonList},
  {name:'field',path:'/battle/:pokeId',component: BattleField}
]; 

const router = new VueRouter({
  routes,
  mode:'history'
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
