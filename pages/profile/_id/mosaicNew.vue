<template>
  <div>
    <v-layout wrap>
      <v-flex xs12 class="my-2 ml-4">
        <v-spacer></v-spacer>
        <span>남은 포인트: <span class="pink--text">{{points}}</span></span>
      </v-flex>

      <v-flex xs12>
        <div class="bordering" :style="{'box-sizing': 'content-box',border:'1px solid skyblue',margin: '0 auto',padding: '5px', width: svgWidth + 'px', height: svgHeight + 'px'}">
          <div id="capture" :style="{margin: '0 auto', width: svgWidth + 'px', height: svgHeight + 'px'}">
            <svg id="canvas">
              <filter id="grayscale">
                <feColorMatrix type="matrix" values="0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0"/>
              </filter>
            </svg>
          </div>
        </div>
      </v-flex>

      <div id="png-container"></div>
    </v-layout>
    <v-layout wrap class="mt-3 px-3">
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
        <v-btn @click="checkData">테스트</v-btn>

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
      swiperOption: {
        slidesPerView: 3,
        centeredSlidese: true,
        spaceBetween: 10,
        freeMode: true,
      },
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
      ],
      
      coordinateData: [],
      editedCoordinates: [],
      svgHeight: 301,
      svgWidth: 301,
      points: 10000,
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
      ],
      selectedData: null
    }
  },
  
  watch: {
    selectedColorKey () {
      this.selectedLevel = 0
    }
  },
  
  methods: {
    checkData () {
      console.log(this.editedCoordinates)
    },
    changeColorKey (color) {
      this.selectedColorKey = color
    },
    
    saveImg () {
      var that = this
      html2canvas(document.querySelector("#capture"), {
        scale: 2
      }).then(function(canvas) {
        var download = function(){
        var link = document.createElement('a');
        link.download = 'filename2.png';
        link.href = canvas.toDataURL()
        link.click();
      }()
      });
    },

    gridData() {
      var xpos = 1; //starting xpos and ypos at 1 so the stroke will show when we make the grid below
      var ypos = 1;
      var width = 20;
      var height = 20;
      var color = 'white'
      var click= 0;
      for (var row = 0; row < 15; row++) {
        this.coordinateData.push( new Array() );

        // iterate for cells/columns inside rows
        for (var column = 0; column < 15; column++) {
            this.coordinateData[row].push({
                x: xpos,
                y: ypos,
                coordinate: [row,column],
                width: width,
                height: height,
                click: click,
                color: color
            })
            // increment the x position. I.e. move it over by 50 (width variable)
            xpos += width;
        }
        // reset the x position after a row is complete
        xpos = 1;
        // increment the y position for the next row. Move it down 50 (height variable)
        ypos += height; 
      }
    },
    getInitialData () {
      var storeData = [
  {
    "coordinate": [
      2,
      5
    ],
    "color": "#000000"
  },
  {
    "coordinate": [
      2,
      6
    ],
    "color": "#000000"
  },
  {
    "coordinate": [
      2,
      7
    ],
    "color": "#000000"
  },
  {
    "coordinate": [
      2,
      8
    ],
    "color": "#000000"
  },
  {
    "coordinate": [
      3,
      9
    ],
    "color": "#000000"
  },
  {
    "coordinate": [
      3,
      10
    ],
    "color": "#000000"
  },
  {
    "coordinate": [
      4,
      11
    ],
    "color": "#000000"
  },
  {
    "coordinate": [
      5,
      11
    ],
    "color": "#000000"
  },
  {
    "coordinate": [
      6,
      12
    ],
    "color": "#000000"
  },
  {
    "coordinate": [
      7,
      12
    ],
    "color": "#000000"
  },
  {
    "coordinate": [
      8,
      12
    ],
    "color": "#000000"
  },
  {
    "coordinate": [
      9,
      12
    ],
    "color": "#000000"
  },
  {
    "coordinate": [
      10,
      11
    ],
    "color": "#000000"
  },
  {
    "coordinate": [
      11,
      11
    ],
    "color": "#000000"
  },
  {
    "coordinate": [
      12,
      10
    ],
    "color": "#000000"
  },
  {
    "coordinate": [
      12,
      9
    ],
    "color": "#000000"
  },
  {
    "coordinate": [
      13,
      8
    ],
    "color": "#000000"
  },
  {
    "coordinate": [
      13,
      7
    ],
    "color": "#000000"
  },
  {
    "coordinate": [
      13,
      6
    ],
    "color": "#000000"
  },
  {
    "coordinate": [
      13,
      5
    ],
    "color": "#000000"
  },
  {
    "coordinate": [
      12,
      3
    ],
    "color": "#000000"
  },
  {
    "coordinate": [
      12,
      4
    ],
    "color": "#000000"
  },
  {
    "coordinate": [
      11,
      2
    ],
    "color": "#000000"
  },
  {
    "coordinate": [
      10,
      2
    ],
    "color": "#000000"
  },
  {
    "coordinate": [
      9,
      1
    ],
    "color": "#000000"
  },
  {
    "coordinate": [
      8,
      1
    ],
    "color": "#000000"
  },
  {
    "coordinate": [
      7,
      1
    ],
    "color": "#000000"
  },
  {
    "coordinate": [
      6,
      1
    ],
    "color": "#000000"
  },
  {
    "coordinate": [
      5,
      2
    ],
    "color": "#000000"
  },
  {
    "coordinate": [
      4,
      2
    ],
    "color": "#000000"
  },
  {
    "coordinate": [
      3,
      3
    ],
    "color": "#000000"
  },
  {
    "coordinate": [
      3,
      4
    ],
    "color": "#000000"
  },
  {
    "coordinate": [
      8,
      2
    ],
    "color": "#000000"
  },
  {
    "coordinate": [
      9,
      3
    ],
    "color": "#000000"
  },
  {
    "coordinate": [
      9,
      5
    ],
    "color": "#000000"
  },
  {
    "coordinate": [
      9,
      4
    ],
    "color": "#000000"
  },
  {
    "coordinate": [
      8,
      5
    ],
    "color": "#000000"
  },
  {
    "coordinate": [
      7,
      6
    ],
    "color": "#000000"
  },
  {
    "coordinate": [
      7,
      7
    ],
    "color": "#000000"
  },
  {
    "coordinate": [
      8,
      8
    ],
    "color": "#000000"
  },
  {
    "coordinate": [
      9,
      8
    ],
    "color": "#000000"
  },
  {
    "coordinate": [
      9,
      9
    ],
    "color": "#000000"
  },
  {
    "coordinate": [
      9,
      10
    ],
    "color": "#000000"
  },
  {
    "coordinate": [
      8,
      11
    ],
    "color": "#000000"
  },
  {
    "coordinate": [
      10,
      6
    ],
    "color": "#000000"
  },
  {
    "coordinate": [
      10,
      7
    ],
    "color": "#000000"
  },
  {
    "coordinate": [
      3,
      5
    ],
    "color": "#ff1744"
  },
  {
    "coordinate": [
      3,
      6
    ],
    "color": "#ff1744"
  },
  {
    "coordinate": [
      4,
      6
    ],
    "color": "#ff1744"
  },
  {
    "coordinate": [
      6,
      6
    ],
    "color": "#ff1744"
  },
  {
    "coordinate": [
      5,
      7
    ],
    "color": "#ff1744"
  },
  {
    "coordinate": [
      8,
      9
    ],
    "color": "#d50000"
  },
  {
    "coordinate": [
      8,
      10
    ],
    "color": "#d50000"
  },
  {
    "coordinate": [
      7,
      8
    ],
    "color": "#d50000"
  },
  {
    "coordinate": [
      7,
      9
    ],
    "color": "#d50000"
  },
  {
    "coordinate": [
      7,
      10
    ],
    "color": "#d50000"
  },
  {
    "coordinate": [
      7,
      11
    ],
    "color": "#d50000"
  },
  {
    "coordinate": [
      6,
      11
    ],
    "color": "#d50000"
  },
  {
    "coordinate": [
      6,
      10
    ],
    "color": "#d50000"
  },
  {
    "coordinate": [
      5,
      10
    ],
    "color": "#d50000"
  },
  {
    "coordinate": [
      4,
      10
    ],
    "color": "#d50000"
  },
  {
    "coordinate": [
      4,
      3
    ],
    "color": "#ff1744"
  },
  {
    "coordinate": [
      4,
      4
    ],
    "color": "#ff1744"
  },
  {
    "coordinate": [
      5,
      3
    ],
    "color": "#ff1744"
  },
  {
    "coordinate": [
      6,
      2
    ],
    "color": "#ff1744"
  },
  {
    "coordinate": [
      6,
      3
    ],
    "color": "#ff1744"
  },
  {
    "coordinate": [
      6,
      4
    ],
    "color": "#ff1744"
  },
  {
    "coordinate": [
      7,
      2
    ],
    "color": "#ff1744"
  },
  {
    "coordinate": [
      7,
      3
    ],
    "color": "#ff1744"
  },
  {
    "coordinate": [
      7,
      4
    ],
    "color": "#ff1744"
  },
  {
    "coordinate": [
      8,
      3
    ],
    "color": "#ff1744"
  },
  {
    "coordinate": [
      8,
      4
    ],
    "color": "#ff1744"
  },
  {
    "coordinate": [
      7,
      5
    ],
    "color": "#ff1744"
  },
  {
    "coordinate": [
      12,
      5
    ],
    "color": "#f5f5f5"
  },
  {
    "coordinate": [
      12,
      6
    ],
    "color": "#f5f5f5"
  },
  {
    "coordinate": [
      12,
      7
    ],
    "color": "#f5f5f5"
  },
  {
    "coordinate": [
      11,
      7
    ],
    "color": "#f5f5f5"
  },
  {
    "coordinate": [
      10,
      8
    ],
    "color": "#f5f5f5"
  },
  {
    "coordinate": [
      10,
      9
    ],
    "color": "#f5f5f5"
  },
  {
    "coordinate": [
      12,
      8
    ],
    "color": "#eeeeee"
  },
  {
    "coordinate": [
      11,
      8
    ],
    "color": "#eeeeee"
  },
  {
    "coordinate": [
      11,
      9
    ],
    "color": "#eeeeee"
  },
  {
    "coordinate": [
      11,
      10
    ],
    "color": "#eeeeee"
  },
  {
    "coordinate": [
      10,
      10
    ],
    "color": "#eeeeee"
  },
  {
    "coordinate": [
      9,
      11
    ],
    "color": "#eeeeee"
  }
]
      var that = this
      storeData.forEach(function(el) {
        that.coordinateData[el.coordinate[0]][el.coordinate[1]].color = el.color
      })
    }
  },
  created () {
    this.gridData()

    this.colors = colors
    for (var key in colors) {      
      if (colors.hasOwnProperty(key)) {
        this.colorKeys.push(key)
      };
    }
  },
  mounted () {
    this.getInitialData()

    var that = this
    var grid = d3.select('#canvas')
      .attr('width',that.svgWidth)
      .attr('height',that.svgHeight)

    var row = grid.selectAll('.row')
      .data(this.coordinateData)
      .enter().append('g')
      .attr('class','row')

    var column = row.selectAll(".square")
      .data(function(d) { return d; })
      .enter().append("rect")
      .attr("class","square")
      .attr("x", function(d) { return d.x; })
      .attr("y", function(d) { return d.y; })
      .attr("width", function(d) { return d.width; })
      .attr("height", function(d) { return d.height; })
      .style("fill", function(d,i) {
        return d.color
      })
      .style("stroke", "#F5F5F5")
      .style("filter", "url(#grayscale)")
      .on('click', function(d) {
        if (that.points > 0) {
          d.click++
          if (d.click % 2 == 0) {
            d3.select(this).style("fill","#fff")
            d.color = 'white'
            that.points++
            that.editedCoordinates = that.editedCoordinates.filter(item => item.coordinate !== d.coordinate)
          } else {
            // console.log(d)
            d3.select(this).style("filter",'none');
            d3.select(this).style("fill",that.currentColor);
            d.color = that.currentColor
            that.points--
            that.editedCoordinates.push({
              coordinate: d.coordinate,
              color: that.currentColor
            })
            // that.detailDialog = true
          }
        }
        
      })

  },
  computed: {
    currentColor() {
      if (this.selectedOption != '' && this.selectedLevel != 0) {
        return this.colors[this.selectedColorKey][this.selectedOption+this.selectedLevel]
      } else if (this.selectedColorKey == 'white' || this.selectedColorKey == 'black') {
        return this.colors['shades'][this.selectedColorKey]
      }
      return this.colors[this.selectedColorKey].base
    },
  }  
    
}
</script>

<style>
</style>


