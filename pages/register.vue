<template>
	<div class="flex flex-col m-auto">
		<h1 class="mb-8 text-headline-sm mx-auto">Membuat akun baru</h1>
		<div
			id="container"
			class="flex flex-col bg-surface w-60% rounded-2xl border-outline border dark:border-none"
		>
			<div
				id="form"
				class="w-full grid grid-cols-2 gap-6 rounded-2xl px-9 py-6 justify-center"
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
					v-model:input="role"
					label="Role"
					:options="[
						['praktikan', 'Praktikan'],
						['asisten', 'Asisten Praktikum'],
					]"
					:error="errors && errors.email ? errors.email : ''"
				/>
			</div>
			<div class="flex flex-col mt-9 w-full">
				<button
					type="submit"
					class="w-full bg-primary text-on-primary text-title-md font-bold py-4 rounded-lg max-w-[440px] mx-auto"
					@click="register"
				>
					Daftar
				</button>
				<div data-id="text-to-login" class="text-body-md my-9 mx-auto">
					<span>Sudah punya akun? </span>
					<span class="cursor-pointer text-secondary underline">
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

let email = ref(null)
let password = ref(null)
let confirmPassword = ref(null)
let namaLengkap = ref(null)
let npm = ref(null)
let role = ref(null)
let errors = ref<RegisterError>({ email: undefined, password: undefined })

const api = useApi()

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

	navigateTo('/login')
}
</script>
