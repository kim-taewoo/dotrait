<template>
  <v-layout wrap class="mt-3">

    <v-flex class="xs12 px-3 mt-2 subheading">
      <p class="mb-0">최근 3 달간 <span class="pink--text" v-if="currentSource" v-once>{{calendarCounter != 0 ? calendarCounter : 63}}</span> 개의 기록이 있습니다.</p>
      <div style="margin-top: -8px;">
        <small class="grey--text">박스를 터치하여 기록 조회 가능 (예정)</small>
      </div>
    </v-flex>

    <v-flex xs12 class="text-xs-center">
      <v-card>
        <div class="svg-container text-xs-center"></div>
      </v-card>
    </v-flex>  

    <v-flex xs12 class="text-xs-center">
      <v-card class="pa-3">
        <v-layout wrap>
          <v-flex class="xs12">
            <div id="heatmap" class="text-xs-center" style="overflowX:hidden;"></div>
          </v-flex>

          <v-flex class="xs6 text-xs-left mt-3">
            <v-menu
              v-if="true"
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
          </v-flex>

          <v-flex class="xs6 text-xs-right mt-3">
            <v-btn icon id="preBtn" class="primary"><v-icon>arrow_left</v-icon></v-btn>
            <v-btn icon id="nextBtn" class="primary"><v-icon>arrow_right</v-icon></v-btn>
          </v-flex>
        </v-layout>

  
      </v-card>
    </v-flex>  

    <v-flex xs12 class="mt-2">
      <v-layout wrap>
        <v-flex xs12>
          <timelineCard v-for="(x,i) in timelineData" :key="i" :x="x" />
            
        </v-flex>
      </v-layout>
    </v-flex>


    <v-flex xs12 class="mt-2">
      <v-layout wrap>
        <v-flex class="xs12 mt-3 mx-3">
          <div class="title"><span class="blue--text">G</span><span class="pink--text">o</span><span class="amber--text">o</span><span class="blue--text">g</span><span class="green--text">l</span><span class="pink--text">e</span> <small class="ml-2">Calendar</small></div>
          <v-divider class="my-2"></v-divider> 
        </v-flex>
        <v-flex xs12>
          <!-- <timelineCardGoogle class="mb-3 mx-3 elevation-2" color="white" :item="item-disabled" v-for="(item, i) in reverseOrder" :key="i"></timelineCardGoogle> -->
          <v-card class="mb-3 mx-3 elevation-2" color="white" v-for="(item, i) in reverseOrder" :key="i">
            <v-layout row wrap>
              <v-flex class="xs12 pa-3">
                <div><span class="font-weight-bold mr-2">제목 : </span> {{item.summary}}</div>
                <div><span class="font-weight-bold mr-2">시작시간 : </span> {{item.start.dateTime ? item.start.dateTime : item.start.date}}</div>
                <div><span class="font-weight-bold mr-2">종료시간 : </span> {{item.end.dateTime ? item.start.dateTime : item.start.date}}</div>
                <div><span class="font-weight-bold mr-2">기록한 날 : </span> {{item.created}}</div>
                
              </v-flex>
            </v-layout>
            <v-card-actions class="py-1 px-3">
              <!-- <v-divider></v-divider> -->
      이 기록 평가
      <v-spacer></v-spacer>
      <v-rating v-model="rating" color="amber" background-color="amber lighten-3"></v-rating>
    </v-card-actions>
          </v-card>
            
        </v-flex>
      </v-layout>
    </v-flex>



    <v-flex xs12>
      <v-btn class="primary" v-if="!authorized" @click="handleAuthClick">구글 캘린더 연동</v-btn>

    </v-flex>
  </v-layout>
</template>

<script>
import colors from 'vuetify/es5/util/colors'

import moment from 'moment'
// import * as d3 from 'd3'
import timelineCard from '@/components/timelineCard'
import timelineCardGoogle from '@/components/timelineCardGoogle'
    // Client ID and API key from the Developer Console
    const CLIENT_ID = '535661812850-3gnpci3bfepjpfui7olqppoc9m9k1urm.apps.googleusercontent.com';
    const API_KEY = 'AIzaSyBaLfGE7KFhs1vl4I-oWMOb3708Wnoz-Zc';

    // Array of API discovery doc URLs for APIs used by the quickstart
    const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

    // Authorization scopes required by the API; multiple scopes can be
    // included, separated by spaces.
    const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

export default {
  // head () {
  //   return {
  //     script: [
  //       { type:"text/javascript", src: '@/assets/calendarH/cal-heatmap.min.js', defer: true}
  //     ],
  //     link: [
  //       { rel: 'stylesheet', href: '@/assets/calendarH/cal-heatmap.css'}
  //     ]
  //   }
  // },
  components: {
    timelineCard,
    timelineCardGoogle
  },
  data () {
    return {
      items: undefined,
      api: undefined,
      authorized: false,
      heatmapData: {},
      colors: null,
      colorKeys: [],
      selectedColorKey: 'blue',
      currentSource: null,
      calendarCounter: 0
    }
  },
  computed: {
    currentColor () {
      if (this.selectedColorKey == 'white' || this.selectedColorKey == 'black') {
        return this.colors['shades'][this.selectedColorKey]
      }
      
      return this.colors[this.selectedColorKey].base
    },

    timelineData () {
      if(this.$store.getters.timelineData) {
        return this.$store.getters.timelineData
      } else {
        return []
      }
    },
    reverseOrder () {
      if (this.items) {
        return this.items.slice().reverse()
      }
    },
  },
  created () {
    this.colors = colors
    for (var key in colors) {      
      if (colors.hasOwnProperty(key)) {
        this.colorKeys.push(key)
      };
    }

    this.api = gapi;
    this.handleClientLoad()

    var now = moment().endOf('day').add(3, 'month').toDate();
    var yearAgo = moment().startOf('day').subtract(1, 'year').toDate();

    this.heatmapData = d3.time.days(yearAgo, now).map(function (dateElement) {
        // console.log(dateElement.getDay())
        return {
          date: +new Date(dateElement),
          count: (dateElement.getDay() !== 0 && dateElement.getDay() !== 6) ? Math.floor(Math.random() * 6) : Math.floor(Math.random() * 2)
        };
      });
  },
  methods: {
    changeColorKey (color) {
      this.selectedColorKey = color
    },
    parseData(data) {
      if (this.currentSource == 'google') {
        return this.parseGoogleData(data)
      }
      var i, total, results = {};
      for(i = 0, total = data.length; i < total; i++) {
        results[+(data[i].date)/1000] = +data[i].count
      }
      // console.log('not Google',results)
      return results;
    },

    parseGoogleData(data) {
      var i, total, results = {};
      for(i = 0, total = data.length; i < total; i++) {
        if (data[i].start.dateTime) {
          if (results[+(new Date(data[i].start.dateTime))/1000]) {
            results[+(new Date(data[i].start.dateTime))/1000] +=1
          }
          results[+(new Date(data[i].start.dateTime))/1000] = 1
        } else if (data[i].start.date) {
          if (results[+(new Date(data[i].start.date))/1000]) {
            results[+(new Date(data[i].start.date))/1000] += 1
          }
          results[+(new Date(data[i].start.date))/1000] = 1
        }
        // results[+(data[i].date)/1000] = +data[i].count
        this.calendarCounter++
      }
      // console.log(results)
      return results;
    },


    handleClientLoad () {
      this.api.load('client:auth2', this.initClient)
    },
    initClient () {
      let vm = this

      vm.api.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
      }).then(_ => {
        // Listen for sign-in state changes.
        vm.api.auth2.getAuthInstance().isSignedIn.listen(vm.authorized);
      });
    },

    handleAuthClick(event) {
      Promise.resolve(this.api.auth2.getAuthInstance().signIn())
        .then(_ => {
          this.authorized = true;
          this.getData()
        });
    },

    handleSignoutClick(event) {
      Promise.resolve(this.api.auth2.getAuthInstance().signOut())
        .then(_ => {
          this.authorized = false;
        });
    },

    getData () {
      let vm = this

      vm.api.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': (moment().startOf('day').subtract(5, 'month').toDate()).toISOString(),
        'showDeleted': false,
        // 'singleEvents': false,
        // 'maxResults': 20,
        // 'orderBy': 'startTime'
      }).then(response => {
        vm.items = response.result.items
        vm.heatmapData = response.result.items
        
        vm.currentSource = 'google'

        vm.drawHeatmap()
        // vm.items = this.syntaxHighlight(response.result.items);
        // console.log(vm.items);
      });
    },

    drawHeatmap () {

      d3.select('svg').remove(); // remove the existing chart, if it exists


      var that = this
      var cal = new CalHeatMap();
      cal.init({
        itemSelector: "#heatmap",
        domain: "month",
        // subDomain: "day",
        range: 3,
        cellSize: 25,
        displayLegend: true,
        nextSelector: "#nextBtn",
        previousSelector: "#preBtn",
        // subDomain:'x_day',
        weekStartOnMonday: false,
        domainLabelFormat: "%Y-%m",
        subDomainTextFormat: '%d',
        legend: [1, 2, 3, 4],
        legendColors: ["#efefef", that.currentColor],
        legendCellSize: 14,
        data: that.heatmapData,
        // dataType: "json",
        afterLoadData: that.parseData,
        onClick: function(date, nb) {
          // console.log(date, nb)
        }
      });
    },

    computeTime (val) {
      let x = val.split('/')
      return x[0] + ' ' + x[1]
    },
    calendarHeatmap() {
      // defaults
      var width = 340;
      var height = 140;
      var legendWidth = 150;
      var selector = '.svg-container';
      var SQUARE_LENGTH = 15.5;
      var SQUARE_PADDING = 2;
      var MONTH_LABEL_PADDING = 6;
      var now = moment().endOf('day').toDate();
      var yearAgo = moment().startOf('day').subtract(1, 'year').toDate();
      var startDate = null;
      var counterMap= {};
      var data = [];
      var max = null;
      var colorRange = ['#D8E6E7', '#218380'];
      var tooltipEnabled = true;
      var tooltipUnit = 'contribution';
      var legendEnabled = true;
      var onClick = null;
      var weekStart = 0; //0 for Sunday, 1 for Monday
      var locale = {
        months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        days: ['일', '월', '화', '수', '목', '금', '토'],
        No: 'No',
        on: 'on',
        Less: '적음',
        More: '많음'
      };
      var v = Number(d3.version.split('.')[0]);

      // setters and getters
      chart.data = function (value) {
        if (!arguments.length) { return data; }
        data = value;

        counterMap= {};

        data.forEach(function (element, index) {
            var key= moment(element.date).format( 'YYYY-MM-DD' );
            var counter= counterMap[key] || 0;
            counterMap[key]= counter + element.count;
        });

        return chart;
      };

      chart.max = function (value) {
        if (!arguments.length) { return max; }
        max = value;
        return chart;
      };

      chart.selector = function (value) {
        if (!arguments.length) { return selector; }
        selector = value;
        return chart;
      };

      chart.startDate = function (value) {
        if (!arguments.length) { return startDate; }
        yearAgo = value;
        now = moment(value).endOf('day').add(4, 'month').toDate();
        return chart;
      };

      chart.colorRange = function (value) {
        if (!arguments.length) { return colorRange; }
        colorRange = value;
        return chart;
      };

      chart.tooltipEnabled = function (value) {
        if (!arguments.length) { return tooltipEnabled; }
        tooltipEnabled = value;
        return chart;
      };

      chart.tooltipUnit = function (value) {
        if (!arguments.length) { return tooltipUnit; }
        tooltipUnit = value;
        return chart;
      };

      chart.legendEnabled = function (value) {
        if (!arguments.length) { return legendEnabled; }
        legendEnabled = value;
        return chart;
      };

      chart.onClick = function (value) {
        if (!arguments.length) { return onClick(); }
        onClick = value;
        return chart;
      };

      chart.locale = function (value) {
        if (!arguments.length) { return locale; }
        locale = value;
        return chart;
      };

      function chart() {

        d3.select(chart.selector()).selectAll('svg.calendar-heatmap').remove(); // remove the existing chart, if it exists

        var dateRange = ((d3.time && d3.time.days) || d3.timeDays)(yearAgo, now); // generates an array of date objects within the specified range
        var monthRange = ((d3.time && d3.time.months) || d3.timeMonths)(moment(yearAgo).startOf('month').toDate(), now); // it ignores the first month if the 1st date is after the start of the month
        var firstDate = moment(dateRange[0]);
        if (chart.data().length == 0) {
          max = 0;
        } else if (max === null) {
          max = d3.max(chart.data(), function (d) { return d.count; }); // max data value
        }

        // color range
        var color = ((d3.scale && d3.scale.linear) || d3.scaleLinear)()
          .range(chart.colorRange())
          .domain([0, max]);

        var tooltip;
        var dayRects;

        drawChart();

        function drawChart() {
          var svg = d3.select(chart.selector())
            .style('position', 'relative')
            .append('svg')
            .attr('width', width)
            .attr('class', 'calendar-heatmap')
            .attr('height', height)
            .style('padding', '18px 0px 18px 18px');

          dayRects = svg.selectAll('.day-cell')
            .data(dateRange);  //  array of days for the last yr

          var enterSelection = dayRects.enter().append('rect')
            .attr('class', 'day-cell')
            .attr('width', SQUARE_LENGTH)
            .attr('height', SQUARE_LENGTH)
            .attr('fill', function(d) { return color(countForDate(d)); })
            .attr('x', function (d, i) {
              var cellDate = moment(d);
              var result = cellDate.week() - firstDate.week() + (firstDate.weeksInYear() * (cellDate.weekYear() - firstDate.weekYear()));
              return result * (SQUARE_LENGTH + SQUARE_PADDING);
            })
            .attr('y', function (d, i) {
              return MONTH_LABEL_PADDING + formatWeekday(d.getDay()) * (SQUARE_LENGTH + SQUARE_PADDING);
            });

          if (typeof onClick === 'function') {
            (v === 3 ? enterSelection : enterSelection.merge(dayRects)).on('click', function(d) {
              var count = countForDate(d);
              onClick({ date: d, count: count});
            });
          }

          if (chart.tooltipEnabled()) {
            (v === 3 ? enterSelection : enterSelection.merge(dayRects)).on('mouseover', function(d, i) {
              tooltip = d3.select(chart.selector())
                .append('div')
                .attr('class', 'day-cell-tooltip')
                .html(tooltipHTMLForDate(d))
                .style('left', function () { return Math.floor(i / 7) * SQUARE_LENGTH + 'px'; })
                .style('top', function () {
                  return formatWeekday(d.getDay()) * (SQUARE_LENGTH + SQUARE_PADDING) + MONTH_LABEL_PADDING * 2 + 'px';
                });
            })
            .on('mouseout', function (d, i) {
              tooltip.remove();
            });
          }

          if (chart.legendEnabled()) {
            var colorRange = [color(0)];
            for (var i = 3; i > 0; i--) {
              colorRange.push(color(max / i));
            }

            var legendGroup = svg.append('g');
            legendGroup.selectAll('.calendar-heatmap-legend')
                .data(colorRange)
                .enter()
              .append('rect')
                .attr('class', 'calendar-heatmap-legend')
                .attr('width', SQUARE_LENGTH)
                .attr('height', SQUARE_LENGTH)
                .attr('x', function (d, i) { return (width - legendWidth) + (i + 1) * 16; })
                .attr('y', height + SQUARE_PADDING)
                .attr('fill', function (d) { return d; });

            legendGroup.append('text')
              .attr('class', 'calendar-heatmap-legend-text calendar-heatmap-legend-text-less')
              .attr('x', width - legendWidth - 16)
              .attr('y', height + SQUARE_LENGTH)
              .text(locale.Less);

            legendGroup.append('text')
              .attr('class', 'calendar-heatmap-legend-text calendar-heatmap-legend-text-more')
              .attr('x', (width - legendWidth + SQUARE_PADDING) + (colorRange.length + 1) * 16)
              .attr('y', height + SQUARE_LENGTH)
              .text(locale.More);
          }

          dayRects.exit().remove();
          var monthLabels = svg.selectAll('.month')
              .data(monthRange)
              .enter().append('text')
              .attr('class', 'month-name')
              .text(function (d) {
                return locale.months[d.getMonth()];
              })
              .attr('x', function (d, i) {
                var matchIndex = 0;
                dateRange.find(function (element, index) {
                  matchIndex = index;
                  return moment(d).isSame(element, 'month') && moment(d).isSame(element, 'year');
                });

                return Math.floor(matchIndex / 7) * (SQUARE_LENGTH + SQUARE_PADDING);
              })
              .attr('y', 0);  // fix these to the top

          locale.days.forEach(function (day, index) {
            index = formatWeekday(index);
            if (index % 2) {
              svg.append('text')
                .attr('class', 'day-initial')
                .attr('transform', 'translate(-8,' + (SQUARE_LENGTH + SQUARE_PADDING) * (index + 1) + ')')
                .style('text-anchor', 'middle')
                .attr('dy', '2')
                .text(day);
            }
          });
        }

        function pluralizedTooltipUnit (count) {
          if ('string' === typeof tooltipUnit) {
            return (tooltipUnit + (count === 1 ? '' : 's'));
          }
          for (var i in tooltipUnit) {
            var _rule = tooltipUnit[i];
            var _min = _rule.min;
            var _max = _rule.max || _rule.min;
            _max = _max === 'Infinity' ? Infinity : _max;
            if (count >= _min && count <= _max) {
              return _rule.unit;
            }
          }
        }

        function tooltipHTMLForDate(d) {
          var dateStr = moment(d).format('ddd, MMM Do YYYY');
          var count = countForDate(d);
          return '<span><strong>' + (count ? count : locale.No) + ' ' + pluralizedTooltipUnit(count) + '</strong> ' + locale.on + ' ' + dateStr + '</span>';
        }

        function countForDate(d) {
            var key= moment(d).format( 'YYYY-MM-DD' );
            return counterMap[key] || 0;
        }

        function formatWeekday(weekDay) {
          if (weekStart === 1) {
            if (weekDay === 0) {
              return 6;
            } else {
              return weekDay - 1;
            }
          }
          return weekDay;
        }

        var daysOfChart = chart.data().map(function (day) {
          return day.date.toDateString();
        });

      }

      return chart;
    }
  },
  
  async mounted() {
      

      // var now = moment().endOf('day').toDate();
      // var yearAgo = moment().startOf('day').subtract(1, 'year').toDate();
      // var chartData = d3.time.days(yearAgo, now).map(function (dateElement) {
      //   return {
      //     date: +new Date(dateElement),
      //     count: (dateElement.getDay() !== 0 && dateElement.getDay() !== 6) ? Math.floor(Math.random() * 60) : Math.floor(Math.random() * 10)
      //   };
      // });
      // console.log(chartData)

      this.drawHeatmap()
      // var that = this
      // var cal = new CalHeatMap();
      // cal.init({
      //   itemSelector: "#heatmap",
      //   domain: "month",
      //   // subDomain: "day",
      //   range: 3,
      //   cellSize: 25,
      //   displayLegend: true,
      //   nextSelector: "#nextBtn",
      //   previousSelector: "#preBtn",
      //   // subDomain:'x_day',
      //   weekStartOnMonday: false,
      //   domainLabelFormat: "%Y-%m",
      //   subDomainTextFormat: '%d',
      //   // legend: [20, 40, 60, 80],
      //   legendColors: ["#efefef", that.currentColor],
      //   legendCellSize: 14,
      //   data: that.heatmapData,
      //   // dataType: "json",
      //   afterLoadData: that.parseData,
      //   onClick: function(date, nb) {
      //     console.log(date, nb)
      //   }
      // });

    // var now = moment().endOf('day').toDate();
    // var yearAgo = moment().startOf('day').subtract(1, 'year').toDate();
    // var chartData = d3.time.days(yearAgo, now).map(function (dateElement) {
    //   // console.log(dateElement.getDay())
    //   return {
    //     date: dateElement,
    //     count: (dateElement.getDay() !== 0 && dateElement.getDay() !== 6) ? Math.floor(Math.random() * 60) : Math.floor(Math.random() * 10)
    //   };
    // });
    // var heatmap = this.calendarHeatmap()
    //   .data(chartData)
    //   .selector('.svg-container')
    //   .tooltipEnabled(false)
    //   .legendEnabled(true)
    //   .startDate(moment().startOf('day').subtract(4, 'month').toDate())
    //   .colorRange(['#f4f7f7', '#79a8a9'])
    //   .onClick(function (data) {
    //     console.log('data', data);
    //   });

    // heatmap();  // render the chart
  }
}
</script>

<style>
.cal-heatmap-container {
  margin: 0 auto;
}

.calendar-heatmap {
  -moz-box-sizing: content-box;
  box-sizing: content-box;
  margin: 0 auto;
}

.main-content {
  perspective: 1000px;
  transform: translateY(70px) rotateX(30deg);
  opacity: 0.4;
  transition: all 1s;
  /* padding: 25px; */
}

.appear {
  opacity: 1;
  transform: none;
  color: rgba(255, 255, 255, 0.3);
  letter-spacing: 1px;
}
</style>

