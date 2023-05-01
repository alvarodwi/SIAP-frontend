<template>
	<div data-id="topAppBar" class="flex flex-row px-6 py-4 bg-surface">
		<button
			v-if="!hideSidebar"
			type="button"
			data-id="btn-sidebar"
			class="w-12 h-12 mr-6 rounded-full cursor-pointer interactive-bg-surface"
			@click="$emit('openSidebar')"
		>
			<Icon name="tabler:menu-2" class="w-8 h-8" />
		</button>
		<span class="my-auto font-bold grow text-display-sm">SIAP</span>
		<span class="text-title-md my-auto mx-6 max-w-[20ch] truncate"
			>Hi, {{ username }}</span
		>
		<button
			class="w-12 h-12 my-auto rounded-full interactive-bg-secondary-container"
			type="button"
			@click="$emit('onLogout')"
		>
			<Icon
				name="tabler:logout"
				class="w-8 h-8 m-auto text-on-secondary-container"
			/>
		</button>
	</div>
</template>

<script setup lang="ts">
interface Props {
	hideSidebar: boolean
	username: string
}
const props = defineProps<Props>()
const { hideSidebar } = toRefs(props)
defineEmits(['openSidebar', 'onLogout'])
</script>
