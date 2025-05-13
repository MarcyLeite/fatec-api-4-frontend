<template>
  <div class="pa-4 d-flex flex-column">
    <div>
      <div class="result-titulo text-h2 ma-2 pa-2">Resultado</div>

      <v-container class="justify-center align-center pa-4">
        <v-form
          v-model="valid"
          class="result-form rounded-lg elevation-5 bg-deep-purple-lighten-5 pa-4 d-flex flex-column ga-4"
        >
          <h1>Cadastro de Resultado</h1>

          <v-select
            v-model="selectedFazenda"
            :items="fazendas"
            item-title="nome"
            item-value="id"
            :loading="loadingFazendas"
            :disabled="loading"
            :rules="[v => !!v || 'Selecione uma fazenda']"
            label="Fazenda"
            required
          />

          <v-select
            v-model="selectedTalhoes"
            :items="talhoes"
            item-title="nome"
            item-value="id"
            :loading="loadingTalhoes"
            :disabled="!selectedFazenda"
            multiple
            label="Talhões"
            :rules="[v => v.length > 0 || 'Selecione pelo menos um talhão']"
            required
          />

          <v-file-input
            accept=".geojson"
            label="GeoJson File"
            v-model="geoJsonFile"
            :disabled="loading"
            :rules="[v => !!v || 'O arquivo é obrigatório']"
            required
          />
        </v-form>
      </v-container>

      <v-container class="d-flex justify-end">
        <v-btn @click="enviarResultado" color="deep-purple-darken-1" :loading="loading" :disabled="loading">
          Cadastrar Resultado
        </v-btn>
      </v-container>
    </div>

    <v-snackbar v-model="snackbar.show" :timeout="3000" :color="snackbar.color">
      {{ snackbar.message }}
    </v-snackbar>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import axios from "axios";
import { useAppStore } from "@/stores/app";

const valid = ref(false);
const loading = ref(false);

const fazendas = ref([]);
const talhoes = ref([]);

const selectedFazenda = ref(null);
const selectedTalhoes = ref([]);
const geoJsonFile = ref(null);
const geojson = ref(null);

const loadingFazendas = ref(false);
const loadingTalhoes = ref(false);

const snackbar = ref({ show: false, message: "", color: "success" });

const { token } = useAppStore()

async function buscarFazendas() {
  loadingFazendas.value = true;
  try {
    const { data } = await axios.get(`http://localhost:8080/fazenda/listar?token=${token}`);
    fazendas.value = data.map(({ id, nome }) => ({ id, nome }));
  } catch (e) {
    mostrarSnackbar("Erro ao buscar fazendas", "error");
  } finally {
    loadingFazendas.value = false;
  }
}

async function buscarTalhoes(fazendaId) {
  loadingTalhoes.value = true;
  try {
    const { data } = await axios.get(`http://localhost:8080/talhao/listar/${fazendaId}?token=${token}`);
    talhoes.value = data.map(({ id, nome }) => ({ id, nome }));
  } catch {
    mostrarSnackbar("Erro ao buscar talhões", "error");
  } finally {
    loadingTalhoes.value = false;
  }
}

async function enviarResultado() {
  if (!selectedFazenda.value || !geoJsonFile.value || selectedTalhoes.value.length === 0) {
    mostrarSnackbar("Preencha todos os campos!", "error");
    return;
  }

  loading.value = true;
  try {
    const formData = new FormData();
    formData.append("talhoes_ids", selectedTalhoes.value.join(" "));
    formData.append("file", geoJsonFile.value);

    const response = await axios.post(
      `http://localhost:8080/result/ai?token=${token}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    if (response.status === 200) {
      mostrarSnackbar("Resultado será cadastrado em instantes!", "success");
      limparFormulario();
    }
  } catch (e) {
    console.error(e);
    mostrarSnackbar("Erro ao cadastrar resultado", "error");
  } finally {
    loading.value = false;
  }
}

function limparFormulario() {
  selectedTalhoes.value = [];
  geoJsonFile.value = null;
  geojson.value = null;
  valid.value = false;
}
function mostrarSnackbar(message, color = "success") {
  snackbar.value = { show: true, message, color };
}

watch(selectedFazenda, (newVal) => {
  limparFormulario();
  if (newVal) buscarTalhoes(newVal);
});;

watch(geoJsonFile, () => {
  if (!geoJsonFile.value) return;
  const reader = new FileReader();
  reader.onload = () => {
    geojson.value = JSON.parse(reader.result);
  };
  reader.readAsText(geoJsonFile.value);
});

onMounted(buscarFazendas);
</script>
