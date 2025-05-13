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

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'
import ListagemUsuarios from '@/components/ListagemUsuarios.vue'

const router = useRouter()
const store = useAppStore()
const usuarios = ref([])

function irParaCadastro() {
  router.push('/usuario/cadastrar')
}

onMounted(async () => {
  await store.verify()
})
</script>
