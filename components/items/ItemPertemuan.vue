<template>
	<div class="flex flex-col">
		<div class="flex flex-row mt-4">
			<div class="flex flex-col align-middle grow">
				<span class="font-bold text-headline-sm">
					Pertemuan {{ props.index }} : {{ props.data.judul }}
				</span>
				<span class="text-title-md">
					{{
						format(
							parseISO(props.data.startDate),
							'eeee, dd MMMM yyyy - p',
							{
								locale: id,
							}
						)
					}}
					~
					{{
						' ' +
						format(parseISO(props.data.endDate), 'p', {
							locale: id,
						})
					}}
				</span>
			</div>
			<button
				v-if="!props.isAsisten && !props.data.presensi[0]"
				class="px-4 font-bold border rounded-lg text-title-sm interactive-bg-surface border-primary"
				type="button"
				@click="$emit('formIzinClick', props.index)"
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
						Presensi Pertemuan {{ props.index }}
					</span>
					<div
						v-if="!props.isAsisten"
						class="flex items-center mx-4 rounded-full w-9 h-9 justify-normal"
						:class="
							props.data.presensi[0]
								? 'bg-primary'
								: 'border-2 border-primary'
						"
					>
						<Icon
							v-if="props.data.presensi[0]"
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
import { format, parseISO } from 'date-fns'
import { id } from 'date-fns/locale'
import { PertemuanByKelasData } from '~/repository/modules/pertemuan/types'

interface Props {
	index: number
	data: PertemuanByKelasData
	isAsisten: boolean
}
const props = defineProps<Props>()

defineEmits(['formIzinClick'])
</script>
