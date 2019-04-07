<template>
    <div class="mw8 center">
        <page-header title="Honeyware" />
        <main class="w-100 pa3 pa4-ns">
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

            <div class="flex items-center justify-between mt5">
                <h2 class="f4 fw5 ma0 tracked">Available crew</h2>

                <nuxt-link class="dib gold dim no-underline" to="/bear">
                    Add a Bear
                </nuxt-link>
            </div>
            <div
                v-for="character in characters"
                :key="character.id"
                class="w-100 w-50-ns"
            >
                <nuxt-link
                    class="pa3 db bg-grey-800 center br4 grey-000 no-underline"
                    :to="/bear/ + character.handle"
                >
                    <div class="f5 fw5">
                        {{ character.handle }}
                    </div>
                    <div>{{ character.type }}</div>
                    <div>{{ character.role }}</div>
                    <div class="pa3">
                        <button
                            class="ph2 pv1 b0 br-pill"
                            @click="confirmDeleteCharacter(character)"
                        >
                            <div class="flex items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="feather feather-trash-2"
                                >
                                    <polyline points="3 6 5 6 21 6"></polyline>
                                    <path
                                        d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                                    ></path>
                                    <line
                                        x1="10"
                                        y1="11"
                                        x2="10"
                                        y2="17"
                                    ></line>
                                    <line
                                        x1="14"
                                        y1="11"
                                        x2="14"
                                        y2="17"
                                    ></line>
                                </svg>
                            </div>
                        </button>
                    </div>
                </nuxt-link>
            </div>
        </main>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import PageHeader from '~/components/PageHeader.vue'

export default {
    components: {
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
