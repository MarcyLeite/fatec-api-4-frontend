<template>
  <div class="layout-container">
    <!-- Barra lateral para listagem de talhões -->
    <div class="sidebar">
      <div class="sidebar-header">
        <h2 class="sidebar-title">Talhões</h2>
        <v-btn @click="adicionarTalhao" color="#801e62" class="add-talhao-btn" small>
          Adicionar
        </v-btn>
      </div>

      <div v-if="loading" class="loading-container">
        <v-progress-circular indeterminate color="#801e62"></v-progress-circular>
      </div>

      <div v-else>
        <div v-if="talhoes.length === 0" class="empty-state">
          Nenhum talhão encontrado
        </div>

        <div v-else class="talhoes-list">
          <!-- Paginação -->
          <div class="pagination-container">
            <v-pagination
              v-model="paginaAtual"
              :length="totalPaginas"
              color="#801e62"
              density="comfortable"
            />
          </div>
          
          <div
            v-for="talhao in talhoes"
            :key="talhao.id"
            class="talhao-item"
            :class="{ 'selected': selectedTalhao === talhao }"
            @click="selectedTalhao = talhao"
          >
            <div class="talhao-info">
              <h3 class="talhao-nome">{{ talhao.nome }}</h3>
              <p class="talhao-cultura">Cultura: {{ talhao.cultura || 'Não definida' }}</p>
              <p class="talhao-area">Área: {{ talhao.area || 0 }}</p>
            </div>
            <div class="talhao-actions">
              <v-btn 
                icon="mdi-eye" 
                density="compact" 
                variant="plain" 
                @click.stop=""
              />
              <v-btn 
                icon="mdi-pencil" 
                density="compact" 
                variant="plain" 
                @click.stop="editarTalhao(talhao)"
                color="primary"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mapa -->
    <div class="map-container">
      <terravision-map v-model:model-value="selectedTalhao" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import router from '../router/index';
import axios from 'axios';
import { useAppStore } from '@/stores/app';

const talhoes = ref([]);
const loading = ref(false);
const selectedTalhao = ref(null);

const paginaAtual = ref(1); // v-pagination começa em 1
const itensPorPagina = ref(5);
const totalTalhoes = ref(0);

const totalPaginas = computed(() => Math.ceil(totalTalhoes.value / itensPorPagina.value));

const store = useAppStore()

async function buscarTalhoes(paginaZeroBased = 0, tamanho = 5) {
  loading.value = true;
  try {
    const response = await axios.get(`http://localhost:8080/talhao/listar/${paginaZeroBased}/${tamanho}?token=${store.token}`);
    talhoes.value = response.data.content || [];
    totalTalhoes.value = response.data.totalElements || 0;
  } catch (error) {
    console.error('Erro ao buscar talhões:', error);
  } finally {
    loading.value = false;
  }
}

function editarTalhao(talhao) {
  console.log('Editando talhão:', talhao);
  // Aqui você pode adicionar a lógica de edição posteriormente
  // Por exemplo: router.push(`/talhao/editar/${talhao.id}`);
}

watch([paginaAtual, itensPorPagina], () => {
  buscarTalhoes(paginaAtual.value - 1, itensPorPagina.value);
});

function adicionarTalhao() {
  router.push('/talhao/cadastro/');
}

onMounted(() => {
  buscarTalhoes(0, itensPorPagina.value);
});
</script>

<style scoped>
.layout-container {
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.sidebar {
  width: 300px;
  min-width: 300px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  padding: 16px;
  border-right: 1px solid #ddd;
  overflow-y: auto;
  z-index: 10;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.sidebar-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.add-talhao-btn {
  font-size: 14px;
  color: white;
}

.loading-container {
  display: flex;
  justify-content: center;
  padding: 20px 0;
}

.empty-state {
  text-align: center;
  color: #666;
  padding: 20px 0;
}

.talhoes-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.talhao-item {
  background: #f4f1ff;
  padding: 12px;
  border-radius: 8px;
  border-left: 4px solid #7c3aed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-bottom: 16px;
}

.talhao-item:hover {
  background: #ede9fe;
}

.talhao-item.selected {
  background: #ddd6fe;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.talhao-info {
  display: flex;
  flex-direction: column;
}

.talhao-nome {
  font-weight: bold;
  color: #5b21b6;
  margin-bottom: 4px;
  margin-top: 0;
}

.talhao-cultura,
.talhao-area {
  font-size: 14px;
  color: #555;
  margin: 2px 0;
}

.talhao-actions {
  display: flex;
  gap: 4px;
}

.pagination-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
}

.itens-select {
  max-width: 150px;
}

.map-container {
  flex: 1;
  position: relative;
  height: 100%;
}

.map-container terravision-map {
  width: 100%;
  height: 100%;
}
</style>