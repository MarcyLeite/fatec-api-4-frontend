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
            <v-btn class="mt-2" type="submit" block color="primary">Salvar</v-btn>
            <v-btn class="mt-2" block color="secondary" @click="cancelarEdicao">Cancelar</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup>
    import { reactive, ref, watch } from 'vue'
  
    const props  = defineProps({
        fazenda: Object,
        abrir: Boolean
    })
  
    const emit = defineEmits(['update', 'close'])

    const abrirModal = ref(props.abrir)

    watch(() => props.abrir, (val) => {
        abrirModal.value = val
        if(val && props.fazenda) {
            Object.assign(fazendaEdit, props.fazenda)
        }
    })

    const fazendaEdit = reactive({
        id: null,
        nome: '',
        cidade: '',
        estado: '',
        producao: '',
        area: '',
        tipoSolo: ''
    })

    const rules = [
        value => !!value || 'Campo Obrigatório',
    ]

    async function salvarEdicao() {
        try {
            const response = await fetch(`http://localhost:8080/fazenda/${fazendaEdit.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'Application/json'
                },
                body: JSON.stringify(fazendaEdit)
            })

            if(response.ok) {
                throw new Error('Erro ao atualizar fazenda')
            }

            const dadosAtualiazados = await response.json()
            emit('update', dadosAtualiazados)
            abrirModal.value = false
            emit('close')
        } catch (err) {
            console.error('Erro ao salvar:', err)
        }
    }

    const cancelarEdicao = () => {
        abrirModal.value = false
        emit('close')
    }
    
  </script>