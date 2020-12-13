<template>
  <div class="modal-parent">
    <transition name="moveInUp">
      <div class="modal">
        <h1>Welcome to the PokeGame</h1>
        <input
          type="text"
          name="name"
          id="name"
          v-model="value"
          placeholder="Type Your Name"
        />
        <router-link to="/pokemonList" tag="button" @click="updateName"
          >Let's Go!</router-link
        >
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  computed: {
    value: {
      get() {
        return this.$store.getters.returnUserName;
      },

      set(value) {
        if (value == "") {
          alert(123);
        } else {
          return this.$store.dispatch("setName", value);
        }
      },
    },
  },

  methods: {
    updateName(e) {
      this.$store.dispatch("setName", e.target.value);
    },
  },
};
</script>

<style lang="scss">
.modal-parent {
  height: 100vh;
  position: relative;
}

.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(#000, 0.4);
  height: 250px;
  justify-content: center;
  padding: 10px;
  width: 35%;
  text-align: center;

  input {
    padding: 10px;
    margin: 15px 0;
    border: none;
    outline: none;
  }

  button {
    padding: 10px;
    margin: 5px 0;
    background: #353535;
    color: #fff;
    outline: none;
    font-size: 18px;
    cursor: pointer;
  }
}

.moveInUp-enter-active {
  animation: fadeIn 2s ease-in;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
  }
}
</style>
