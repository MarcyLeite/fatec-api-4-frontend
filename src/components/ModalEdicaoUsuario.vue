<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-title class="text-h6">Editar Usuário</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="salvarEdicao">
          <v-text-field v-model="usuarioEdit.nome" :rules="rules" label="Nome Usuário" />
          <v-text-field v-model="usuarioEdit.email" :rules="rules" label="Email" />
          <v-text-field v-model="usuarioEdit.password" label="Nova Senha" type="password" hint="Deixe em branco se não quiser alterar a senha" />
          <v-select v-model="usuarioEdit.role" :items="roles" :rules="rules" label="Role"/>
          <v-switch v-model="usuarioEdit.ativo" label="Ativo?" />

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
  usuario: Object
})

const emit = defineEmits(['atualizou', 'update:abrir', 'close'])

const dialog = ref(false)
const usuarioEdit = ref({})
const rules = [(v) => !!v || 'Campo obrigatório']

const roles = ['Administrador', 'Consultor', 'Analista']

watch(() => props.abrir, (val) => {
  dialog.value = val
  if (val && props.usuario) {
    usuarioEdit.value = { ...props.usuario }
  }
})

watch(dialog, (val) => {
  if (!val) emit('update:abrir', false)
})

async function salvarEdicao() {
  if (!usuarioEdit.value.password) {
    delete usuarioEdit.value.password; 
  }

  try {
    const response = await fetch(`http://localhost:8080/usuario/editar/${usuarioEdit.value.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usuarioEdit.value),
    });

    if (response.ok) {
      emit('atualizou');
      emit('update:abrir', false);
    } else {
      const errorData = await response.json();
      console.error('Erro ao editar usuário:', errorData);
    }
  } catch (err) {
    console.error('Erro ao salvar usuário:', err);
  }
}

const cancelarEdicao = () => {
  dialog.value = false
  emit('close')
}
</script>
