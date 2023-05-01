<template>
	<h1>Dashboard</h1>
</template>

<script setup lang="ts">
useHead({
	title: 'Home',
})

definePageMeta({ middleware: 'auth' })
</script>
