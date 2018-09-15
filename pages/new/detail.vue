<template>
<v-container fill-height class="pt-0" :class="{'pa-0' : $vuetify.breakpoint.xsOnly}">
  <v-layout fill-height>
    <v-flex xs12 fill-height>
      
      <v-stepper v-model="e6" vertical style="height: 100%;">
        <v-stepper-step editable :complete="e6 > 1" step="1">
          어디에서
          <!-- <small>Summarize if needed</small> -->
        </v-stepper-step>

        <v-stepper-content step="1">
          <v-card class="elevation-0 mb-5" color="" height="100px">
            <v-flex xs12>
              <v-combobox
                v-model="select"
                :items="items"
                label="장소"
                multiple
                chips
              >
                <template
                  slot="selection"
                  slot-scope="data"
                >
                  <v-chip
                    :selected="data.selected"
                    :disabled="data.disabled"
                    :key="JSON.stringify(data.item)"
                    class="v-chip--select-multi"
                    @input="data.parent.selectItem(data.item)"
                  >
                    <v-avatar
                      class="accent white--text"
                      v-text="data.item.slice(0, 1).toUpperCase()"
                    ></v-avatar>
                    {{ data.item }}
                  </v-chip>
                </template>
              </v-combobox>
            </v-flex>
          </v-card>
          <v-btn color="primary" @click="e6 = 2">다음</v-btn>
          
        </v-stepper-content>

        <v-stepper-step editable :complete="e6 > 2" step="2">누구와</v-stepper-step>

        <v-stepper-content step="2">
          <v-card class="elevation-0 mb-5" height="100px">
            <v-flex xs12>
              <v-combobox
                v-model="select2"
                :items="items2"
                label="누구랑"
                multiple
                chips
              >
                <template
                  slot="selection"
                  slot-scope="data"
                >
                  <v-chip
                    :selected="data.selected"
                    :disabled="data.disabled"
                    :key="JSON.stringify(data.item)"
                    class="v-chip--select-multi"
                    @input="data.parent.selectItem(data.item)"
                  >
                    <v-avatar
                      class="accent white--text"
                      v-text="data.item.slice(0, 1).toUpperCase()"
                    ></v-avatar>
                    {{ data.item }}
                  </v-chip>
                </template>
              </v-combobox>
            </v-flex>
          </v-card>
          <v-btn color="primary" @click="e6 = 3">다음</v-btn>
          
        </v-stepper-content>

        <v-stepper-step editable :complete="e6 > 3" step="3">무엇을</v-stepper-step>

        <v-stepper-content step="3">
          <v-card class="mb-5 elevation-0" height="100px">
            <v-flex xs12>
              <v-combobox
                v-model="select3"
                :items="items3"
                label="무엇을"
                multiple
                chips
              >
                <template
                  slot="selection"
                  slot-scope="data"
                >
                  <v-chip
                    :selected="data.selected"
                    :disabled="data.disabled"
                    :key="JSON.stringify(data.item)"
                    class="v-chip--select-multi"
                    @input="data.parent.selectItem(data.item)"
                  >
                    <v-avatar
                      class="accent white--text"
                      v-text="data.item.slice(0, 1).toUpperCase()"
                    ></v-avatar>
                    {{ data.item }}
                  </v-chip>
                </template>
              </v-combobox>
            </v-flex>
          </v-card>
          <v-btn color="primary" @click="e6 = 4">다음</v-btn>
          
        </v-stepper-content>

        <v-stepper-step editable step="4">그래서 기분이</v-stepper-step>
        <v-stepper-content step="4">
          <v-card class="mb-5 elevation-0" height="100px">
            <v-flex xs12>
              <v-combobox
                v-model="select4"
                :items="items4"
                label="기분"
                multiple
                chips
              >
                <template
                  slot="selection"
                  slot-scope="data"
                >
                  <v-chip
                    :selected="data.selected"
                    :disabled="data.disabled"
                    :key="JSON.stringify(data.item)"
                    class="v-chip--select-multi"
                    @input="data.parent.selectItem(data.item)"
                  >
                    <v-avatar
                      class="accent white--text"
                      v-text="data.item.slice(0, 1).toUpperCase()"
                    ></v-avatar>
                    {{ data.item }}
                  </v-chip>
                </template>
              </v-combobox>
            </v-flex>
          </v-card>
          <v-btn color="primary" @click="toNextPage">다음</v-btn>
          
        </v-stepper-content>
      </v-stepper>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
  export default {
    layout: 'profile',
    data () {
      return {
        e6: 1,
        select: [],
        select2: [],
        select3: [],
        select4: [],
        items: [
          '내 방',
          '카페',
          '침대',
          '학교',
          '도서관'
        ],
        items2: [
          '가족',
          '친구',
          '직장동료',
          '학회원',
        ],
        items3: [
          '일기쓰기',
          '다짐',
          '공부',
          '수상',
          '여유를 만끽'
        ],
        items4: [
          '뿌듯',
          '행복',
          '슬픔',
          '재밌음',
          '여유로움'
        ]
      }
    },
    methods: {
      toNextPage () {
        this.$router.push({name: 'profile-id-mosaic-uid', params: {elements: {
          place: this.items,
          who: this.items2,
          what: this.items3,
          emotion: this.items4
        }}})
      }
    }
  }
</script>