<template>
  <div class="container">
    <div class="confirm-buttons" v-if="!playerReady">
      <div class="confirm-one" v-if="!faded">
        <p>Are you ready ?</p>
        <button @click="deletepoke" :class="{ errorClass: faded }">
          I am ready!
        </button>
      </div>
      <div class="confirm-two" v-if="secondFaded">
        <p>Let's get you an opponent?</p>
        <button @click="pickWinner" :class="{ errorClass: secondFaded }">
          Get an opponent
        </button>
      </div>
    </div>
    <div class="gamePokemons">
      <div
        class="chosen"
        v-for="(chosen, index) in battlePokemons"
        :key="index"
      >
        <div v-if="faded">
          <img
            :src="chosen.sprites.back_default"
            id="chosenPokeImg"
            :class="{ attack: isAttacking }"
          />
          <p class="name">{{ chosen.name }}</p>
          <div class="healthbar-parent">
            <div
              class="healthbar"
              :style="{ width: chosen.stats[0].base_stat + '%' }"
            >
              HP: {{ chosen.stats[0].base_stat }}
            </div>
          </div>
        </div>
      </div>
      <div
        class="countDown"
        v-if="playerReady"
        :class="{ removeBorder: playerReady }"
      >
        <h3 v-if="!countDownOver">{{ countDown }}</h3>
      </div>
      <div class="opponent" v-for="poke in arr3" :key="poke.id">
        <div v-if="countDownOver">
          <img :src="poke.sprites.front_default" />
          <p class="name">{{ poke.name }}</p>
          <div class="healthbar-parent">
            <div
              class="healthbar"
              :style="{ width: poke.stats[0].base_stat + '%' }"
            >
              HP: {{ poke.stats[0].base_stat }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="game-controls-wrapper" v-if="countDownOver">
      <div class="start-game-div" v-if="!gameIsRunning">
        <button class="start-game-btn" @click="startGame">Start Game</button>
      </div>
      <div class="game-controls" v-else-if="gameIsRunning && !gameIsOver">
        <button class="attack" @click="attack">Attack</button>
        <button class="special-attack" @click="specialAttack">
          Special Attack
        </button>
        <button class="Heal" @click="heal">Heal</button>
        <button class="giveup" @click="giveUp">Give Up</button>
      </div>
    </div>
    <div class="gameMessage" v-if="gameIsOver">
      <h1>Your PokeMon {{ finalMessage }}!!</h1>
      <button class="newGame" @click="playAgain">Play Again</button>
    </div>
    <div class="activity-log" v-if="turns.length > 0">
      <ul>
        <li
          v-for="(turn, index) in turns"
          :key="index"
          :class="{
            'player-turn': turn.isPlayer,
            'opponent-turn': !turn.isPlayer,
          }"
        >
          {{ turn.text }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pokeId: this.$route.params.pokeId,
      pokemons: [],
      battlePokemons: [],
      limit: 50,
      url: "https://pokeapi.co/api/v2/pokemon/",
      arr: [],
      arr2: [],
      arr3: [],
      faded: false,
      secondFaded: false,
      playerReady: false,
      countDownOver: false,
      countDown: 5,
      gameIsRunning: false,
      gameIsOver: false,
      turns: [],
      playerWon: Boolean,
      isAttacking: false,
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

    getPokemonById() {
      fetch(this.url + this.pokeId)
        .then((res) => res.json())
        .then((data) => this.battlePokemons.push(data));
    },

    pickWinner() {
      this.arr3.push(this.arr2[Math.floor(Math.random() * this.arr2.length)]);
      setTimeout(() => {
        this.secondFaded = false;
        this.playerReady = true;
        this.countDownTimer();
      }, 1000);
    },

    deletepoke() {
      this.arr = this.pokemons.filter((el) => el.id !== this.pokeId);
      this.arr2 = this.arr;
      console.log(this.arr2);

      setTimeout(() => {
        this.faded = true;
        this.secondFaded = true;
      }, 1000);
    },
    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1;
          if (this.countDown == 0) {
            this.countDownOver = true;
          }
          this.countDownTimer();
        }, 1000);
      }
    },

    startGame() {
      this.gameIsRunning = true;
      this.chosenPokeHealth = this.battlePokemons[0].stats[0].base_stat;
      this.opponentPokeHealth = this.arr3[0].stats[0].base_stat;
      this.turns = [];
    },

    attack() {
      const damage = 5;
      this.arr3[0].stats[0].base_stat -= damage;
      this.opponentAttack();
      const sound = new Audio(require("@/assets/hit.wav"));
      sound.play();
      this.checkWinner();
      this.isAttacking = true;
      this.turns.unshift({
        isPlayer: true,
        text: `${this.battlePokemons[0].name} hits ${this.arr3[0].name} with ${damage}`,
      });
    },

    opponentAttack() {
      // random number between 5 and 20
      const opponentDamage = Math.floor(Math.random() * 16) + 5;
      this.battlePokemons[0].stats[0].base_stat -= opponentDamage;

      this.turns.unshift({
        isPlayer: false,
        text: ` ${this.arr3[0].name} hits ${this.battlePokemons[0].name} with ${opponentDamage}`,
      });
    },

    specialAttack() {
      const damage = 10;
      this.arr3[0].stats[0].base_stat -= damage;
      this.opponentAttack();
      this.checkWinner();

      const sound = new Audio(require("@/assets/specialhit.wav"));
      sound.play();

      this.turns.unshift({
        isPlayer: true,
        text: `${this.battlePokemons[0].name} hits ${this.arr3[0].name} with ${damage}`,
      });
    },

    heal() {
      const heal = 5;
      if (this.battlePokemons[0].stats[0].base_stat < this.chosenPokeHealth) {
        this.battlePokemons[0].stats[0].base_stat += heal;
      } else {
        this.battlePokemons[0].stats[0].base_stat = this.chosenPokeHealth;
      }
      const sound = new Audio(require("@/assets/heal.wav"));
      sound.play();

      this.turns.unshift({
        isPlayer: true,
        text: `${this.battlePokemons[0].name} heals with ${heal}`,
      });
    },

    giveUp() {
      setTimeout(() => {
        this.gameIsRunning = false;
        this.turns = [];
        this.battlePokemons[0].stats[0].base_stat = this.chosenPokeHealth;
        this.arr3[0].stats[0].base_stat = this.opponentPokeHealth;
      }, 1200);

      const sound = new Audio(require("@/assets/giveup.wav"));
      sound.play();

      this.turns.unshift({
        isPlayer: true,
        text: `${this.battlePokemons[0].name} gave up!`,
      });
    },

    playAgain() {
      this.gameIsOver = false;
      // this.gameIsRunning = true;
      this.turns = [];
      this.battlePokemons[0].stats[0].base_stat = this.chosenPokeHealth;
      this.arr3[0].stats[0].base_stat = this.opponentPokeHealth;
    },

    checkWinner() {
      if (this.battlePokemons[0].stats[0].base_stat <= 0) {
        // alert("You lost");
        this.gameIsOver = true;
        this.gameIsRunning = true;
        this.playerWon = false;
        this.turns = [];
        // this.battlePokemons[0].stats[0].base_stat = this.chosenPokeHealth;
        // this.arr3[0].stats[0].base_stat = this.opponentPokeHealth;
        const sound = new Audio(require("@/assets/gameoverlost.wav"));
        sound.play();
      } else if (this.arr3[0].stats[0].base_stat <= 0) {
        // alert("You won");
        this.gameIsOver = true;
        this.playerWon = true;
        this.gameIsRunning = true;
        this.turns = [];
        // this.battlePokemons[0].stats[0].base_stat = this.chosenPokeHealth;
        // this.arr3[0].stats[0].base_stat = this.opponentPokeHealth;

        const sound = new Audio(require("@/assets/victory.mp3"));
        sound.play();
      }
    },
  },

  computed: {
    finalMessage() {
      if (this.playerWon) {
        return "WON";
      } else {
        return "LOST";
      }
    },
  },

  created() {
    this.fetchPokemons();
    this.getPokemonById();
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  position: relative;
}

.gamePokemons {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  padding: 16px;
}
.name {
  font-size: 24px;
}
.chosen {
  width: 100%;
  text-align: center;
}

.opponent {
  width: 100%;
  text-align: center;
}

.countDown {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 50px;
  font-weight: 500;
  border-radius: 50%;
  border: 1px solid #000;
}

.removeBorder {
  border: none;
}

/* .errorClass {
  display: none;
} */

.confirm-buttons {
  width: 300px;
  height: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  // border: 1px solid #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 24px;
  padding: 5px;
  button {
    background: #353535;
    color: #fff;
    outline: none;
    font-size: 18px;
    cursor: pointer;
    padding: 5px;
    width: 100%;
  }
}
.healthbar-parent {
  background: #cccc;
  .healthbar {
    background: green;
    color: #fff;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 14px;
    transition: width 0.1s ease-in;
  }
}

.start-game-div {
  margin: 0 auto;
  width: 50%;
  height: 10%;

  display: flex;
  align-items: center;
  justify-content: center;

  .start-game-btn {
    background: #353535;
    color: #fff;
    outline: none;
    font-size: 18px;
    cursor: pointer;
    padding: 10px;
  }
}

.game-controls {
  margin: 0 auto;
  width: 50%;
  height: 10%;

  display: flex;
  align-items: center;
  justify-content: center;

  button {
    background: #353535;
    color: #fff;
    outline: none;
    font-size: 18px;
    cursor: pointer;
    padding: 10px;
    margin: 0 10px;
  }
}

.activity-log {
  background: darken($color: #f4f4f4f4, $amount: 4);
  width: 500px;
  height: auto;
  margin: 10px auto;
  text-align: center;

  ul {
    list-style: none;
  }
  li {
    color: #fff;
    margin: 5px 0;
  }

  .player-turn {
    background: red;
  }

  .opponent-turn {
    background: #14bef2;
  }
}

.gameMessage {
  margin: 10px auto;
  height: 110px;
  width: 50%;
  background: darken($color: #f4f4f4f4, $amount: 4);
  padding: 10px;
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  .newGame {
    background: #353535;
    color: #fff;
    outline: none;
    font-size: 18px;
    cursor: pointer;
    padding: 10px;
    margin: 5px auto;
  }
}
</style>
