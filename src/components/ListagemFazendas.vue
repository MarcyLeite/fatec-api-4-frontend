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
        <v-btn color="#8E19E0" @click="editarFazenda(item)" class="btn-edicao-fazenda">Editar</v-btn>
      </template>
    </v-data-table-server>
  </v-container>
  
  <v-container class="d-flex justify-end">
    <v-btn @click="adicionarFazenda" color="#801e62">
      Cadastrar Nova Fazenda
    </v-btn>
  </v-container>
</template>
  
<script setup>
  import { ref } from 'vue';
  
  const fazendas = ref([
    { id: 1, fazNome: "Fazenda Sol Nascente", fazArea: 100, fazProdAnual: 5000, fazTipoSolo: "Argiloso" },
    { id: 2, fazNome: "Fazenda Lua Cheia", fazArea: 150, fazProdAnual: 7000, fazTipoSolo: "Arenoso" },
    { id: 3, fazNome: "Fazenda Verde Vale", fazArea: 200, fazProdAnual: 10000, fazTipoSolo: "Misto" },
    { id: 4, fazNome: "Fazenda Céu Azul", fazArea: 120, fazProdAnual: 6000, fazTipoSolo: "Argiloso" },
    { id: 5, fazNome: "Fazenda Serra Dourada", fazArea: 180, fazProdAnual: 8000, fazTipoSolo: "Arenoso" },
    { id: 1, fazNome: "Fazenda Sol Nascente", fazArea: 100, fazProdAnual: 5000, fazTipoSolo: "Argiloso" },
    { id: 2, fazNome: "Fazenda Lua Cheia", fazArea: 150, fazProdAnual: 7000, fazTipoSolo: "Arenoso" },
    { id: 3, fazNome: "Fazenda Verde Vale", fazArea: 200, fazProdAnual: 10000, fazTipoSolo: "Misto" },
    { id: 4, fazNome: "Fazenda Céu Azul", fazArea: 120, fazProdAnual: 6000, fazTipoSolo: "Argiloso" },
    { id: 5, fazNome: "Fazenda Serra Dourada", fazArea: 180, fazProdAnual: 8000, fazTipoSolo: "Arenoso" }
  ]);
  
  const headers = ref([
    { title: "Fazenda", key: "fazNome" },
    { title: "Área", key: "fazArea", align: "end" },
    { title: "Produção Anual", key: "fazProdAnual", align: "end" },
    { title: "Tipo de Solo", key: "fazTipoSolo" },
    { title: "Edição", key: "edicao", sortable: false }
  ]);
  
  const itensPorPagina = ref(5);
  const paginaFazenda = ref([]);
  const loading = ref(true);
  const totalFazendas = ref(fazendas.value.length);
  
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
</script>
  