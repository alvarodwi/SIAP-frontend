<template>
	<div
		class="relative flex flex-col p-6 rounded-lg shadow bg-surface min-w-[40vw] z-50"
	>
		<Icon
			name="tabler:x"
			class="absolute top-0 right-0 m-4 rounded-full w-9 h-9 interactive-bg-surface"
			@click="$emit('close')"
		/>
		<div class="text-center">
			<h1 class="text-headline-md">Ikut Kelas</h1>
			<span class="text-title-md"> Jangan sampai salah kode kelas yaa </span>
		</div>
		<hr class="h-[2px] w-[60%] mx-auto bg-outline my-6" />
		<FormInputText
			v-model:input="formData.kode"
			label="Kode Kelas"
			type="text"
			placeholder="Tulis kode kelas disini"
		/>
		<button
			type="submit"
			class="px-16 py-3 mx-auto mt-9 font-bold rounded-lg interactive-bg-primary min-w-[40%]"
			@click="$emit('submit', formData)"
		>
			Ikut Kelas
		</button>
	</div>
</template>

<script setup lang="ts">
import { IkutKelas } from '~/models/forms/IkutKelas'

const formData: IkutKelas = reactive({
	kode: '',
})

defineEmits(['submit', 'close'])
</script>
