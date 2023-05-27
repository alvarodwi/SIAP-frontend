<template>
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

		<!-- tabel rekap praktikan -->
		<div class="mt-4 flex flex-col">
			<span>
				Persentase kehadiran kamu adalah {{}}, berikut adalah rinciannya
			</span>
			<div class="grid grid-cols-2 w-fit grid-rows-2 items-center mt-4">
				<span> Nama </span>
				<span>: {{ user?.name }}</span>
				<span> Npm</span>
				<span>: {{ user?.npm }}</span>
			</div>
			<table
				data-id="table"
				class="mt-6 text-center border border-separate rounded-lg border-outline text-body-md w-fit"
			>
				<thead>
					<tr class="bg-surface">
						<th class="px-6 py-3 text-left">Pertemuan ke-</th>
						<th class="px-6 py-3 text-left">Mengisi Presensi</th>
						<th class="px-6 py-3 text-left">Status Presensi</th>
						<th class="px-6 py-3 text-left">Sudah Divalidasi?</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="(p, i) in state.items"
						:key="p.idPertemuan"
						class="p-2"
					>
						<td class="px-3 py-3">
							{{ i + 1 }}
						</td>
						<td class="px-3 py-3">
							<Icon v-if="p.data" name="tabler:check" class="h-6 w-6" />
							<Icon v-else name="tabler:x" class="h-6 w-6" />
						</td>
						<td v-if="p.data" class="px-3 py-3">{{ p.data.status }}</td>
						<td v-if="p.data" class="px-3 py-3">
							<span v-if="p.data.isValidate">Sudah</span>
							<span v-else>Belum</span>
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

definePageMeta({ middleware: 'auth' })
useHead({
	title: `Detail Kelas - Rekap Presensi`,
})

const { addToast, hideDialog, refreshClass } = useGeneralStore()
const { user, token } = useAuthStore()
const { selectedClass, showDialog } = toRefs(useGeneralStore())
const api = useApi()
const route = useRoute()

useHead({
	title: `Rekap Presensi - ${selectedClass.value?.judul}`,
})
const idKelas = route.params.id.toString()

interface RekapPresensi {
	idPertemuan: string
	data: Presensi | null
}

interface State {
	items: RekapPresensi[]
	filled: number
	validated: number
}
const state = reactive<State>({
	items: [],
	filled: 0,
	validated: 0,
})

const crumbs = computed<BreadcrumbData[]>(() => [
	{
		name: 'Dashboard',
		url: '/',
	},
	{
		name: selectedClass.value?.judul ?? 'Detail Kelas',
		url: `/k/${idKelas}`,
	},
	{
		name: 'Rekap Presensi',
	},
])

onMounted(async () => {
	onRefreshClass()
	onRefreshPertemuan()
})

const onRefreshPertemuan = async () => {
	const response = await api.pertemuan.fetchPertemuanByKelas(
		token,
		route.params.id.toString()
	)

	if (response.status >= 200 && response.status <= 299) {
		state.items = response.data.map((a) => ({
			idPertemuan: a.id,
			data: a.presensi[0],
		}))
	} else {
		addToast({
			id: nanoid(),
			type: 'error',
			message: response.message,
		})
	}
}

const onRefreshClass = async () => {
	const response = await api.kelas.fetchAllKelas(token)

	if (response.status >= 200 && response.status <= 299) {
		const newClasses: Kelas[] = [
			...response.data.kelas.map((kelas: Kelas) => ({
				...kelas,
				owned: false,
			})),
		]
		if (response.data.owned) {
			newClasses.push(
				...response.data.owned.map((kelas: Kelas) => ({
					...kelas,
					owned: true,
				}))
			)
		}
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
		otherAsisten: data.listAsistenId.map((id) => ({ id })),
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
