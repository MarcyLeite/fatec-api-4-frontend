<template>
    <div class="bg-deep-purple-lighten-5" style="max-height: 100vh;">
        <v-responsive
            class="align-center fill-height mx-auto"
        >
            <ListagemTalhoes :talhoes="talhoes" />
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
