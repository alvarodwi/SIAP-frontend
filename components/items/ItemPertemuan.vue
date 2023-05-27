<template>
	<div class="flex flex-col">
		<div class="flex flex-row mt-4">
			<div class="flex flex-col align-middle grow">
				<span class="font-bold text-headline-sm">
					Pertemuan {{ props.data.indexPert }} : {{ props.data.judul }}
				</span>
				<span class="text-title-md">
					{{
						formatISODateString(
							props.data.startDate,
							'eeee, dd MMMM yyyy - p'
						)
					}}
					{{ formatISODateString(props.data.endDate, ' ~ p') }}
				</span>
			</div>
			<button
				v-if="!props.isAsisten && !props.data?.presensi[0]"
				class="px-4 font-bold border rounded-lg text-title-sm interactive-bg-surface border-primary"
				type="button"
				@click="$emit('formIzinClick', props.data)"
			>
				Isi Form Ketidakhadiran
			</button>
		</div>
		<NuxtLink :to="`${$route.params.id}/p/${props.data.id}`">
			<div
				class="flex flex-row items-center mt-6 mb-2 cursor-pointer hover:opacity-80 hover:bg-surface rounded-lg"
			>
				<div
					class="flex items-center w-12 h-12 align-middle border rounded-lg border-outline"
				>
					<Icon
						name="tabler:calendar-event"
						class="w-6 h-6 mx-auto text-outline"
					/>
				</div>
				<NuxtLink class="flex flex-row grow items-center">
					<span class="ml-3 text-title-sm grow">
						Presensi Pertemuan {{ props.data.indexPert }}
					</span>
					<div
						v-if="!props.isAsisten"
						class="flex items-center mx-4 rounded-full w-9 h-9 justify-normal"
						:class="presensi ? 'bg-primary' : 'border-2 border-primary'"
					>
						<Icon
							v-if="presensi"
							name="tabler:check"
							class="w-6 h-6 mx-auto"
						/>
					</div>
				</NuxtLink>
			</div>
		</NuxtLink>
		<slot />
	</div>
</template>

<script setup lang="ts">
import { Presensi } from '~/models/Presensi'
import { PertemuanByKelasData } from '~/repository/modules/pertemuan/types'

interface Props {
	data: PertemuanByKelasData
	isAsisten: boolean
}
const props = defineProps<Props>()

const presensi = computed<Presensi | null>(() => {
	return props.data.presensi ? props.data.presensi[0] : null
})

defineEmits(['formIzinClick'])
</script>
