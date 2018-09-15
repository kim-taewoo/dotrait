<template>
  <v-layout class="mt-3">
    <v-flex class="xs12">
      <v-card class="mx-2 mb-2 mt-0">
        <v-flex class="text-xs-center pt-3 d-block">
          <v-avatar color="red" size="60px">
            <span class="white--text headline">T</span>
          </v-avatar>            
        </v-flex>
        <v-card-text class="text-xs-center pb-0">
          <h3>김태우</h3>
          <p class="grey--text">프로그래머를 꿈꾸는 코더</p>
          <p class="text-xs-center">Enthusiastic coder who wants to be a real programmer. Majored in business, living in Seoul, South Korea</p>
          
          <v-flex class="text-xs-center">
            <v-btn small color="green" dark><v-icon left>email</v-icon> 메시지</v-btn>
            <v-btn small class="primary">팔로우</v-btn>
          </v-flex>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  layout: 'profile',
  data () {
    return {

    }
  }
}
</script>

