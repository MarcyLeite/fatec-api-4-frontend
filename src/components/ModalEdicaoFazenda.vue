<template>
    <v-dialog v-model="abrirModal" max-width="500">
      <v-card>
        <v-card-title class="text-h6">Editar Fazenda</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="salvarEdicao">
            <v-text-field v-model="fazendaEdit.nome" :rules="rules" label="Nome Fazenda" />
            <v-text-field v-model="fazendaEdit.cidade" :rules="rules" label="Cidade" />
            <v-text-field v-model="fazendaEdit.estado" :rules="rules" label="Estado" />
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
import { ref, watch } from 'vue'

const props = defineProps({
  abrir: Boolean,
  fazenda: Object
})

const emit = defineEmits(['update:abrir', 'atualizou', 'close'])

const abrirModal = ref(props.abrir)
watch(() => props.abrir, (val) => abrirModal.value = val)
watch(abrirModal, (val) => emit('update:abrir', val))

const fazendaEdit = ref({ ...props.fazenda })

const rules = [
  value => !!value || 'Campo obrigatório',
]

const salvarEdicao = async () => {
  try {
    await fetch(`http://localhost:8080/fazenda/editar/${fazendaEdit.value.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fazendaEdit.value)
    });

    emit('atualizou') 
    emit('update:abrir', false) 
  } catch (err) {
    console.error('Erro ao salvar fazenda:', err)
  }
}

const cancelarEdicao = () => {
  emit('update:abrir', false)
  emit('close')
}
</script>
