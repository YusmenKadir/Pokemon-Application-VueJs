<template>
  <div>
    <div class="nav">
      <!-- <h1>The PokeGame</h1> -->
      <h1>Welcome To The PokeGame {{ name }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  methods: {},

  computed: {
    name() {
      return this.$store.getters.returnUserName;
    },
  },
};
</script>

<style>
.nav {
  text-align: center;
  background: #333;
  color: #fff;
  height: 10vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
