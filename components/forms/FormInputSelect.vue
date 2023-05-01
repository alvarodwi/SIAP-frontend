<template>
	<div data-id="input-text" class="flex flex-col">
		<span data-id="label" class="text-title-md">{{ label }}</span>
		<select
			:id="`input-${label}`"
			v-model="selectedComputed"
			data-id="box"
			class="mt-2 bg-surface-variant rounded-lg py-2 px-3 text-body-md focus:outline-none min-w-[440px] border-r-[16px] border-transparent"
		>
			<option
				v-for="option in options"
				:key="option[0]"
				:value="option[0]"
				@click="selected = option[0]"
			>
				{{ option[1] }}
			</option>
		</select>
		<span v-if="error" class="mt-2 text-error text-body-md">
			{{ error }}
		</span>
	</div>
</template>

<script setup lang="ts">
interface Props {
	label: string
	selected: string
	options: [string, string][]
	error?: string
}

const props = defineProps<Props>()
const { label, selected, options, error } = toRefs(props)

const emit = defineEmits(['update:selected'])

const selectedComputed = computed({
	get: () => selected.value,
	set: (val) => emit('update:selected', val),
})
</script>
