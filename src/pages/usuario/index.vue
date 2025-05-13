<template>
  <v-container class="py-4">
    <div class="d-flex justify-end mb-4">
      <v-btn color="primary" @click="irParaCadastro">
        Novo Usuário
      </v-btn>
    </div>

    <v-responsive class="mx-auto" max-width="900">
      <ListagemUsuarios :usuarios="usuarios" />
    </v-responsive>
  </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import ListagemUsuarios from '@/components/ListagemUsuarios.vue'

const router = useRouter()
const usuarios = ref([])

function irParaCadastro() {
  router.push('/usuario/cadastrar')
}
</script>
