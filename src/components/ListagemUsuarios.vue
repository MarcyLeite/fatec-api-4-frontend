<template>
    <div class="usuarios-titulo text-h2 ma-2 pa-2">Usuários</div>
  
    <v-container class="d-flex justify-center align-center">
      <v-data-table-server
        v-model:items-per-page="itensPorPagina"
        :headers="headers"
        :items="usuarios"
        :items-length="totalUsuarios"
        :loading="loading"
        item-value="usuNome"
        @update:options="carregarUsuarios"
        class="usuarios-table rounded-lg elevation-5 bg-deep-purple-lighten-5"
      >
        <template v-slot:item.edicao="{ item }">
          <v-btn
            color="#8E19E0"
            @click="editarUsuario(item)"
            class="btn-edicao-usuario"
          >
            Editar
          </v-btn>
        </template>

        <template v-slot:item.deletar="{ item }">
          <v-btn
            color="#ef4438"
            @click="deletarUsuario(item)"
            class="btn-deletar-usuario"
          >
            Deletar
          </v-btn>
        </template>
  
        <template v-slot:no-data>
          <div class="text-center pa-4">Nenhum usuário encontrado.</div>
        </template>
      </v-data-table-server>
    </v-container>
  
    <modal-edicao-fazenda
      v-if="usuarioSelecionado"
      v-model:abrir="abrirModal"
      :fazenda="usuarioSelecionado"
      @atualizou="carregarUsuarios({ page: 1, itemsPerPage: itensPorPagina })"
      @close="fecharModal"
    />
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import axios from "axios";
  
  const abrirModal = ref(false);
  const usuarioSelecionado = ref(null);
  
 //const editarUsuario = (item) => {
 //   usuarioSelecionado.value = { ...item };
 //   abrirModal.value = true;
 // };
  
  const fecharModal = () => {
    abrirModal.value = false;
    usuarioSelecionado.value = null;
  };
  
  const headers = ref([
    { title: "Usuário", key: "nome" },
    { title: "Email", key: "email", align: "end" },
    { title: "Cargo", key: "role", align: "end" },
    { title: "Status", key: "status" },
    { title: "Editar", key: "edicao", align: "center", sortable: false },
    { title: "Deletar", key: "deletar", align: "center", sortable: false }
  ]);
  
  const usuarios = ref([]);
  const itensPorPagina = ref(5);
  const totalUsuarios = ref(0);
  const loading = ref(true);
  
  async function buscarUsuario(page = 0, size = itensPorPagina.value) {
    loading.value = true;
  
    try {
      const response = await axios.get(
        `http://localhost:8080/usuario/listar/${page}/${size}`
      );
      usuarios.value = response.data.content || [];
      totalUsuarios.value = response.data.totalElements || 0;
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    } finally {
      loading.value = false;
    }
  }
  
  function carregarUsuarios(options) {
    const page = options?.page ?? 1;
    const itemsPerPage = options?.itemsPerPage ?? itensPorPagina.value;
    itensPorPagina.value = itemsPerPage;
    buscarUsuario(page - 1, itemsPerPage);
  }
  
  onMounted(() => {
    buscarUsuario(0, itensPorPagina.value);
  });
  </script>
  