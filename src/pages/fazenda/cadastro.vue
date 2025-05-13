<template>
  <v-responsive
    class="align-centerfill-height mx-auto my-10"
    max-width="900"
  >
    <cadastro-fazenda />
  </v-responsive>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app'
const store = useAppStore()
onMounted(async () => {
    await store.verify()
})
</script>