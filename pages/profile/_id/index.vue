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
            v-for="(tab, index) in profileTabs"
            :key="index"
            ripple
            class="title"
          >
            {{tab.name}}
          </v-tab>

          <v-tab-item
            v-for="(tab, index) in profileTabs"
            :key="index"
          >
            <component :is="tab.comp" class="tabComponent"></component>
          </v-tab-item>
        </v-tabs>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import Overview from '@/components/Overview'
import Timeline from '@/components/Timeline'
import Mosaic from '@/components/Mosaic'

export default {

  layout: 'profile',
  data () {
    return {
      show: false,
      tabModel: null,
      profileTabs: [
        {
          name: "Overview",
          comp: Overview
        },
        {
          name: "Timeline",
          comp: Timeline
        },
        {
          name: "Mosaic",
          comp: Mosaic
        }
      ],
      
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

