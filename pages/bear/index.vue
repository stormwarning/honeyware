<template>
    <section class="mw8 center">
        <page-header :title="selectedCharacter.handle || 'Add bear'" />
        <form class="pa3 pa4-ns" @submit.prevent="processSave">
            <fieldset class="pa0 ma0 mb4 bn measure">
                <label class="w-100">
                    <span class="f6 fw5 ttu tracked">Name</span>
                    <v-input
                        v-model="selectedCharacter.handle"
                        class="pa0 pv2 input-reset bg-transparent f4 grey-000 outline-0"
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
                <span class="f6 fw5 ttu tracked">Bear type</span>
                <div class="flex items-center justify-between">
                    <bear-type-field
                        class="order-2"
                        :value="selectedCharacter.type"
                        @roll="updateType"
                    />
                    <div v-if="selectedCharacter.type">
                        <div class="f5 fw5">
                            {{ selectedTypeString }}
                        </div>
                        <div class="f7 fw7 ttu tracked grey-600">
                            {{ selectedTypeSkill }}
                        </div>
                    </div>
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
import PageHeader from '~/components/PageHeader.vue'
import VInput from '~/components/VInput.vue'
import { BEAR_TYPES } from '~/store/tables'

export default {
    components: {
        BearTypeField,
        PageHeader,
        VInput,
    },

    data: () => {
        return {
            bearTypes: BEAR_TYPES,
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
            return this.bearTypes[this.selectedCharacter.type].type
        },

        selectedTypeSkill() {
            return this.bearTypes[this.selectedCharacter.type].skill
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
        #e67700 0%,
        #f08400 16%,
        #fa9100 33%,
        #ffa007 50%,
        #ffb318 66%,
        #ffc328 83%,
        #ffd43b 100%
    );
}
</style>
