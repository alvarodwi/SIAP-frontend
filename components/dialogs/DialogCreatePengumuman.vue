<template>
	<div
		class="relative flex flex-col p-6 rounded-lg shadow bg-surface w-[50vw] z-[1]"
	>
		<Icon
			name="tabler:x"
			class="absolute top-0 right-0 m-4 rounded-full w-9 h-9 interactive-bg-surface"
			@click="$emit('close')"
		/>
		<div class="text-center">
			<h1 class="text-headline-md">Buat Pengumuman</h1>
			<span class="text-title-md">
				Pengumuman untuk kelas
				<span class="font-bold">{{ namaKelas }}</span>
			</span>
		</div>
		<hr class="h-[2px] w-[60%] mx-auto bg-outline my-6" />
		<FormInputText
			v-model:input="formData.judul"
			label="Judul Pengumuman"
			type="text"
		/>
		<FormInputTextarea
			v-model:input="formData.deskripsi"
			label="Isi"
			type="text"
			:rows="6"
			class="mt-6"
			placeholder="Tulis deskripsi pengumuman disini (bisa menggunakan markdown)"
		/>
		<div class="flex flex-col mt-6">
			<span data-id="label" class="text-title-md">
				Utas Tambahan (opsional)
			</span>
			<div class="max-h-[10%] overflow-y-auto flex flex-row gap-2 flex-wrap">
				<div
					v-for="(attachment, i) in formData.attachments"
					:key="i"
					class="flex flex-row items-center gap-2 px-2 py-1 mt-2 rounded-lg cursor-pointer interactive-bg-surface-variant w-fit"
				>
					<icon name="tabler:link" />
					<span>{{ attachment.judul }}</span>
					<icon
						name="tabler:x"
						class="text-error hover:bg-surface-variant-hover"
						@click="removeAttachment(i)"
					/>
				</div>
			</div>
			<button
				class="flex flex-row items-center gap-2 px-3 py-2 mt-4 border rounded-lg interactive-bg-surface border-outline w-fit"
				@click="toggleNestedDialog()"
			>
				<Icon name="tabler:plus" />
				<span>Tambah Utas</span>
			</button>
		</div>
		<button
			type="submit"
			class="px-16 py-3 mx-auto mt-9 font-bold rounded-lg interactive-bg-primary min-w-[40%]"
			@click="$emit('submit', formData)"
		>
			Buat Pengumuman
		</button>
	</div>
	<BaseDialog
		v-if="state.isNestedDialogOpen"
		class="z-[2] bg-opacity-80"
		@backdrop-click="toggleNestedDialog"
	>
		<DialogCreateAttachment
			v-if="state.isNestedDialogOpen"
			@submit="(data : BuatAttachment) => onSubmitCreateAttachment(data)"
		/>
	</BaseDialog>
</template>

<script setup lang="ts">
import { BuatAttachment } from '~/models/forms/BuatAttachment'
import { BuatPengumuman } from '~/models/forms/BuatPengumuman'

interface Props {
	namaKelas: string
}
const props = defineProps<Props>()
const { namaKelas } = toRefs(props)

const formData: BuatPengumuman = reactive({
	judul: '',
	deskripsi: '',
	date: new Date(),
	attachments: [],
})

const addAttachment = (data: BuatAttachment) => {
	formData.attachments.push(data)
}

const removeAttachment = (index: number) => {
	formData.attachments.splice(index, 1)
}

defineEmits(['submit', 'close'])

interface State {
	isNestedDialogOpen: boolean
}
const state = reactive<State>({
	isNestedDialogOpen: false,
})

const toggleNestedDialog = () => {
	state.isNestedDialogOpen = state.isNestedDialogOpen ? false : true
}

const onSubmitCreateAttachment = (data: BuatAttachment) => {
	addAttachment(data)
	toggleNestedDialog()
}
</script>
