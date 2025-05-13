<template>
  <div class="d-flex flex-column ga-4 pa-2">
    <div class="text-h2">
      Fazendas
    </div>
    <v-form
      class="elevation-5"
      :disabled="loading"
    >
      <v-container>
        <v-progress-linear
          v-if="loading"
          indeterminate
        />
        <v-row class="text-body-1">
          <v-col cols="12">
            Cadastrar nova fazenda
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model:model-value="nome"
              label="Nome da fazenda"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-number-input
              v-model:model-value="prodAnual"
              label="Produção anual"
              control-variant="stacked"
            />
          </v-col>
          <v-col cols="4">
            <v-number-input
              v-model:model-value="area"
              label="Area"
              control-variant="stacked"
            />
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model:model-value="solo"
              label="Tipo de solo"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-autocomplete
              v-model:model-value="selectedCity"
              label="Cidade"
              :items="[...cityList, newCity].map((city) => ({
                title: `${city.nome}${city?.estado?.nome ? ` (${city.estado.nome})`: ''}`,
                value: city
              }))"
              @update:search="(v) => {
                newCity.nome = v
              }"
            />
          </v-col>
          <v-col cols="6">
            <v-autocomplete
              v-model:model-value="selectedState"
              label="Estado"
              :disabled="selectedCity?.id !== null"
              :items="stateList.map(state => ({
                title: state.nome,
                value: state
              }))"
              @update:model-value="(v) => newCity.estado = { id: v.id }"
            />
          </v-col>
        </v-row>
        <div class="d-flex ga-4">
          <v-btn
            :disabled="!valid"
            color="deep-purple-darken-1"
            @click="postFazenda"
          >
            Submit
          </v-btn>
          <v-btn @click="clear">
            Clear
          </v-btn>
        </div>
      </v-container>
    </v-form>
  </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { useAppStore } from '@/stores/app';
import axios from 'axios'
import { VNumberInput } from 'vuetify/labs/components';

type State = {
	id: number | null
	nome?: string
	sigla?: string
}

type City = {
	id: number | null
	nome: string
	estado: State | null
}

const cityList = ref<City[]>([])
const newCity = ref<City>({
	id: null,
	nome: '',
	estado: null
})

const stateList = ref<State[]>([])
const selectedCity = ref<City | null>(null)
const selectedState = ref<State | null>(null)

const nome = ref<string>('')
const prodAnual = ref<number>(0)
const area = ref<number>(0)
const solo = ref<string>('')

const store = useAppStore()

const loading = ref(true)
const valid = computed(() =>
	nome.value !== '' &&
	solo.value !== '' &&
	selectedCity.value !== null &&
	selectedState.value !== null
)

const fetchCityList = async () => {
	const result = await axios.get('http://localhost:8080/cidade/all')
	cityList.value = result.data
}

const fetchStateList = async () => {
	const result = await axios.get('http://localhost:8080/estado/all')
	stateList.value = result.data
}

const postFazenda = async () => {
	const body = {
		nome: nome.value,
		prodAnual: prodAnual.value,
		area: area.value,
		tipoSolo: solo.value,
		cidade: selectedCity.value
	}

	loading.value = true
	await axios.post(`http://localhost:8080/fazenda?token=${store.token}`, body)

	loading.value = false

	router.push('/fazenda/')
}

const clear = () => {
	selectedCity.value = null
	selectedState.value = null
	nome.value = ''
	prodAnual.value = 0
	area.value = 0
	solo.value = ''
}

watch(selectedCity, () => {
	if(selectedCity.value) {
		selectedState.value = selectedCity.value.estado
	}

	if(selectedCity.value !== newCity.value) {
		newCity.value.nome = ''
	} else {
		selectedState.value = null
	}

})

onMounted(async () => {
	await fetchCityList()
	await fetchStateList()
	loading.value = false
})
</script>