<template>
	<div
		class="relative flex flex-col p-6 rounded-lg shadow bg-surface min-w-[50vw] z-70"
	>
		<Icon
			name="tabler:x"
			class="absolute top-0 right-0 m-4 rounded-full w-9 h-9 interactive-bg-surface"
			@click="$emit('close')"
		/>
		<div class="text-left">
			<h1 class="text-headline-md">Tambah Utas</h1>
		</div>
		<hr class="h-[2px] w-[60%] mr-auto bg-outline my-6" />
		<FormInputText
			v-model:input="formData.judul"
			label="Judul Utas"
			type="text"
			placeholder="Tulis judul utas disini"
			:error="errors && errors.judul ? errors.judul : ''"
		/>
		<FormInputText
			v-model:input="formData.url"
			label="Link"
			type="text"
			class="mt-6"
			placeholder="Tulis url utas disini"
			:error="errors && errors.url ? errors.url : ''"
		/>
		<button
			type="submit"
			class="px-16 py-3 mr-auto mt-9 font-bold rounded-lg interactive-bg-primary min-w-[40%]"
			@click="validate"
		>
			Tambah Utas
		</button>
	</div>
</template>

<script setup lang="ts">
import { ValidationError, object, string } from 'yup'
import { BuatAttachment } from '~/models/forms/BuatAttachment'

const emit = defineEmits(['submit', 'close'])

const formData: BuatAttachment = reactive({
	judul: '',
	url: '',
})

interface FormError {
	judul?: string
	url?: string
}

const schema = object({
	judul: string().required(),
	url: string().url().required(),
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
