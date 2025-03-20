<template>
    <v-footer color="deep-purple-lighten-4">
        <v-col class="text-center d-flex align-center justify-center">
            <v-icon class="mr-3">
                <img src="@/assets/logo-aldebaram.svg" alt="Icon" class="icon-size">
            </v-icon>
            <span>&copy; {{ new Date().getFullYear() }} Terravision by Aldebaram</span>
        </v-col>
    </v-footer>
</template>

<script setup lang="ts"></script>

<style scoped>
.v-footer {
    background-color: #3f51b5;
    color: white;
}
.v-icon img {
    vertical-align: middle;
}
.icon-size {
    width: 48px;
    height: 48px;
}
</style>