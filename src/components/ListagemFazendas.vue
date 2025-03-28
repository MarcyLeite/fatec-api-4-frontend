<template>
  <div class="fazendas-titulo text-h2 ma-2 pa-2">Fazendas</div>
  <v-container class="d-flex justify-center align-center">
    <v-data-table-server
      v-model:items-per-page="itensPorPagina"
      :headers="headers"
      :items="paginaFazenda"
      :items-length="totalFazendas"
      :loading="loading"
      item-value="fazNome"
      @update:options="carregarFazendas"
      class="fazendas-table rounded-lg elevation-5 bg-deep-purple-lighten-5"
    >
      <template v-slot:item.edicao="{ item }">
        <v-btn
          color="#8E19E0"
          @click="editarFazenda(item)"
          class="btn-edicao-fazenda"
          >Editar</v-btn
        >
      </template>
    </v-data-table-server>
  </v-container>

  <v-container class="d-flex justify-end">
    <v-btn @click="adicionarFazenda" color="deep-purple-darken-1">
      Cadastrar Nova Fazenda
    </v-btn>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const headers = ref([
  { title: "Fazenda", key: "nome" },
  { title: "Área", key: "area", align: "end" },
  { title: "Produção Anual", key: "prodAnual", align: "end" },
  { title: "Tipo de Solo", key: "tipoSolo" },
  { title: "Edição", key: "edicao", sortable: false },
]);

const fazendas = ref([]);
const itensPorPagina = ref(5);
const paginaFazenda = ref([]);
const totalFazendas = ref(0);
const loading = ref(true);

async function buscarFazenda(page = 0, size = 5) {
  loading.value = true;

  try {
    const response = await axios.get(
      "http://localhost:8080/fazenda/listar/{page}/{quantity}"
    );

    fazendas.value = response.data.content;
    totalFazendas.value = response.data.totalElements || 0;

    carregarFazendas({ page: 1, itemsPerPage: size });
  } catch (error) {
    console.error("Erro ao buscar fazendas:", error);
  } finally {
    loading.value = false;
  }
}

function carregarFazendas({ page, itemsPerPage }) {
  loading.value = true;
  setTimeout(() => {
    const inicio = (page - 1) * itemsPerPage;
    const fim = inicio + itemsPerPage;
    paginaFazenda.value = fazendas.value.slice(inicio, fim);
    loading.value = false;
  }, 500);
}

function adicionarFazenda() {
  console.log("Fazenda adicionada");
}

function editarFazenda(item) {
  console.log("Editando fazenda", item);
}

onMounted(() => buscarFazenda());
</script>
