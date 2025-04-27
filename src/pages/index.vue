<template>
      <v-app>
        <v-main>
          <!-- Hero Section -->
          <section class="hero-section">
            <v-container>
              <v-row align="center" class="fill-height">
                <v-col cols="12" md="6">
                  <h1 class="hero-title">Terravision</h1>
                  <h2>
                  Solução Inteligente para Gestão Geoespacial Agrícola
                  </h2>
                  <p class="hero-subtitle mt-4">
                    Visualize, edite e analise dados agrícolas em tempo real com precisão e eficiência.
                  </p>
                  <div class="mt-8">
                    <v-btn x-large color="deep-purple-darken-1" class="mr-4" dark>
                      Experimente Grátis
                    </v-btn>
                  </div>
                </v-col>
                <v-col cols="12" md="6" class="text-center">
                  <v-img
                    src="https://images.unsplash.com/photo-1732275115492-13041e773431?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    max-height="400"
                  cover
                    class="hero-image"
                  ></v-img>
                </v-col>
              </v-row>
            </v-container>
          </section>
    
          <section class="transform-section py-12">
            <v-container>
              <v-row justify="center">
                <v-col cols="12" class="text-center">
                  <h3 class="text-h3 font-weight-bold mt-4">Transforme Dados em Decisões Estratégicas</h3>
                  <p class="text-h6 mt-4" style="max-width: 800px; margin: 0 auto;">
                    O Terravision é um sistema web inovador que integra visualização, edição geoespacial e análise de dados em tempo real, 
                    garantindo resultados mais precisos para o agronegócio.
                  </p>
                </v-col>
              </v-row>
    
              <v-row class="mt-8">
                <v-col cols="12" md="4">
                  <v-card class="pa-6 feature-card" height="100%">
                    <v-card-title class="justify-center">
                      <v-icon size="48" color="deep-purple-darken-1" class="mb-4">mdi-shield-account</v-icon>
                    </v-card-title>
                    <v-card-title class="justify-center text-center text-h5">Administradores</v-card-title>
                    <v-card-text class="text-center text-body-1">
                      Controle total do sistema com acesso a todas as funcionalidades e gerenciamento de usuários.
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="12" md="4">
                  <v-card class="pa-6 feature-card" height="100%">
                    <v-card-title class="justify-center">
                      <v-icon size="48" color="deep-purple-darken-1" class="mb-4">mdi-chart-areaspline</v-icon>
                    </v-card-title>
                    <v-card-title class="justify-center text-center text-h5">Analistas</v-card-title>
                    <v-card-text class="text-center text-body-1">
                      Visualização e edição de dados geoespaciais, mapeamento de problemas e integração com imagens.
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="12" md="4">
                  <v-card class="pa-6 feature-card" height="100%">
                    <v-card-title class="justify-center">
                      <v-icon size="48" color="deep-purple-darken-1" class="mb-4">mdi-account-tie</v-icon>
                    </v-card-title>
                    <v-card-title class="justify-center text-center text-h5">Consultores</v-card-title>
                    <v-card-text class="text-center text-body-1">
                      Acesso a dashboards com métricas e acompanhamento em tempo real das atividades.
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </section>

          <p> final do projeto adicionar um video com as funcionalidades aqui</p>
    
          <section class="benefits-section py-12">
            <v-container>
              <v-row>
                <v-col cols="12" class="text-center">
                  <h3 class="text-h3 font-weight-bold mt-4">Benefícios</h3>
                  <p class="text-h6 mt-4" style="max-width: 800px; margin: 0 auto;">
                    O Terravision foi desenvolvido para trazer benefícios tangíveis para sua operação agrícola, permitindo um gerenciamento mais eficiente dos recursos e facilitando a tomada de decisão.
                  </p>
                </v-col>
              </v-row>
    
              <v-row class="mt-8">
                <v-col cols="12" md="4">
                  <v-card class="pa-6 benefit-card" height="100%">
                    <v-card-title class="d-flex align-center">
                      <v-icon size="40" color="deep-purple-darken-1" class="mr-4">mdi-chart-line</v-icon>
                      <span class="text-h6">Decisões com dados</span>
                    </v-card-title>
                    <v-card-text class="text-body-1">
                      Utilize informações atualizadas e precisas para tornar decisões mais assertivas para sua operação agrícola.
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="12" md="4">
                  <v-card class="pa-6 benefit-card" height="100%">
                    <v-card-title class="d-flex align-center">
                      <v-icon size="40" color="deep-purple-darken-1" class="mr-4">mdi-account-group</v-icon>
                      <span class="text-h6">Colaboração eficiente</span>
                    </v-card-title>
                    <v-card-text class="text-body-1">
                      Permite que diferentes usuários acessem e interajam com os dados, facilitando a colaboração e comunicação.
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="12" md="4">
                  <v-card class="pa-6 benefit-card" height="100%">
                    <v-card-title class="d-flex align-center">
                      <v-icon size="40" color="deep-purple-darken-1" class="mr-4">mdi-update</v-icon>
                      <span class="text-h6">Atualização em tempo real</span>
                    </v-card-title>
                    <v-card-text class="text-body-1">
                      Todos os atributos são imediatamente atualizados no sistema garantindo que todos tenham acesso às informações mais recentes.
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </section>
    
          <!-- CTA Section -->
          <section class="cta-section py-12 secondary darken-1 white--text">
            <v-container>
              <v-row justify="center">
                <v-col cols="12" md="8" class="text-center">
                  <h2 class="text-h3 font-weight-bold">Pronto para transformar sua gestão agrícola?</h2>
                  <p class="text-h5 mt-4">
                    Experimente o Terravision gratuitamente ou solicite uma demonstração personalizada.
                  </p>
                </v-col>
              </v-row>
            </v-container>
          </section>
        </v-main>
    
       
      </v-app>
    </template>
    
    <script>
    export default {
      name: 'App',
    };
    </script>
    
    <style>
    .hero-section {
      background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%);
      padding: 120px 0 80px;
    }
    
    .hero-title {
      font-size: 2.5rem;
      font-weight: 700;
      line-height: 1.2;
      color: #5e35b1;
    }
    
    .hero-subtitle {
      font-size: 1.25rem;
      color: #5a6a7d;
      line-height: 1.6;
    }
    
    .hero-image {
      border-radius: 8px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }
    
    .feature-card {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      border-radius: 12px !important;
    }
    
    .feature-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1) !important;
    }
    
    .benefit-card {
      transition: transform 0.3s ease;
      border-left: 4px solid #1976d2 !important;
    }
    
    .benefit-card:hover {
      transform: translateY(-5px);
    }
    
    
    @media (max-width: 960px) {
      .hero-title {
        font-size: 2rem;
      }
      
      .hero-subtitle {
        font-size: 1.1rem;
      }
    }
    
    @media (max-width: 600px) {
      .hero-section {
        padding: 100px 0 60px;
      }
      
      .hero-title {
        font-size: 1.8rem;
        text-align: center;
      }
      
      .hero-subtitle {
        font-size: 1rem;
        text-align: center;
      }
    }
    </style>