<template>
  <v-container class="pt-0" :class="{'pa-0' : $vuetify.breakpoint.xsOnly}">
    <v-layout style="z-index: 10;">
      <v-flex xs12>
        <v-tabs
          fixed-tabs
          v-model="tabModel"
          color="transparent"
        >
          <v-tab
            ripple
            class="title"
            :exact="true"
            exact-active-class
            to="/profile/id1/overview"
          >
            OVERVIEW
          </v-tab>
          <v-tab
            ripple
            class="title"
            :exact="true"
            exact-active-class
            to="/profile/id1/timeline"
          >
            TIMELINE
          </v-tab>
          <v-tab
            ripple
            class="title"
            :exact="true"
            exact-active-class
            to="/profile/id1/mosaicNew"
          >
            MOSAIC
          </v-tab>
        </v-tabs>

          <nuxt-child/>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

// import Overview from '@/components/Overview'
// import Timeline from '@/components/Timeline'
// import Mosaic from '@/components/Mosaic'

export default {

  layout: 'profile',
  data () {
    return {
      show: false,
      tabModel: null,
      // profileTabs: [
      //   {
      //     name: "Overview",
      //     src: '/profile/id1/overview'
      //   },
      //   {
      //     name: "Timeline",
      //     comp: '/profile/id1/timeline'
      //   },
      //   {
      //     name: "Mosaic",
      //     comp: '/profile/id1/mosaicNew'
      //   }
      // ],
      
    }
  },
  mounted() {
    console.log('이거', this.$route)
  }
}
</script>

<style>
.v-subheader {
  height: 30px;
}
.v-tabs__wrapper {
  z-index: 10000;
}
</style>

