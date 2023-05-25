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
			v-model:input="index"
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
			<div class="flex flex-row items-end">
				<button
					class="flex flex-row items-center gap-2 px-3 py-2 mt-4 border rounded-lg interactive-bg-surface border-outline w-fit"
					@click="fileInput?.click()"
				>
					<Icon name="tabler:plus" />
					<span>Tambah File</span>
				</button>
				<div
					v-if="formData.bukti"
					class="flex flex-row items-center gap-2 px-2 py-1 mt-2 rounded-lg cursor-pointer interactive-bg-surface-variant w-fit h-fit ml-4"
				>
					<span>{{ formData.bukti.name }}</span>
					<icon
						name="tabler:x"
						class="text-error hover:bg-surface-variant-hover"
						@click="formData.bukti = null"
					/>
				</div>
			</div>
			<input
				ref="fileInput"
				type="file"
				class="hidden"
				accept="image/jpeg, image/png"
				@change="handleFileUpload"
			/>
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
	idPertemuan: string
	namaKelas: string
}
const props = defineProps<Props>()
const { index, idPertemuan, namaKelas } = toRefs(props)

const formData: BuatIzin = reactive({
	idPertemuan: idPertemuan,
	alasan: '',
	bukti: null,
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

const fileInput = ref<HTMLElement>()
const handleFileUpload = (event: Event) => {
	let fileList = (event.target as HTMLInputElement).files
	let file = fileList ? fileList[0] : null

	if (!file) {
		return
	}

	if (file.size > 1024 * 1024) {
		alert('File too big (> 1MB)')
		return
	}
	formData.bukti = file
}

defineEmits(['submit', 'close'])
</script>
