<template>
	<div data-id="input-text" class="flex flex-col">
		<span data-id="label" class="text-title-md">{{ label }}</span>
		<Listbox
			:id="`input-${label}`"
			class="relative"
			:model-value="props.modelValue"
			@update:model-value="(value : string) => $emit('update:modelValue', value)"
		>
			<div>
				<ListboxButton
					class="mt-2 w-full bg-surface-variant rounded-lg py-2 px-1 text-body-md focus:outline-none min-w-[440px] border-r-[16px] border-transparent items-center justify-start flex flex-row"
				>
					<span class="px-2 truncate grow text-start">
						{{ optionLabel }}
					</span>
					<Icon name="tabler:chevron-down" class="w-4 h-4" />
				</ListboxButton>
				<transition
					leave-active-class="transition duration-100 ease-in"
					leave-from-class="opacity-100"
					leave-to-class="opacity-0"
				>
					<ListboxOptions
						class="absolute w-full py-2 mt-1 rounded-lg cursor-pointer bg-surface-variant grow"
					>
						<ListboxOption
							v-for="option in props.options"
							:key="option.value"
							:value="option.value"
							class="p-2 interactive-bg-surface-variant"
						>
							<span class="w-full px-3 py-2 text-body-md">
								{{ option.name }}
							</span>
						</ListboxOption>
					</ListboxOptions>
				</transition>
			</div>
		</Listbox>
		<span v-if="error" class="mt-2 text-error text-body-md">
			{{ error }}
		</span>
	</div>
</template>

<script setup lang="ts">
import {
	Listbox,
	ListboxButton,
	ListboxOptions,
	ListboxOption,
} from '@headlessui/vue'
import { DropdownItem } from '~/models/state/DropdownItem'

interface Props {
	label: string
	modelValue: string
	options: DropdownItem[]
	error?: string
}

const props = defineProps<Props>()

const optionLabel = computed(() => {
	return props.options.find((option) => option.value === props.modelValue)
		?.name
})

defineEmits(['update:modelValue'])
</script>
