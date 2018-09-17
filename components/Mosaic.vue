<template>
  <div>
    <v-layout wrap class="mt-3">

      <v-flex xs12 class="" >
       
        <div id="capture" style="height:300px; width:300px;margin: 0 auto;">
          <svg class="canvas" ref="svg" >
            <g :id="computedRects"></g>
          </svg>
        </div>
      </v-flex>
        <!-- <canvas id="canvas" width="300" height="300" v-show="false" ref="canvas"></canvas> -->
        <div id="png-container"></div>
    </v-layout>
    
    <v-layout class="ma-2" v-if="selectedDot">
      <v-flex class="xs12">
        <v-card>
          <v-card-text>
            <v-layout wrap>
              <v-flex xs12>
                {{selectedDot.details.when}}
              </v-flex>
              <v-flex xs12 class="mt-3">
                <v-icon>location_on</v-icon>어디에서? : {{selectedDot.details.where}} <br>
                <v-icon>person</v-icon>누구와? : {{selectedDot.details.who}}<br>
                <v-icon>help</v-icon>무엇을? : {{selectedDot.details.what}}
                <p class="px-2 py-1">세부 내용 : {{selectedDot.details.des}}</p>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout class="pt-4 px-4" wrap>
      <v-flex class="xs12">
        SNS 공유하기
        <v-divider></v-divider>
      </v-flex>
      <v-layout justify-start align-center class="mt-2">
        <v-avatar style="cursor: pointer;" class="mx-1" v-for="(sns, i) in snss" :key="i">
          <img
          :src="sns.imgSrc"
          alt="John"
        >
        </v-avatar>
        

      </v-layout>
      <v-flex xs12 class="mt-2">
        <v-divider></v-divider>
      </v-flex>

    </v-layout>
    
    <v-layout wrap>
      <v-flex class="px-3 pt-2">
        <v-btn depressed block :class="'amber accent-1'" @click="saveImg">이미지로 다운받기</v-btn>
      </v-flex>
    </v-layout>

    <!-- <v-layout>
      <v-flex class="xs12" ref="noShow" >

      </v-flex>
    </v-layout> -->

  </div>

</template>

<script>
import * as d3 from 'd3';
import colors from 'vuetify/es5/util/colors'
import html2canvas from 'html2canvas';
import facebook from '@/assets/sns/Facebook.png';
import kakao from '@/assets/sns/Kakao.png';
import twitter from '@/assets/sns/Twitter.png';
export default {
  layout: 'profile',
  data () {
    return {
      selectedDot: null,
      coordinateData: [],
      snss: [
        {
          imgSrc: facebook
        },
        {
          imgSrc: kakao
        },
        {
          imgSrc: twitter
        },
      ]
    }
  },
  methods: {
    
   
    saveImg () {
      var that = this
      html2canvas(document.querySelector("#capture"), {
        scale: 2
      }).then(function(canvas) {
        // that.$refs.noShow.appendChild(canvas);
        var download = function(){
        var link = document.createElement('a');
        link.download = 'filename2.png';
        link.href = canvas.toDataURL()
        link.click();
      }()
      });
    }
  },
  mounted () {
    var width = 300, height = 300;

    var sqWidth = 20, sqHeight = 20;

    var click = 0;

    if (!this.$store.getters.mosaicData) {
      for (var i = 0; i <= width ; i += sqWidth) {
        for (var j = 0; j <= height; j += sqHeight) {
          var newData = {
            coordinates: [i,j],
            color: 'white',
            click: 0,
            id: i.toString() + j.toString(),
            details: {
              where: '',
              who:'', 
              what:'',
              when: '',
              des: ''
            }
          }
          this.coordinateData.push(newData);
        }
      }
    } else {
      this.coordinateData = this.$store.getters.mosaicData
    }
    
  },
  computed: {
    
    currentData () {
      if (this.$store.getters.mosaicData) {
        console.log(this.$store.getters.mosaicData)
        console.log(this.coordinateData)
        return this.$store.getters.mosaicData
      } else {
        
        return this.coordinateData
      }
    },

    computedRects () {
      var that = this
      var width = 300, height = 300;

      var sqWidth = 20, sqHeight = 20;

      var click = 0;
      return d3.select(".canvas").attr("height",height).attr("width",width)
      .append("g")
      .selectAll("rect")
      .data(that.currentData)
      .enter()
      .append("rect")
      .style("fill", function(d,i) {
        return d.color
      })
      .style("stroke", "#F5F5F5")
      .attr("width",sqWidth)
      // .attr("class", 'eachSquare')
      .attr("height",sqHeight)
      .attr("x", function(d,i) {
      return d.coordinates[0];
      })
      .attr("y", function(d,i) {
      return d.coordinates[1];
      })
      .on("click", function(d){
          console.log(d)
          that.selectedDot = d
        console.log('하이')
      })
    }
  }  
    
}
</script>

<style>
</style>


