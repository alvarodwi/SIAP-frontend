<template>
	<div class="flex flex-col m-auto">
		<h1 class="mx-auto font-bold text-display-md">Admin SIAP</h1>
		<span class="mx-auto mb-16 text-headline-md">
			Sistem Informasi Asisten Praktikum
		</span>
		<div
			id="container"
			class="flex flex-col bg-surface w-60% rounded-2xl px-9 py-6 border-outline border dark:border-none"
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
				class="w-full bg-primary text-on-primary text-title-md font-bold my-4 py-4 rounded-lg max-w-[440px] mx-auto"
				@click="login"
			>
				Masuk
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'auth' })

interface LoginError {
	email?: string
	password?: string
}

let email = ref(null)
let password = ref(null)
let errors = ref<LoginError>({ email: undefined, password: undefined })

const api = useApi()
const adminStore = useAdminStore()
const store = useGeneralStore()

const login = async () => {
	const data = {
		email: email.value || '',
		password: password.value || '',
	}

	const response = await api.admin.login(data)

	console.log(response)

	if (response.status == 200) {
		adminStore.onLogin(response.data.access_token)
		store.addToast({
			id: nanoid(),
			type: 'success',
			message: 'Login successful',
		})
		navigateTo('/admin')
	} else {
		store.addToast({
			id: nanoid(),
			type: 'error',
			message: response.message,
		})
	}
}
</script>
