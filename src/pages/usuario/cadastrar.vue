<template>
  <div class="bg-deep-purple-lighten-5 h-100">
    <v-responsive
      class="d-flex align-center fill-height mx-auto"
      max-width="900"
    >
      <CadastroUsuario />
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