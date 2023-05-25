export interface ToastData {
	id: string
	type: 'success' | 'error'
	message: string
	duration?: number
}
