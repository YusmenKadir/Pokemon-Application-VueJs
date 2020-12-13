<template>
  <div class="container container-pokemons">
    <div class="heading">
      <h2>Info:Enter Battle Field by clicking on your chosen pokemon</h2>
    </div>

    <div class="pokemon-list">
      <div v-for="(poke, index) in pokemons" :key="index">
        <img
          :src="poke.sprites.front_default"
          @click="enterBattleField(poke.id)"
        />
        <p>Name: {{ poke.name }}</p>
        <p>
          <span><i class="fas fa-bolt"></i> </span>Move 1:
          {{ poke.moves[0].move.name }}
        </p>
        <p>
          <span><i class="fas fa-bolt"></i> </span>Move 2:
          {{ poke.moves[1].move.name }}
        </p>
        <p>
          <span><i class="fas fa-bolt"></i> </span>Move 3:
          {{ poke.moves[2].move.name }}
        </p>
        <p>
          <span><i class="fas fa-bolt"></i> </span>Move 4:
          {{ poke.moves[3].move.name }}
        </p>
        <p>
          <span><i class="fas fa-tachometer-alt"></i> </span>Speed:
          {{ poke.stats[5].base_stat }}
        </p>
        <p>
          <span><i class="fas fa-shield-virus"></i> </span>Special Defense :
          {{ poke.stats[4].base_stat }}
        </p>
        <p>
          <span><i class="fas fa-skull-crossbones"></i> </span>Special Attack :
          {{ poke.stats[3].base_stat }}
        </p>
        <p>
          <span><i class="fas fa-shield-alt"></i> </span>Defense :
          {{ poke.stats[2].base_stat }}
        </p>
        <p>
          <span><i class="fas fa-skull"></i> </span>Attack :
          {{ poke.stats[1].base_stat }}
        </p>
        <p>
          <span><i class="fas fa-heart"></i> </span>HP :
          {{ poke.stats[0].base_stat }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pokemons: [],
      limit: 50,
      url: "https://pokeapi.co/api/v2/pokemon/",
    };
  },

  methods: {
    getPokemons(id) {
      fetch(this.url + id)
        .then((res) => res.json())
        .then((data) => this.pokemons.push(data))
        .catch((err) => console.log(err));
    },

    fetchPokemons() {
      for (let i = 1; i <= this.limit; i++) {
        this.getPokemons(i);
      }
    },

    enterBattleField(id) {
      this.$router.push({ name: "field", params: { pokeId: id } });
    },
  },

  created() {
    this.fetchPokemons();
  },
};
</script>

<style lang="scss">
.container-pokemons {
  height: auto;
  .pokemon-list {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    justify-items: center;
    row-gap: 25px;
    padding-bottom: 20px;
    margin-top: 50px;

    div {
      border: 1px solid rgba(darken($color: #000000, $amount: 20), 0.4);
      display: flex;
      align-items: center;
      flex-direction: column;
      width: 200px;
      height: 320px;
      cursor: pointer;
      transition: transform 0.3s ease-in;

      &:hover {
        transform: scale(1.1);
      }
    }
  }

  .heading {
    background: rgba(red, 0.9);
    color: white;
    margin: 10px auto;
    height: 50px;
    width: 70%;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
