<!-- eslint-disable vue/no-v-html -->
<template>
	<div class="flex flex-col">
		<div class="flex flex-row mt-4 mb-4">
			<Icon name="tabler:speakerphone" class="w-12 h-12 mr-4 text-outline" />
			<div class="flex flex-col align-middle grow">
				<span class="font-bold text-headline-sm">
					{{ props.data.judul }}
				</span>
				<span class="text-title-md">
					{{
						format(parseISO(props.data.date), 'eeee, dd MMMM yyyy - p', {
							locale: id,
						})
					}}
				</span>
			</div>
		</div>
		<div class="mb-4" v-html="compiledMarkdown"></div>
		<div v-if="props.data.attachment.length > 0">
			<a
				v-for="link in props.data.attachment"
				:key="link.id"
				:to="link.url"
				target="_blank"
			>
				<div
					class="flex flex-row items-center my-2 cursor-pointer mt hover:opacity-80"
				>
					<div
						class="flex items-center w-12 h-12 align-middle border rounded-lg border-outline"
					>
						<Icon
							name="tabler:link"
							class="w-6 h-6 mx-auto text-outline"
						/>
					</div>
					<span class="ml-3 text-title-sm grow">{{ link.judul }}</span>
				</div>
			</a>
		</div>
		<slot />
	</div>
</template>

<script setup lang="ts">
import { format, parseISO } from 'date-fns'
import { id } from 'date-fns/locale'
import { Broadcast } from '~/models/Broadcast'
import { marked } from 'marked'

interface Props {
	data: Broadcast
}

const props = defineProps<Props>()

const compiledMarkdown = ref(marked(props.data.deskripsi))
</script>
