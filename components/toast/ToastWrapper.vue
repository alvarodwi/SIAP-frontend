<template>
	<div data-id="toast-wrapper" class="absolute right-0 flex flex-col">
		<Transition v-for="toast in toasts" :key="toast" name="fade">
			<Toast :data="toast" />
		</Transition>
	</div>
</template>

<script setup lang="ts">
const store = useGeneralStore()

const toasts = store.toasts
</script>

<style>
.fade-enter-active {
	transition: all 0.3s ease-out;
}
.fade-leave-active {
	transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-enter-from,
.fade-leave-to {
	transform: translateX(20px);
	opacity: 0;
}
</style>
