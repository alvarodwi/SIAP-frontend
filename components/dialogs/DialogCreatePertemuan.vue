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
			<h1 class="text-headline-md">Buat Pertemuan</h1>
			<span class="text-title-md">
				Pertemuan untuk kelas <span class="font-bold">{{ namaKelas }}</span>
			</span>
		</div>
		<hr class="h-[2px] w-[60%] mx-auto bg-outline my-6" />
		<FormInputText
			v-model:input="formData.indexPertemuan"
			label="Pertemuan ke-"
			type="text"
			disabled
		/>
		<FormInputText
			v-model:input="formData.judul"
			label="Judul Pertemuan"
			type="text"
			class="mt-6"
			placeholder="Tulis judul pertemuan disini"
			:error="errors && errors.judul ? errors.judul : ''"
		/>
		<FormInputDate
			v-model:date="formData.startDate"
			label="Tanggal Pertemuan"
			class="mt-6"
			:error="errors && errors.startDate ? errors.startDate : ''"
		/>
		<button
			type="submit"
			class="px-16 py-3 mx-auto mt-9 font-bold rounded-lg interactive-bg-primary min-w-[40%]"
			@click="validate"
		>
			Buat Pertemuan
		</button>
	</div>
</template>

<script setup lang="ts">
import { ValidationError, date, object, string } from 'yup'
import { BuatPertemuan } from '~/models/forms/BuatPertemuan'

const emit = defineEmits(['submit', 'close'])

interface Props {
	index: number
	namaKelas: string
}
const props = defineProps<Props>()
const { index, namaKelas } = toRefs(props)

const formData: BuatPertemuan = reactive({
	indexPertemuan: index,
	judul: '',
	startDate: new Date(),
})

interface FormError {
	judul?: string
	startDate?: string
}

const schema = object({
	judul: string().required(),
	startDate: date()
		.min(new Date(), 'startDate must be later than today')
		.required(),
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
</script>
