<template>
    <nuxt-link
        class="bear-card flex pa3 db bg-grey-800 center br4 grey-000 no-underline"
        :to="/bear/ + character.handle"
    >
        <div class="flex-shrink-0 w3 h3 br3 bg-grey-900" />
        <div class="ml3 flex-auto">
            <div class="f4 fw4">
                {{ character.handle }}
            </div>
            <div
                class="bear-card__details flex items-center flex-wrap f6 fw5 tracked ttu grey-600"
            >
                <div class="flex items-center mr3">
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
                        class="w1 h1 mr2"
                    >
                        <path
                            d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z"
                        ></path>
                    </svg>
                    {{ character.typeString }}
                </div>
                <div class="flex items-center">
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
                        class="w1 h1 mr2"
                    >
                        <path
                            d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                        ></path>
                    </svg>
                    {{ character.roleString }}
                </div>
            </div>
        </div>
        <div class="">
            <button
                class="button-reset ph2 pv1 bn br-pill"
                @click.prevent="confirmDeleteCharacter(character)"
            >
                <div class="flex items-center justify-center">
                    <trash-icon />
                </div>
            </button>
        </div>
    </nuxt-link>
</template>

<script>
import { mapActions } from 'vuex'

import TrashIcon from '~/components/icons/trash.vue'

export default {
    components: {
        TrashIcon,
    },

    props: {
        character: {
            type: Object,
            default: null,
        },
    },

    methods: {
        ...mapActions(['deleteCharacter']),

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
.bear-card {
    line-height: 2rem;
}

.bear-card__details {
    line-height: 1.5rem;
}
</style>
