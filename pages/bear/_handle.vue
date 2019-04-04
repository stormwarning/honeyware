<template>
    <section class="cf pa3 pt4 mw8 center">
        <header class="ph4-m ph5-l">
            <h1 class="lh-title f2 fw8 mt0 ttu tracked-mega">
                {{ selectedCharacter.handle }}
            </h1>
        </header>
        <main class="w-100 pa4-m pa5-l mb3 mb5-l bg-white"></main>
    </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    data: () => {
        return {
            selectedCharacter: {},
        }
    },

    computed: {
        ...mapGetters(['getCharacterById', 'getCharacterByHandle']),
    },

    mounted() {
        if ('handle' in this.$route.params) {
            this.loadCharacters().then(() => {
                let selectedCharacter = this.getCharacterByHandle(
                    this.$route.params.handle,
                )

                if (selectedCharacter) {
                    this.selectedCharacter = selectedCharacter
                }

                // Else?
            })
        }
    },

    methods: {
        ...mapActions(['updateCharacter', 'loadCharacters']),

        saveCharacter() {
            this.updateCharacter(this.selectedCharacter).then(() => {
                this.resetAndGo()
            })
        },
    },
}
</script>
