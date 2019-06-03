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
                        <h2 class="ma0 f4 fw5">Notes</h2>
                        <button
                            class="button-reset bg-transparent pointer bn dib yellow-400 dim no-underline"
                            type="button"
                            @click="showModal = true"
                        >
                            New note
                        </button>
                    </div>
                    <!-- <ul v-if="selectedCharacter.notes.length">
                        <li v-each="note in selectedCharacter.notes">{{
                            note.description
                        }}</li>
                    </ul> -->
                </section>
            </div>
        </main>

        <v-modal v-if="showModal" ref="modal" @close="showModal = false">
            <h3 slot="header">New note</h3>
            <form slot="body">
                <label
                    v-for="(type, index) in noteTypes"
                    :key="index"
                    class="flex items-center mv2 mr3 lh-solid pointer"
                >
                    <input
                        v-model="newNoteType"
                        :value="type"
                        class="mr2"
                        type="radio"
                        name="type"
                    />
                    <span class="f7 f6-ns tracked">{{ type }}</span>
                </label>
                <textarea v-model="newNoteDesc"></textarea>
            </form>
            <div slot="footer">
                <button
                    class="modal-default-button"
                    type="button"
                    @click.prevent="addNewNote"
                >
                    Save
                </button>
                <button
                    class="modal-default-button"
                    type="button"
                    @click="closeModal"
                >
                    Cancel
                </button>
            </div>
        </v-modal>
    </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import BearStats from '~/components/BearStats.vue'
import PageHeader from '~/components/PageHeader.vue'
import VModal from '~/components/VModal.vue'
import { NOTE_TYPES } from '~/store/tables'

export default {
    components: {
        PageHeader,
        BearStats,
        VModal,
    },

    data: () => {
        return {
            noteTypes: NOTE_TYPES,
            selectedCharacter: {},
            showModal: false,
            newNoteType: '',
            newNoteDesc: '',
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
        ...mapActions(['addNote', 'loadCharacters']),

        addNewNote() {
            let type = this.newNoteType
            let description = this.newNoteDesc

            this.addNote({
                character: this.selectedCharacter,
                note: {
                    type,
                    description,
                },
            }).then(() => {
                this.closeModal()
                this.newNoteType = ''
                this.newNoteDesc = ''
            })
        },

        closeModal() {
            this.$refs.modal.$emit('close')
        },
    },
}
</script>
