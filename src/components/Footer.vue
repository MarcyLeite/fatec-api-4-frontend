<template>
    <v-footer color="deep-purple-lighten-4 d-flex justify-center">
        <div>
            <v-icon class="mr-3">
                <img src="@/assets/logo-aldebaram.svg" alt="Icon" class="icon-size">
            </v-icon>
            <span>&copy; {{ new Date().getFullYear() }} Terravision by Aldebaran</span>
        </div>
    </v-footer>
</template>

<script>
export default {
    name: 'FooterComponent',
}
</script>

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