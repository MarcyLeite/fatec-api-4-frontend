<template>
    <div class="fazenda-tela">
        <h2 class="fazendas-titulo">Fazendas</h2>
        <div class="fazendas-container">
            <table v-if="paginaFazenda.length > 0" class="fazendas-table">
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
                <tr v-for="fazenda in paginaFazenda" :key="fazenda.id || fazenda.fazId" class="fazendas-table-row">
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
            <div class="dropdown-pagina">
                <button class="btn-dropdown" @click="mostrarPaginas = !mostrarPaginas">
                    {{ totalPaginas }} ▼
                </button>

                <ul v-if="mostrarPaginas" class="dropdown-menu">
                    <li v-for="pagina in todasPaginas" :key="pagina" @click="mudarPagina(pagina)" :class="{ 'active': pagina === paginaAtual}">
                        {{ pagina }}
                    </li>
                </ul>
            </div>
            <span class="contador-pagina"> {{ paginaAtual }} - {{ totalPaginas }} </span>
            <button @click="paginaAnterior" :disabled="paginaAtual === 1" class="btn-paginacao"> &lt; </button>
            <button @click="proximaPagina" :disabled="paginaAtual === totalPaginas" class="btn-paginacao"> &gt; </button>
        </div>    
    </div>
    <button @click="adicionarFazenda(fazenda)" class="btn-nova-fazenda">Cadastrar Nova Fazenda</button>
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
            mostrarPaginas: false,
            
            // Fazenda mockada
            fazendas: [
            { id: 1, fazNome: "Fazenda Sol Nascente", fazArea: 100, fazProdAnual: 5000, fazTipoSolo: "Argiloso" },
                { id: 2, fazNome: "Fazenda Lua Cheia", fazArea: 150, fazProdAnual: 7000, fazTipoSolo: "Arenoso" },
                { id: 3, fazNome: "Fazenda Verde Vale", fazArea: 200, fazProdAnual: 10000, fazTipoSolo: "Misto" },
                { id: 4, fazNome: "Fazenda Céu Azul", fazArea: 120, fazProdAnual: 6000, fazTipoSolo: "Argiloso" },
                { id: 5, fazNome: "Fazenda Serra Dourada", fazArea: 180, fazProdAnual: 8000, fazTipoSolo: "Arenoso" },
                { id: 6, fazNome: "Fazenda Rio Tranquilo", fazArea: 90, fazProdAnual: 4500, fazTipoSolo: "Misto" },
                { id: 7, fazNome: "Fazenda Montanha Alta", fazArea: 250, fazProdAnual: 12000, fazTipoSolo: "Argiloso" },
                { id: 8, fazNome: "Fazenda Planície Verde", fazArea: 130, fazProdAnual: 5500, fazTipoSolo: "Arenoso" },
                { id: 9, fazNome: "Fazenda Colina Serena", fazArea: 170, fazProdAnual: 7500, fazTipoSolo: "Misto" },
                { id: 10, fazNome: "Fazenda Vale Feliz", fazArea: 110, fazProdAnual: 5000, fazTipoSolo: "Argiloso" },
                { id: 11, fazNome: "Fazenda Terra Fértil", fazArea: 140, fazProdAnual: 6500, fazTipoSolo: "Arenoso" },
                { id: 12, fazNome: "Fazenda Céu Aberto", fazArea: 160, fazProdAnual: 7000, fazTipoSolo: "Misto" },
            ]
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
        },

        todasPaginas() {
            return Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
        }
    },

    methods: {
        mudarPagina(pagina) {
            if (pagina >= 1 && pagina <= this.totalPaginas) {
                this.paginaAtual = pagina;
                this.mostrarPaginas = false;
            }
        },

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