<template>
    <button
        class="w3 h3 pa0 bn br-100 white outline-0 pointer"
        type="button"
        @click="rollDie"
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
                class="feather feather-box"
            >
                <path
                    d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
                ></path>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
        </div>
    </button>
</template>

<script>
export default {
    props: {
        sides: {
            type: Number,
            default: 6,
        },
        value: {
            type: Number,
            default: null,
        },
    },

    data: () => {
        return {
            roll: null,
        }
    },

    methods: {
        rollDie() {
            this.$emit('roll', Math.floor(Math.random() * this.sides))
        },
    },
}
</script>
