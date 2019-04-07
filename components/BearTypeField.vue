<template>
    <div>
        <button type="button" @click="rollForType">Roll</button>
    </div>
</template>

<script>
import { BEAR_TYPES } from '~/store/tables'

export default {
    props: {
        value: {
            type: Number,
            default: null,
        },
    },

    data: () => {
        return {
            selectedType: '',
        }
    },

    methods: {
        rollForType() {
            this.$emit('roll', Math.floor(Math.random() * BEAR_TYPES.length))
        },
    },
}
</script>
