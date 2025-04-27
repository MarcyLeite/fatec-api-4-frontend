<template>
  <div class="h-100 d-flex flex-grow-1">
    <div>
      <v-sheet width="18rem" class="pa-8 h-100">
        <div class="d-flex flex-column justify-space-between h-100">
          <div>
            <div>
              Missão:
            </div>
            <v-autocomplete :items="missaoList.map(e => e.id)" v-model:model-value="selectedMissao" />
            <div>
              Talhão
            </div>
            <v-autocomplete :items="talhaoList ?? []" v-model:model-value="selectedTalhao" />
          </div>
          <div v-if="!editController.enabled && selectedMissao !== null && resultFrom === 'ai'" class="d-flex ga-2 flex-column">
            <div class="d-flex w-100">
              <v-btn class="w-100" color="deep-purple-darken-1" @click="() => {
                editController.toggleEnable(true)
              }"> Editar </v-btn>
            </div>
            <div class="d-flex ga-2">
              <v-btn color="red-darken-4" @click="() => {
                  axios.post('http://localhost:8080/relatorio/salvar', {
                    dataInicioRelatorio: date,
                    status: 'Reproved',
                    userId: 1,
                    missaoId: selectedMissao
                  })
                  saveMissao()
              }"> Reprovar </v-btn>
              <v-btn color="green-darken-3" @click="() => {
                  axios.post('http://localhost:8080/relatorio/salvar', {
                    dataInicioRelatorio: date,
                    status: 'Aproved',
                    userId: 1,
                    missaoId: selectedMissao
                  })
                  saveMissao()
              }"> Aprovar </v-btn>
            </div>
          </div>
          <div v-if="editController.enabled && selectedMissao !== null && selectedTalhao !== null" class="w-100">
            <v-btn class="w-100" @click="() => {
                  axios.post('http://localhost:8080/relatorio/salvar', {
                    dataInicioRelatorio: date,
                    status: 'Edited',
                    userId: 1,
                    missaoId: selectedMissao
                  })
                  saveMissao()
              }"> Salvar Edição </v-btn>
          </div>
        </div>
      </v-sheet>
    </div>
    <div class="d-flex flex-column flex-grow-1">
      <EditToolbar :edit-controller="editController" />
      <div class="flex-grow-1">
        <TerravisionMapEdit
          :edit-controller="editController"
          :model-value="features"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMapEditStore } from '@/stores/edit-controller'
import axios from 'axios'

const features = ref<any>(null)

const editController = useMapEditStore()

const selectedMissao = ref<number | null>(null)
const selectedTalhao = ref<number | null>(null)

const missaoList = ref<any[]>([])
const talhaoList = ref<number[]>([])
const resultFrom = ref<string>()

const talhaoFeatureDict = ref<Record<number, any>>({})

const date = ref(((new Date()).toISOString()).replace('Z', ''))

const fetchResultado = async () => {
  if(selectedMissao.value === null || selectedTalhao.value === null) {
    features.value = null
    return
  }

  if(!!talhaoFeatureDict.value[selectedTalhao.value]) {
    features.value = talhaoFeatureDict.value[selectedTalhao.value]
    return
  }

  let result
  try {
    result = await axios.get(`http://localhost:8080/result/${selectedMissao.value}/QA/${selectedTalhao.value}`)
    resultFrom.value = 'qa'
  } catch {
    result = await axios.get(`http://localhost:8080/result/${selectedMissao.value}/AI/${selectedTalhao.value}`)
    resultFrom.value = 'ai'
  }
	features.value = result.data.daninhasDTO.features
}

const fetchMissaoList = async () => {
  const result = await axios.get('http://localhost:8080/missao/all')
  missaoList.value = result.data
}

const saveMissao = async () => {
  const qaJson: any = {
    "type": "FeatureCollection",
    "name": "QA",
    "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
    "features": []
  }
  for(const id of talhaoList.value) {
    let featureList = talhaoFeatureDict.value[id]
    if(!featureList) {
      let result
      try {
        result = await axios.get(`http://localhost:8080/result/${selectedMissao.value}/QA/${id}`)
      } catch {
        result = await axios.get(`http://localhost:8080/result/${selectedMissao.value}/AI/${id}`)
      }
      featureList = result.data.daninhasDTO.features
    }
    qaJson.features.push(...featureList)
  }

  
  const blob = new Blob([JSON.stringify(qaJson)], {
    type: 'multipart/form-data'
  })

  const file = new File([blob], 'file.geojson')

  const data = new FormData()
  data.append('missao_id', selectedMissao.value?.toString() ?? '')
  data.append('file', file)

  axios.post('http://localhost:8080/result/qa', data, {
    headers: { "Content-Type": "multipart/form-data" }
  })
}

editController.$subscribe((_, state) => {
  if(state.saving) {
    const newFeatureList = features.value.reduce((list, feature, i) => {
      if(state.deletedFeatureIndexList.includes(i)) return list
      if(feature.geometry.length === 0) {
        return list
      }
      if(feature.geometry.coordinates.length === 0) {
        return list
      }
      list.push(feature)
      return list
    }, [] as any[])

    features.value = newFeatureList
    talhaoFeatureDict.value[selectedTalhao.value ?? 0] = newFeatureList

    editController.toggleSave(false)
  }
})

watch([selectedMissao], () => {
  if(selectedMissao.value === null) {
    talhaoList.value = []
    return
  }

  const missao = missaoList.value.find(e => e.id === selectedMissao.value)
  talhaoList.value = missao.talhoes_id
  
})

watch([selectedTalhao], () => {
  fetchResultado()
})

onMounted(() => {
	fetchResultado()
  fetchMissaoList()
})
</script>