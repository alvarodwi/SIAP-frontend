<template>
	<div
		id="container"
		class="flex flex-row bg-tertiary h-[414px] w-60% m-auto rounded-2xl border-outline border dark:border-none"
	>
		<div id="label" class="w-40% flex flex-col px-16 my-auto">
			<h1 class="text-display-md font-bold">SIAP</h1>
			<span class="text-headline-md">Sistem Informasi</span>
			<span class="text-headline-md">Aktivitas Praktikum</span>
		</div>
		<div
			id="form"
			class="flex flex-col w-60% bg-surface rounded-2xl px-9 py-6 justify-center"
		>
			<div class="my-4">
				<FormInputText
					v-model:input="email"
					label="Email"
					type="email"
					:error="errors && errors.email ? errors.email : ''"
				/>
			</div>
			<div class="my-4">
				<FormInputText
					v-model:input="password"
					label="Kata Sandi"
					type="password"
					:error="errors && errors.password ? errors.password : ''"
				/>
			</div>
			<button
				type="submit"
				class="w-full bg-primary text-on-primary text-title-md font-bold py-4 rounded-lg mt-9"
				@click="login"
			>
				Masuk
			</button>
			<div data-id="text-to-register" class="text-body-md mt-9">
				<span>Belum punya akun? </span>
				<span class="cursor-pointer text-secondary underline">
					<NuxtLink to="/register">Daftar sekarang</NuxtLink>
				</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
interface LoginError {
	email?: string
	password?: string
}

let email = ref(null)
let password = ref(null)
let errors = ref<LoginError>({ email: undefined, password: undefined })

const authStore = useAuthStore()
const api = useApi()

const login = async () => {
	const data = {
		email: email.value || '',
		password: password.value || '',
	}
	const response = await api.auth.login(data)

	console.log(response)

	authStore.onLogin(response.data.user, 'test', false)
	navigateTo('/')
}
</script>
