<template>
    <div>
        <div class="h4 overflow-hidden">
            <div class="flex flex-column">
                <span
                    v-for="n in 6"
                    :key="n"
                    :class="[n === value ? 'o-100' : 'o-20']"
                    :aria-hidden="n === value ? null : true"
                    class="flex items-center justify-center w4 mv2 f2 lh-solid"
                    >{{ n }}</span
                >
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: Number,
            default: 3,
        },
    },

    data: () => {
        return {
            newValue: null,
        }
    },

    methods: {
        updateValue() {
            this.$emit('newValue')
        },
    },
}
</script>
