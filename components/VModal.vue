<template>
    <transition v-if="isModalOpen" name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div
                    class="modal-container relative center pa4 br2 bg-grey-000 shadow-4"
                >
                    <div class="modal-header">
                        <slot name="header"></slot>
                    </div>

                    <div class="modal-body">
                        <slot name="body"></slot>
                    </div>

                    <div class="modal-footer flex align-center justify-center">
                        <slot name="footer"></slot>
                    </div>

                    <div class="modal-close absolute top-0 right-0 pa3">
                        <button
                            class="button-reset w2 h2 pa2 bw0 bg-transparent pointer"
                            @click="$emit('toggle')"
                        >
                            <div
                                class="flex items-center justify-center w-100 h-100"
                            >
                                ×
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        isModalOpen: {
            type: Boolean,
            default: false,
        },
    },
}
</script>

<style>
.modal-mask {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9998;
    display: table;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity 500ms ease;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.modal-container {
    width: 300px;
    transition: all 500ms ease;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
    opacity: 0;
}

.modal-leave-to {
    opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-to .modal-container {
    transform: translateY(25vh);
}
</style>
