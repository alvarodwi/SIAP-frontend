<template>
	<div class="flex flex-col">
		<div class="flex flex-row mt-4">
			<div class="flex flex-col align-middle grow">
				<span class="font-bold text-headline-sm">
					Pertemuan 1 : Project Kickoff
				</span>
				<span class="text-title-md"> Senin, 27 Februari 2023 </span>
			</div>
			<button
				class="px-4 font-bold border rounded-lg text-title-sm interactive-bg-surface border-primary"
				type="button"
			>
				Isi Form Ketidakhadiran
			</button>
		</div>
		<NuxtLink to="">
			<div
				class="flex flex-row items-center mt-6 mb-2 cursor-pointer hover:opacity-80"
			>
				<div
					class="flex items-center w-12 h-12 align-middle border rounded-lg border-outline"
				>
					<Icon
						name="tabler:calendar-event"
						class="w-6 h-6 mx-auto text-outline"
					/>
				</div>
				<span class="ml-3 text-title-sm grow">Presensi Pertemuan 1</span>
				<div
					class="flex items-center mx-4 rounded-full w-9 h-9 bg-primary justify-normal"
				>
					<Icon name="tabler:check" class="w-6 h-6 mx-auto" />
				</div>
			</div>
		</NuxtLink>
		<slot />
	</div>
</template>

<script setup lang="ts">
import { Pertemuan } from '~/models/Pertemuan'

interface Props {
	data?: Pertemuan
}

const props = defineProps<Props>()
const { data } = toRefs(props)

onMounted(() => {
	console.log(data)
})
</script>
