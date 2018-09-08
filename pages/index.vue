<template>
<v-layout wrap>
  <v-flex xs12>
    <mainLogo></mainLogo>
  </v-flex>

  <v-flex class="mt-4" xs12>
    <v-layout fill-height justify-center align-center>
      <v-flex class="text-xs-center">
        <svg class ="button" @click="check" expanded = "true" height = "100px" width = "100px">
          <text text-anchor="middle" x="50%" y="55%" style="fill:gray;user-select:none;">dot</text>
          <g>
            <circle  class = "innerCircle" cx = "50%" cy = "50%" r = "25%" fill = "none" stroke = "#000000" stroke-width = "5%">
              <animate attributeType="SVG" attributeName="r" begin="0s" dur="1.5s" repeatCount="indefinite" from="5%" to="25%"/>
              <animate attributeType="CSS" attributeName="stroke-width" begin="0s"  dur="1.5s" repeatCount="indefinite" from="3%" to="0%" />
              <animate attributeType="CSS" attributeName="opacity" begin="0s"  dur="1.5s" repeatCount="indefinite" from="1" to="0"/>
            </circle>
          </g>
        </svg>

        <div>
          <v-btn flat x="50" y="50" :ripple="{ class: 'pink--text' }">오늘의 당신을 <span class="red--text px-1"> 점 </span> 찍으세요!</v-btn>
        </div>

      </v-flex>
    </v-layout>
  </v-flex>

</v-layout>
</template>

<script>
import mainLogo from '@/components/mainLogo'
export default {
  components: {
    mainLogo
  },
  data () {
    return {
    }
  },
  methods: {
    check () {
      console.log('it')
    }
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






</style>

