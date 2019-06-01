<template>
    <div class="flex">
        <stat-spinner :value="bearStat" />

        <div></div>

        <stat-spinner :value="criminalStat" />
    </div>
</template>

<script>
import StatSpinner from '~/components/StatSpinner'

export default {
    components: {
        StatSpinner,
    },

    props: {
        stats: {
            type: Object,
            default: () => ({ bear: 3, criminal: 3 }),
        },
    },

    computed: {
        bearStat() {
            return this.stats.bear
        },
        criminalStat() {
            return this.stats.criminal
        },
    },
}
</script>
