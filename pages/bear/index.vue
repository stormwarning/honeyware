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
                    <dice-roller
                        class="order-2"
                        :value="selectedCharacter.type"
                        @roll="(num) => updateSheet('type', num)"
                    />
                    <div v-if="selectedCharacter.type !== null">
                        <div class="f5 fw5">
                            {{ selectedCharacter.typeString }}
                        </div>
                        <div class="f7 fw7 ttu tracked grey-600">
                            {{ selectedCharacter.skillString }}
                        </div>
                    </div>
                    <div v-else>
                        <div class="f5 fw5 grey-600">
                            Roll for your bear type
                        </div>
                    </div>
                </div>
            </fieldset>

            <fieldset class="pa0 ma0 mb4 bn measure">
                <span class="f6 fw5 ttu tracked">Descriptor</span>
                <div class="flex items-center justify-between">
                    <dice-roller
                        class="order-2"
                        :value="selectedCharacter.descriptor"
                        @roll="(num) => updateSheet('descriptor', num)"
                    />
                    <div v-if="selectedCharacter.descriptor !== null">
                        <div class="f5 fw5">
                            {{ selectedCharacter.descriptorString }}
                        </div>
                    </div>
                    <div v-else>
                        <div class="f5 fw5 grey-600">
                            Roll for your descriptor
                        </div>
                    </div>
                </div>
            </fieldset>
            <fieldset class="pa0 ma0 mb4 bn measure">
                <span class="f6 fw5 ttu tracked">Role</span>
                <div class="flex items-center justify-between">
                    <dice-roller
                        class="order-2"
                        :value="selectedCharacter.role"
                        @roll="(num) => updateSheet('role', num)"
                    />
                    <div v-if="selectedCharacter.role !== null">
                        <div class="f5 fw5">
                            {{ selectedCharacter.roleString }}
                        </div>
                    </div>
                    <div v-else>
                        <div class="f5 fw5 grey-600">
                            Roll for your role on the crew
                        </div>
                    </div>
                </div>
            </fieldset>

            <fieldset class="pa0 ma0 mb4 bn measure">
                <span class="f6 fw5 ttu tracked">Hat (Optional)</span>
                <div class="flex items-center justify-between">
                    <dice-roller
                        class="order-2"
                        :sides="8"
                        :value="selectedCharacter.hat"
                        @roll="(num) => updateSheet('hat', num)"
                    />
                    <div v-if="selectedCharacter.hat !== null">
                        <div class="f5 fw5">
                            {{ selectedCharacter.hatString }}
                        </div>
                    </div>
                    <div v-else>
                        <div class="f5 fw5 grey-600">
                            Roll for your optional hat
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

import DiceRoller from '~/components/DiceRoller.vue'
import PageHeader from '~/components/PageHeader.vue'
import VInput from '~/components/VInput.vue'
import {
    BEAR_TYPES,
    BEAR_DESCRIPTORS,
    BEAR_ROLES,
    BEAR_HATS,
} from '~/store/tables'

export default {
    components: {
        DiceRoller,
        PageHeader,
        VInput,
    },

    data: () => {
        return {
            BEAR_TYPES,
            BEAR_DESCRIPTORS,
            BEAR_ROLES,
            BEAR_HATS,
            selectedCharacter: {
                handle: '',
                type: null,
                descriptor: null,
                role: null,
                hat: null,
            },
            editing: false,
        }
    },

    computed: {
        ...mapGetters(['getCharacterById', 'getCharacterByHandle']),

        selectedTypeString() {
            return this.BEAR_TYPES[this.selectedCharacter.type].type
        },

        selectedTypeSkill() {
            return this.BEAR_TYPES[this.selectedCharacter.type].skill
        },

        selectedDescriptor() {
            return this.BEAR_DESCRIPTORS[this.selectedCharacter.descriptor]
        },

        selectedRole() {
            return this.BEAR_ROLES[this.selectedCharacter.role]
        },

        selectedHat() {
            return this.BEAR_HATS[this.selectedCharacter.hat]
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

        updateSheet(field, value) {
            let table = `BEAR_${field.toUpperCase()}S`

            this.selectedCharacter[field] = value

            if (field === 'type') {
                this.selectedCharacter[`${field}String`] = this[table][
                    value
                ].type
                this.selectedCharacter['skillString'] = this[table][value].skill
            } else {
                this.selectedCharacter[`${field}String`] = this[table][value]
            }
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
