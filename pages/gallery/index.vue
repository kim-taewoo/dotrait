<template>
<v-container class="pt-0" :class="{'pa-0' : $vuetify.breakpoint.xsOnly}">
  <v-layout wrap class="pa-2">
    <v-flex class="xs12">
      <h3 class="pl-2 subheading font-weight-bold">갤러리</h3>
      <v-divider></v-divider>
    </v-flex>
    <v-flex class="xs6 pa-1" v-for="(mosaic,i) in mosaics" :key=i>
      <v-card class="pa-2">
        <v-layout wrap justify-center align-center>
          <!-- <v-flex xs12>
            <v-avatar :color="mosaic.avatarColor" size="28">
              <span class="white--text">{{mosaic.avatarLetter}}</span>
            </v-avatar>
           <span class="ml-2">{{mosaic.name}}</span>
          </v-flex> -->
          <v-flex xs12 class="text-xs-center mt-2">
            <v-divider></v-divider>

            <div class="example mt-1"  :style="{ 'background-image': 'url(' + mosaic.image + ')' }"></div>
          </v-flex>

          <!-- <v-flex class="xs12 mt-2">
            <v-divider></v-divider>
            <v-layout align-center class="mt-2">
              <v-flex class="xs6 text-xs-center"><v-icon color="primary">thumb_up</v-icon> {{mosaic.likes}}</v-flex>
              <v-divider vertical></v-divider>
              <v-flex xs6 class="text-xs-center"><v-icon>chat</v-icon> {{mosaic.comments}}</v-flex>
            </v-layout> -->
          <!-- </v-flex> -->
        </v-layout>
      </v-card>

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
      image: [image0,image1,image2,image3,image4,image5],
      mosaics: [
        {
          name: '김태우',
          likes: 17,
          comments: 8,
          avatarColor: 'pink',
          avatarLetter: 'T',
          image: image0
        },
        {
          name: '김유미',
          likes: 23,
          comments: 11,
          avatarColor: 'red',
          avatarLetter: 'Y',
          image: image2
        },
        {
          name: '이하연',
          likes: 32,
          comments: 14,
          avatarColor: 'blue',
          avatarLetter: 'H',
          image: image1
        },
        {
          name: '김성훈',
          likes: 35,
          comments: 17,
          avatarColor: 'amber',
          avatarLetter: 'S',
          image: image3
        },
        {
          name: '성경식',
          likes: 27,
          comments: 12,
          avatarColor: 'yellow',
          avatarLetter: 'K',
          image: image4
        },
        {
          name: '이희우',
          likes: 31,
          comments: 7,
          avatarColor: 'brown',
          avatarLetter: 'H',
          image: image5
        },
      ]
    }
  }
  
}
</script>

<style>
.example {
  width: 150px;
  height: 150px;
  margin: 0 auto;
  /* height: 320px; */
  background-size: cover;
  background-position: center;
}
</style>


