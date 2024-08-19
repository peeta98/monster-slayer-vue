function getRandomValue(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
	data() {
		return {
			playerHealth: 100,
			monsterHealth: 100,
			currentRound: 0,
		};
	},
	computed: {
		monsterBarStyles() {
			if (this.monsterHealth < 0) {
				return { width: "0%" };
			}
			return { width: `${this.monsterHealth}%` };
		},
		playerBarStyles() {
			if (this.playerHealth < 0) {
				return { width: "0%" };
			}
			return { width: `${this.playerHealth}%` };
		},
		mayUseSpecialAttack() {
			return this.currentRound % 3 !== 0;
		},
	},
	methods: {
		attackMonster() {
			this.currentRound++;
			const attackValue = getRandomValue(5, 12); // Drops health by 5-12 points
			this.monsterHealth -= attackValue;
			this.attackPlayer();
		},
		attackPlayer() {
			const attackValue = getRandomValue(8, 15); // Drops health by 8-15 points
			this.playerHealth -= attackValue;
		},
		specialAttackMonster() {
			this.currentRound++;
			const attackValue = getRandomValue(10, 25); // Drops health by 10-25 points
			this.monsterHealth -= attackValue;
			this.attackPlayer();
		},
		healPlayer() {
			this.currentRound++;
			const healValue = getRandomValue(8, 20); // Heals health by 8-20 points
			
			if (this.playerHealth + healValue > 100) {
				this.playerHealth = 100;
			} else {
				this.playerHealth += healValue;
			}

			this.attackPlayer();
		}
	},
});

app.mount("#game");
