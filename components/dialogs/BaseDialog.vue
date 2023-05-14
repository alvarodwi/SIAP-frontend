<template>
	<div
		data-id="base-modal"
		class="fixed z-10 flex w-screen h-screen p-4 overflow-x-hidden overflow-y-auto bg-surface bg-opacity-60 md:inset-0"
		@click="$emit('backdropClick')"
	>
		<div class="relative m-auto" @click.stop>
			<slot />
		</div>
	</div>
</template>

<script setup lang="ts">
defineEmits(['backdropClick'])
</script>
