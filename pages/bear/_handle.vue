<template>
    <section class="mw8 center">
        <page-header :title="selectedCharacter.handle" />
        <main class="pa3 pa4-ns">
            <p class="measure f5 f4-ns lh-copy">
                A
                <strong>{{ selectedCharacter.typeString }}</strong>
                who can
                <strong>{{ selectedCharacter.skillString }}</strong
                >. The
                <strong>
                    {{ selectedCharacter.descriptorString }}
                    {{ selectedCharacter.roleString }}
                </strong>
                of the crew.
                <span v-if="selectedCharacter.hatString">
                    Wears a
                    <strong>{{ selectedCharacter.hatString }}</strong
                    >.
                </span>
            </p>
            <div class="flex flex-wrap items-start pv4 nr4 nl4">
                <section
                    class="flex-grow-1 flex-shrink-1 w-40 pa4 ma1 bg-grey-800"
                >
                    <h2 class="ma0 f4 fw5">Stats</h2>
                    <bear-stats :stats="selectedCharacter.stats" />
                </section>
                <section
                    class="flex-grow-1 flex-shrink-1 w-40 pa4 ma1 bg-grey-800"
                >
                    <div class="flex items-center justify-between">
                        <h2 class="ma0 f4 fw5">Reminders</h2>
                        <button
                            class="button-reset bg-transparent pointer bn dib yellow-400 dim no-underline"
                            type="button"
                            @click="showModal = true"
                        >
                            Add a Bear
                        </button>
                    </div>
                </section>
            </div>
        </main>

        <v-modal v-if="showModal" @close="showModal = false">
            <h3 slot="header">New reminder</h3>
        </v-modal>
    </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import BearStats from '~/components/BearStats.vue'
import PageHeader from '~/components/PageHeader.vue'
import VModal from '~/components/VModal.vue'

export default {
    components: {
        PageHeader,
        BearStats,
        VModal,
    },

    data: () => {
        return {
            selectedCharacter: {},
            showModal: false,
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
