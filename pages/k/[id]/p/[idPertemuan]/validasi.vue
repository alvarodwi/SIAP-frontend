<template>
	<div class="p-6 overflow-x-hidden overflow-y-auto">
		<Breadcrumb :crumbs="crumbs" />
		<!-- header -->
		<div data-id="header" class="flex flex-col w-fit min-w-[40%]">
			<div class="flex flex-row items-center mt-6">
				<div class="flex flex-col">
					<h1 class="text-headline-md">Validasi Presensi</h1>
					<span class="text-title-md">
						untuk Pertemuan {{ state.pertemuan?.indexPert }} :
						{{ state.pertemuan?.judul }}
					</span>
				</div>
			</div>
			<hr class="h-1 mt-6 text-outline" />
		</div>

		<!-- validasi asprak -->
		<div class="relative flex flex-col mt-6">
			<span class="text-title-sm">
				Berikut adalah bukti presensi yang dikirimkan praktikan untuk
				pertemuan kali ini
			</span>

			<div class="flex flex-row w-full mt-8 h-1/2">
				<div class="flex items-center" @click="previousIndex()">
					<Icon name="tabler:chevron-left" class="w-12 h-12" />
				</div>
				<div class="flex flex-col items-center grow">
					<div class="flex mx-auto max-h-[432px] justify-center">
						<img
							:src="state.currentPresensi?.bukti"
							alt="foto-presensi"
							class="object-cover w-auto h-full rounded-lg"
						/>
					</div>
					<span class="mt-6 text-title-lg">
						{{ state.currentPresensi?.user.name }} -
						{{ state.currentPresensi?.user.npm }}
					</span>
					<span class="mt-2 text-title-sm">
						Foto diambil pada
						{{
							formatISODateString(
								state.currentPresensi?.date ?? null,
								'eeee, dd MMMM yyyy'
							)
						}}
					</span>
					<div
						v-if="!state.currentPresensi?.isValidate"
						class="flex flex-col items-center px-2 py-3 mt-4"
					>
						<button
							class="px-6 py-2 font-bold rounded-lg w-fit interactive-bg-primary"
							@click="onAcceptPresensi"
						>
							Terima
						</button>
						<span class="mt-2 text-label-md">
							* Silakan abaikan tombol 'Terima' jika presensi di atas
							tidak Anda anggap valid
						</span>
					</div>
					<div
						v-else
						class="flex flex-col items-center justify-center px-5 py-4 mt-4 border rounded-lg border-primary bg-primary"
					>
						<span class="text-title-sm">
							Presensi telah dianggap valid
						</span>
					</div>
				</div>
				<div class="flex items-center" @click="nextIndex()">
					<Icon name="tabler:chevron-right" class="w-12 h-12" />
				</div>
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
const { indexValidasi } = usePresensiStore()
const api = useApi()
const route = useRoute()

useHead({
	title: `Validasi Presensi`,
})

interface State {
	pertemuan: Pertemuan | null
	listPresensi: Presensi[]
	currentPresensi: Presensi | null
}
const state = reactive<State>({
	pertemuan: null,
	listPresensi: [],
	currentPresensi: null,
})
const idKelas = route.params.id.toString()
const idPertemuan = route.params.idPertemuan.toString()
const index = ref(-1)

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
		url: `/k/${idKelas}/p/${idPertemuan}`,
	},
	{
		name: 'Validasi Presensi',
	},
])

onMounted(async () => {
	onRefreshClass()
	onRefreshPertemuan()
})

watch(
	() => index.value,
	(currentValue) => {
		loadPresensi(currentValue)
	}
)

const loadPresensi = async (index: number) => {
	if (state.listPresensi[index]) {
		onRefreshCurrentPresensi(state.listPresensi[index].id)
	}
}

const previousIndex = () => {
	if (state.listPresensi.length > 0) {
		index.value =
			index.value > 0 ? index.value - 1 : state.listPresensi.length
	}
}

const nextIndex = () => {
	if (state.listPresensi.length > 0) {
		index.value =
			index.value < state.listPresensi.length ? index.value + 1 : 0
	}
}

const onRefreshPertemuan = async () => {
	const response = await api.pertemuan.fetchPertemuanById(
		token,
		idKelas,
		idPertemuan
	)

	if (response.status >= 200 && response.status <= 299) {
		state.pertemuan = response.data.data
		state.listPresensi = response.data.presensi.data.filter(
			(a) => !a.isValidate
		)

		if (state.listPresensi[indexValidasi]) {
			index.value = indexValidasi
		}
	} else {
		addToast({
			id: nanoid(),
			type: 'error',
			message: response.message,
		})
	}
}

const onRefreshCurrentPresensi = async (idPresensi: string) => {
	const response = await api.presensi.fetchPresensiById(
		token,
		idKelas,
		idPertemuan,
		idPresensi
	)
	if (response.status >= 200 && response.status <= 299) {
		state.currentPresensi = response.data
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

const onAcceptPresensi = async () => {
	const idPresensi = state.listPresensi[index.value].id

	const response = await api.presensi.validatePresensi(
		token,
		idKelas,
		idPertemuan,
		idPresensi
	)

	if (response.status >= 200 && response.status <= 299) {
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
