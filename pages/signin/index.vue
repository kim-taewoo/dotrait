<template>
<v-container class="pt-5 white" :class="{'pa-0' : $vuetify.breakpoint.xsOnly}">
  <mainLogo></mainLogo>
  <v-container class="mt-5">
    <form @submit.prevent="onSignin">
      <v-layout wrap justify-center align-center>
        <v-flex xs12>
          <v-text-field clearable autofocus prepend-icon="perm_identity" name="email" id="email" v-model="email" type="email" required color="dumb" label="이메일"></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field clearable prepend-icon="lock_outline" name="password" id="password" v-model="password" required type="password" color="dumb" label="비밀번호">
          </v-text-field>
        </v-flex>
        <v-flex xs12 class="text-xs-center">
          <v-btn type="submit" :disabled="loading" :loading="loading" flat color="primary">로그인</v-btn>
          <v-btn flat color="primary">회원가입</v-btn>
        </v-flex>
      </v-layout>
    </form>
  </v-container>

  
</v-container>
</template>

<script>
import mainLogo from '@/components/mainLogo'
export default {
  components: {
    mainLogo
  },
  name: "Login",
  data () {
    return {
      email: '',
      password: '',
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push({name: 'index', params: this.user})
      }
    }
  },
  methods: {
    onSignin () {
      // Vuex
      this.$store.dispatch('signUserIn', {email: this.email, password: this.password})
    },
  }
};
</script>

<style>


</style>
