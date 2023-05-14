<!-- eslint-disable vue/no-v-html -->
<template>
	<div class="flex flex-col">
		<div class="flex flex-row mt-4 mb-4">
			<Icon
				name="tabler:calendar-event"
				class="w-12 h-12 mr-4 text-outline"
			/>
			<div class="flex flex-col align-middle grow">
				<span class="font-bold text-headline-sm"> Slide Pertemuan 1 </span>
				<span class="text-title-md"> Senin, 27 Februari 2023 </span>
			</div>
		</div>
		<div class="mb-4" v-html="compiledMarkdown"></div>
		<NuxtLink v-for="i in 2" :key="i" to="">
			<div
				class="flex flex-row items-center my-2 cursor-pointer mt hover:opacity-80"
			>
				<div
					class="flex items-center w-12 h-12 align-middle border rounded-lg border-outline"
				>
					<Icon name="tabler:link" class="w-6 h-6 mx-auto text-outline" />
				</div>
				<span class="ml-3 text-title-sm grow">Presensi Pertemuan 1</span>
			</div>
		</NuxtLink>
		<slot />
	</div>
</template>

<script setup lang="ts">
import { Broadcast } from '~/models/Broadcast'
import { marked } from 'marked'

interface Props {
	data?: Broadcast
}

const dummyMarkdown = `
Bentuk kelompok yang terdiri dari 4 orang dan tentukan nama kelompok, harus unik!

Tentukan juga role utama setiap individu dalam tim. Role yang dapat dipilih antara lain: Project manager, UI/ UX designer, Front end developer, Back end developer
<br/><br/>
Catatan: Role utama hanya bertindak sebagai koordinator pekerjaan dan bukan berarti mengerjakan jobdesc role sendiri!

Mulai tetapkan ide aplikasi yang ingin kalian buat (harus berdasarkan masalah nyata dan berbasis data).
`

const props = defineProps<Props>()
const { data } = toRefs(props)

const compiledMarkdown = ref(marked(dummyMarkdown))

onMounted(() => {
	console.log(data)
})
</script>
