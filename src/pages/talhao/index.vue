<template>
    <div class="bg-deep-purple-lighten-5 h-100">
        <v-responsive
      class="align-centerfill-height mx-auto "
      max-width="900"
    >
        <ListagemTalhoes :talhoes = "talhoes" />
        </v-responsive>
    </div>
</template>

<script>
import ListagemTalhoes from '@/components/ListagemTalhoes.vue';

export default {
    components: {
        ListagemTalhoes
    },
}

</script>
