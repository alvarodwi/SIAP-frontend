<template>
	<div
		class="relative flex flex-col p-6 rounded-lg shadow bg-surface min-w-[40vw] z-50"
	>
		<Icon
			name="tabler:x"
			class="absolute top-0 right-0 m-4 rounded-full w-9 h-9 interactive-bg-surface"
			@click="$emit('close')"
		/>
		<div class="text-center">
			<h1 class="text-headline-md">Ikut Kelas</h1>
			<span class="text-title-md"> Jangan sampai salah kode kelas yaa </span>
		</div>
		<hr class="h-[2px] w-[60%] mx-auto bg-outline my-6" />
		<FormInputText
			v-model:input="formData.kode"
			label="Kode Kelas"
			type="text"
			placeholder="Tulis kode kelas disini"
			:error="errors && errors.kode ? errors.kode : ''"
		/>
		<button
			type="submit"
			class="px-16 py-3 mx-auto mt-9 font-bold rounded-lg interactive-bg-primary min-w-[40%]"
			@click="validate"
		>
			Ikut Kelas
		</button>
	</div>
</template>

<script setup lang="ts">
import { ValidationError, object, string } from 'yup'
import { IkutKelas } from '~/models/forms/IkutKelas'

const emit = defineEmits(['submit', 'close'])

const formData: IkutKelas = reactive({
	kode: '',
})

interface FormError {
	kode?: string
}

const schema = object({
	kode: string()
		.matches(/^(?=.*[a-z])([A-Za-z0-9]{6})$/, 'kode is invalid')
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
