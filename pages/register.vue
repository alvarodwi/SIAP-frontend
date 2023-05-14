<template>
	<div class="flex flex-col m-auto">
		<h1 class="mx-auto mb-8 text-headline-sm">Membuat akun baru</h1>
		<div
			id="container"
			class="flex flex-col bg-surface w-60% rounded-2xl border-outline border dark:border-none"
		>
			<div
				id="form"
				class="grid justify-center w-full grid-cols-2 gap-6 py-6 rounded-2xl px-9"
			>
				<FormInputText
					v-model:input="email"
					label="Email"
					type="email"
					:error="errors && errors.email ? errors.email : ''"
				/>

				<FormInputText
					v-model:input="namaLengkap"
					label="Nama Lengkap"
					type="text"
					:error="errors && errors.namaLengkap ? errors.namaLengkap : ''"
				/>
				<FormInputText
					v-model:input="password"
					label="Kata Sandi"
					type="password"
					:error="errors && errors.password ? errors.password : ''"
				/>
				<FormInputText
					v-model:input="npm"
					label="NPM"
					type="text"
					:error="errors && errors.npm ? errors.npm : ''"
				/>
				<FormInputText
					v-model:input="confirmPassword"
					label="Ulangi Kata Sandi"
					type="password"
					:error="
						errors && errors.confirmPassword ? errors.confirmPassword : ''
					"
				/>
				<FormInputSelect
					v-model:selected="role"
					label="Role"
					:options="[
						['praktikan', 'Praktikan'],
						['asisten', 'Asisten Praktikum'],
					]"
					:error="errors && errors.role ? errors.role : ''"
				/>
			</div>
			<div class="flex flex-col w-full mt-9">
				<button
					type="submit"
					class="w-full bg-primary text-on-primary text-title-md font-bold py-4 rounded-lg max-w-[440px] mx-auto"
					@click="register"
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
definePageMeta({ layout: 'auth' })

interface RegisterError {
	email?: string
	password?: string
	confirmPassword?: string
	namaLengkap?: string
	npm?: string
	role?: string
}

let email = ref('')
let password = ref('')
let confirmPassword = ref('')
let namaLengkap = ref('')
let npm = ref('')
let role = ref('')
let errors = ref<RegisterError>({ email: undefined, password: undefined })

const api = useApi()
const { addToast } = useGeneralStore()

const register = async () => {
	const data = {
		email: email.value || '',
		password: password.value || '',
		confirmPassword: confirmPassword.value || '',
		name: namaLengkap.value || '',
		npm: npm.value || '',
		noTelp: '',
		isAsisten: role.value == 'asisten' ? true : false,
	}
	const response = await api.auth.register(data)

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
