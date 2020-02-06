new Vue({
    el: '#app',
    data: {
        running: false,
        playerLife: 100,
        monsterLife: 100,
        attackEsp: 3,
        healing: 2,
        logs: []
    },
    computed: {
        hasResult() {
            return this.playerLife == 0 || this.monsterLife == 0
        }
    },
    methods: {
        startGame() {
            this.running = true
            this.playerLife = 100
            this.monsterLife = 100
            this.attackEsp = 3
            this.healing = 2
            this.logs = []
        },
        attack(especial) {
            if (!this.hasResult) {
                if (especial && this.attackEsp > 0) {
                    this.hurt('monsterLife', 3, 7, especial, 'Jogador', 'Monstro', 'player')
                    this.attackEsp--
                } else this.hurt('monsterLife', 3, 7, false, 'Jogador', 'Monstro', 'player')
            }
            if (!this.hasResult) {
            this.hurt('playerLife', 6, 15, false, 'Monstro', 'Jogador', 'monster')
            }           

        },
        hurt(prop, min, max, especial, source, target, cls) {
            const plus = especial ? 15 : 0
            const hurt = this.getRandom((min + plus), (max + plus))
            this[prop] = Math.max(this[prop] - hurt, 0)
            if (especial) {
                this.registerLog(`${source} atingiu ${target} com um ataque especial de ${hurt} de dano!!!`, cls)
            }else this.registerLog(`${source} atingiu ${target} com ${hurt} de dano.`, cls)

        },
        healAndHurt() {
            if (this.healing > 0) {
            this.heal(15, 20)
            this.hurt('playerLife', 7, 12, false, 'Monstro', 'Jogador', 'monster')
            this.healing--
            }
            
        },
        heal(min, max) {
            const heal = this.getRandom(min, max)
            this.playerLife = Math.min(this.playerLife + heal, 100)
            this.registerLog(`Jogador recuperou ${heal} de vida.`, 'player')
        },
        getRandom(min,max) {
            const value = Math.random() * (max - min) + min
            return Math.round(value)
        },
        registerLog(text, cls) {
            this.logs.unshift({ text, cls })
        }
    },
    watch: {
        hasResult(value) {
            if (value) this.running = false
        }

    }
})