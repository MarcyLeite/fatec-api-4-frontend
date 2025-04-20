<template>
    <v-dialog v-model="props.abrir" max-width="500">
      <v-card>
        <v-card-title class="text-h6">Editar Fazenda</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="salvarEdicao">
            <v-text-field v-model="fazendaEdit.nome" :rules="rules" label="Nome Fazenda" />
            <v-select v-model="fazendaEdit.estado" :items="estados" item-title="nome" item-value="id" label="Estado" />
            <v-select v-model="fazendaEdit.cidade" :items="cidades" item-title="nome" item-value="id" label="Cidade" />
            <v-text-field v-model="fazendaEdit.producao" :rules="rules" label="Produção Anual" />
            <v-text-field v-model="fazendaEdit.area" :rules="rules" label="Área" />
            <v-text-field v-model="fazendaEdit.tipoSolo" :rules="rules" label="Tipo Solo" />
            <v-btn class="mt-2" type="submit" block color="deep-purple-darken-1">Salvar</v-btn>
            <v-btn class="mt-2" block color="deep-purple-lighten-3" @click="cancelarEdicao">Cancelar</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </template>
  
<script setup>
import axios from 'axios'
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
  abrir: Boolean,
  fazenda: Object
})

const emit = defineEmits(['atualizou', 'close'])

const estados = ref([])
const cidades = ref([])

const rules = [(v) => !!v || 'Campo obrigatório']

const fazendaEdit = ref({})

const carregarEstados = async () => {
  try {
    const response = await axios.get('http://localhost:8080/estado/all')
    estados.value = response.data
  } catch (err){
    console.error("Erro ao carregar estados", err)
  }
}

const carregarCidades = async () => {
  try {
    const response = await axios.get('http://localhost:8080/cidade/all')
    cidades.value = response.data
  } catch (err) {
    console.error("Erro ao carregar cidades", err)
  }
}

watch(() => props.fazenda, (novaFazenda) => {
  fazendaEdit.value = {
    ...novaFazenda,
    producao: novaFazenda?.prodAnual ?? '',
    estado: novaFazenda?.cidade?.estado ?? null,  
    cidade: novaFazenda?.cidade ?? null,
  };
}, { immediate: true });

onMounted(async () => {
  await carregarEstados()
  await carregarCidades()
})

const salvarEdicao = async () => {
  try {
    const fazendaParaSalvar = {
      ...fazendaEdit.value,
      cidade: {
        id: typeof fazendaEdit.value.cidade === 'object' ? fazendaEdit.value.cidade.id : fazendaEdit.value.cidade
      },
      estado: {
        id: typeof fazendaEdit.value.estado === 'object' ? fazendaEdit.value.estado.id : fazendaEdit.value.estado
      },
      prodAnual: Number(fazendaEdit.value.producao)
    };

    await fetch(`http://localhost:8080/fazenda/editar/${fazendaEdit.value.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fazendaParaSalvar)
    });

    emit('atualizou');
    emit('update:abrir', false);
  } catch (err) {
    console.error('Erro ao salvar fazenda:', err);
  }
};

const cancelarEdicao = () => {
  emit('update:abrir', false)
  emit('close')
}
</script>
