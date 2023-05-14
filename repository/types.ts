export interface ApiResponse<T> {
	status: number
	message: string
	data: T
}

export interface StatusData {
	success: boolean
}

export interface PaginationData<T> {
	data: T[]
	total_data: number
}
