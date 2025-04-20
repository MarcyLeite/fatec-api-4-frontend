<template>
	<v-responsive class="align-center fill-height mx-auto my-10" max-width="900">
	  <v-btn @click="abrirModalEdicao(fazendas[0])">Editar Fazenda</v-btn>
  
	  <modal-edicao-fazenda
		:abrir="modalAberto"
		:fazenda="fazendaSelecionada"
		@update:abrir="modalAberto = $event"
		@atualizou="listarFazendas"
		@close="modalAberto = false"
	  />
	</v-responsive>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import ModalEdicaoFazenda from './ModalEdicaoFazenda.vue' 
  
  const modalAberto = ref(false)
  const fazendaSelecionada = ref(null)
  
  function abrirModalEdicao(fazenda) {
	fazendaSelecionada.value = fazenda
	modalAberto.value = true
  }
  </script>
  