<template>
	<NuxtLink :to="`k/${itemId}`">
		<div
			class="flex flex-col p-2 mx-4 my-4 rounded-lg cursor-pointer interactive-bg-surface"
			@click="$emit('itemClick')"
		>
			<span class="text-title-lg">{{ title }}</span>
			<span v-if="ownerNames" class="text-title-sm">
				{{ ownerNames.join(', ') }}
			</span>
		</div>
	</NuxtLink>
	<slot />
</template>

<script setup lang="ts">
interface Props {
	itemId: string
	title: string
	ownerNames: string[]
}

const props = defineProps<Props>()
const { itemId, title, ownerNames } = toRefs(props)

defineEmits(['itemClick'])
</script>
