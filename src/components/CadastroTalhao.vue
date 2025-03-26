<template>
  <div class="talhao-titulo text-h2 ma-2 pa-2">Talhão</div>
  <v-container class="justify-center align-center pa-4">
    <v-form
      v-model="valid"
      class="talhao-form rounded-lg elevation-5 bg-deep-purple-lighten-5 pa-4"
    >
      <h1>Cadastro de Talhão</h1>
      <v-select
        v-model="select"
        :items="items"
        :rules="[(v) => !!v || 'Item is required']"
        label="Fazenda"
        required
      ></v-select>
      <v-file-input accept="image/*" label="File input"></v-file-input>
    </v-form>
  </v-container>

  <v-container class="d-flex justify-end">
    <v-btn @click="adicionarFazenda" color="deep-purple-darken-1">
      Cadastrar Nova Fazenda
    </v-btn>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      fazendas: [
        { id: 1, nome: "Fazenda A" },
        { id: 2, nome: "Fazenda B" },
        { id: 3, nome: "Fazenda C" },
      ],
      selectedFazenda: null,
      nomeTalhao: "",
    };
  },
  methods: {
    submitForm() {
      if (this.selectedFazenda && this.nomeTalhao) {
        console.log("Fazenda selecionada:", this.selectedFazenda);
        console.log("Nome do Talhão:", this.nomeTalhao);
        alert("Talhão cadastrado com sucesso!");
        this.resetForm();
      } else {
        alert("Por favor, preencha todos os campos.");
      }
    },
    resetForm() {
      this.selectedFazenda = null;
      this.nomeTalhao = "";
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

button {
  width: fit-content;
  padding: 0.5rem 1rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
