<template>
  <div>
    

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
                <v-dialog
                  ref="menu_time1"
                  v-model="menu_time1"
                  :nudge-right="40"
                  :return-value.sync="time"
                  lazy
                  full-width
                >
                  <v-text-field
                    slot="activator"
                    v-model="time"
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
                </v-dialog>
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
            <v-btn color="green darken-1" flat @click.native="$router.go(-1)">취소</v-btn>
            <v-btn color="green darken-1" flat @click.native="addContent">완료</v-btn>
          </v-card-actions>
        </v-card>

      
  </div>

</template>

<script>

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
      
    }
  },
  
  
  methods: {
    addContent () {
      

      var that = this
      var sendingData = {
          details: {
            where: that.selectedWhere,
            who: that.selectedWho, 
            what:that.selectedWhat,
            when: that.date + ' ' + that.time,
            des: that.des
          }
        }
      this.$store.commit('setTimelineData', sendingData)
      this.$router.push('/profile/id1/timeline')
      // this.selectedWhere = null
      // this.selectedWho = null
      // this.selectedWhat = null
      // this.des = null,
      // this.date = new Date().toISOString().split('T')[0]
      // this.time = new Date().toTimeString().slice(0,5)
    },
  },
    
  created () {
    
    this.date = new Date().toISOString().split('T')[0]
    this.time = new Date().toTimeString().slice(0,5)
  },
    
}
</script>

<style>
</style>


