<template>
  <div class="pa-4 d-flex flex-column">
    <div>
      <div class="talhao-titulo text-h2 ma-2 pa-2">Talhão</div>
    
      <v-container class="justify-center align-center pa-4">
        <v-form
          v-model="valid"
          class="talhao-form rounded-lg elevation-5 bg-deep-purple-lighten-5 pa-4 d-flex flex-column ga-4"
        >
          <h1>Cadastro de Talhão</h1>
    
          <v-select
            v-model="selectedFazenda"
            :items="fazendas"
            item-title="nome"
            item-value="id"
            :loading="loadingFazendas"
            :disabled="loading || loadingFazendas"
            :rules="[(v) => !!v || 'Selecione uma fazenda']"
            label="Fazenda"
            required
          ></v-select>
    
          <v-file-input
            accept=".geojson"
            label="GeoJson File"
            v-model="geoJsonFile"
            :disabled="loading"
            :rules="[(v) => !!v || 'O arquivo é obrigatório']"
            required
          ></v-file-input>
        </v-form>
      </v-container>
      <v-container class="d-flex justify-end">
        <v-btn @click="enviarTalhao" color="deep-purple-darken-1" :loading="loading" :disabled="loading">
          Cadastrar Talhões
        </v-btn>
      </v-container>
    </div>
  
    <div style="height: 512px;">
      <terravision-map-preview v-model:model-value="geojson"/>
    </div>

    <v-snackbar v-model="snackbar.show" :timeout="3000" :color="snackbar.color">
      {{ snackbar.message }}
    </v-snackbar>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useAppStore } from "@/stores/app";

const fazendas = ref([]);
const selectedFazenda = ref(null);
const geoJsonFile = ref(null);
const geojson = ref(null)
const valid = ref(false);
const loading = ref(false);
const loadingFazendas = ref(false);
const snackbar = ref({ show: false, message: "", color: "success" });

const store = useAppStore()

async function buscarFazendas() {
  loadingFazendas.value = true;
  try {
    const response = await axios.get(`http://localhost:8080/fazenda/listar?token=${store.token}`);
    fazendas.value = response.data.map(fazenda => ({
      id: fazenda.id,
      nome: fazenda.nome
    }));
  } catch (error) {
    mostrarSnackbar("Erro ao buscar fazendas", "error");
  } finally {
    loadingFazendas.value = false;
  }
}

async function enviarTalhao() {
  if (!selectedFazenda.value || !geoJsonFile.value) {
    mostrarSnackbar("Preencha todos os campos!", "error");
    return;
  }

  loading.value = true;
  const formData = new FormData();
  formData.append("faz_id", selectedFazenda.value);
  formData.append("file", geoJsonFile.value);

  try {
    const response = await axios.post(`http://localhost:8080/talhao?token=${store.token}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response.status === 200) {
      mostrarSnackbar("Talhão cadastrado com sucesso!", "success");
      limparFormulario();
    }
  } catch (error) {
    mostrarSnackbar("Erro ao cadastrar talhão", "error");
  } finally {
    loading.value = false;
  }
}

function limparFormulario() {
  selectedFazenda.value = null;
  geoJsonFile.value = null;
  valid.value = false;
}

function mostrarSnackbar(message, color) {
  snackbar.value = { show: true, message, color };
}

watch(geoJsonFile, async () => {
  if(!geoJsonFile.value) return
  const fileReader = new FileReader()

  fileReader.onload = () => {
    geojson.value = JSON.parse(fileReader.result)
    fileReader.onload = false
  }

  fileReader.readAsText(geoJsonFile.value)
})

onMounted(buscarFazendas);
</script>
