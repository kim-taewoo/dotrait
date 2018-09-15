<template>
<v-container :class="{'pa-0' : $vuetify.breakpoint.xsOnly}">
<v-layout wrap>
  <v-flex xs12>
    <mainLogo></mainLogo>
  </v-flex>

  <v-dialog v-model="signupDialog" max-width="330">
    <v-card>
      <v-card-title class="headline">
        아직 로그인하지 않았네요!
      </v-card-title>
      <v-card-text>
        Dotrait 에 대해 알아보거나 로그인 페이지로 이동할 수 있습니다.
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          color="green darken-1"
          flat="flat"
          nuxt
          to="/about"
        >
          Dotrait 알아보기
        </v-btn>

        <v-btn
          color="green darken-1"
          nuxt
          to="/signin"
          flat="flat"
        >
          로그인
        </v-btn>

      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-flex class="mt-4" xs12>
    <v-layout fill-height justify-center align-center>
      <v-flex class="text-xs-center">
        <svg class ="button" @click="toNew" expanded = "true" height = "70px" width = "70px">
          <text text-anchor="middle" x="50%" y="57%" style="fill:gray;user-select:none;font-size:1.1em;">dot</text>
          <g>
            <circle  class = "innerCircle" cx = "50%" cy = "50%" r = "38%" fill = "none" stroke = "#000000" stroke-width = "8%">
              <animate attributeType="SVG" attributeName="r" begin="0s" dur="1.5s" repeatCount="indefinite" from="10%" to="30%"/>
              <animate attributeType="CSS" attributeName="stroke-width" begin="0s"  dur="1.5s" repeatCount="indefinite" from="5%" to="0%" />
              <animate attributeType="CSS" attributeName="opacity" begin="0s"  dur="1.5s" repeatCount="indefinite" from="1" to="0"/>
            </circle>
          </g>
        </svg>

        <div>
          <v-btn large flat x="50" y="50" :ripple="{ class: 'pink--text' }">오늘의 당신을 <span class="red--text px-1"> 점 </span> 찍으세요!</v-btn>
        </div>

      </v-flex>
    </v-layout>
  </v-flex>

</v-layout>
</v-container>
</template>

<script>
import mainLogo from '@/components/mainLogo'
export default {
  layout: 'profile',
  components: {
    mainLogo
  },
  data () {
    return {
      signupDialog: false
    }
  },
  computed: {
    id () {
      if (this.$store.getters.user) {
        const x = this.$store.getters.user.email.split('@')[0]
        return x
      }
    }
  },
  methods: {
    toNew () {
      this.$router.push({name: 'new'})
      // console.log(this.id)
      // if (this.id) {
      //   this.$router.push({name: 'profile-id', params: {id: this.id}})
      // } else {
      //   this.signupDialog = true
      // }
    }
  },
  mounted () {
    console.log('mommy',this.$route)
  }
}
</script>

<style>
.front {
  fill: fadeOut(#ff8800, 10);
}
#back {
  fill: transparent;
  stroke: fadeOut(#ff8800, 30);
}
.button {
  cursor: pointer;
}




</style>

