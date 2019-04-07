<template>
    <input
        :type="type"
        :class="$style.input"
        :value="value"
        @input="$emit('update', $event.target.value)"
        v-on="$listeners"
    />
</template>

<script>
export default {
    model: {
        event: 'update',
    },

    props: {
        type: {
            type: String,
            default: 'text',
        },

        value: {
            type: [String, Number],
            default: '',
        },
    },
}
</script>

<style module>
.input {
    display: block;
    width: 100%;
    margin: 0;
    font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', monospace;
    line-height: 1;
    border: 0;
    border-radius: 0;
    box-shadow: 0 2px 0 0 rgba(255, 255, 255, 0.5);
}
.input:focus {
    box-shadow: 0 2px 0 0 var(--yellow-400);
}
</style>
