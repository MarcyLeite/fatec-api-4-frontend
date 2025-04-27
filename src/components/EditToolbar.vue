<template>
  <div class="d-flex justify-space-between align-center">
    <div class="d-flex ga-2">
      <v-btn-toggle
        v-model:model-value="pointMode"
        :disabled="featureMode !== 0"
      >
        <v-btn icon="mdi-vector-point-edit" />
        <v-btn icon="mdi-vector-triangle" />
        <v-btn icon="mdi-vector-point-plus" />
        <v-btn icon="mdi-vector-point-minus" />
      </v-btn-toggle>
      <v-divider vertical />
      <v-btn-toggle v-model:model-value="featureMode" :disabled="!editController.enabled">
        <v-btn icon="mdi-book-edit" />
        <v-btn icon="mdi-book-plus" />
        <v-btn icon="mdi-book-remove" />
        <v-btn icon="mdi-book-arrow-up" />
      </v-btn-toggle>
    </div>
    <div class="d-flex ga-2 px-4">
      <v-btn color="deep-purple-darken-1" @click="() => { 
        editController.toggleSave(true)
         }"
        :disabled="!editController.enabled"   
      > Confirmar Edição de talhão </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type EditController } from '@/stores/edit-controller'

type Props = {
  editController: EditController
}

const pointMode = ref<number>()
const featureMode = ref<number>()
const { editController } = defineProps<Props>()


watch([featureMode], () => {
  if(featureMode.value !== 0) {
    pointMode.value = undefined
  }
  editController.updateFeatureOption(featureMode.value)
})

watch([pointMode], () => {
  editController.updatePointOption(pointMode.value)
})
</script>