<template>
	<div class="flex flex-col mx-6 mt-6">
		<h1 class="font-bold text-headline-lg">
			Verifikasi Akun Asisten Praktikum
		</h1>
		<span class="mt-3 text-title-md">
			Silakan cek permintaan akun asisten dibawah ini, pastikan untuk
			memverifikasi akun yang benar yaa
		</span>
		<Table class="mt-6" :items="data" :headers="header" has-action>
			<template #action="{ id, status }">
				<AdminValidationAction
					:status="status"
					@accept="onAccept(id)"
					@reject="onReject(id)"
				/>
			</template>
		</Table>
	</div>
</template>

<script setup lang="ts">
interface ValidationTable {
	id: string
	Nama: string
	NPM: string
	status: 'Accepted' | 'Pending' | 'Rejected'
}

definePageMeta({ middleware: 'admin', layout: 'admin' })

const api = useApi()
const { addToast } = useGeneralStore()
const { token } = useAdminStore()

const data = ref<ValidationTable[]>([])
const header = ['Nama', 'NPM']

const refresh = async () => {
	const response = await api.admin.fetchApprovals(token)

	console.log(response)

	if (response.status >= 200 && response.status <= 299) {
		data.value = response.data.data.map((approval) => ({
			id: approval.id,
			Nama: approval.user.name,
			NPM: approval.user.npm,
			status: approval.status,
		}))
	} else {
		addToast({
			id: nanoid(),
			type: 'error',
			message: response.message,
		})
	}
}

refresh()

const onAccept = async (id: string) => {
	const acceptResponse = await api.admin.acceptApproval(token, id)

	if (acceptResponse.status == 201) {
		refresh()
		addToast({
			id: nanoid(),
			type: 'success',
			message: 'Role approved',
		})
	} else {
		addToast({
			id: nanoid(),
			type: 'error',
			message: acceptResponse.message,
		})
	}
}

const onReject = async (id: string) => {
	const rejectResponse = await api.admin.rejectApproval(token, id)

	if (rejectResponse.status == 201) {
		refresh()
		addToast({
			id: nanoid(),
			type: 'error',
			message: 'Role rejected',
		})
	} else {
		addToast({
			id: nanoid(),
			type: 'error',
			message: rejectResponse.message,
		})
	}
}
</script>
