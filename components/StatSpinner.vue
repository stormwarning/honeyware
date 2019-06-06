<template>
    <div>
        <div class="h4 overflow-hidden">
            <div
                ref="list"
                :style="{ transform: 'translateY(' + spinPosition + 'px)' }"
                class="tumbler flex flex-column pv4 mv2"
            >
                <span
                    v-for="n in values"
                    :key="n"
                    :class="[n === value ? 'o-100' : 'o-20']"
                    :aria-hidden="n !== value"
                    class="flex items-center justify-center w3 pv2 f3 lh-solid"
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

    data() {
        return {
            values: [1, 2, 3, 4, 5, 6],
            list: null,
            newValue: null,
        }
    },

    computed: {
        spinPosition() {
            let list = this.list
            let num = this.value - 1
            let pos = 0

            if (list) {
                pos =
                    list.querySelectorAll('span')[num].offsetTop -
                    parseInt(getComputedStyle(list)['paddingTop'])
            }

            return -pos
        },
    },

    mounted() {
        this.list = this.$refs.list
    },

    methods: {
        updateValue() {
            this.$emit('newValue')
        },
    },
}
</script>

<style scoped>
.tumbler {
    transition: transform 150ms;
}
.tumbler span {
    transition: opacity 150ms;
}
</style>
