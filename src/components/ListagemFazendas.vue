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
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const headers = ref([
    { title: "Fazenda", key: "fazNome" },
    { title: "Área", key: "fazArea", align: "end" },
    { title: "Produção Anual", key: "fazProdAnual", align: "end" },
    { title: "Tipo de Solo", key: "fazTipoSolo" },
    { title: "Edição", key: "edicao", sortable: false }
  ]);
  
  const fazendas = ref([]);
  const itensPorPagina = ref(5);
  const paginaFazenda = ref([]);
  const loading = ref(true);
  const totalFazendas = ref(fazendas.value.length);

  methods: {
    const buscarFazenda = async () => {
      try {
       const response = await axios.get('http://localhost:3000/fazenda/listar')
        .then(response => {
          this.fazendas = response.data;
          console.log(this.fazendas[0]);
        })
      } catch(error) {
          console.error('Erro ao buscar fazendas: ', error);
        };
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

    onMounted(buscarFazenda);
  }

</script>
