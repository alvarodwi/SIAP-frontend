<template>
	<PopUpFab
		class="fixed"
		:actions="fabActions"
		@action-click="(s : string) => onFabClicked(s)"
	/>
	<div class="p-6 overflow-x-hidden overflow-y-auto">
		<Breadcrumb :crumbs="crumbs" />
		<!-- header -->
		<div data-id="header" class="flex flex-col w-fit min-w-[30%]">
			<div class="flex flex-row items-center mt-6">
				<div class="flex flex-col">
					<h1 class="text-headline-md">Rekap Presensi</h1>
					<span class="text-title-md">{{ selectedClass?.judul }}</span>
				</div>
			</div>
			<hr class="h-1 mt-6 text-outline" />
		</div>

		<!-- tabel rekap asisten -->
		<div v-if="!selectedClass?.owned" class="mt-4">
			<span>
				Persentase kehadiran kamu adalah 100%, berikut adalah rinciannya
			</span>
			<table
				data-id="table"
				class="border border-separate rounded-lg table-auto border-outline w-3/4 mt-4 text-body-md text-center"
			>
				<thead>
					<tr class="">
						<th class="bg-surface px-3 py-3 text-left">Pertemuan ke-</th>
						<th v-for="i in 16" :key="i">
							{{ i }}
						</th>
					</tr>
				</thead>
				<tbody>
					<tr class="p-2">
						<th class="bg-surface px-3 py-3 text-left">Kehadiran</th>
						<td v-for="p in 16" :key="p" class="px-3 py-3">✔️</td>
					</tr>
				</tbody>
			</table>
		</div>

		<!-- tabel rekap asisten -->
		<div v-if="selectedClass?.owned" class="mt-4">
			<span>
				Berikut adalah rekap kehadiran praktikan di kelas "{{
					selectedClass?.judul
				}}"
			</span>
			<table
				data-id="table"
				class="border border-separate rounded-lg table-auto border-outline w-3/4 mt-4 text-body-md"
			>
				<thead>
					<tr class="bg-surface">
						<th rowspan="2">NPM</th>
						<th rowspan="2">Nama</th>
						<th colspan="16" class="px-2 py-2">Pertemuan ke-</th>
					</tr>
					<tr class="bg-surface">
						<th v-for="i in 16" :key="i" class="px-2 py-2 text-center">
							{{ i }}
						</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in 10" :key="item" class="p-2">
						<td class="px-3 py-3">140810200001</td>
						<td class="px-3 py-3">Ariq Hakim Ruswadi</td>
						<td v-for="p in 16" :key="p" class="px-3 py-3 text-center">
							✔️
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<BaseDialog v-if="showDialog != 'none'" @backdrop-click="hideDialog()">
			<DialogCreateClass
				v-if="showDialog == 'create-class'"
				@submit="onSubmitCreateClass"
				@close="hideDialog()"
			/>
			<DialogJoinClass
				v-if="showDialog == 'join-class'"
				@submit="onSubmitJoinClass"
				@close="hideDialog()"
			/>
		</BaseDialog>
	</div>
</template>

<script setup lang="ts">
import { Kelas } from '~/models/Kelas'
import { Presensi } from '~/models/Presensi'
import { BuatKelas } from '~/models/forms/BuatKelas'
import { IkutKelas } from '~/models/forms/IkutKelas'
import { BreadcrumbData } from '~/models/state/BreadcrumbData'
import { FabAction } from '~/models/state/FabAction'

definePageMeta({ middleware: 'auth' })

const { addToast, toggleDialog, hideDialog, refreshClass } = useGeneralStore()
const { token } = useAuthStore()
const { selectedClass, showDialog } = toRefs(useGeneralStore())
const api = useApi()
const route = useRoute()

useHead({
	title: `Rekap Presensi - ${selectedClass.value?.judul}`,
})

interface State {
	items: Presensi[]
}
const state = reactive<State>({
	items: [],
})

const crumbs = computed<BreadcrumbData[]>(() => [
	{
		name: 'Dashboard',
		url: '/',
	},
	{
		name: selectedClass.value?.judul ?? 'Detail Kelas',
		url: `/k/${route.params.id}`,
	},
	{
		name: 'Rekap Presensi',
	},
])

const fabActions: FabAction[] = [
	{
		name: 'Buat Pengumuman',
		icon: 'tabler:speakerphone',
	},
	{
		name: 'Buat Pertemuan',
		icon: 'tabler:calendar-event',
	},
]

onMounted(async () => {
	onRefreshClass()
})

const onFabClicked = (name: string) => {
	if (name == 'Buat Pengumuman') {
		toggleDialog('create-pengumuman')
	} else {
		toggleDialog('create-pertemuan')
	}
}

const onRefreshClass = async () => {
	const response = await api.kelas.fetchAllKelas(token)

	console.log('on mounted', response)

	if (response.status >= 200 && response.status <= 299) {
		const newClasses: Kelas[] = [
			...response.data.kelas.map((kelas: Kelas) => ({
				...kelas,
				owned: false,
			})),
			...response.data.owned.map((kelas: Kelas) => ({
				...kelas,
				owned: true,
			})),
		]
		refreshClass(newClasses)
	} else {
		addToast({
			id: nanoid(),
			type: 'error',
			message: response.message,
		})
	}
}

const onSubmitCreateClass = async (data: BuatKelas) => {
	hideDialog()
	const response = await api.kelas.createKelas(token, {
		judul: data.judul,
		deskripsi: data.deskripsi,
		otherAsisten: data.listAsisten,
	})

	console.log(response)

	if (response.status >= 200 && response.status <= 299) {
		onRefreshClass()
		addToast({
			id: nanoid(),
			type: 'success',
			message: response.message,
		})
	} else {
		addToast({
			id: nanoid(),
			type: 'error',
			message: response.message,
		})
	}
}

const onSubmitJoinClass = async (data: IkutKelas) => {
	hideDialog()
	const response = await api.kelas.joinKelas(token, {
		kode: data.kode,
	})

	console.log(response)

	if (response.status >= 200 && response.status <= 299) {
		onRefreshClass()
		addToast({
			id: nanoid(),
			type: 'success',
			message: response.message,
		})
	} else {
		addToast({
			id: nanoid(),
			type: 'error',
			message: response.message,
		})
	}
}
</script>
