<template>
	<div
		class="flex flex-row px-4 py-2 mx-2 my-2 transition-all duration-500 rounded-lg max-w-ws"
		:class="data.type == 'success' ? 'bg-primary' : 'bg-error'"
	>
		<Icon
			class="w-6 h-6 mr-4"
			:name="data.type == 'success' ? 'tabler:check' : 'tabler:x'"
		/>
		<span class="">{{ data.message }}</span>
	</div>
</template>

<script setup lang="ts">
import { ToastData } from '~/models/state/ToastData'

interface Props {
	data: ToastData
}

const props = defineProps<Props>()
const { data } = toRefs(props)

const store = useGeneralStore()

setTimeout(() => store.clearToast(data.value.id), data.value.duration || 3000)
</script>
