<template>
<v-container class="pt-0" :class="{'pa-0' : $vuetify.breakpoint.xsOnly}">
  <v-layout class="mx-3" wrap>
    <v-flex class="xs12">
      <h3>이벤트</h3>
    </v-flex>
    <v-card>
      <v-card-text>
        DOTRAIT 와 여러 기업에서 제공하는 각종 이벤트를 보여주는 페이지로, 현재 개발중입니다.
      </v-card-text>
    </v-card>
  </v-layout>
</v-container>
</template>

<script>
export default {
  layout: 'profile'
}
</script>
