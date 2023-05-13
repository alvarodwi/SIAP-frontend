<template>
	<PopUpFab
		class="fixed"
		:actions="fabActions"
		@action-click="(s : string) => onFabClicked(s)"
	/>
	<div class="p-6 overflow-x-hidden overflow-y-auto">
		<Breadcrumb :crumbs="crumbs" />
		<!-- header -->
		<div data-id="header" class="flex flex-col w-fit">
			<div class="flex flex-row items-center mt-6">
				<div class="flex flex-col">
					<h1 class="text-headline-md">Hi, {{ username() }} 👋</h1>
					<span class="text-title-md"
						>Semangat terus praktikumnya yaa!</span
					>
				</div>
				<div class="ml-9">
					<button
						type="button"
						class="px-4 py-3 mr-4 font-bold border rounded-lg interactive-bg-surface border-primary text-title-sm"
					>
						Lihat Rekap Presensi
					</button>
					<button
						type="button"
						class="px-4 py-3 font-bold border rounded-lg interactive-bg-surface border-primary text-title-sm"
					>
						Kelola Praktikan
					</button>
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
			<ItemPertemuan v-for="i in 5" :key="i">
				<hr v-if="i != 5" class="h-1 mt-4 text-outline" />
			</ItemPertemuan>
		</div>

		<!-- list pengumuman -->
		<div v-if="state.filter == 'pengumuman'" class="flex flex-col mt-5">
			<ItemPengumuman v-for="i in 5" :key="i">
				<hr v-if="i != 5" class="h-1 mt-4 text-outline" />
			</ItemPengumuman>
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
			<DialogCreatePertemuan
				v-if="showDialog == 'create-pertemuan'"
				index="2"
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
		</BaseDialog>
	</div>
</template>

<script setup lang="ts">
import { Kelas } from '~/models/Kelas'
import { BuatKelas } from '~/models/forms/BuatKelas'
import { BuatPengumuman } from '~/models/forms/BuatPengumuman'
import { BuatPertemuan } from '~/models/forms/BuatPertemuan'
import { IkutKelas } from '~/models/forms/IkutKelas'
import { BreadcrumbData } from '~/models/state/BreadcrumbData'
import { FabAction } from '~/models/state/FabAction'

definePageMeta({ middleware: 'auth' })

const { addToast, toggleDialog, hideDialog, refreshClass } = useGeneralStore()
const { user, token } = useAuthStore()
const { selectedClass, showDialog } = toRefs(useGeneralStore())
const api = useApi()

useHead({
	title: `Detail Kelas`,
})

interface State {
	filter: 'pertemuan' | 'pengumuman'
}
const state = reactive<State>({
	filter: 'pertemuan',
})

const toggleFilter = () => {
	if (state.filter == 'pertemuan') {
		state.filter = 'pengumuman'
	} else {
		state.filter = 'pertemuan'
	}
}

const username = () => {
	if (user) {
		return user.name.split(' ').slice(0, 2).join(' ')
	} else {
		return ''
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
			...response.data.kelas.map((kelas: Kelas[]) => ({
				...kelas,
				owned: false,
			})),
			...response.data.owned.map((kelas: Kelas[]) => ({
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

const onSubmitCreatePengumuman = (data: BuatPengumuman) => {
	hideDialog()
	console.log(data)
}

const onSubmitCreatePertemuan = (data: BuatPertemuan) => {
	hideDialog()
	console.log(data)
}
</script>
