<template>
    <v-container class="d-flex justify-center align-center fill-height">
      <v-btn color="primary" @click="irParaCadastro">
        Novo Usuário
      </v-btn>
    </v-container>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  function irParaCadastro() {
    router.push('/usuario/cadastrar')
  }
  </script>
  