<template>
<div>
  <!-- <svg viewBox="0 0 960 300" :height="$vuetify.breakpoint.xsOnly ? '200px' : '300px'">
    <symbol id="s-text">
      <text text-anchor="middle" x="50%" y="80%">Dotrait</text>
    </symbol>

    <g class = "g-ants">
        <use xlink:href="#s-text" class="text-copy"></use>
        <use xlink:href="#s-text" class="text-copy"></use>
        <use xlink:href="#s-text" class="text-copy"></use>
        <use xlink:href="#s-text" class="text-copy"></use>
        <use xlink:href="#s-text" class="text-copy"></use>
    </g>
  </svg> -->
  <mainLogo></mainLogo>

  <v-container>
    <v-layout wrap justify-center align-center>
      <v-flex xs12>
        <v-text-field clearable autofocus prepend-icon="perm_identity" color="dumb" label="아이디"></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field browser-autocomplete="off" clearable autofocus prepend-icon="lock_outline" type="password" color="dumb" label="비밀번호">

        </v-text-field>
      </v-flex>
      <v-flex xs12 class="text-xs-center">
        <v-btn nuxt to="/" flat color="primary">로그인</v-btn>
        <v-btn flat color="primary">회원가입</v-btn>
      </v-flex>
    </v-layout>
  </v-container>

  
</div>
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
      isAdmin: false,
      userId: '',
      userPassword: '',
    }
  },
  methods: {
    // onSubmit () {
    //   this.$store.dispatch('authenticateUser', {
    //     isAdmin: this.isAdmin,
    //     userId: this.userId,
    //     userPassword: this.userPassword
    //   })
    //   .then((result) => {
    //     console.log(result)
    //     if (this.isAdmin == false) {
    //       this.$router.push('/')
    //     } else {
    //       this.$router.push('/admin')
    //     }
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // }
  }
};
</script>

<style>

</style>
