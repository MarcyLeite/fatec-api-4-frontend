<template>
  <v-responsive
    class="align-center fill-height mx-auto my-10"
    max-width="900"
  >
    <v-btn @click="abrirModalEdicao(usuarios[0])">
        Editar Usuário
    </v-btn>
    
    <modal-edicao-usuario
    :abrir="modalAberto"
    :usuario="usuarioSelecionado"
    @update:abrir="modalAberto = $event"
    @atualizou="listarUsuarios"
    @close="modalAberto = false"
    @deletou="deletarUsuario"
    />
  </v-responsive>
</template>

<script setup>
import { ref } from 'vue'
import { useAppStore } from '@/stores/app'
import ModalEdicaoUsuario from '@/components/ModalEdicaoUsuario.vue'

const modalAberto = ref(false)
const usuarioSelecionado = ref(null)

function abrirModalEdicao(usuario) {
usuarioSelecionado.value = usuario
modalAberto.value = true
}

const store = useAppStore()
onMounted(async () => {
    await store.verify()
})
</script>
