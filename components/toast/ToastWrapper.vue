<template>
	<div data-id="toast-wrapper" class="absolute right-0 flex flex-col">
		<Toast v-for="toast in toasts" :key="toast" :data="toast" />
	</div>
</template>

<script setup lang="ts">
const store = useGeneralStore()

const toasts = store.toasts
</script>
