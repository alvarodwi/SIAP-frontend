<template>
	<table
		data-id="table"
		class="border border-separate rounded-lg table-auto border-outline"
	>
		<thead>
			<slot name="header">
				<tr class="bg-surface">
					<th
						v-for="header in headers"
						:key="header"
						class="px-3 py-3 text-left"
					>
						{{ header }}
					</th>
					<th v-if="hasAction" class="px-3 py-3 text-left">Aksi</th>
				</tr>
			</slot>
		</thead>
		<tbody>
			<tr v-for="item in items" :key="item">
				<td v-for="header in headers" :key="header" class="px-3 py-3">
					{{ item[header] }}
				</td>
				<td>
					<slot name="action" v-bind="item" />
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script setup lang="ts">
interface Props {
	headers: []
	items: []
	hasAction: boolean
}
const props = defineProps<Props>()
const { headers, items, hasAction } = toRefs(props)
</script>
