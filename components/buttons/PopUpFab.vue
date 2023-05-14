<template>
	<div class="bottom-0 right-0 flex flex-col items-end m-4">
		<div v-if="state.isPopupOpen" class="mr-9">
			<div
				v-for="action in actions"
				:key="action.name"
				class="flex flex-row gap-4 mb-2 cursor-pointer group z-90 drop-shadow-lg"
				@click="$emit('actionClick', action.name)"
			>
				<div
					class="flex items-center justify-center px-4 font-bold rounded-lg text-label-lg interactive-bg-primary-container grow group-hover:bg-primary-container-hover"
				>
					{{ action.name }}
				</div>
				<div
					class="p-2 rounded-lg interactive-bg-primary-container group-hover:bg-primary-container-hover"
				>
					<Icon :name="action.icon" class="w-6 h-6" />
				</div>
			</div>
		</div>
		<!-- button -->
		<div
			class="flex items-center w-20 h-20 rounded-full interactive-bg-primary drop-shadow-lg z-90"
			@click="toggleState"
		>
			<Icon name="tabler:plus" class="mx-auto h-9 w-9" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { FabAction } from '~/models/state/FabAction'

interface Props {
	actions: FabAction[]
}
const props = defineProps<Props>()
const { actions } = toRefs(props)

interface State {
	isPopupOpen: boolean
}
const state = reactive<State>({
	isPopupOpen: false,
})

const toggleState = () => {
	state.isPopupOpen = state.isPopupOpen ? false : true
}

defineEmits(['actionClick'])
</script>
