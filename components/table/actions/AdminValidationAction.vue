<template>
	<div v-if="status == 'Pending'" class="flex flex-row px-2 py-3">
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
	<div v-else class="flex flex-row px-2 py-3">
		<span
			class="px-3 py-2 font-bold rounded-lg text-label-lg"
			:class="status == 'Accepted' ? 'bg-primary' : 'bg-error'"
		>
			{{ status }}
		</span>
	</div>
</template>

<script setup lang="ts">
interface Props {
	status: 'Accepted' | 'Pending' | 'Rejected'
}

const props = defineProps<Props>()
const { status } = toRefs(props)

defineEmits(['accept', 'reject'])
</script>
