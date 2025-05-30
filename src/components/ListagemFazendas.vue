<template>
  <div class="fazendas-titulo text-h2 ma-2 pa-2">Fazendas</div>

  <v-container class="d-flex justify-center align-center">
    <v-data-table-server
      v-model:items-per-page="itensPorPagina"
      :headers="headers"
      :items="fazendas"
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
        >
          Editar
        </v-btn>
      </template>

      <template v-slot:no-data>
        <div class="text-center pa-4">Nenhuma fazenda encontrada.</div>
      </template>
    </v-data-table-server>
  </v-container>

  <modal-edicao-fazenda
    v-if="fazendaSelecionada"
    v-model:abrir="abrirModal"
    :fazenda="fazendaSelecionada"
    @atualizou="carregarFazendas({ page: 1, itemsPerPage: itensPorPagina })"
    @close="fecharModal"
  />

  <v-container class="d-flex justify-end">
    <v-btn to="/fazenda/cadastro" color="deep-purple-darken-1">
      Cadastrar Nova Fazenda
    </v-btn>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import ModalEdicaoFazenda from "./ModalEdicaoFazenda.vue";
import { useAppStore } from "@/stores/app";

const abrirModal = ref(false);
const fazendaSelecionada = ref(null);

const editarFazenda = (item) => {
  fazendaSelecionada.value = { ...item };
  abrirModal.value = true;
};

const fecharModal = () => {
  abrirModal.value = false;
  fazendaSelecionada.value = null;
};

const headers = ref([
  { title: "Fazenda", key: "nome" },
  { title: "Área", key: "area", align: "end" },
  { title: "Produção Anual", key: "prodAnual", align: "end" },
  { title: "Tipo de Solo", key: "tipoSolo" },
  { title: "Edição", key: "edicao", sortable: false },
]);

const fazendas = ref([]);
const itensPorPagina = ref(5);
const totalFazendas = ref(0);
const loading = ref(true);

const store = useAppStore()

async function buscarFazenda(page = 0, size = itensPorPagina.value) {
  loading.value = true;

  try {
    const response = await axios.get(
      `http://localhost:8080/fazenda/listar/${page}/${size}?token=${store.token}`
    );
    fazendas.value = response.data.content || [];
    totalFazendas.value = response.data.totalElements || 0;
  } catch (error) {
    console.error("Erro ao buscar fazendas:", error);
  } finally {
    loading.value = false;
  }
}

function carregarFazendas(options) {
  const page = options?.page ?? 1;
  const itemsPerPage = options?.itemsPerPage ?? itensPorPagina.value;
  itensPorPagina.value = itemsPerPage;
  buscarFazenda(page - 1, itemsPerPage);
}

onMounted(() => {
  buscarFazenda(0, itensPorPagina.value);
});
</script>
