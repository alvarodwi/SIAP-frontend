<template>
	<div class="flex flex-col mx-6 mt-6">
		<h1 class="font-bold text-headline-lg">
			Verifikasi Akun Asisten Praktikum
		</h1>
		<span class="mt-3 text-title-md">
			Silakan cek permintaan akun asisten dibawah ini, pastikan untuk
			memverifikasi akun yang benar yaa
		</span>
		<Table class="mt-6" :items="dummyData" :headers="dummyHeader" has-action>
			<template #action="{ Nama }">
				<AdminValidationAction
					@accept="onAccept(Nama)"
					@reject="onReject(Nama)"
				/>
			</template>
		</Table>
	</div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'admin', layout: 'admin' })

const dummyData = [
	{ Nama: 'Andyka Baswara', NPM: '140810200061' },
	{ Nama: 'Alvaro Dwi', NPM: '140810200041' },
]
const dummyHeader = ['Nama', 'NPM']

const onAccept = (id: string) => {
	console.log(id + ' diterima')
}

const onReject = (id: string) => {
	console.log(id + ' ditolak')
}
</script>
