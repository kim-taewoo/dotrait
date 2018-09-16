<template>
  <div>
    <v-layout wrap>
      <v-flex xs12 class="mb-2 ml-4">
        <h3>점 찍기</h3>
        <v-spacer></v-spacer>
        <span>남은 점의 개수: {{points}}</span>
      </v-flex>
      <v-flex xs12 class="" >
        <div id="capture" style="height:300px; width:300px;margin: 0 auto;">
          <svg  class="canvas" ref="svg" ></svg>

        </div>
      </v-flex>
        <!-- <canvas id="canvas" width="300" height="300" v-show="false" ref="canvas"></canvas> -->
        <div id="png-container"></div>
    </v-layout>
    <v-layout wrap class="mt-3">
      <v-flex xs12>
        <v-menu
          transition="slide-x-transition"
          top
          right
          max-width="238"
        >
          <v-btn
            slot="activator"
            :color="currentColor"
            dark
            depressed
            :ripple="false"
          >
            현재 색
          </v-btn>
          <v-card>
            <v-layout wrap>
              <v-flex @click="changeColorKey(color)" class="xs6 align-center pa-1" style="display:flex; cursor:pointer;" v-if="color != 'shades'" v-for="(color, index) in colorKeys" :key="index">
                <div style="width:30px;height:30px;border-radius:15px;" :style="{backgroundColor: colors[color].base}"></div>
                <div class="pl-2 text-capitalize">{{color}}</div>
              </v-flex>
              <v-flex @click="changeColorKey('black')" class="xs6 align-center pa-1" style="display:flex; cursor:pointer;">
                <div style="width:30px;height:30px;border-radius:15px;backgroundColor: black;"></div>
                <div class="pl-2 text-capitalize">black</div>
              </v-flex>
              <v-flex @click="changeColorKey('white')" class="xs6 align-center pa-1" style="display:flex; cursor:pointer;">
                <div style="width:30px;height:30px;border-radius:15px;backgroundColor: white;"></div>
                <div class="pl-2 text-capitalize">white</div>
              </v-flex>
            </v-layout>
          </v-card>
          
        </v-menu>

      </v-flex>
      <v-flex xs12 class="px-3">
        <v-select
          :items="colorOptions"
          single-line
          hide-details
          v-model="selectedOption"
          label="색감조절"
        ></v-select>
      </v-flex>
      <v-flex xs12 class="px-3">
        <v-slider
          v-model="selectedLevel"
          :tick-labels="ticksLabels"
          :max="4"
          step="1"
          ticks="always"
          tick-size="1"
          :disabled="!selectedOption"
        ></v-slider>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex class="pa-3">
        <v-btn depressed block :class="'amber accent-1'" @click="saveImg">저장</v-btn>

      </v-flex>
      <v-flex ref="noShow" v-show="false">

      </v-flex>
    </v-layout>
  </div>

</template>

<script>
import * as d3 from 'd3';
import colors from 'vuetify/es5/util/colors'
import html2canvas from 'html2canvas';
export default {
  layout: 'profile',
  data () {
    return {
      points: 50,
      colors: null,
      colorKeys: [],
      selectedColorKey: 'blue',
      colorOptions: [
        {
          text:'밝게',
          value:'lighten'
        },
        {
          text:'어둡게',
          value:'darken'
        },
        {
          text:'진하게', 
          value:'accent'
        }
      ],
      selectedOption: '',
      selectedLevel: 0,
      ticksLabels: [
        '기본', '1단계','2단계','3단계','4단계'
      ]
    }
  },
  computed: {
    currentColor() {
      if (this.selectedOption != '' && this.selectedLevel != 0) {
        return this.colors[this.selectedColorKey][this.selectedOption+this.selectedLevel]
      } else if (this.selectedColorKey == 'white' || this.selectedColorKey == 'black') {
        return this.colors['shades'][this.selectedColorKey]
      }
      return this.colors[this.selectedColorKey].base
    }
  },
  watch: {
    selectedColorKey () {
      this.selectedLevel = 0
    }
  },
  methods: {
    changeColorKey (color) {
      console.log(color)
      this.selectedColorKey = color
    },
    
    saveImg () {
      var that = this
      html2canvas(document.querySelector("#capture"), {
        scale: 2
      }).then(function(canvas) {
        that.$refs.noShow.appendChild(canvas);
        var download = function(){
        var link = document.createElement('a');
        link.download = 'filename2.png';
        link.href = canvas.toDataURL()
        link.click();
      }()
      });
    }
  },
  created () {
    this.colors = colors
    for (var key in colors) {      
      if (colors.hasOwnProperty(key)) {
        this.colorKeys.push(key)
      };
    }
  },
  mounted () {
    console.log(this.$route)
    var width = 300, height = 300;

    var sqWidth = 20, sqHeight = 20;

    var coordinateData = [];

    var click = 0;


    for (var i = 0; i <= width ; i += sqWidth) {
      for (var j = 0; j <= height; j += sqHeight) {
        var arr = [i,j];
        coordinateData.push(arr);
      }
    }

    var svg = d3.select(".canvas").attr("height",height).attr("width",width)
    var rectGroup = svg.append("g");
    var that = this
    var rect = rectGroup.selectAll("rect")
    .data(coordinateData)
    .enter()
    .append("rect")
    .style("fill","white")
    .style("stroke", "#F5F5F5")
    .attr("width",sqWidth)
    // .attr("class", 'eachSquare')
    .attr("height",sqHeight)
    .attr("x", function(d,i) {
    return d[0];
    })
    .attr("y", function(d,i) {
    return d[1];
    })
    .on("click", function(){
      if (that.points > 0) {
        d3.select(this)
        .transition()
        .duration(150)
        .style("fill",that.currentColor);
        that.points--
      } else {
        alert('사용가능한 점이 없습니다.')
      }
    })

    // var instructions = rectGroup.append("text")
    // .text("Mouseover me")
    // .style("fill", "white")
    // .attr("x","40")
    // .attr("y","50");
  }  
}
</script>

<style>
</style>


