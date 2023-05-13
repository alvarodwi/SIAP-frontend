<template>
	<NuxtLink :to="url">
		<div
			class="px-3 py-3 mb-3 rounded-lg"
			:class="
				isActive
					? 'interactive-bg-secondary-container'
					: 'interactive-bg-surface'
			"
		>
			<span class="text-label-large">{{ label }}</span>
		</div>
	</NuxtLink>
</template>

<script setup lang="ts">
interface Props {
	isActive: boolean
	label: string
	url: string
}

const props = defineProps<Props>()
const { isActive, label, url } = toRefs(props)
</script>
