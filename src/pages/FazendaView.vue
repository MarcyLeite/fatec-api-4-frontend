<template>
    <div>
        <h1>Fazendas</h1>
        <ListagemFazendas :fazendas = "fazendas" />
    </div>
</template>

<script>
import ListagemFazendas from '@/components/ListagemFazendas.vue';

export default {
    components: {
        ListagemFazendas
    },
    data() {
        return {
            fazendas: [
                { id: 1, fazNome: 'Fazenda A', fazArea: 100, fazProdAnual: 500, fazTipoSolo: 'Argiloso' },
                { id: 2, fazNome: 'Fazenda B', fazArea: 200, fazProdAnual: 700, fazTipoSolo: 'Arenoso' }
            ]
        }
    }
}

</script>