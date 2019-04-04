<template>
    <section class="cf pa3 pt4 mw8 center">
        <header class="ph4-m ph5-l">
            <h1 class="lh-title f2 fw8 mt0 ttu tracked-mega">Honeyware</h1>
        </header>
        <main class="w-100 pa4-m pa5-l mb3 mb5-l bg-white">
            <div class="measure">
                <p class="ttu fw8 tracked">
                    It’s Honeycon 2019.
                </p>
                <p class="mt2">
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

            <div>
                <p class="f4 ma0 mt5 ttu fw8 tracked">Available crew</p>
                <div
                    v-for="character in characters"
                    :key="character.id"
                    class="w-100 w-50-m w-25-l pa3-m pa4-l"
                >
                    <article class="bg-white center ba b--black-10">
                        <div class="pv2 ph3">
                            <h1 class="f6 ttu tracked">
                                <nuxt-link :to="/bear/ + character.handle">
                                    {{ character.handle }}
                                </nuxt-link>
                            </h1>
                        </div>
                        <div class="pa3">
                            <button @click="confirmDeleteCharacter(character)">
                                Delete
                            </button>
                        </div>
                    </article>
                </div>

                <nuxt-link class="dib mt4 black-60 dim" to="/bear">
                    Add a Bear
                </nuxt-link>
            </div>

            <nuxt-link class="dib mt4 black-60 dim" to="/rules">
                Read the rules
            </nuxt-link>
        </main>
    </section>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
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
