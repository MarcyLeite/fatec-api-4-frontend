<template>
  <div class="fazendas-titulo text-h2 ma-2 pa-2">Talhões</div>
  
  <v-container class="d-flex justify-center align-center"> 
    <v-data-table-server
      v-model:items-per-page="itensPorPagina"
      :headers="headers"
      :items="paginaTalhao"
      :items-length="totalTalhoes"
      :loading="loading"
      item-value="nome"
      @update:options="carregarTalhoes"
      class="fazendas-table rounded-lg elevation-5 bg-deep-purple-lighten-5"
    >
      <template v-slot:item.edicao="{ item }">
        <v-btn color="#8E19E0" @click="editarTalhao(item)" class="btn-edicao-talhao">Editar</v-btn>
      </template>
    </v-data-table-server>
  </v-container>
  
  <v-container class="d-flex justify-end">
    <v-btn @click="adicionarTalhao" color="#801e62">
      Cadastrar Novo Talhão
    </v-btn>
  </v-container>
</template>

<script setup>
import router from '../router/index'
import { ref, onMounted } from 'vue';
import axios from 'axios';

const headers = ref([
  { title: "Talhão", key: "nome" },
  { title: "Cultura", key: "cultura", align: "end" },
  { title: "Área", key: "area", align: "end" },
  { title: "Edição", key: "edicao", sortable: false }
]);

const talhoes = ref([]);
const itensPorPagina = ref(5);
const paginaTalhao = ref([]);
const totalTalhoes = ref(0);
const loading = ref(false);

async function buscarTalhao(page = 0, size = 5) {
  loading.value = true;
  try {
    const response = await axios.get(`http://localhost:8080/talhao/listar/${page}/${size}`);
    talhoes.value = response.data.content;
    totalTalhoes.value = response.data.totalElements || 0;
    carregarTalhoes({ page: page + 1, itemsPerPage: size });
  } catch (error) {
    console.error('Erro ao buscar talhões:', error);
  } finally {
    loading.value = false;
  }
}

function carregarTalhoes({ page, itemsPerPage }) {
  loading.value = true;
  setTimeout(() => {
    const inicio = (page - 1) * itemsPerPage;
    const fim = inicio + itemsPerPage;
    paginaTalhao.value = talhoes.value.slice(inicio, fim);
    loading.value = false;
  }, 500);
}

function adicionarTalhao() {
  router.push('/talhao/cadastro/')
}

function editarTalhao(item) {
  console.log("Editando talhão", item);
}

onMounted(() => buscarTalhao(0, itensPorPagina.value));
</script>