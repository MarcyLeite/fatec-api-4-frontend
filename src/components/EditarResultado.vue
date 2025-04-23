<template>
  <div class="h-100 d-flex flex-column">
    <EditToolbar :edit-controller="editController" />
    <div class="flex-grow-1">
      <TerravisionMapEdit
        :edit-controller="editController"
        :model-value="geoJson"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMapEditStore } from '@/stores/edit-controller'
import axios from 'axios'

const geoJson = ref<any>(null)

const editController = useMapEditStore()

const fetchResultado = async () => {
	const result = await axios.get('http://localhost:8080/result/1/AI/1')
	geoJson.value = result.data.daninhasDTO
}

onMounted(() => {
	fetchResultado()
})
</script>