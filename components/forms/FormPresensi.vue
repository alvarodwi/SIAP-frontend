<template>
	<div class="pb-4 mt-6 flex flex-col w-[25%] mx-auto h-auto">
		<video
			v-show="!isNewPhoto"
			ref="video"
			class="rounded-lg aspect-square"
		/>
		<canvas
			v-show="isNewPhoto"
			ref="canvas"
			class="rounded-lg aspect-square"
		/>

		<button
			v-show="!isTakingPhoto"
			class="interactive-bg-primary font-bold px-3 py-2 mt-4 rounded-lg"
			@click="takePhoto()"
		>
			<span>Ambil Foto</span>
		</button>

		<div v-show="isTakingPhoto" class="flex flex-col mt-4 items-center">
			<span>Foto diambil pada {{ timestamp }}</span>
			<button
				class="interactive-bg-primary font-bold px-3 py-2 mt-6 rounded-lg"
				@click="$emit('submitClick', file)"
			>
				<span>Kirim Presensi</span>
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { format } from 'date-fns'
import { id } from 'date-fns/locale'

defineEmits(['submitClick'])

let file = ref<File | null>(null)
let video = ref<HTMLVideoElement | null>(null)
let canvas = ref<HTMLCanvasElement | null>(null)
let isNewPhoto = ref(false)
let isOpenCamera = ref(false)
let photoData = ref('')
let isTakingPhoto = ref(false)
let timestamp = ref('')

onMounted(() => {
	startCamera()
})

const startCamera = async () => {
	if (navigator.mediaDevices) {
		let stream = await navigator.mediaDevices.getUserMedia({
			video: {
				width: { max: 1024 },
				height: { max: 1024 },
				aspectRatio: { ideal: 1 },
			},
		})
		if (video.value) {
			video.value.srcObject = stream
			video.value.play()
		}
	}
}

const takePhoto = () => {
	if (video.value && canvas.value) {
		let videoLocal = video.value
		let canvasLocal = canvas.value

		canvasLocal.width = videoLocal.getBoundingClientRect().width
		canvasLocal.height = videoLocal.getBoundingClientRect().height

		let context = canvasLocal.getContext('2d')
		context?.drawImage(
			videoLocal,
			0,
			0,
			canvasLocal.width,
			canvasLocal.height
		)
		isNewPhoto.value = true
		photoData.value = canvasLocal.toDataURL()

		isTakingPhoto.value = true
		timestamp.value = format(new Date(), 'eeee, dd MMMM yyyy p', {
			locale: id,
		})

		convertBlobToUrl()
	}
}

const convertBlobToUrl = async () => {
	const blob = await (await fetch(photoData.value)).blob()
	file.value = new File([blob], 'presensi.png', { type: blob.type })
	isOpenCamera.value = false
}

onUnmounted(() => {
	if (video.value) {
		video.value.pause()
		video.value.currentTime = 0
	}
})
</script>
