<template>
	<div class="flex flex-col m-auto">
		<h1 class="mx-auto mb-8 text-headline-sm">Membuat akun baru</h1>
		<div
			id="container"
			class="flex flex-col bg-surface w-60% rounded-2xl border-outline border dark:border-none"
		>
			<div
				id="form"
				class="grid justify-center items-center w-full grid-cols-2 gap-6 py-6 rounded-2xl px-9"
			>
				<FormInputText
					v-model:input="formData.email"
					label="Email"
					type="email"
					:error="errors && errors.email ? errors.email : ''"
				/>

				<FormInputText
					v-model:input="formData.name"
					label="Nama Lengkap"
					type="text"
					:error="errors && errors.name ? errors.name : ''"
				/>
				<FormInputText
					v-model:input="formData.password"
					label="Kata Sandi"
					type="password"
					:error="errors && errors.password ? errors.password : ''"
				/>
				<FormInputText
					v-model:input="formData.npm"
					label="NPM"
					type="text"
					:error="errors && errors.npm ? errors.npm : ''"
				/>
				<FormInputText
					v-model:input="formData.confirmPassword"
					label="Ulangi Kata Sandi"
					type="password"
					:error="
						errors && errors.confirmPassword ? errors.confirmPassword : ''
					"
				/>
				<FormInputSelect
					v-model="formData.role"
					label="Role"
					:options="listRole"
					:error="errors && errors.role ? errors.role : ''"
				/>
			</div>
			<div class="flex flex-col w-full mt-9">
				<button
					type="submit"
					class="w-full bg-primary text-on-primary text-title-md font-bold py-4 rounded-lg max-w-[440px] mx-auto"
					@click="validate"
				>
					Daftar
				</button>
				<div data-id="text-to-login" class="mx-auto text-body-md my-9">
					<span>Sudah punya akun? </span>
					<span class="underline cursor-pointer text-secondary">
						<NuxtLink to="/login">Masuk</NuxtLink>
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { object, string, ValidationError, ref as Yupref } from 'yup'
import { DropdownItem } from '~/models/state/DropdownItem'

definePageMeta({ layout: 'auth' })

interface Register {
	email: string
	name: string
	npm: string
	role: string
	password: string
	confirmPassword: string
}

interface RegisterError {
	email?: string
	name?: string
	npm?: string
	role?: string
	password?: string
	confirmPassword?: string
}

const formData = reactive<Register>({
	email: '',
	name: '',
	npm: '',
	role: '',
	password: '',
	confirmPassword: '',
})

const registerSchema = object({
	email: string().email().required(),
	name: string().min(10).required(),
	npm: string()
		.min(12)
		.matches(/^([0-9]+)$/, 'npm must be a number')
		.required(),
	role: string().required(),
	password: string().min(8).required(),
	confirmPassword: string()
		.oneOf([Yupref('password'), undefined], 'password must match')
		.required(),
})
const errors = reactive<RegisterError>({})

const listRole: DropdownItem[] = [
	{
		name: 'Praktikan',
		value: 'praktikan',
	},
	{
		name: 'Asisten Praktikum',
		value: 'asisten',
	},
]

const api = useApi()
const { addToast } = useGeneralStore()

const validate = async () => {
	registerSchema
		.validate(formData, { abortEarly: false })
		.then((value) => {
			register(value)
		})
		.catch((err: ValidationError) => {
			Object.keys(errors).forEach(
				(i) => (errors[i as keyof typeof errors] = undefined)
			)
			console.log('Validation Error =>', err)
			err.inner.forEach((error) => {
				console.log('Error =>', error.path, '->', error.message)
				errors[error.path as keyof typeof errors] = error.message
			})
		})
}

const register = async (data: Register) => {
	const response = await api.auth.register({
		...data,
		noTelp: '',
		isAsisten: data.role == 'asisten' ? true : false,
	})

	console.log(response)

	if (response.status == 201) {
		addToast({
			id: nanoid(),
			type: 'success',
			message: 'Registered succesfully',
		})
		navigateTo('/login')
	} else {
		addToast({
			id: nanoid(),
			type: 'error',
			message: response.message,
		})
	}
}
</script>
