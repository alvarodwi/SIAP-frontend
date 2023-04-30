<template>
	<div class="flex flex-col m-auto">
		<h1 class="text-display-md font-bold mx-auto">Admin SIAP</h1>
		<span class="mb-16 text-headline-md mx-auto">
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
interface LoginError {
	email?: string
	password?: string
}

let email = ref(null)
let password = ref(null)
let errors = ref<LoginError>({ email: undefined, password: undefined })

const api = useApi()

const login = async () => {
	const data = {
		email: email.value || '',
		password: password.value || '',
	}
	const response = await api.admin.login(data)

	console.log(response)

	navigateTo('/admin')
}
</script>
