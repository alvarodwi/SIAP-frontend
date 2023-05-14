import { $fetch, FetchOptions } from 'ofetch'
import AdminModule from '~/repository/modules/admin'
import AuthModule from '~/repository/modules/auth'
import KelasModule from '~/repository/modules/kelas'

interface ApiInstance {
	auth: AuthModule
	admin: AdminModule
	kelas: KelasModule
}

export default function () {
	const nuxtApp = useNuxtApp()

	const fetchOptions: FetchOptions = {
		baseURL: nuxtApp.$config.public.API_BASE_URL,
	}

	const apiFetcher = $fetch.create(fetchOptions)

	const modules: ApiInstance = {
		auth: new AuthModule(apiFetcher),
		admin: new AdminModule(apiFetcher),
		kelas: new KelasModule(apiFetcher),
	}

	return modules
}
