<template>
<v-container class="pt-0" :class="{'pa-0' : $vuetify.breakpoint.xsOnly}">
  <v-layout class="mx-3" wrap>
    <v-flex class="xs12">
      <h3>알림</h3>
    </v-flex>
    <v-flex xs12>
      <v-card>
        <v-card-text>
          팔로우 하는 친구 소식이나 기타 다른 알림을 받는 페이지로, 현재 개발중입니다.
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
export default {
  layout: 'profile'
}
</script>

