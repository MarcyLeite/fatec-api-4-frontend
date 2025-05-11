<template>
  <div class="h-100 w-100 d-flex">
    <EditarResultado />
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app'
const store = useAppStore()
onMounted(async () => {
    await store.verify()
})
</script>
