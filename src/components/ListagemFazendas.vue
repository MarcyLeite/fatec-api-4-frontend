<template>
    <div class="fazenda-tela">
        <h2 class="fazendas-titulo">Fazendas</h2>
        <div class="fazendas-container">
            <table v-if="fazendas.length > 0" class="fazendas-table">
                <thead class="fazendas-table-header">
                    <tr>
                        <th class="fazendas-header">Fazenda</th>
                        <th class="fazendas-header">Área</th>
                        <th class="fazendas-header">Produção Anual</th>
                        <th class="fazendas-header">Tipo de Solo</th>
                        <th class="fazendas-header">Edição</th>
                    </tr>
                </thead>
                <tbody class="fazendas-table-body">
                <tr v-for="fazenda in fazendas" :key="fazenda.id || fazenda.fazId" class="fazendas-table-row">
                    <td class="fazendas-cell">{{ fazenda.fazNome }}</td>
                    <td class="fazendas-cell">{{ fazenda.fazArea }}</td>
                    <td class="fazendas-cell">{{ fazenda.fazProdAnual }}</td>
                    <td class="fazendas-cell">{{ fazenda.fazTipoSolo }}</td>
                    <td class="fazendas-cell">
                        <button @click="editarFazenda(fazenda)" class="btn-edicao-fazenda">Editar</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <p v-else class="fazendas-empty-message">Nenhuma Fazenda cadastrada</p>
        
        <div class="pagina-container">
            <button @click="paginaAnterior" :disabled="paginaAtual === 1" class="btn-paginacao"> &lt; < </button>
            <span class="contador-pagina">Página {{ paginaAtual }} de {{ totalPaginas }}</span>
            <button @click="proximaPagina" :disabled="paginaAtual === totalPaginas" class="btn-paginacao"> &gt; > </button>
        </div>
        
        <button @click="adicionarFazenda(fazenda)" class="btn-nova-fazenda">Cadastrar Nova Fazenda</button>
    </div>
</div>
</template>

<script>
export default {
    props: {
        fazendas: Array,
    },
    data() {
        return {
            paginaAtual: 1,
            itensPorPagina: 5,
        };
    },

    computed: {
        paginaFazenda() {
            const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
            const fim = inicio + this.itensPorPagina;
            return this.fazendas.slice(inicio, fim);
        },

        totalPaginas() {
            return Math.ceil(this.fazendas.length / this.itensPorPagina);
        }
    },
    methods: {
        adicionarFazenda(fazenda) {
            console.log("Fazenda adicionada", fazenda);
        },

        editarFazenda() {
            console.log("Fazenda editada");
        },
        
        paginaAnterior() {
            if(this.paginaAtual > 1) {
                this.paginaAtual--;
            }
        },

        proximaPagina() {
            if(this.paginaAtual < this.totalPaginas) {
                this.paginaAtual++;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@use '@/styles/fazendas.scss';
</style>