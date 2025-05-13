<template>
  <v-app-bar
    class="px-2"
    color="deep-purple-darken-1"
    :elevation="2"
  >
    <template #prepend>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
    </template>
    <v-app-bar-title>
      <v-col class="d-flex">
        <v-icon class="mr-3">
          <img
            src="@/assets/logo-terravision.svg"
            alt="Icon"
            class="icon-size"
          >
        </v-icon>
        <span> Terravision </span>
      </v-col>
    </v-app-bar-title>
    <template #append>
      <div v-if="store.token === ''">
        <v-btn
          icon="mdi-login"
          to="/login"
        />
      </div>
      <div
        v-else
        class="d-flex ga-2 align-center"
      > 
        <div>{{ store.name }} </div> <v-divider vertical /> <div> {{ store.role }} </div>
        <v-btn
          icon="mdi-logout"
          @click="store.logout()"
        />
      </div>
    </template>
  </v-app-bar>

  <v-navigation-drawer
    v-model="drawer"
    app
  >
    <v-list>
      <v-list-item
        link
        href="/"
      >
        <v-list-item-content>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        v-if="['Administrador', 'Consultor'].includes(store.role ?? '')"
        link
        href="/fazenda"
      >
        <v-list-content>
          <v-list-item-title>Fazenda</v-list-item-title>
        </v-list-content>
      </v-list-item>
      <v-list-item
        v-if="['Administrador', 'Consultor'].includes(store.role ?? '')"
        link
        href="/talhao"
      >
        <v-list-content>
          <v-list-item-title>Talhão</v-list-item-title>
        </v-list-content>
      </v-list-item>
      <v-list-item
        v-if="['Administrador', 'Analista'].includes(store.role ?? '')"
        link
        href="/missao/qa"
      >
        <v-list-content>
          <v-list-item-title>QA</v-list-item-title>
        </v-list-content>
      </v-list-item>
      <v-list-item
        v-if="['Administrador'].includes(store.role ?? '')"
        link
        href="/usuario"
      >
        <v-list-content>
          <v-list-item-title>Usuário</v-list-item-title>
        </v-list-content>
      </v-list-item>
      <v-list-item
        v-if="['Administrador', 'Consultor'].includes(store.role ?? '')"
        link
        href="/resultado"
      >
        <v-list-content>
          <v-list-item-title>Resultado</v-list-item-title>
        </v-list-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/stores/app';


const drawer = ref(false)

const store = useAppStore()

</script>

<style scoped>
.icon-size {
  width: 64px;
  height: 64px;
}
</style>
