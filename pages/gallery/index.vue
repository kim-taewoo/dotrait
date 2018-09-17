<template>
<v-container class="pt-0" :class="{'pa-0' : $vuetify.breakpoint.xsOnly}">
  <v-layout wrap class="pa-2">
    <v-flex class="xs12">
      <h3 class="subheading font-weight-bold">갤러리</h3>
    </v-flex>
    <v-flex class="xs12 text-xs-center">
      <div class="example" v-for="i in 6" :key=i :style="{ 'background-image': 'url(' + image[i-1] + ')' }">

      </div>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import image0 from '@/assets/7.png';
import image1 from '@/assets/6.png';
import image2 from '@/assets/2.png';
import image3 from '@/assets/3.png';
import image4 from '@/assets/4.png';
import image5 from '@/assets/5.png';
export default {
  layout: 'profile',
  data () {
    return {
      image: [image0,image1,image2,image3,image4,image5]
    }
  }
  
}
</script>

<style>
.example {
  width: 320px;
  height: 320px;
  background-size: cover;
  background-position: center;
}
</style>


