<template>
	<div data-id="input-text" class="flex flex-col">
		<span data-id="label" class="text-title-md">{{ label }}</span>
		<textarea
			:id="`input-${label}`"
			v-model="inputComputed"
			data-id="box"
			class="mt-2 bg-surface-variant rounded-lg py-2 px-3 text-body-md focus:outline-none min-w-[440px]"
			:type="type"
			:rows="rows"
			:cols="cols"
			:maxLength="maxLength"
			:placeholder="placeholder"
			:disabled="disabled"
		/>
		<span v-if="error" class="mt-2 text-error text-body-md">
			{{ error }}
		</span>
	</div>
</template>

<script setup lang="ts">
interface Props {
	label: string
	input: string
	rows?: number
	cols?: number
	type?: string
	placeholder?: string
	maxLength?: number
	error?: string
	disabled?: boolean
}

const props = defineProps<Props>()
const {
	label,
	input,
	rows,
	cols,
	placeholder,
	type,
	maxLength,
	error,
	disabled,
} = toRefs(props)

const emit = defineEmits(['update:input'])

const inputComputed = computed({
	get: () => input.value,
	set: (val) => emit('update:input', val),
})
</script>
