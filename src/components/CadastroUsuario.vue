<template>
    <form>
      <v-text-field
            v-model="state.nome"
            :counter="10"
            :rules="rules.nome"
            label="Nome"
            required
            @blur="v$.nome.$touch"
            @input="v$.nome.$touch"
      ></v-text-field>

        <v-text-field
          v-model="state.email"
          :rules="rules.email"
          label="E-mail"
          required
          @blur="v$.email.$touch"
          @input="v$.email.$touch"
        ></v-text-field>
      
        <v-text-field
            v-model="state.senha"
            :counter="10"
            :rules="rules.senha"
            label="Senha"
            required
            @blur="v$.senha.$touch"
            @input="v$.senha.$touch"
      ></v-text-field>

      <v-select
        v-model="state.select"
        :rules="rules.select"
        :items="tipoUsuario"
        label="Tipo usuário"
        required
        @blur="v$.select.$touch"
        @change="v$.select.$touch"
      ></v-select>

      <v-btn
        class="me-4"
        @click="submitForm"
      >
        submit
      </v-btn>
      <v-btn @click="clear">
        clear
      </v-btn>
    </form>
</template>
  
<script setup>
  import { reactive, onMounted } from 'vue'
  import axios from 'axios'
  
  const initialState = { nome: '', email: '', senha: '', select: null }
  const state = reactive({ ...initialState })
  const tipoUsuario = ['Administrador', 'Consultor', 'Analista']
  
  const rules = {
  nome: [(v) => !!v || 'Nome é obrigatório'],
  email: [(v) => !!v || 'E-mail é obrigatório', (v) => /.+@.+\..+/.test(v) || 'E-mail inválido'],
  senha: [(v) => !!v || 'Senha é obrigatória'],
  select: [(v) => !!v || 'Selecione um tipo de usuário'],
}
    
  const submitForm = async () => {
    const isValid = await $refs.form.validate()
    if (!isValid) return
  
    const body = {
      nome: state.nome,
      email: state.email,
      role: state.select,
    }
  
    try {
      await axios.post('http://localhost:8080/usuario/cadastrar', body)
      router.push('/usuario/')
    } catch (error) {
      console.error('Erro ao cadastrar:', error)
    }
  }

  onMounted(() => {
    submitForm()
    console.log("CadastroUsuario component mounted!");

  });
  
  function clear() {
    Object.assign(state, initialState)
  }
</script>