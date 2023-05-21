<template>
	<PopUpFab
		v-if="selectedClass?.owned"
		class="fixed"
		:actions="fabActions"
		@action-click="(s : string) => onFabClicked(s)"
	/>
	<div class="p-6 overflow-x-hidden overflow-y-auto">
		<Breadcrumb :crumbs="crumbs" />
		<!-- header -->
		<div data-id="header" class="flex flex-col w-fit min-w-[40%]">
			<div class="flex flex-row items-center mt-6">
				<div class="flex flex-col">
					<h1 class="text-headline-md">{{ selectedClass?.judul }}</h1>
					<span class="text-title-md">
						{{
							(
								selectedClass?.asistenKelas
									?.map((a) => a.asisten?.user?.name)
									.sort() ?? []
							).join(',')
						}}
					</span>
					<span class="text-title-sm mt-2">
						Kode Kelas : {{ selectedClass?.kode }}
					</span>
				</div>
				<div class="flex flex-row grow justify-end ml-9">
					<NuxtLink :to="`${$route.params.id}/rekap`">
						<button
							type="button"
							class="px-4 py-3 mr-4 font-bold border rounded-lg interactive-bg-surface border-primary text-title-sm"
						>
							Lihat Rekap Presensi
						</button>
					</NuxtLink>
					<NuxtLink
						v-if="selectedClass?.owned"
						:to="`${$route.params.id}/manage`"
					>
						<button
							type="button"
							class="px-4 py-3 font-bold border rounded-lg interactive-bg-surface border-primary text-title-sm"
						>
							Kelola Kelas
						</button>
					</NuxtLink>
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
				@click="toggleFilter"
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
				@click="toggleFilter"
			>
				Pengumuman
			</button>
		</div>

		<!-- list pertemuan -->
		<div v-if="state.filter == 'pertemuan'" class="flex flex-col mt-5">
			<ItemPertemuan
				v-for="(pertemuan, i) in state.listPertemuan"
				:key="i"
				:data="pertemuan"
				:index="i + 1"
				:is-asisten="selectedClass?.owned"
				@form-izin-click="onFormIzinClick"
			>
				<hr
					v-if="i != state.listPertemuan.length - 1"
					class="h-1 mt-4 text-outline"
				/>
			</ItemPertemuan>
		</div>

		<!-- list pengumuman -->
		<div v-if="state.filter == 'pengumuman'" class="flex flex-col mt-5">
			<ItemPengumuman
				v-for="(pengumuman, i) in state.listPengumuman"
				:key="i"
				:data="pengumuman"
			>
				<hr
					v-if="i != state.listPengumuman.length - 1"
					class="h-1 mt-4 text-outline"
				/>
			</ItemPengumuman>
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
			<DialogCreatePertemuan
				v-if="showDialog == 'create-pertemuan'"
				:index="state.listPertemuan.length + 1"
				:nama-kelas="selectedClass?.judul ?? 'ini'"
				@submit="onSubmitCreatePertemuan"
				@close="hideDialog()"
			/>
			<DialogCreatePengumuman
				v-if="showDialog == 'create-pengumuman'"
				:nama-kelas="selectedClass?.judul ?? 'ini'"
				@submit="onSubmitCreatePengumuman"
				@close="hideDialog()"
			/>
			<DialogFormIzin
				v-if="showDialog == 'form-izin'"
				:index="state.selectedPertemuanIndex"
				:nama-kelas="selectedClass?.judul ?? 'ini'"
				@submit="onSubmitFormIzin"
				@close="hideDialog()"
			/>
		</BaseDialog>
	</div>
</template>

<script setup lang="ts">
import { format } from 'date-fns'
import { Kelas } from '~/models/Kelas'
import { Broadcast } from '~/models/Broadcast'
import { BuatIzin } from '~/models/forms/BuatIzin'
import { BuatKelas } from '~/models/forms/BuatKelas'
import { BuatPengumuman } from '~/models/forms/BuatPengumuman'
import { BuatPertemuan } from '~/models/forms/BuatPertemuan'
import { IkutKelas } from '~/models/forms/IkutKelas'
import { BreadcrumbData } from '~/models/state/BreadcrumbData'
import { FabAction } from '~/models/state/FabAction'
import { PertemuanByKelasData } from '~/repository/modules/pertemuan/types'

definePageMeta({ middleware: 'auth' })

const {
	addToast,
	toggleDialog,
	hideDialog,
	refreshClass,
	updateSelectedClass,
} = useGeneralStore()
const { token } = useAuthStore()
const { selectedClass, showDialog } = toRefs(useGeneralStore())
const api = useApi()
const route = useRoute()

useHead({
	title: `Detail Kelas`,
})

interface State {
	filter: 'pertemuan' | 'pengumuman'
	selectedPertemuanIndex: number
	listPertemuan: PertemuanByKelasData[]
	listPengumuman: Broadcast[]
}
const state = reactive<State>({
	filter: 'pertemuan',
	selectedPertemuanIndex: 0,
	listPertemuan: [],
	listPengumuman: [],
})
const idKelas = route.params.id.toString()

const toggleFilter = () => {
	if (state.filter == 'pertemuan') {
		state.filter = 'pengumuman'
	} else {
		state.filter = 'pertemuan'
	}
}

const crumbs = computed<BreadcrumbData[]>(() => [
	{
		name: 'Dashboard',
		url: '/',
	},
	{
		name: selectedClass.value?.judul ?? 'Detail Kelas',
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
	onRefreshCurrentClass()
	onRefreshPertemuan()
	onRefreshBroadcast()
})

const onRefreshPertemuan = async () => {
	const response = await api.pertemuan.fetchPertemuanByKelas(
		token,
		route.params.id.toString()
	)

	if (response.status >= 200 && response.status <= 299) {
		state.listPertemuan = response.data
	} else {
		addToast({
			id: nanoid(),
			type: 'error',
			message: response.message,
		})
	}
}

const onRefreshBroadcast = async () => {
	const response = await api.broadcast.fetchBroadcastByKelas(token, idKelas)

	if (response.status >= 200 && response.status <= 299) {
		state.listPengumuman = response.data
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

	console.log('on mounted', response)

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

const onRefreshCurrentClass = async () => {
	const response = await api.kelas.fetchKelasById(token, idKelas)

	if (response.status >= 200 && response.status <= 299) {
		updateSelectedClass({
			...response.data.kelas,
			owned: response.data.isAsisten,
		})
	} else {
		addToast({
			id: nanoid(),
			type: 'error',
			message: response.message,
		})
	}
}

const onFabClicked = (name: string) => {
	if (name == 'Buat Pengumuman') {
		toggleDialog('create-pengumuman')
	} else {
		toggleDialog('create-pertemuan')
	}
}

const onFormIzinClick = (index: number) => {
	state.selectedPertemuanIndex = index
	toggleDialog('form-izin')
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

const onSubmitCreatePengumuman = async (data: BuatPengumuman) => {
	hideDialog()

	const response = await api.broadcast.createBroadcast(token, idKelas, {
		judul: data.judul,
		deskripsi: data.deskripsi,
		date: format(data.date, 'dd/MM/yyyy hh:mm:ss'),
		attachments: data.attachments,
	})

	if (response.status >= 200 && response.status <= 299) {
		onRefreshBroadcast()
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

const onSubmitCreatePertemuan = async (data: BuatPertemuan) => {
	hideDialog()
	console.log(data)

	const response = await api.pertemuan.createPertemuan(token, idKelas, {
		indexPertemuan: data.indexPertemuan,
		judul: data.judul,
		startDate: format(
			data.startDate ? data.startDate : Date.now(),
			'dd/MM/yyyy hh:mm:ss'
		),
	})

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

const onSubmitFormIzin = (data: BuatIzin) => {
	hideDialog()
	console.log(data)
}
</script>
