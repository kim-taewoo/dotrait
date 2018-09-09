<template>
  <div>
    <v-container>
      <v-layout wrap>
        <v-flex xs12>
          <h2>Mosaic {{$route.params}}</h2>
        </v-flex>
        <v-flex xs12>
          <svg class="canvas">

          </svg>

        <v-btn dark absolute  :right="true" fab color="pink"><v-icon>edit</v-icon></v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>

</template>

<script>
import * as d3 from 'd3';
import colors from 'vuetify/es5/util/colors'
export default {
  mounted () {
    console.log(this.$route)
    var width = 400, height = 400;

    var sqWidth = 20, sqHeight = 20;

    var coordinateData = [];

    var click = 0;

    for (var i = 0; i <= width ; i += sqWidth) {
      for (var j = 0; j <= height; j += sqHeight) {
        var arr = [i,j];
        coordinateData.push(arr);
      }
    }

    var svg = d3.select(".canvas").attr("height",height).attr("width",width);
    var rectGroup = svg.append("g");

    var rect = rectGroup.selectAll("rect")
    .data(coordinateData)
    .enter()
    .append("rect")
    .style("fill","white")
    .style("stroke", "#F5F5F5")
    .attr("width",sqWidth)
    .attr("height",sqHeight)
    .attr("x", function(d,i) {
    return d[0];
    })
    .attr("y", function(d,i) {
    return d[1];
    })
    .on("click", function(){
    d3.select(this)
    .transition()
    .duration(150)
    .style("fill",colors.blue.base);
    d3.select("text")
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


