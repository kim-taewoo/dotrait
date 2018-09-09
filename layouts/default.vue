<template>
  <v-app>
    <v-navigation-drawer
      style="width:200px;"
      v-model="drawer"
      app
      temporary
    >
      <v-list>

        <v-list-tile 
          v-for="item in menuItems" :key="item.title"
          :to="item.link">
          <v-list-tile-action>
            <v-icon class="outlined">{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content> {{item.title}} </v-list-tile-content>
        </v-list-tile>

        <v-list-tile v-if="userIsAuthenticated" @click="onLogout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content> 로그아웃 </v-list-tile-content>
        </v-list-tile>

      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app class="elevation-0" color="transparent">
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-if="$route.name!='index'" class="ml-0">D<span class="red--text">O</span>TRAIT</v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-toolbar-items class="hidden-xs-only">
        <v-btn 
          flat
          v-for="item in menuItems" :key="item.title"
          :to="item.link">
          <v-icon>{{item.icon}}</v-icon> {{item.title}}
        </v-btn>
        <v-btn flat v-if="userIsAuthenticated" @click="onLogout">
          <v-icon>exit_to_app</v-icon> 로그아웃
        </v-btn>
      </v-toolbar-items> -->
    </v-toolbar>

    <v-content>
        <nuxt />
    </v-content>
    
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
    };
  },
  methods: {
    onLogout () {
      this.$store.dispatch('logout')
    }
  },
  computed: {
    menuItems () {
      let menuItems = [
        { icon: 'home', title: '홈으로', link: '/' },
        { icon: 'gradient', title: '모두의 모자이크', link: '/meetup/new' },
        { icon: 'favorite_border', title: 'Dotrait 소개', link: '/about' },
        { icon: 'face', title: '회원가입', link: '/signup' },
        { icon: 'lock_open', title: '로그인', link: '/signin' }
      ]
      if (this.userIsAuthenticated) {
        menuItems = [
          { icon: 'home', title: '홈으로', link: '/' },
          { icon: 'gradient', title: '모두의 모자이크', link: '/meetup/new' },
          { icon: 'portrait', title: '프로필', link: '/profile' },
          { icon: 'favorite_border', title: 'Dotrait 소개', link: '/about' },
        ]
      }
      return menuItems
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    }
  }
};
</script>

<style>


html, body{
  height: 100%;
  /* font-weight: 800; */
}

body{
  background: #fff;
  font-family: Arial;
}
</style>

