<template>
    <div class="bg-deep-purple-lighten-5 h-100">
        <v-responsive
      class="align-centerfill-height mx-auto "
      max-width="900"
    >
        <ListagemFazendas :fazendas = "fazendas" />
        </v-responsive>
    </div>
</template>

<script>
import ListagemFazendas from '@/components/ListagemFazendas.vue';

export default {
    components: {
        ListagemFazendas
    },
}

</script>