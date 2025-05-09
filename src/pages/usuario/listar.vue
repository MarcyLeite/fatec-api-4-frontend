<template>
    <div class="bg-deep-purple-lighten-5 h-100">
        <v-responsive
      class="align-centerfill-height mx-auto "
      max-width="900"
    >
        <ListagemUsuarios :usuarios = "usuarios" />
        </v-responsive>
    </div>
</template>

<script>
import ListagemUsuarios from '@/components/ListagemUsuarios.vue';

export default {
    components: {
        ListagemUsuarios
    },
}

</script>