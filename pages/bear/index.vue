<template>
    <section class="cf pa3 pt4 mw9 center">
        <form
            class="flex w-100 pa4-m pa5-l mb3 mb5-l bg-white"
            @submit.prevent="processSave"
        >
            <v-input
                v-model="selectedCharacter.handle"
                class="f4 outline-0"
                type="text"
            />
            <button
                class="f7 tracked b link dim ph3 ph5 pv3 mb2 dib bn pointer ttu"
                type="submit"
            >
                Submit
            </button>
        </form>
    </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import VInput from '~/components/VInput.vue'

export default {
    components: {
        VInput,
    },

    data: () => {
        return {
            selectedCharacter: {
                handle: '',
            },
            editing: false,
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
                    this.editing = true
                    this.selectedCharacter = selectedCharacter
                }

                // Else?
            })
        }
    },

    methods: {
        ...mapActions(['createCharacter', 'updateCharacter', 'loadCharacters']),

        resetAndGo() {
            this.selectedCharacter = {}
            this.$router.push({ name: 'index' })
        },

        saveNewCharacter() {
            this.createCharacter(this.selectedCharacter).then(() => {
                this.resetAndGo()
            })
        },

        saveCharacter() {
            this.updateCharacter(this.selectedCharacter).then(() => {
                this.resetAndGo()
            })
        },

        processSave() {
            this.editing ? this.saveCharacter() : this.saveNewCharacter()
        },
    },
}
</script>
