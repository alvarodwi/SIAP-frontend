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
						formatISODateString(props.data.date, 'eeee, dd MMMM yyyy - p')
					}}
				</span>
			</div>
		</div>
		<div class="mb-4" v-html="compiledMarkdown"></div>
		<div v-if="props.data.attachment.length > 0">
			<NuxtLink
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
			</NuxtLink>
		</div>
		<slot />
	</div>
</template>

<script setup lang="ts">
import { Broadcast } from '~/models/Broadcast'
import { marked } from 'marked'

interface Props {
	data: Broadcast
}

const props = defineProps<Props>()

const compiledMarkdown = ref(marked(props.data.deskripsi))
</script>
