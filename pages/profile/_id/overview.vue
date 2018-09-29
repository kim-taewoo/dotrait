<template>
  <v-layout class="pt-3" wrap>
      <v-flex>
        <v-card class="mx-2 mb-2 mt-0">
          <v-flex class="text-xs-center pt-3 d-block">
            <v-avatar color="red" size="60px">
              <span class="white--text headline">T</span>
            </v-avatar>            
          </v-flex>
          <v-card-text class="text-xs-center">
            <h3>김태우</h3>
            <p class="grey--text">프로그래머를 꿈꾸는 코더</p>
            <p class="text-xs-center">Enthusiastic coder who wants to be a real programmer. Majored in business, living in Seoul, South Korea</p>
            
            <v-flex class="text-xs-center">
              <v-btn small color="green" dark><v-icon left>email</v-icon> 메시지</v-btn>
              <v-btn small class="primary">팔로우</v-btn>
            </v-flex>
          </v-card-text>
        </v-card>
          <!-- <v-card-actions class="pb-1">
            <v-flex class="text-xs-center">
              <v-btn :ripple="false" flat @click="show = !show">
                더 보기<v-icon>{{ show ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
              </v-btn>
            </v-flex>
          </v-card-actions> -->
          <!-- <v-slide-y-transition> -->
          <v-card class="ma-2">
            <v-card-text class="pa-2" >
              <div class="py-2">
                <v-subheader class="pl-1">보유 기술</v-subheader>
                <div>
                  <v-chip label>웹 개발</v-chip>
                  <v-chip label>데이터 분석</v-chip>                    
                  <v-chip label>Vue</v-chip>
                  <v-chip label>Javascript</v-chip>
                  <v-chip label>Python</v-chip>
                </div>
              </div>
              <v-divider></v-divider>
              <div class="py-2">
                <v-subheader class="pl-1">목표, 관심분야</v-subheader>
                <div>
                  <v-chip label>기술</v-chip>
                  <v-chip label>데이터 시각화</v-chip>                    
                  <v-chip label>웹 개발</v-chip>
                  <v-chip label>테크 기업</v-chip>
                  <v-chip label>소설</v-chip>
                </div>
              </div>
              <v-divider></v-divider>
              <div class="py-2">
                <v-subheader class="pl-1">연락처</v-subheader>
                <div class="grey--text text--darken-2 px-3" style="height:30px;display:flex;" v-for="contact in contacts" :key="contact.icon">
                  <span class="d-block"><i class="im mr-2" style="font-size: 20px;" :class="'im-' + contact.icon"></i></span> <span>{{contact.value}}</span>
                </div>
              </div>
            </v-card-text>
          <!-- </v-slide-y-transition> -->
        </v-card>
      </v-flex>    
    </v-layout>
</template>

<script>
export default {
  mounted () {
    console.log('overview')
  },
  data () {
    return {
      contacts: [
        { icon: 'mail', value: 'acoustic0419@gmail.com' },
        { icon: 'mobile', value: '010-6678-6461' },
        { icon: 'facebook', value: 'Facebook' },
        { icon: 'instagram', value: 'Instagram' },
        { icon: 'github', value: 'Github' },
      ],
    }
  }
}
</script>

