<template>
    <section class="mw8 center">
        <page-header :title="selectedCharacter.handle" />
        <main class="pa3 pa4-ns">
            {{ selectedCharacter.handle }}
            <br />
            {{ selectedCharacter.typeString }}
            <br />
            {{ selectedCharacter.skillString }}
            <br />
            {{ selectedCharacter.descriptorString }}
            <br />
            {{ selectedCharacter.roleString }}
            <br />
            {{ selectedCharacter.hatString }}
            <br />
        </main>
    </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import PageHeader from '~/components/PageHeader.vue'

export default {
    components: {
        PageHeader,
    },

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
