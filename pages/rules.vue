<template>
    <section class="mw8 center">
        <page-header title="Honey Heist rules" />
        <main class="pa3 pa4-ns">
            <div class="measure">
                <h2 class="ma0 f4 fw5">Stats</h2>
                <p>
                    You have two stats.
                    <strong>Each starts with 3 points.</strong>
                </p>
                <dl>
                    <dt class="ttu f6 fw8 tracked">Bear</dt>
                    <dd class="ml0">
                        Use to maul stuff, run &amp; climb, shrug off damage,
                        scare people, and generally do bear stuff.
                    </dd>

                    <dt class="mt2 ttu f6 fw8 tracked">Criminal</dt>
                    <dd class="ml0">
                        Use to do anything not directly related to being a bear.
                    </dd>
                </dl>

                <h2 class="ma0 mt5 f4 fw5">Actions</h2>
                <p>
                    When you act, and the outcome is in doubt, roll a
                    <var>d6</var>
                    . If it’s equal to or under the relevant stat, you succeed.
                    If it’s over the stat, you fail. If you’re using your bear
                    special-skill or doing something related to your role, roll
                    <var>2d6</var>
                    and pick the lowest.
                </p>

                <h2 class="ma0 mt5 f4 fw5">Changing states</h2>
                <dl>
                    <dt class="ttu f6 fw8 tracked">Frustration</dt>
                    <dd class="ml0">
                        When the plan fails and you run into difficulty, move
                        one point from
                        <strong>Criminal</strong>
                        into
                        <strong>Bear</strong>
                        .
                    </dd>
                    <dt class="mt2 ttu f6 fw8 tracked">Greed</dt>
                    <dd class="ml0">
                        When the plan goes off without a hitch, move one point
                        from
                        <strong>Bear</strong>
                        into
                        <strong>Criminal</strong>
                        .
                    </dd>
                </dl>
                <p>
                    You can voluntarily move one point from
                    <strong>Bear</strong>
                    to
                    <strong>Criminal</strong>
                    by doing a flashback scene in which you and the other bears
                    plan out the heist over coffee and cigarrettes in the back
                    room of a seedy bar.
                </p>
                <p>
                    You can voluntarily move one point from
                    <strong>Criminal</strong>
                    to
                    <strong>Bear</strong>
                    by eating a load of honey.
                </p>

                <h2 class="ma0 mt5 f4 fw5">The end</h2>
                <p>
                    If your
                    <strong>Criminal</strong>
                    stat ever reaches 6, you are lured into a life of crime and
                    betray the party. If your
                    <strong>Bear</strong>
                    stat ever reaches 6, you flip out bear-style and lose it.
                    Presumably to be picked up by animal control in half an hour
                    or so.
                </p>
            </div>
        </main>
    </section>
</template>

<script>
import PageHeader from '~/components/PageHeader.vue'

export default {
    components: {
        PageHeader,
    },
}
</script>
