<template>
	<div
		class="relative flex flex-col p-6 rounded-lg shadow bg-surface min-w-[50vw] z-50"
	>
		<Icon
			name="tabler:x"
			class="absolute top-0 right-0 m-4 rounded-full w-9 h-9 interactive-bg-surface"
			@click="$emit('close')"
		/>
		<div class="text-center">
			<h1 class="text-headline-md">Buat Kelas Baru</h1>
			<span class="text-title-md">
				Pastikan tidak ada kelas duplikat yaa
			</span>
		</div>
		<hr class="h-[2px] w-[60%] mx-auto bg-outline my-6" />
		<FormInputText
			v-model:input="formData.judul"
			label="Nama Kelas"
			type="text"
			placeholder="Tulis judul kelas disini"
			:error="errors && errors.judul ? errors.judul : ''"
		/>
		<FormInputTextarea
			v-model:input="formData.deskripsi"
			label="Deskripsi"
			type="text"
			class="mt-6"
			:rows="5"
			placeholder="Tulis deskripsi kelas disini"
			:error="errors && errors.deskripsi ? errors.deskripsi : ''"
		/>
		<div class="flex flex-col mt-6">
			<span data-id="label" class="text-title-md">Pengampu Lainnya</span>
			<Combobox v-model="selectedOptions" multiple>
				<div class="relative mt-1">
					<div
						class="mt-2 w-full bg-surface-variant rounded-lg text-body-md min-w-[440px] border-r-[16px] border-transparent items-center justify-start flex flex-row gap-2"
					>
						<ComboboxInput
							class="px-3 py-2 text-sm leading-5 bg-transparent border-none grow focus:outline-none"
							@change="queryAsprak = $event.target.value"
						/>
						<ComboboxButton class="inset-y-0 right-0 flex items-center">
							<Icon
								name="tabler:chevron-down"
								class="w-5 h-5 text-gray-400"
								aria-hidden="true"
							/>
						</ComboboxButton>
					</div>
					<TransitionRoot
						leave="transition ease-in duration-100"
						leave-from="opacity-100"
						leave-to="opacity-0"
						@after-leave="queryAsprak = ''"
					>
						<ComboboxOptions
							class="absolute w-full py-2 mt-1 rounded-lg cursor-pointer bg-surface-variant grow"
						>
							<div
								v-if="options.length === 0 && queryAsprak !== ''"
								class="p-2 interactive-bg-surface-variant"
							>
								Nothing found.
							</div>

							<ComboboxOption
								v-for="option in options"
								:key="option.value"
								:value="option"
								class="p-2 interactive-bg-surface-variant"
							>
								<span class="w-full px-3 py-2 truncate text-body-md">
									{{ option.name }}
								</span>
							</ComboboxOption>
						</ComboboxOptions>
					</TransitionRoot>
				</div>
			</Combobox>
			<div class="flex flex-row flex-wrap max-w-full gap-2 overflow-y-auto">
				<div
					v-for="(selected, i) in selectedOptions"
					:key="i"
					class="flex flex-row items-center gap-2 px-2 py-1 mt-2 rounded-lg cursor-pointer interactive-bg-surface-variant w-fit"
				>
					<span>{{ selected.name }}</span>
					<icon
						name="tabler:x"
						class="text-error hover:bg-surface-variant-hover"
						@click="removeSelectedOption(i)"
					/>
				</div>
			</div>
		</div>

		<button
			type="submit"
			class="px-16 py-3 mx-auto mt-9 font-bold rounded-lg interactive-bg-primary min-w-[40%]"
			@click="validate"
		>
			Buat Kelas
		</button>
	</div>
</template>

<script setup lang="ts">
import { ValidationError, object, string } from 'yup'
import {
	Combobox,
	ComboboxInput,
	ComboboxButton,
	ComboboxOptions,
	ComboboxOption,
	TransitionRoot,
} from '@headlessui/vue'
import { BuatKelas } from '~/models/forms/BuatKelas'
import { DropdownItem } from '~/models/state/DropdownItem'

const emit = defineEmits(['submit', 'close'])

const formData: BuatKelas = reactive({
	judul: '',
	deskripsi: '',
	listAsistenId: [],
})

interface FormError {
	judul?: string
	deskripsi?: string
}

const schema = object({
	judul: string().required(),
	deskripsi: string().required(),
})
const errors = reactive<FormError>({})

const validate = async () => {
	schema
		.validate(formData, { abortEarly: false })
		.then((value) => {
			emit('submit', value)
		})
		.catch((err: ValidationError) => {
			Object.keys(errors).forEach(
				(i) => (errors[i as keyof typeof errors] = undefined)
			)
			err.inner.forEach((error) => {
				errors[error.path as keyof typeof errors] = error.message
			})
		})
}

const api = useApi()
const { token, user } = useAuthStore()

const queryAsprak = ref('')
const selectedOptions = ref<DropdownItem[]>([])
const options = ref<DropdownItem[]>([])

watch(
	() => queryAsprak.value,
	(to) => {
		options.value = listAsisten.filter((a) =>
			a.name.toLowerCase().startsWith(to.toLowerCase())
		)
	}
)

watch(
	() => selectedOptions.value,
	(to) => {
		formData.listAsistenId = to.map((a) => a.value)
	}
)

onMounted(() => {
	onSearchAsisten()
})

let listAsisten: DropdownItem[] = []

const onSearchAsisten = async () => {
	const response = await api.asisten.fetchAsisten(token, '', 0, 100)

	if (response.status >= 200 && response.status <= 299) {
		listAsisten = response.data.data
			.filter((item) => item.user?.id != user?.id)
			.map((a) => ({
				name: a.user?.name ?? '',
				value: a.id,
			}))
		options.value = listAsisten.slice(0, 5)
	}
}

const removeSelectedOption = (index: number) => {
	selectedOptions.value.splice(index, 1)
}
</script>
