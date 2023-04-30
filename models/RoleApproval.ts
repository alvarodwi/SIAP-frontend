import { User } from './User'

export interface RoleApproval {
	id: string
	status: 'Accepted' | 'Pending' | 'Rejected'
	user: User
}
