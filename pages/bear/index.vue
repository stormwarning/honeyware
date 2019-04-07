<template>
    <section class="cf pa3 pt4 mw8 center">
        <form
            class="w-100 pa4-m pa5-l mb3 mb5-l bg-white"
            @submit.prevent="processSave"
        >
            <fieldset class="pa0 ma0 mb4 bn measure">
                <label class="w-100">
                    <span class="f6 ttu tracked black-30">Name</span>
                    <v-input
                        v-model="selectedCharacter.handle"
                        class="f4 outline-0"
                        type="text"
                        placeholder="This is where the name goes"
                    />
                </label>
                <p class="f7">
                    Name your bear. You’re not a talking bear, per se, but you
                    can sort of mangle human speech through your bear mouth,
                    maybe?
                </p>
                <p class="f7">You can talk to each other, though.</p>
            </fieldset>
            <fieldset class="pa0 ma0 mb4 bn measure">
                <span class="f6 ttu tracked black-30">Bear type</span>
                {{ selectedCharacter.type }}
                <bear-type-field
                    :value="selectedCharacter.type"
                    @roll="updateType"
                />
                <div v-if="selectedCharacter.type">
                    Type: {{ selectedTypeString }} Special skill:
                    {{ selectedTypeSkill }}
                </div>
            </fieldset>
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

import BearTypeField from '~/components/BearTypeField.vue'
import VInput from '~/components/VInput.vue'
import { BEAR_TYPES } from '~/store/tables'

export default {
    components: {
        BearTypeField,
        VInput,
    },

    data: () => {
        return {
            selectedCharacter: {
                handle: '',
                type: null,
                descriptor: null,
                role: null,
            },
            editing: false,
        }
    },

    computed: {
        ...mapGetters(['getCharacterById', 'getCharacterByHandle']),

        selectedTypeString() {
            return BEAR_TYPES[this.selectedCharacter.type].type || null
        },

        selectedTypeSkill() {
            return BEAR_TYPES[this.selectedCharacter.type].skill || null
        },
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

        updateType(type) {
            console.log('type', type)
            this.selectedCharacter.type = type
        },

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

<style>
form button {
    font-family: inherit;
    background-image: linear-gradient(
        30deg,
        #e07f21 0%,
        #e78d1c 16%,
        #ed9b15 33%,
        #f2aa0d 50%,
        #f6b904 66%,
        #f8c800 83%,
        #f9d800 100%
    );
}
</style>
