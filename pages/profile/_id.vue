<template>
  <div>

    <nuxt-child></nuxt-child>

    <v-bottom-nav
      :active.sync="bottomNav"
      :color="color"
      :value="true"
      fixed
      shift
      app
    >
      <v-btn exact value="home" dark >
        <span>HOME</span>
        <v-icon>home</v-icon>
      </v-btn>

      <v-btn exact value="overview" dark >
        <span>OVERVIEW</span>
        <v-icon>person</v-icon>
      </v-btn>

      <v-btn dark>
        <span>TIMELINE</span>
        <v-icon>history</v-icon>
      </v-btn>

      <v-btn value="mosaics" exact dark >
        <span>MOSAIC</span>
        <v-icon>gradient</v-icon>
      </v-btn>
    </v-bottom-nav>
  </div>
</template>

<script>
export default {
  data () {
    return {
      bottomNav: 'overview'
    }
  },
  computed: {
    color () {
      switch (this.bottomNav) {
        case 'overview': return 'blue-grey'
        case 'mosaics': return 'indigo'
        case 'home' : return 'blue'
      }
    }
  },
  watch: {
    bottomNav (value) {
      if (value == 'overview') {
        this.$router.push({name: 'profile-id'})
      } else if (value == 'mosaics') {
        this.$router.push({name:'profile-id-mosaic-uid', params:{id:this.$route.params.id}})
      } else if (value == 'home') {
        this.$router.push({name: 'index'})
      }
    }
  },
  
  mounted() {
    console.log('another',this.$route.name)
  }
}
</script>
