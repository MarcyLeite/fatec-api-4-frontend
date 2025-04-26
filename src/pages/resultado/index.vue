<template>
    <div class="bg-deep-purple-lighten-5 h-100">
        <v-responsive
      class="align-centerfill-height mx-auto "
      max-width="900"
    >
        <CadastroResultado />
        </v-responsive>
    </div>
    </template>

<script>
import CadastroResultado from '@/components/CadastroResultado.vue';

export default {
  components: {
    CadastroResultado
  }
}

</script>
