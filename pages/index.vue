<template>
    <div class="mw8 center">
        <page-header title="Honeyware" />
        <main class="w-100 pa3 pa4-ns">
            <div class="measure">
                <p class="ttu fw8 tracked">
                    It’s Honeycon 2019.
                </p>
                <p class="mt3">
                    You are going to undertake the greatest heist the world has
                    ever seen. Just two things:
                </p>
                <ol class="ma0 mt3">
                    <li>
                        You have a complex plan that requires precise timing
                    </li>
                    <li>
                        You are
                        <strong>a goddamn bear</strong>
                    </li>
                </ol>
            </div>

            <div class="flex items-center justify-between mt5">
                <h2 class="f4 fw5 ma0">Available crew</h2>

                <nuxt-link class="dib yellow-400 dim no-underline" to="/bear">
                    Add a Bear
                </nuxt-link>
            </div>
            <div class="crew-grid mt3 mt4-l">
                <div v-for="character in characters" :key="character.id">
                    <bear-card :character="character" />
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import BearCard from '~/components/BearCard.vue'
import PageHeader from '~/components/PageHeader.vue'

export default {
    components: {
        BearCard,
        PageHeader,
    },

    computed: {
        ...mapState({
            characters: (state) => state.characters,
        }),
    },

    mounted() {
        this.loadCharacters()
    },

    methods: {
        ...mapActions(['deleteCharacter', 'loadCharacters']),

        confirmDeleteCharacter(character) {
            if (
                confirm(`Are you sure you want to delete ${character.handle}?`)
            ) {
                this.deleteCharacter(character)
            }
        },
    },
}
</script>

<style>
.crew-grid {
    display: grid;
    grid-template-columns: repeat(1, 100%);
    grid-auto-flow: row dense;
    grid-gap: 1rem;
}
@media screen and (min-width: 45em) {
    .crew-grid {
        grid-template-columns: repeat(2, minmax(auto, 50%));
    }
}
</style>
