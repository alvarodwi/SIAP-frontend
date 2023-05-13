<template>
	<div data-id="input-text" class="flex flex-col items-start">
		<span data-id="label" class="text-title-md">{{ label }}</span>
		<VueDatePicker v-model="dateComputed" :dark="true" position="left">
			<template #dp-input="{ value }">
				<div
					class="flex flex-row items-center w-full px-3 py-2 mt-2 rounded-lg bg-surface-variant text-body-md focus:outline-none"
				>
					<Icon
						name="tabler:calendar-event"
						class="w-6 h-6 mr-4"
						alt="Search Icon"
					/>
					<input
						:id="`input-${label}`"
						:value="value"
						data-id="box"
						class="bg-surface-variant text-body-md focus:outline-none"
						:type="type"
						:maxLength="maxLength"
						:placeholder="placeholder"
						:disabled="disabled"
					/>
				</div>

				<span v-if="error" class="mt-2 text-error text-body-md">
					{{ error }}
				</span>
			</template>
		</VueDatePicker>
	</div>
</template>

<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'

interface Props {
	label: string
	date: Date | null
	type?: string
	placeholder?: string
	maxLength?: number
	error?: string
	disabled?: boolean
}

const props = defineProps<Props>()
const { label, date, placeholder, type, maxLength, error, disabled } =
	toRefs(props)

const emit = defineEmits(['update:date'])

const dateComputed = computed({
	get: () => date.value,
	set: (val) => emit('update:date', val),
})
</script>
