<template>
	<div class="flex flex-row px-2 py-3">
		<button
			class="px-3 py-2 rounded-lg interactive-bg-primary"
			@click="$emit('accept')"
		>
			Terima
		</button>
		<button
			class="px-3 py-2 ml-4 rounded-lg interactive-bg-error"
			@click="$emit('reject')"
		>
			Tolak
		</button>
	</div>
</template>

<script setup lang="ts">
defineEmits(['accept', 'reject'])
</script>
