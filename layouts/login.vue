<template>
  <v-app>
    <transition name="fade" mode="out-in">
      <div class="login-layout">
        <nuxt />

      </div>
    </transition>
  </v-app>
</template>

<script>
export default {};
</script>

<style>
.login-layout {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  background-size: cover;
  background-position: center;
  font-family: sans-serif;
}
</style>
