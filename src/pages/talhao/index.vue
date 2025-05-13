<template>
  <div
    class="bg-deep-purple-lighten-5"
    style="max-height: 100vh;"
  >
    <v-responsive
      class="align-center fill-height mx-auto"
    >
      <ListagemTalhoes />
    </v-responsive>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app'

const store = useAppStore()
onMounted(async () => {
    await store.verify()
})
</script>
