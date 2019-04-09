<template>
    <header
        class="flex items-center justify-between ph3 ph4-ns pv4-ns bg-grey-800 bg-transparent-ns bb-ns b--white-10"
    >
        <nuxt-link class="f6 grey-000 dim no-underline" to="/">
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
                class="v-mid"
            >
                <path
                    d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
                ></path>
            </svg>
        </nuxt-link>
        <h1 class="f5 fw5 ma0 ttu tracked-mega">
            {{ title }}
        </h1>
        <nuxt-link class="f6 grey-000 dim no-underline" to="/rules">
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
                class="v-mid"
            >
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path
                    d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"
                ></path>
            </svg>
        </nuxt-link>
    </header>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: '',
        },
    },
}
</script>

<style scoped>
header {
    line-height: 1rem;
}
</style>
