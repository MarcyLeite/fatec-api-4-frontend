<template>
    <form>
        <v-text-field
          v-model="state.email"
          :error-messages="v$.email.$errors.map(e => e.$message)"
          label="E-mail"
          required
          @blur="v$.email.$touch"
          @input="v$.email.$touch"
        ></v-text-field>
      
        <v-text-field
            v-model="state.senha"
            :counter="10"
            :error-messages="v$.senha.$errors.map(e => e.$message)"
            label="Senha"
            required
            @blur="v$.senha.$touch"
            @input="v$.senha.$touch"
      ></v-text-field>

      <v-select
        v-model="state.select"
        :error-messages="v$.select.$errors.map(e => e.$message)"
        :items="tipoUsuario"
        label="Tipo usuário"
        required
        @blur="v$.select.$touch"
        @change="v$.select.$touch"
      ></v-select>

      <v-btn
        class="me-4"
        @click="v$.$validate"
      >
        submit
      </v-btn>
      <v-btn @click="clear">
        clear
      </v-btn>
    </form>
  </template>
  
  <script setup>
    import { reactive } from 'vue'
    import { useVuelidate } from '@vuelidate/core'
    import { email, required } from '@vuelidate/validators'
    import axios from 'axios'
    import router from '@/router'
  
    const initialState = {
      email: '',
      senha: '',
      select: null,
    }
    
    const tipoUsuario = [
      'Administrador',
      'Consultor',
      'Analista',
    ]
  
    const state = reactive({
      ...initialState,
    })
  
  
    const rules = {
      email: { required, email },
      senha: { required },
      select: { required },
      items: { required },
    }

    const cadastrarUsuario = async () => {
        const body = {
            email: email.value,
            senha: senha.value,
            select: select.value,
        }

        loading.value = true
        await axios.post('http://localhost:8080/usuario/cadastrar', body)

        loading.value = false
        router.push('/usuario/')
    }

    onMounted(async () => {
        cadastrarUsuario()
    })
  
    const v$ = useVuelidate(rules, state)
  
    function clear () {
      v$.value.$reset()
  
      for (const [key, value] of Object.entries(initialState)) {
        state[key] = value
      }
    }
  </script>