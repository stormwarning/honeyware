<template>
    <div class="flex">
        <stat-spinner :value="bearStat" />

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

        <stat-spinner :value="criminalStat" />
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
