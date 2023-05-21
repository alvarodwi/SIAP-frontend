<template>
	<div class="flex w-full" @click="$emit('hideSidebar')">
		<div
			data-id="sidebar"
			class="flex flex-col w-1/4 h-screen p-6 bg-surface z-50"
			@click.stop
		>
			<div
				class="rounded-full interactive-bg-surface w-fit"
				@click="$emit('hideSidebar')"
			>
				<Icon name="tabler:chevrons-left" class="w-9 h-9" />
			</div>
			<NuxtLink
				to="/"
				class="my-4 cursor-pointer hover:text-primary-hover"
				@click="$emit('hideSidebar')"
			>
				<span class="text-title-lg">Home</span></NuxtLink
			>
			<div
				v-if="joinedClass.length > 0 || ownedClass.length > 0"
				class="w-full h-[1px] bg-outline my-2"
			></div>
			<div class="flex flex-col overflow-y-auto">
				<div v-if="joinedClass.length > 0" class="flex flex-col">
					<span class="mt-4 mb-4 text-title-small"
						>Kelas yang diikuti</span
					>
					<SidebarItem
						v-for="kelas in joinedClass"
						:key="kelas"
						:is-active="kelas.id == selectedClass?.id"
						:label="kelas.judul"
						:url="`/k/${kelas.id}`"
						@click="onSidebarClicked(kelas)"
					/>
				</div>
				<div v-if="ownedClass.length > 0" class="flex flex-col">
					<span class="mt-4 mb-4 text-title-small">Kelas yang diampu</span>
					<SidebarItem
						v-for="kelas in ownedClass"
						:key="kelas"
						:is-active="kelas.id == selectedClass?.id"
						:label="kelas.judul"
						:url="`/k/${kelas.id}`"
						@click="onSidebarClicked(kelas)"
					/>
				</div>
			</div>
			<div class="flex flex-col mt-8">
				<button
					v-if="isAsisten"
					class="w-full py-4 font-bold rounded-lg interactive-bg-primary text-title-md"
					@click="$emit('createClass')"
				>
					Buat Kelas Baru
				</button>
				<button
					class="w-full py-4 mt-4 font-bold border rounded-lg interactive-bg-surface border-primary text-title-md"
					@click="$emit('joinClass')"
				>
					Ikut Kelas
				</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Kelas } from '~/models/Kelas'

const { isAsisten } = useAuthStore()
const { updateSelectedClass } = useGeneralStore()
const { selectedClass, classes } = storeToRefs(useGeneralStore())

const emit = defineEmits(['hideSidebar', 'joinClass', 'createClass'])

const joinedClass = computed(() => {
	return classes.value.filter((k) => !k.owned)
})

const ownedClass = computed(() => {
	return classes.value.filter((k) => k.owned)
})

const onSidebarClicked = (kelas: Kelas) => {
	updateSelectedClass(kelas)
	emit('hideSidebar')
}
</script>

<style>
*::-webkit-scrollbar {
	width: 6px;
	height: 6px;
	background-color: #211c1d;
}
*::-webkit-scrollbar-thumb {
	border-radius: 10px;
	-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
	background-color: #829297;
}
@media (min-width: 1280px) {
	*::-webkit-scrollbar {
		width: 4px;
	}
}
</style>
