<template>
  <v-container class="pt-0" :class="{'pa-0' : $vuetify.breakpoint.xsOnly}">
    <v-layout>
      <v-flex class="xs12">
        <div id="capture" style="height:300px; width:300px;margin: 0 auto;">
          <svg  class="canvas" ref="svg" ></svg>

        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>
