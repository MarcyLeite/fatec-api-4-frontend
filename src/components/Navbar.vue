<template>
    <v-app-bar color="deep-purple-darken-1" :elevation="2">
        <template v-slot:prepend>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        </template>
        <v-app-bar-title>
            <v-col class="d-flex">
                <v-icon class="mr-3">
                    <img src="@/assets/logo-terravision.svg" alt="Icon" class="icon-size">
                </v-icon>
                <span> Terravision </span>
            </v-col>
        </v-app-bar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app>
        <v-list>
            <v-list-item link href="/">
                <v-list-item-content>
                    <v-list-item-title>Home</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script setup lang="ts">
const drawer = ref(false)
</script>

<style scoped>
.icon-size {
    width: 64px;
    height: 64px;
}
</style>