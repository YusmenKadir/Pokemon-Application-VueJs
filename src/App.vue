<template>
  <div id="app">
    <Nav> </Nav>
    <div class="container">
      <router-view></router-view>
    </div>
    <Footer> </Footer>
  </div>
</template>

<script>
import Nav from "./components/Nav.vue";
import Footer from "./components/Footer.vue";
export default {
  components: {
    Nav,
    Footer,
  },

  data() {
    return {};
  },

  methods: {},
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
#app {
  position: relative;
  width: 100%;
  background: #f4f4f4;
  font-family: "Lato", sans-serif;
}
</style>
