<template>
	<div
		class="relative flex flex-col p-6 rounded-lg shadow bg-surface min-w-[50vw] z-50"
	>
		<Icon
			name="tabler:x"
			class="absolute top-0 right-0 m-4 rounded-full w-9 h-9 interactive-bg-surface"
			@click="$emit('close')"
		/>
		<div class="text-center">
			<h1 class="text-headline-md">Buat Kelas Baru</h1>
			<span class="text-title-md">
				Pastikan tidak ada kelas duplikat yaa
			</span>
		</div>
		<hr class="h-[2px] w-[60%] mx-auto bg-outline my-6" />
		<FormInputText
			v-model:input="formData.judul"
			label="Nama Kelas"
			type="text"
			placeholder="Tulis judul kelas disini"
		/>
		<FormInputTextarea
			v-model:input="formData.deskripsi"
			label="Deskripsi"
			type="text"
			class="mt-6"
			:rows="5"
			placeholder="Tulis deskripsi kelas disini"
		/>
		<FormInputSelect
			v-model="formData.listAsisten"
			label="Pengampu Lainnya"
			:options="listAsprak"
			class="mt-6"
		/>
		<button
			type="submit"
			class="px-16 py-3 mx-auto mt-9 font-bold rounded-lg interactive-bg-primary min-w-[40%]"
			@click="$emit('submit', formData)"
		>
			Buat Kelas
		</button>
	</div>
</template>

<script setup lang="ts">
import { BuatKelas } from '~/models/forms/BuatKelas'
import { DropdownItem } from '~/models/state/DropdownItem'

const formData: BuatKelas = reactive({
	judul: '',
	deskripsi: '',
	listAsisten: [],
})

const listAsprak: DropdownItem[] = [
	{
		name: 'Rihlan Lumenda',
		value: 'rihlan13',
	},
	{
		name: 'Rafiansyah Rasyid',
		value: 'acid49',
	},
]

defineEmits(['submit', 'close'])
</script>
