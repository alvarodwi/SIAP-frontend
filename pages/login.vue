<template>
	<div
		id="container"
		class="flex flex-row bg-tertiary h-[414px] w-60% m-auto rounded-2xl border-outline border dark:border-none"
	>
		<div id="label" class="w-40% flex flex-col px-16 my-auto">
			<h1 class="font-bold text-display-md">SIAP</h1>
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
				class="w-full py-4 font-bold rounded-lg bg-primary text-on-primary text-title-md mt-9"
				@click="login"
			>
				Masuk
			</button>
			<div data-id="text-to-register" class="text-body-md mt-9">
				<span>Belum punya akun? </span>
				<span class="underline cursor-pointer text-secondary">
					<NuxtLink to="/register">Daftar sekarang</NuxtLink>
				</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'auth' })

interface LoginError {
	email?: string
	password?: string
}

let email = ref('')
let password = ref('')
let errors = ref<LoginError>({ email: undefined, password: undefined })

const authStore = useAuthStore()
const store = useGeneralStore()
const api = useApi()

const login = async () => {
	const data = {
		email: email.value || '',
		password: password.value || '',
	}
	const response = await api.auth.login(data)

	console.log(response)

	if (response.status == 200) {
		authStore.onLogin(
			response.data.user,
			response.data.access_token,
			response.data.asisten != undefined
		)
		store.addToast({
			id: nanoid(),
			type: 'success',
			message: 'Login success',
		})
		navigateTo('/')
	} else {
		store.addToast({
			id: nanoid(),
			type: 'error',
			message: response.message,
		})
	}
}
</script>
