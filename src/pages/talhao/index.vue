<template>
  <div class="bg-deep-purple-lighten-5 h-100">
    <v-responsive class="align-centerfill-height mx-auto" max-width="900">
      <CadastroTalhao />
    </v-responsive>
  </div>
</template>

<script>
import CadastroTalhao from "@/components/CadastroTalhao.vue";

export default {
  components: {
    CadastroTalhao,
  },
};
</script>
