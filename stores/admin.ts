import { defineStore } from 'pinia'
import { RoleApproval } from '~/models/RoleApproval'

export type AdminState = {
	token: string
	approvals: RoleApproval[]
}

export const useAdminStore = defineStore({
	id: 'admin',
	state: () =>
		({
			token: '',
			approvals: [],
		} as AdminState),
	actions: {
		onLogin(token: string) {
			this.$state.token = token
		},
		onLogout() {
			this.$state.token = ''
		},
		setApprovals(approvals: RoleApproval[]) {
			this.$state.approvals = approvals
		},
	},
	persist: true,
})
