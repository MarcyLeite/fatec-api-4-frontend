<template>
  <v-container class="dashboard-container">
    <v-card class="mb-6">
      <v-card-title class="d-flex align-center">
        <v-icon start>mdi-filter</v-icon>
        Filtros do Dashboard
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="4">
            <v-select
              v-model="filtros.analista"
              :items="analistas"
              :item-props="itemProps"
              label="Filtrar por Analista"
              clearable
              variant="outlined"
              :disabled="carregando"
            ></v-select>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="filtros.dataInicio"
              label="Data Início"
              type="date"
              variant="outlined"
              :disabled="carregando"
              clearable
              :max="filtros.dataFim || new Date().toISOString().split('T')[0]"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="filtros.dataFim"
              label="Data Fim"
              type="date"
              variant="outlined"
              :disabled="carregando"
              clearable
              :min="filtros.dataInicio"
              :max="new Date().toISOString().split('T')[0]"
            ></v-text-field>
          </v-col>
          <v-col cols="12" class="text-right">
            <v-btn
              color="primary"
              @click="carregarDados"
              :loading="carregando"
              :disabled="!filtrosValidos"
            >
              Aplicar Filtros
            </v-btn>
            <v-btn
              variant="text"
              class="ml-2"
              @click="limparFiltros"
              :disabled="carregando"
            >
              Limpar
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-row class="mb-6">
      <v-col v-for="(metrica, index) in metricas" :key="index" cols="12" sm="6" md="3">
        <v-card height="100%" :loading="carregando">
          <v-card-text class="text-center">
            <div class="text-h6 mb-2">{{ metrica.titulo }}</div>
            <div class="text-h4 font-weight-bold text-primary">
              {{ metrica.valor }} <small v-if="metrica.unidade">{{ metrica.unidade }}</small>
            </div>
            <v-icon size="x-large" class="mt-2" :color="metrica.cor">{{ metrica.icone }}</v-icon>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-card class="mt-6">
      <v-card-title class="d-flex align-center">
        <v-icon start>mdi-account-group</v-icon>
        Desempenho por Analista
        <v-spacer></v-spacer>
      </v-card-title>
      <v-data-table
        :headers="headersAnalistas"
        :items="dados.metricasPorAnalista || []"
        :loading="carregando"
        class="elevation-1"
      >
        <template v-slot:item.tempoMedio="{ item }">
          {{ item.tempoMedio ? formatarTempo(item.tempoMedio) : 'N/A' }}
        </template>
        <template v-slot:item.taxaAprovacao="{ item }">
          {{ item.taxaAprovacao || 'N/A' }}
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'DashboardPage',
  data() {
    return {
      carregando: false,
      filtros: {
        analista: null,
        dataInicio: null,
        dataFim: null
      },
      dados: {
        totalMapasConcluidos: 0,
        tempoMedioQA: 0.0,
        aprovacoesSemEdicao: 0,
        edicoesRealizadas: 0,
        percentualModificacoes: 0.0,
        metricasPorAnalista: []
      },
      analistas: [],
      headersAnalistas: [
        { title: 'Analista', key: 'nome', sortable: true },
        { title: 'Total Mapas', key: 'totalMapas', sortable: true },
        { title: 'Tempo Médio', key: 'tempoMedio', sortable: true },
        { title: 'Aprovações Sem Edição', key: 'aprovacoesSemEdicao', sortable: true },
        { title: 'Taxa Aprovação', key: 'taxaAprovacao', sortable: true }
      ]
    };
  },
  computed: {
    metricas() {
      return [
        {
          titulo: 'Mapas Concluídos',
          valor: this.dados.totalMapasConcluidos,
          icone: 'mdi-map-check',
          cor: 'primary'
        },
        {
          titulo: 'Tempo Médio QA',
          valor: this.dados.tempoMedioQA ? this.formatarTempo(this.dados.tempoMedioQA) : '0',
          icone: 'mdi-timer-outline',
          cor: 'green'
        },
        {
          titulo: 'Aprovações Sem Edição',
          valor: this.dados.aprovacoesSemEdicao,
          icone: 'mdi-check-circle',
          cor: 'teal'
        },
        {
          titulo: 'Missões modificadas',
          valor: this.dados.percentualModificacoes ? this.dados.percentualModificacoes.toFixed(1) : 0,
          unidade: '%',
          icone: 'mdi-pencil',
          cor: 'orange'
        }
      ];
    },
    filtrosValidos() {
      return this.filtros.analista || this.filtros.dataInicio || this.filtros.dataFim;
    }
  },
  async mounted() {
    await this.carregarAnalistas();
    await this.carregarDados();
  },
  methods: {
    itemProps(item) {
      return {
        title: item.nome,
        subtitle: `ID: ${item.id}`,
        value: item.id
      };
    },
    formatarTempo(minutos) {
      if (!minutos) return '0 min';
      if (minutos < 60) return `${minutos.toFixed(0)} min`;
      
      const horas = Math.floor(minutos / 60);
      const mins = minutos % 60;
      return `${horas}h ${mins.toFixed(0)}min`;
    },
    async carregarAnalistas() {
      try {
        this.carregando = true;
        const response = await axios.get('http://localhost:8080/dashboard/analistas');
        console.log('Analistas carregados:', response.data);
        this.analistas = response.data;
      } catch (error) {
        console.error('Erro ao carregar analistas:', error);
        this.$toast?.error('Erro ao carregar lista de analistas');
      } finally {
        this.carregando = false;
      }
    },
    async carregarDados() {
      this.carregando = true;
      try {
        const params = {};
        
        if (this.filtros.analista) {
          params.analistaId = this.filtros.analista;
        }
        if (this.filtros.dataInicio) {
          params.inicio = this.filtros.dataInicio;
        }
        if (this.filtros.dataFim) {
          params.fim = this.filtros.dataFim;
        }
 
        console.log('Parâmetros enviados:', params);
        const response = await axios.get('http://localhost:8080/dashboard', { params });
        console.log('Dados recebidos:', response.data);
        this.dados = response.data;
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        this.$toast?.error('Erro ao carregar dados do dashboard');
      } finally {
        this.carregando = false;
      }
    },
    limparFiltros() {
      this.filtros = {
        analista: null,
        dataInicio: null,
        dataFim: null
      };
      this.carregarDados();
    },
  }
};
</script>

<style scoped>
.dashboard-container {
  max-width: 1200px;
}
</style>