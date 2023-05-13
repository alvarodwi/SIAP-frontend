<template>
	<div data-id="breadcrumb">
		<ol class="flex flex-row">
			<li
				v-for="(crumb, i) in crumbs"
				:key="i"
				class="mr-2 text-title-small"
			>
				<span v-if="i == crumbs.length - 1">/ {{ crumb.name }}</span>
				<NuxtLink
					v-else
					:to="crumb.url"
					class="after:content-[/] cursor-pointer underline text-tertiary"
				>
					/ {{ crumb.name }}
				</NuxtLink>
			</li>
		</ol>
	</div>
</template>

<script setup lang="ts">
import { BreadcrumbData } from '~/models/state/BreadcrumbData'

interface Props {
	crumbs: BreadcrumbData[]
}

const props = defineProps<Props>()
const { crumbs } = toRefs(props)
</script>
