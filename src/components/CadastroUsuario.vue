<template>
  <v-container class="d-flex justify-center align-center fill-height">
    <v-form ref="form" v-model="valid" class="pa-4" style="width: 100%; max-width: 400px;">
      <v-text-field
        class="mb-4"
        v-model="state.nome"
        :counter="10"
        :rules="rules.nome"
        label="Nome"
        required
      ></v-text-field>

      <v-text-field
        class="mb-4"
        v-model="state.email"
        :rules="rules.email"
        label="E-mail"
        required
      ></v-text-field>

      <v-text-field
        class="mb-4"
        v-model="state.senha"
        :counter="10"
        :rules="rules.senha"
        label="Senha"
        type="password"
        required
      ></v-text-field>

      <v-select
        class="mb-4"
        v-model="state.select"
        :rules="rules.select"
        :items="tipoUsuario"
        label="Tipo usuário"
        required
      ></v-select>

      <v-btn class="mb-2" @click="submitForm" block color="deep-purple-darken-1">
        Cadastrar
      </v-btn>
      <v-btn class="mb-2" @click="clear" block color="deep-purple-lighten-3">
        Limpar
      </v-btn>
    </v-form>
  </v-container>
</template>

<script setup>
import { reactive, ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'

const router = useRouter()
const form = ref(null)
const valid = ref(null)

const initialState = { nome: '', email: '', senha: '', select: null }
const state = reactive({ ...initialState })
const tipoUsuario = ['Administrador', 'Consultor', 'Analista']

const rules = {
  nome: [(v) => !!v || 'Nome é obrigatório'],
  email: [
    (v) => !!v || 'E-mail é obrigatório',
    (v) => /.+@.+\..+/.test(v) || 'E-mail inválido',
  ],
  senha: [(v) => !!v || 'Senha é obrigatória'],
  select: [(v) => !!v || 'Selecione um tipo de usuário'],
}

const submitForm = async () => {
  const { valid } = await form.value.validate()
  if (!valid) return

  const body = {
    nome: state.nome,
    email: state.email,
    password: state.senha,
    role: state.select,
  }
  
  const store = useAppStore()
  
  try {
    await axios.post(`http://localhost:8080/usuario/cadastrar?token=${store.token}`, body)
    router.push('/usuario/')
  } catch (error) {
    console.error('Erro ao cadastrar:', error)
  }
}

function clear() {
  Object.assign(state, initialState)
}
</script>
