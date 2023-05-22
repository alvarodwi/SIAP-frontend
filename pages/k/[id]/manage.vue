<template>
	<div class="p-6 overflow-x-hidden overflow-y-auto">
		<Breadcrumb :crumbs="crumbs" />
		<!-- header -->
		<div data-id="header" class="flex flex-col w-fit min-w-[40%]">
			<div class="flex flex-row items-center mt-6">
				<div class="flex flex-col">
					<h1 class="text-headline-md">Kelola Kelas</h1>
					<span class="text-title-md">
						Disini, Anda bisa mengelola data pertemuan, pengumuman dan
						asisten dari kelas {{ selectedClass?.judul }}
					</span>
				</div>
			</div>
			<hr class="h-1 mt-6 text-outline" />
		</div>

		<!-- filter button -->
		<div class="flex flex-row gap-4 mt-6">
			<button
				class="px-4 py-3 border rounded-lg border-outline text-label-lg"
				:class="
					state.filter == 'pertemuan'
						? 'interactive-bg-primary'
						: 'interactive-bg-surface'
				"
				@click="toggleFilter('pertemuan')"
			>
				Pertemuan
			</button>
			<button
				class="px-4 py-3 border rounded-lg border-outline text-label-lg"
				:class="
					state.filter == 'pengumuman'
						? 'interactive-bg-primary'
						: 'interactive-bg-surface'
				"
				@click="toggleFilter('pengumuman')"
			>
				Pengumuman
			</button>

			<button
				class="px-4 py-3 border rounded-lg border-outline text-label-lg"
				:class="
					state.filter == 'praktikan'
						? 'interactive-bg-primary'
						: 'interactive-bg-surface'
				"
				@click="toggleFilter('praktikan')"
			>
				Praktikan
			</button>
		</div>

		<!-- tabel pertemuan -->
		<div v-if="state.filter == 'pertemuan'" class="mt-6">
			<span class="text-title-sm">
				Berikut adalah data pertemuan yang ada di kelas
				{{ selectedClass?.judul }}
			</span>
			<Table
				class="mt-6 w-[80%]"
				:items="tablePertemuanData"
				:headers="tablePertemuanHeader"
				has-action
			>
				<template #action="{ id }">
					<div class="flex">
						<button
							class="h-full py-3 mx-4 my-2 font-bold border rounded-lg grow border-primary interactive-bg-error text-label-lg"
							@click="onPertemuanDeleteClicked(id)"
						>
							Hapus
						</button>
					</div>
				</template>
			</Table>
		</div>

		<!-- tabel pengumuman -->
		<div v-if="state.filter == 'pengumuman'" class="mt-6">
			<span class="text-title-sm">
				Berikut adalah data pengumuman yang ada di kelas
				{{ selectedClass?.judul }}
			</span>
			<Table
				class="mt-6 w-[80%]"
				:items="tablePengumumanData"
				:headers="tablePengumumanHeader"
				has-action
			>
				<template #action="{ id }">
					<div class="flex">
						<button
							class="h-full py-3 mx-4 my-2 font-bold border rounded-lg grow border-primary interactive-bg-error text-label-lg"
							@click="onPengumumanDeleteClicked(id)"
						>
							Hapus
						</button>
					</div>
				</template>
			</Table>
		</div>

		<!-- dialog -->
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
import { BuatKelas } from '~/models/forms/BuatKelas'
import { IkutKelas } from '~/models/forms/IkutKelas'
import { BreadcrumbData } from '~/models/state/BreadcrumbData'

definePageMeta({ middleware: 'auth' })

const { addToast, hideDialog, refreshClass } = useGeneralStore()
const { token } = useAuthStore()
const { selectedClass, showDialog } = toRefs(useGeneralStore())
const api = useApi()
const route = useRoute()

useHead({
	title: `Detail Kelas`,
})

interface State {
	filter: 'pertemuan' | 'pengumuman' | 'praktikan'
}
const state = reactive<State>({
	filter: 'pertemuan',
})
const idKelas = route.params.id.toString()

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
		name: `Manage Kelas`,
	},
])

interface PertemuanTable {
	id: string
	Judul: string
	Tanggal: string
}
const tablePertemuanData = ref<PertemuanTable[]>([])
const tablePertemuanHeader = ['Judul', 'Tanggal']

interface PengumumanTable {
	id: string
	Judul: string
	Tanggal: string
}
const tablePengumumanData = ref<PengumumanTable[]>([])
const tablePengumumanHeader = ['Judul', 'Tanggal']

interface PraktikanTable {
	id: string
	Nama: string
	NPM: string
}
const tablePraktikanData = ref<PraktikanTable[]>([])
const tablePraktikanHeader = ['Nama', 'NPM']

onMounted(async () => {
	onRefreshClass()
})

watch(
	() => state.filter,
	() => {
		console.log('watch filter', state.filter)
		refreshTable()
	}
)

const toggleFilter = (filter: 'pertemuan' | 'pengumuman' | 'praktikan') => {
	state.filter = filter
}

const refreshTable = async () => {
	switch (state.filter) {
		case 'pertemuan':
			onRefreshPertemuan()
			break
		case 'pengumuman':
			onRefreshPengumuman()
			break
		default:
			break
	}
}

const onRefreshPertemuan = async () => {
	const response = await api.pertemuan.fetchPertemuanByKelas(token, idKelas)

	if (response.status >= 200 && response.status <= 299) {
		tablePertemuanData.value = response.data.map((pertemuan) => ({
			id: pertemuan.id,
			Judul: pertemuan.judul,
			Tanggal: formatISODateString(
				pertemuan.startDate,
				'eeee, dd MMMM yyyy - p'
			),
		}))
	} else {
		addToast({
			id: nanoid(),
			type: 'error',
			message: response.message,
		})
	}
}

const onRefreshPengumuman = async () => {
	const response = await api.broadcast.fetchBroadcastByKelas(token, idKelas)

	if (response.status >= 200 && response.status <= 299) {
		tablePengumumanData.value = response.data.map((pengumuman) => ({
			id: pengumuman.id,
			Judul: pengumuman.judul,
			Tanggal: formatISODateString(
				pengumuman.date,
				'eeee, dd MMMM yyyy - p'
			),
		}))
	} else {
		addToast({
			id: nanoid(),
			type: 'error',
			message: response.message,
		})
	}
}

const onPertemuanDeleteClicked = async (id: string) => {
	const response = await api.pertemuan.deletePertemuanById(token, idKelas, id)

	if (response.status >= 200 && response.status <= 299) {
		onRefreshPertemuan()
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

const onPengumumanDeleteClicked = async (id: string) => {
	const response = await api.broadcast.deleteBroadcastById(token, idKelas, id)

	if (response.status >= 200 && response.status <= 299) {
		onRefreshPengumuman()
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

const onRefreshClass = async () => {
	const response = await api.kelas.fetchAllKelas(token)

	if (response.status >= 200 && response.status <= 299) {
		const newClasses: Kelas[] = [
			...response.data.kelas.map((kelas) => ({ ...kelas, owned: false })),
		]
		if (response.data.owned) {
			newClasses.push(
				...response.data.owned.map((kelas) => ({ ...kelas, owned: true }))
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
