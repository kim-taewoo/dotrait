<template>
  <svg class="logo" :viewBox="'0 0 960 300'" :height="$vuetify.breakpoint.xsOnly ? '200px' : '300px'">
    <symbol id="s-text">
      <text text-anchor="middle" x="50%" y="80%" style="user-select:none;">Dotrait</text>
    </symbol>

    <g class = "g-ants">
        <use xlink:href="#s-text" class="text-copy"></use>
        <use xlink:href="#s-text" class="text-copy"></use>
        <use xlink:href="#s-text" class="text-copy"></use>
        <use xlink:href="#s-text" class="text-copy"></use>
        <use xlink:href="#s-text" class="text-copy"></use>
    </g>
  </svg>
</template>

<script>
export default {
  
}
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Montserrat);
.logo {
    display: block;
    font: 15.5em 'Montserrat';
    width: 100%;
    /* height: 270px; */
    margin: 0 auto;
}

.text-copy {
    fill: none;
    stroke: white;
    stroke-dasharray: 6% 29%;
    stroke-width: 5px;
    stroke-dashoffset: 0%;
    animation: stroke-offset 5.5s infinite linear;
}

.text-copy:nth-child(1){
    stroke: #4D163D;
    animation-delay: -1;
}

.text-copy:nth-child(2){
    stroke: #840037;
    animation-delay: -2s;
}

.text-copy:nth-child(3){
    stroke: #BD0034;
    animation-delay: -3s;
}

.text-copy:nth-child(4){
    stroke: #BD0034;
    animation-delay: -4s;
}

.text-copy:nth-child(5){
    stroke: #FDB731;
    animation-delay: -5s;
}

@keyframes stroke-offset{
    100% {stroke-dashoffset: -35%;}
}
</style>


