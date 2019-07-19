<template>
    <section class="mw8 center">
        <page-header :title="selectedCharacter.handle" />
        <main class="section-grid pa3 pa4-ns overflow-hidden">
            <section class="bio-section">
                <p class="mv4 measure f4 lh-copy">
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
            </section>

            <section class="stats-section">
                <div class="nl4 nr4 mr0-l pa4 bg-grey-800">
                    <h2 class="ma0 f4 fw5">Stats</h2>
                    <bear-stats v-bind="selectedCharacter.stats" />
                </div>
            </section>

            <section class="notes-section">
                <div class="nl4 nr4 ml0-l pa4 bg-grey-800">
                    <div class="flex items-center justify-between">
                        <h2 class="ma0 f4 fw5">Notes</h2>
                        <button
                            class="button-reset bg-transparent pointer bn dib yellow-400 dim no-underline"
                            type="button"
                            @click="showModal = true"
                        >
                            Add a note
                        </button>
                    </div>
                    <ul v-if="hasNotes">
                        <li
                            v-for="(note, index) in selectedCharacter.notes"
                            :key="index"
                            >{{ note.description }}
                            <button
                                class="button-reset ph2 pv1 bn br-pill"
                                @click.prevent="confirmDeleteNote(index)"
                                ><div class="flex items-center justify-center">
                                    <trash-icon />
                                </div> </button
                        ></li>
                    </ul>
                </div>
            </section>
        </main>

        <v-modal
            ref="modal"
            :is-modal-open="showModal"
            @toggle="showModal = !showModal"
        >
            <h3 slot="header" class="ma0 f4 fw5 grey-900">New note</h3>
            <form slot="body" class="mt3">
                <!-- <label
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
                </label> -->
                <textarea
                    v-model="newNoteDesc"
                    class="input-reset w-100 h3 b--grey-300"
                ></textarea>
            </form>
            <div slot="footer" class="absolute bottom--1">
                <button
                    class="button-reset pa2 ph4 fw5 ttu white submit-button bw0 br-pill pointer"
                    type="button"
                    @click.prevent="addNewNote"
                >
                    Save
                </button>
            </div>
        </v-modal>
    </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import TrashIcon from '~/components/icons/trash.vue'
import BearStats from '~/components/BearStats.vue'
import PageHeader from '~/components/PageHeader.vue'
import VModal from '~/components/VModal.vue'
import { NOTE_TYPES } from '~/store/tables'

export default {
    components: {
        PageHeader,
        TrashIcon,
        BearStats,
        VModal,
    },

    data() {
        return {
            noteTypes: NOTE_TYPES,
            showModal: false,
            newNoteType: '',
            newNoteDesc: '',
        }
    },

    computed: {
        ...mapGetters(['getCharacterById', 'getCharacterByHandle']),

        selectedCharacter() {
            return this.$store.state.selectedCharacter
        },

        hasNotes() {
            if (this.selectedCharacter.notes) {
                return this.selectedCharacter.notes.length > 0
            } else {
                return false
            }
        },
    },

    mounted() {
        if ('handle' in this.$route.params) {
            this.loadCharacters().then(() => {
                let selectedCharacter = this.getCharacterByHandle(
                    this.$route.params.handle,
                )

                if (selectedCharacter) {
                    this.setCharacter(selectedCharacter)
                }

                // Else?
            })
        }
    },

    methods: {
        ...mapActions([
            'addNote',
            'deleteNote',
            'loadCharacters',
            'setCharacter',
        ]),

        addNewNote() {
            // let type = this.newNoteType
            let description = this.newNoteDesc

            this.addNote({
                character: this.selectedCharacter,
                note: {
                    type: 'reminder',
                    description,
                },
            }).then(() => {
                this.closeModal()
                this.newNoteType = ''
                this.newNoteDesc = ''
            })
        },

        confirmDeleteNote(note) {
            if (confirm(`Are you sure you want to delete this note?`)) {
                this.deleteNote({
                    character: this.selectedCharacter,
                    note,
                })
            }
        },

        closeModal() {
            this.$refs.modal.$emit('close')
        },
    },
}
</script>

<style lang="postcss" scoped>
.section-grid {
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-flow: row;
    grid-gap: 1rem;

    @media screen and (min-width: 60em) {
        grid-template-columns: repeat(2, 1fr);
        grid-auto-flow: column;
    }
}

.bio-section {
    grid-column: 1;
}

.stats-section {
    grid-column: 1;
}

.notes-section {
    @media screen and (min-width: 60em) {
        grid-row: 1 / 3;
        grid-column: 2;
    }
}
</style>
