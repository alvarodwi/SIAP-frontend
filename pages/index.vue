<template>
	<div class="p-6">
		<Breadcrumb :crumbs="crumbs" />
		<!-- header -->
		<div data-id="header" class="flex flex-col w-fit min-w-[30%]">
			<div class="flex flex-row items-center mt-6">
				<div class="flex flex-col">
					<h1 class="text-headline-md">Hi, {{ username() }} 👋</h1>
					<span class="text-title-md"
						>Semangat terus praktikumnya yaa!</span
					>
				</div>
				<div class="flex flex-row ml-9 grow items-end justify-end">
					<button
						v-if="isAsisten"
						type="button"
						class="px-4 py-3 mr-6 font-bold rounded-lg interactive-bg-primary text-title-sm"
						@click="toggleDialog('create-class')"
					>
						Buat Kelas
					</button>
					<button
						type="button"
						class="px-4 py-3 font-bold border rounded-lg interactive-bg-surface border-primary text-title-sm"
						@click="toggleDialog('join-class')"
					>
						Ikut Kelas
					</button>
				</div>
			</div>
			<hr class="h-1 mt-6 text-outline" />
		</div>

		<div v-if="joinedClass.length == 0 && ownedClass.length == 0">
			<h2 class="mt-6 text-body-lg">Kamu belum mengikuti kelas apapun...</h2>
			<span class="text-body-lg">
				Gunakan tombol Ikut Kelas untuk mengikuti kelas baru
			</span>
		</div>

		<!-- joined kelas -->
		<div v-if="joinedClass.length > 0">
			<h2 class="mt-6 text-label-lg">Kelas yang diikuti</h2>
			<div data-id="joined-classes" class="p-2 mt-6 rounded-lg bg-surface">
				<ItemKelas
					v-for="(kelas, i) in joinedClass"
					:key="i"
					:title="kelas.judul"
					:item-id="kelas.id"
					:owner-names="
						kelas.asistenKelas
							?.map((a) => a.asisten?.user?.name)
							.sort() ?? []
					"
					@item-click="updateSelectedClass(kelas)"
				>
					<hr
						v-if="i != joinedClass.length - 1"
						class="h-1 mx-4 my-2 text-outline"
					/>
				</ItemKelas>
			</div>
		</div>

		<!-- owned class -->
		<div v-if="ownedClass.length > 0">
			<h2 class="mt-6 text-label-lg">Kelas yang diampu</h2>
			<div data-id="joined-classes" class="p-2 mt-6 rounded-lg bg-surface">
				<ItemKelas
					v-for="(kelas, i) in ownedClass"
					:key="i"
					:item-id="kelas.id"
					:title="kelas.judul"
					:owner-names="
						kelas.asistenKelas
							?.map((a) => a.asisten?.user?.name)
							.sort() ?? []
					"
					@item-click="updateSelectedClass(kelas)"
				>
					<hr
						v-if="i != ownedClass.length - 1"
						class="h-1 mx-4 my-2 text-outline"
					/>
				</ItemKelas>
			</div>
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
import { BuatKelas } from '~/models/forms/BuatKelas'
import { IkutKelas } from '~/models/forms/IkutKelas'
import { BreadcrumbData } from '~/models/state/BreadcrumbData'

useHead({
	title: 'Home',
})
definePageMeta({ middleware: 'auth' })

const {
	addToast,
	toggleDialog,
	hideDialog,
	refreshClass,
	updateSelectedClass,
} = useGeneralStore()
const { user, token, isAsisten } = useAuthStore()
const { classes, showDialog } = toRefs(useGeneralStore())
const api = useApi()

const joinedClass = computed(() => {
	return classes.value.filter((k) => !k.owned)
})
const ownedClass = computed(() => {
	return classes.value.filter((k) => k.owned)
})

const username = () => {
	if (user) {
		return user.name.split(' ').slice(0, 2).join(' ')
	} else {
		return ''
	}
}

const crumbs: BreadcrumbData[] = [
	{
		name: 'Dashboard',
	},
]

onMounted(async () => {
	updateSelectedClass(null)
	onRefreshClass()
})

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
		console.log('mounted', classes.value)
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
