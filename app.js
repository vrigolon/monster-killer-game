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
        },
        attack(especial) {
            if (!this.hasResult) {
                if (especial && this.attackEsp > 0) {
                    this.hurt('monsterLife', 3, 7, especial)
                    this.attackEsp--
                } else this.hurt('monsterLife', 3, 7, false)
            }
            if (!this.hasResult) {
            this.hurt('playerLife', 6, 15, false)
            }           

        },
        hurt(prop, min, max, especial) {
            const plus = especial ? 15 : 0
            const hurt = this.getRandom((min + plus), (max + plus))
            this[prop] = Math.max(this[prop] - hurt, 0)

        },
        healAndHurt() {
            if (this.healing > 0) {
            this.heal(15, 20)
            this.hurt('playerLife', 7, 12, false)
            this.healing--
            }
            
        },
        heal(min, max) {
            const heal = this.getRandom(min, max)
            this.playerLife = Math.min(this.playerLife + heal, 100)
            console.log(heal + ' heal')
        },
        getRandom(min,max) {
            const value = Math.random() * (max - min) + min
            return Math.round(value)
            console.log(Math.round(value))
        },
        registerLog(text, cls) {
            this.log.unshift({ text, cls })
        }
    },
    watch: {
        hasResult(value) {
            if (value) this.running = false
        }

    }
})