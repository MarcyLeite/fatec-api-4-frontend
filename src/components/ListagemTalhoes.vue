<template>
  <div class="ma-4">
    <div class="fazendas-titulo text-h2 ma-2 pa-2">Talhões</div>
    
    <v-container class="d-flex justify-center align-center"> 
      <v-data-table-server
      v-model:items-per-page="itensPorPagina"
      :headers="headers"
      :items="talhoes"
      :items-length="totalTalhoes"
      :loading="loading"
      item-value="nome"
      @update:options="carregarTalhoes"
      class="fazendas-table rounded-lg elevation-5 bg-deep-purple-lighten-5"
      >
      <template v-slot:item.actions="{ item }">
        <v-btn icon="mdi-eye" density="compact" variant="plain" @click="selectedTalhao = item" />
        <!--v-btn color="#8E19E0" @click="editarTalhao(item)" class="btn-edicao-talhao">Editar</v-btn-->
      </template>
    </v-data-table-server>
    </v-container>
    
    <v-container class="d-flex justify-end">
      <v-btn @click="adicionarTalhao" color="#801e62">
        Cadastrar Novo Talhão
      </v-btn>
    </v-container>

    <div style="height: 512px;">
        <terravision-map v-model:model-value="selectedTalhao"/>
    </div>
  </div>
  </template>

<script setup>
import router from '../router/index'
import { ref, onMounted } from 'vue';
import axios from 'axios';

const headers = ref([
  { title: "Talhão", key: "nome" },
  { title: "Cultura", key: "cultura", align: "end" },
  { title: "Área", key: "area", align: "end" },
  { title: "Ações", key: "actions", align: "end", sortable: false }
]);

const talhoes = ref([]);
const itensPorPagina = ref(5);
const totalTalhoes = ref(0);
const loading = ref(false);
const selectedTalhao = ref(null)

async function buscarTalhao(page = 0, size = 5) {
  loading.value = true;
  try {
    const response = await axios.get(`http://localhost:8080/talhao/listar/${page}/${size}`);
    talhoes.value = response.data.content;
    totalTalhoes.value = response.data.totalElements || 0;
  } catch (error) {
    console.error('Erro ao buscar talhões:', error);
  } finally {
    loading.value = false;
  }
}

function carregarTalhoes({ page, itemsPerPage }) {
  buscarTalhao(page - 1, itemsPerPage)
}

function adicionarTalhao() {
  router.push('/talhao/cadastro/')
}

onMounted(() => buscarTalhao(0, itensPorPagina.value));
</script>