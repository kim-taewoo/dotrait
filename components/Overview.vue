<template>
  <v-layout class="pt-3" wrap>
      <v-flex>
        <v-card class="mx-2 mb-2 mt-0">
          <v-flex class="text-xs-center pt-3 d-block">
            <v-avatar color="red" size="60px">
              <span class="white--text headline">T</span>
            </v-avatar>            
          </v-flex>
          <v-card-text class="text-xs-center pb-0">
            <h3>김태우</h3>
            <p class="grey--text">프로그래머를 꿈꾸는 코더</p>
            <p class="text-xs-center">Enthusiastic coder who wants to be a real programmer. Majored in business, living in Seoul, South Korea</p>
            
            <v-flex class="text-xs-center">
              <v-btn small color="green" dark><v-icon left>email</v-icon> 메시지</v-btn>
              <v-btn small class="primary">팔로우</v-btn>
            </v-flex>
          </v-card-text>
          <v-card-actions class="pb-1">
            <v-flex class="text-xs-center">
              <v-btn :ripple="false" flat @click="show = !show">
                더 보기<v-icon>{{ show ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
              </v-btn>
            </v-flex>
          </v-card-actions>
          <v-slide-y-transition>
            <v-card-text class="pa-2" v-show="show">
              <v-divider></v-divider>
              <div class="py-2">
                <v-subheader class="pl-1">특기</v-subheader>
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
          </v-slide-y-transition>
        </v-card>
      </v-flex>    

      <v-flex class="xs12 px-3 mt-2 subheading">
        <p class="mb-0">최근 4 달간 84 개의 기록이 있습니다.</p>
        <div style="margin-top: -8px;">
          <small class="grey--text">박스를 터치하여 기록 조회 가능</small>
        </div>
      </v-flex>

      <v-flex xs12 class="text-xs-center">
        <v-card>
          <div class="svg-container text-xs-center"></div>
        </v-card>
      </v-flex>  

      <v-flex xs12 class="mt-3">
        <div class="subheading px-3">타임라인</div>
        <v-divider></v-divider>
      </v-flex>
      <v-flex xs12 class="mt-2">
          <v-layout wrap>
            <v-flex>
              <intersect @enter="entered($event, index)" @leave="left($event, index)" v-for="(i, index) in 9" :key="index">
                <v-card color="purple" class="white--text ma-2 post" v-for="x in 8" :key="x">
                  <v-layout row>
                    <v-flex xs7>
                      <v-card-title primary-title>
                        <div>
                          <div class="headline">Halycon Days</div>
                          <div>Ellie Goulding</div>
                          <div>(2013)</div>
                        </div>
                      </v-card-title>
                    </v-flex>
                    <v-flex xs5>
                      <v-img
                        src="https://cdn.vuetifyjs.com/images/cards/halcyon.png"
                        height="125px"
                        contain
                      ></v-img>
                    </v-flex>
                  </v-layout>
                  <v-divider light></v-divider>
                  <v-card-actions class="py-1 px-3">
                    Rate this album
                    <v-spacer></v-spacer>
                    <v-rating v-model="rating" color="white"></v-rating>
                  </v-card-actions>
                </v-card>
              </intersect>
            </v-flex>
          </v-layout>
      </v-flex>
    </v-layout>
</template>

<script>
import moment from 'moment'
import * as d3 from 'd3'
import intersect from "vue-intersect";

export default {
  components: {
    intersect
  },
  data () {
    return {
      show: false,
      contacts: [
        { icon: 'mail', value: 'acoustic0419@gmail.com' },
        { icon: 'mobile', value: '010-6678-6461' },
        { icon: 'facebook', value: 'Facebook' },
        { icon: 'instagram', value: 'Instagram' },
        { icon: 'github', value: 'Github' },
      ],
      rating: 3,
      selected: null
    }
  },
  methods: {
    entered($event, target) {
      $event[0].target.children[1].classList.add("appear");
    },
    left($event, target) {
      $event[0].target.children[1].classList.remove("appear");
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
  mounted() {
    var now = moment().endOf('day').toDate();
    var yearAgo = moment().startOf('day').subtract(1, 'year').toDate();
    var chartData = d3.timeDays(yearAgo, now).map(function (dateElement) {
      console.log(dateElement.getDay())
      return {
        date: dateElement,
        count: (dateElement.getDay() !== 0 && dateElement.getDay() !== 6) ? Math.floor(Math.random() * 60) : Math.floor(Math.random() * 10)
      };
    });
    var heatmap = this.calendarHeatmap()
      .data(chartData)
      .selector('.svg-container')
      .tooltipEnabled(false)
      .legendEnabled(true)
      .startDate(moment().startOf('day').subtract(4, 'month').toDate())
      .colorRange(['#f4f7f7', '#79a8a9'])
      .onClick(function (data) {
        console.log('data', data);
      });

    heatmap();  // render the chart
  }
}
</script>

<style>
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
