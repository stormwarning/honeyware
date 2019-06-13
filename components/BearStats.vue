<template>
    <div class="flex items-center justify-between mw6">
        <div class="relative w3">
            <h3
                class="stat-title absolute top-0 mv0 ph2 f6 fw5 tracked ttu grey-600"
                >Bear</h3
            >
            <stat-spinner :value="bearStat" />
        </div>

        <div>
            <button
                type="button"
                :disabled="bearStat === 5"
                @click="increaseBearStat"
                >Bear</button
            >
            <button
                type="button"
                :disabled="criminalStat === 5"
                @click="increaseCriminalStat"
                >Criminal</button
            >
        </div>

        <div class="relative w3">
            <h3
                class="stat-title absolute top-0 mv0 ph2 f6 fw5 tracked ttu grey-600"
                >Criminal</h3
            >
            <stat-spinner :value="criminalStat" />
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

import StatSpinner from '~/components/StatSpinner'

export default {
    components: {
        StatSpinner,
    },

    props: {
        bear: {
            type: Number,
            default: 3,
        },
        criminal: {
            type: Number,
            default: 3,
        },
    },

    computed: {
        bearStat() {
            return this.bear
        },

        criminalStat() {
            return this.criminal
        },
    },

    methods: {
        ...mapActions(['updateStats']),

        increaseBearStat() {
            this.updateStats({
                bear: this.bear + 1,
                criminal: this.criminal - 1,
            })
        },

        increaseCriminalStat() {
            this.updateStats({
                bear: this.bear - 1,
                criminal: this.criminal + 1,
            })
        },
    },
}
</script>

<style lang="postcss" scoped>
.stat-title {
    right: 100%;
    transform: rotate(-90deg);
    transform-origin: top right;
}
</style>
