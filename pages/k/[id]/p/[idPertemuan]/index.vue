<template>
	<div class="p-6 overflow-x-hidden overflow-y-auto">
		<Breadcrumb :crumbs="crumbs" />
		<!-- header -->
		<div data-id="header" class="flex flex-col w-fit min-w-[40%]">
			<div class="flex flex-row items-center mt-6">
				<div class="flex flex-col">
					<h1 class="text-headline-md">
						{{
							selectedClass?.owned
								? 'Validasi Presensi'
								: 'Form Presensi'
						}}
					</h1>
					<span class="text-title-md">
						untuk Pertemuan {{ state.pertemuan?.indexPert }} :
						{{ state.pertemuan?.judul }}
					</span>
				</div>
			</div>
			<hr class="h-1 mt-6 text-outline" />
		</div>

		<!-- tabel validasi asprak -->
		<div v-if="selectedClass?.owned" class="mt-6">
			<span class="text-title-sm">
				Berikut adalah data presensi yang dikirimkan praktikan untuk
				pertemuan kali ini
			</span>
			<Table
				class="mt-6 w-[60%]"
				:items="tableData"
				:headers="tableHeader"
				has-action
			>
				<template #action="{ id, isValidate }">
					<div class="flex flex-col px-2">
						<button
							v-if="!isValidate"
							class="py-3 px-6 my-2 font-bold border rounded-lg border-primary interactive-bg-surface text-label-lg"
							@click="onLihatDetailClicked(id)"
						>
							Lihat Bukti
						</button>
						<div
							v-else
							class="px-3 py-2 rounded-lg flex flex-row items-center justify-center gap-2"
						>
							<span class="font-bold text-label-lg">
								Sudah divalidasi ✅
							</span>
						</div>
					</div>
				</template>
			</Table>
		</div>

		<!-- form presensi praktikan -->
		<div v-if="!selectedClass?.owned">
			<div v-if="state.currentPresensi">
				<div class="pb-4 mt-12 flex flex-col">
					<img
						:src="state.currentPresensi.bukti"
						class="w-[25%] mx-auto h-auto rounded-lg aspect-auto"
					/>

					<div class="flex flex-col items-center mt-9">
						<span class="text-headline-md">
							Status Presensi :
							{{
								state.currentPresensi.isValidate
									? 'Sudah Divalidasi'
									: 'Menunggu Validasi'
							}}
						</span>
						<span class="text-title-sm">
							Foto diambil pada
							{{
								formatISODateString(
									state.currentPresensi.date ?? '',
									'eeee, dd MMMM yyyy p'
								)
							}}
						</span>
					</div>
				</div>
			</div>
			<div v-else>
				<FormPresensi
					@submit-click="(file : File) => onFormPresensiClick(file)"
				/>
			</div>
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
import { Pertemuan } from '~/models/Pertemuan'
import { Presensi } from '~/models/Presensi'
import { BuatKelas } from '~/models/forms/BuatKelas'
import { IkutKelas } from '~/models/forms/IkutKelas'
import { BreadcrumbData } from '~/models/state/BreadcrumbData'

definePageMeta({ middleware: 'auth' })

const { addToast, hideDialog, refreshClass } = useGeneralStore()
const { token } = useAuthStore()
const { selectedClass, showDialog } = toRefs(useGeneralStore())
const { setIndex } = usePresensiStore()
const api = useApi()
const route = useRoute()

useHead({
	title: `Detail Kelas`,
})

interface State {
	pertemuan: Pertemuan | null
	currentPresensi: Presensi | null
	listPresensi: Presensi[]
}
const state = reactive<State>({
	pertemuan: null,
	currentPresensi: null,
	listPresensi: [],
})
const idKelas = route.params.id.toString()
const idPertemuan = route.params.idPertemuan.toString()

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
		name: `Pertemuan ${state.pertemuan?.indexPert}`,
	},
])

interface ValidationTable {
	id: string
	Nama: string
	NPM: string
	isValidate: boolean
}
const tableData = ref<ValidationTable[]>([])
const tableHeader = ['Nama', 'NPM']

watch(
	() => state.listPresensi,
	(currentValue) => {
		if (selectedClass.value?.owned) {
			tableData.value =
				currentValue.map((p) => ({
					id: p.id,
					Nama: p.user.name,
					NPM: p.user.npm,
					isValidate: p.isValidate,
				})) ?? []
		}
	}
)

onMounted(async () => {
	onRefreshClass()
	onRefreshPresensi()
})

const onRefreshPresensi = async () => {
	const response = await api.pertemuan.fetchPertemuanById(
		token,
		idKelas,
		idPertemuan
	)

	if (response.status >= 200 && response.status <= 299) {
		state.pertemuan = response.data.data

		if (selectedClass.value?.owned) {
			state.listPresensi = response.data.presensi.data
		} else {
			state.currentPresensi = response.data.presensi.data[0]
		}
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

const onLihatDetailClicked = (id: string) => {
	const filteredData = state.listPresensi.filter((a) => !a.isValidate)

	const index = filteredData.findIndex((a) => a.id == id)
	setIndex(index)
	navigateTo(`${idPertemuan}/validasi`)
}

const onFormPresensiClick = async (file: File) => {
	console.log('test', file)

	const response = await api.presensi.submitPresensi(
		token,
		idKelas,
		idPertemuan,
		file
	)

	if (response.status >= 200 && response.status <= 299) {
		onRefreshPresensi()
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
