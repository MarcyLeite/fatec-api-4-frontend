<template>
  <div class="d-flex h-100 align-center justify-center">
    <v-sheet class="pa-8" :width="512" :elevation="4" rounded>
      <div class="d-flex ga-4 flex-column">
        <div>Login</div>
        <v-text-field v-model:model-value="email" label="Email" />
        <v-text-field
          v-model:model-value="password"
          label="Senha"
          type="password"
        />
        <v-btn color="deep-purple-darken-1" @click="login()"> Login </v-btn>
      </div>
    </v-sheet>
  </div>
</template>

<script lang="ts" setup>
import router from "@/router";
import { useAppStore } from "@/stores/app";
import axios from "axios";

const email = ref("");
const password = ref("");

const store = useAppStore();

const getToken = async () => {
  const result = await axios.post("http://localhost:8080/usuario/login", {
    email: email.value,
    password: password.value,
  });

  const token = result.data;
  store.setToken(token);

  return token;
};

const getData = async (token: string) => {
  const result = await axios.get(
    `http://localhost:8080/usuario/verifyData/${token}`
  );

  const userData = result.data;
  store.setName(userData.nome);
  store.setId(userData.id);
  store.setRole(userData.role);
};

const login = async () => {
  const token = await getToken();
  await getData(token);
  router.push("/");
};
</script>
