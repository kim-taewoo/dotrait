<template>
  <div>
    <v-layout wrap>
      <v-flex xs12 class="mb-2 ml-4">
        <v-spacer></v-spacer>
        <span>남은 포인트: <span class="pink--text">{{points}}</span></span>
      </v-flex>

      <v-dialog v-model="introDialog" persistent max-width="320">
        <v-card>
          <v-card-title class="subheading">원하는 곳에 점을 찍어보세요</v-card-title>
          <!-- <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text> -->
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat @click.native="introDialog = false">알겠어요!</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog fullscreen v-model="detailDialog" persistent>
        <v-card>
          <v-card-text class="px-0">

        <v-container>
          <v-layout wrap>
            <v-flex>
              <v-card-title class="pb-0 title text-xs-center justify-center font-weight-bold">
               어떤 내용을 점 찍을까요?
              </v-card-title>
            </v-flex>
          </v-layout>
          <v-layout wrap>
              <v-flex xs12 sm6 class="px-2 text-xs-center">
                <v-dialog
                  ref="dialog"
                  v-model="modal"
                  :return-value.sync="date"
                  persistent
                  lazy
                  full-width
                  width="290px"
                  
                >
                  <v-text-field
                    slot="activator"
                    v-model="date"
                    label="Picker in dialog"
                    prepend-icon="event"
                    append-icon="arrow_drop_down"
                    hide-details
                    readonly
                    single-line
                  ></v-text-field>
                  <v-date-picker v-model="date" locale="ko-kr"
                  @change="$refs.dialog.save(date)">
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-flex>
                <v-flex xs12 sm6 class="text-xs-center px-2">
                <v-menu
                  ref="menu_time1"
                  :close-on-content-click="false"
                  v-model="menu_time1"
                  :nudge-right="40"
                  :return-value.sync="time"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                >
                  <v-text-field
                    slot="activator"
                    v-model="time"
                    label="시작 시간"
                    prepend-icon="access_time"
                    append-icon="arrow_drop_down"
                    hide-details
                    readonly
                    single-line
                  ></v-text-field>
                  <v-time-picker
                    v-if="menu_time1"
                    v-model="time"
                    @change="$refs.menu_time1.save(time)"
                    format="24hr"
                  ></v-time-picker>
                </v-menu>
              </v-flex>
            </v-layout>

            <v-layout wrap class="mt-4">
              <v-flex xs12 class="text-xs-center">
                <v-card class="px-3 py-2">
                  <v-card-text class="">
                    <v-icon color="primary">location_on</v-icon> <span class="subheading font-weight-bold">어디에서</span> 
                  </v-card-text>
                  <swiper :options="swiperOption">
                    <swiper-slide v-for="(where, index) in wheres" :key="index">
                      <v-chip @click="selectedWhere = where" class="d-inline-block" :outline="where != selectedWhere" color="primary">{{where}}</v-chip>
                    </swiper-slide>
                   
                  </swiper>
                </v-card>
              </v-flex>

              <v-flex xs12 class="text-xs-center mt-3">
                <v-card class="px-3 py-2">
                  <v-card-text class="">
                    <v-icon color="cyan">person</v-icon> <span class="font-weight-bold subheading">누구와</span> 
                  </v-card-text>
                  <swiper :options="swiperOption">
                    <swiper-slide v-for="(who, index) in whos" :key="index">
                      <v-chip @click="selectedWho = who" :outline="who != selectedWho" color="cyan">{{who}}</v-chip>
                    </swiper-slide>
                  </swiper>
                </v-card>
              </v-flex>

              <v-flex xs12 class="text-xs-center mt-3">
                <v-card class="px-3 py-2">
                  <v-card-text class="">
                    <v-icon color="blue-grey">help</v-icon> <span class="font-weight-bold subheading">무엇을</span> 
                  </v-card-text>
                  <swiper :options="swiperOption">
                    <swiper-slide v-for="(what, index) in whats" :key="index">
                      <v-chip @click="selectedWhat = what" :outline="what != selectedWhat" color="blue-grey">{{what}}</v-chip>
                    </swiper-slide>
                  </swiper>
                </v-card>
              </v-flex>
            </v-layout>

            <v-layout>
              <v-flex class="xs">
                <v-textarea
                  name="more-des"
                  label="설명 추가"
                  value=""
                  v-model="des"
                  rows="2"
                  hint="추가 내용을 기재해 주세요 (선택)"
                ></v-textarea>
              </v-flex>
            </v-layout>


          </v-container>
          </v-card-text>
         
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat @click.native="detailDialog = false">취소</v-btn>
            <v-btn color="green darken-1" flat @click.native="addContent">완료</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

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
      wheres: [
        '성균관대학교','집','도서관','영화관','놀이공원','대학로','이태원','카페','침대'
      ],
      whos: [
        '혼자','대학친구','가족','연인','고등학교친구','강아지','고양이','학회원','동아리원','형제','부모님','엄마','아빠'
      ],
      whats: [
        '공모전 수상','휴식','영화','휴식','데이트','쇼핑','운동','식사','개발'
      ],
      selectedWhere: null,
      selectedWho: null,
      selectedWhat: null,
      des: '',
      coordinateData: [],
      introDialog: true,
      detailDialog: false,
      modal:false,
      date: new Date().toISOString(),
      time: null,
      menu_time1: false,
      menu1: false,
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
    addContent () {
      var that = this
      this.coordinateData.forEach(function(item, i) {
        if (item.id = that.selectedData.id) {
          that.coordinateData[i].details = {
            where: JSON.parse(JSON.stringify(that.selectedWhere)),
            who:JSON.parse(JSON.stringify(that.selectedWho)),
            what:JSON.parse(JSON.stringify(that.selectedWhat)),
            when: JSON.parse(JSON.stringify(that.date + '/' + that.time)),
            des: JSON.parse(JSON.stringify(that.des)),
          }
        }
      })
      this.$store.commit('setMosaicData', this.coordinateData)
      this.$store.commit('setTimelineData', this.selectedData)

      this.detailDialog = false
      this.selectedWhere = null
      this.selectedWho = null
      this.selectedWhat = null
      this.des = null,
      this.date = new Date().toISOString().split('T')[0]
      this.time = new Date().toTimeString().slice(0,5)
    },
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
    this.date = new Date().toISOString().split('T')[0]
    this.time = new Date().toTimeString().slice(0,5)
  },
  mounted () {
    console.log(this.$route)
    var width = 300, height = 300;

    var sqWidth = 20, sqHeight = 20;

    var click = 0;


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

    computedRects () {
      var that = this
      var width = 300, height = 300;

      var sqWidth = 20, sqHeight = 20;

      var click = 0;
      return d3.select(".canvas").attr("height",height).attr("width",width)
      .append("g")
      .selectAll("rect")
      .data(that.coordinateData)
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
        if (that.points > 0) {
          d.click++
          if (d.click % 2 == 0) {
            d.color = 'white'
            that.points++
          } else {
            console.log(d)
            that.selectedData = d
            d.color = that.currentColor
            that.points--
            that.detailDialog = true
          }
          // d3.select(this)
          // .transition()
          // .duration(150)
          // .style("fill",that.currentColor);
        }
        //  else {
        //   alert('사용가능한 점이 없습니다.')
        // }
      })
      
      // var svg = d3.select(".canvas").attr("height",height).attr("width",width)
      // var rectGroup = svg.append("g");
      // var that = this
      // var rect = rectGroup.selectAll("rect")
      // .data(this.coordinateData)
      // .enter()
      // .append("rect")
      // .style("fill", function(d,i) {
      //   return d.color
      // })
      // .style("stroke", "#F5F5F5")
      // .attr("width",sqWidth)
      // // .attr("class", 'eachSquare')
      // .attr("height",sqHeight)
      // .attr("x", function(d,i) {
      // return d.coordinates[0];
      // })
      // .attr("y", function(d,i) {
      // return d.coordinates[1];
      // })
      // .on("click", function(){
      //   if (that.points > 0) {
      //     console.log(this)
      //     d3.select(this)
      //     .transition()
      //     .duration(150)
      //     .style("fill",that.currentColor);
      //     that.points--
      //   } else {
      //     alert('사용가능한 점이 없습니다.')
      //   }
      // })
    }
  }  
    
}
</script>

<style>
</style>


