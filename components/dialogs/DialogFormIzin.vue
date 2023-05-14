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
			<h1 class="text-headline-md">Form Ketidakhadiran</h1>
			<span class="text-title-md">
				untuk kelas <span class="font-bold">{{ namaKelas }}</span>
			</span>
		</div>
		<hr class="h-[2px] w-[60%] mx-auto bg-outline my-6" />
		<FormInputText
			v-model:input="formData.indexPertemuan"
			label="Pertemuan ke-"
			type="text"
			disabled
		/>
		<FormInputSelect
			v-model="formData.alasan"
			label="Alasan Tidak Hadir"
			class="mt-6"
			:options="alasan"
		/>
		<div class="flex flex-col mt-6">
			<span data-id="label" class="text-title-md"> Upload Bukti </span>
			<button
				class="flex flex-row items-center gap-2 px-3 py-2 mt-4 border rounded-lg interactive-bg-surface border-outline w-fit"
			>
				<Icon name="tabler:plus" />
				<span>Tambah File</span>
			</button>
			<span class="mt-2 text-body-md">
				Bukti bisa berupa foto surat dokter atau surat dari orangtua
			</span>
		</div>
		<button
			type="submit"
			class="px-16 py-3 mx-auto mt-9 font-bold rounded-lg interactive-bg-primary min-w-[40%]"
			@click="$emit('submit', formData)"
		>
			Kirim Form
		</button>
	</div>
</template>

<script setup lang="ts">
import { BuatIzin } from '~/models/forms/BuatIzin'
import { DropdownItem } from '~/models/state/DropdownItem'

interface Props {
	index: number
	namaKelas: string
}
const props = defineProps<Props>()
const { index, namaKelas } = toRefs(props)

const formData: BuatIzin = reactive({
	indexPertemuan: index,
	alasan: '',
	bukti: '',
})

const alasan: DropdownItem[] = [
	{
		name: 'Sakit',
		value: 'sakit',
	},
	{
		name: 'Izin',
		value: 'izin',
	},
]

defineEmits(['submit', 'close'])
</script>
