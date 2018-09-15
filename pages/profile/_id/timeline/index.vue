<template>
  <div v-scroll="onScroll">
    <div class="stem-wrapper">
      <div class="stem"></div>
      <div class="stem-background"></div>
    </div>

    <header class="section header">
        <div class="section-inner">
            
            <div class="master-head">
                <h1 class="page-title" :value="love">Colored Stem</h1>
                <!-- <p class="page-description">Your bones don't break, mine do. That's clear. Your cells react to bacteria and viruses differently than mine. You don't get sick, I do. That's also clear. But for some reason, you and I react the exact same way to water.</p> -->
                <p class="scroll-button" onClick="$('.post-wrapper .post:first-child .stem-overlay .icon').click();">Ready to go for a ride?</p>
            </div>
                
        </div> <!-- section-inner -->
    </header> <!-- header -->

    <div class="section main-content">
        <div class="section-inner">
        
            <div class="stem-padding"></div>
            
            <div class="post-wrapper">


              <!-- <intersect @enter="selected = i" v-for="(i, index) in 9" :key="index" > -->
                  <article class="post bitbucket-icon" ref="post" v-for="(i, index) in 9" :key="index">
                      <div class="stem-overlay">
                          <div class="icon"></div>
                          <div class="stem-mask"></div>
                      </div>
                      
                      <div class="post-content">
                          <p class="meta">Written yesterday at 8:56 pm</p>
                          <h2 class="post-title">This is my post title</h2>
                          <div class="entry-content">
                              <p>Your bones don't break, mine do. That's clear. Your cells react to bacteria and viruses differently than mine. You don't get sick, I do. That's also clear. But for some reason, you and I react the exact same way to water. We swallow it too fast, we choke. We get some in our lungs, we drown. However unreal it may seem, we are connected, you and I. We're on the same curve, just on opposite ends.</p>
                          </div>
                      </div>
                  </article>
              <!-- </intersect> -->
                
            </div> <!-- post-wrapper -->
        
            <div class="single-stem-icon scroll-to-top trigger-scroll-to-top"></div>
                
        </div> <!-- section-inner -->
    </div> <!-- main-content -->
        
    <footer class="footer section">
        <div class="section-inner">
            
            <div class="good-bye">
              <p>That's all, buddy!</p>
              <p>Psst. You can click the icons to scroll to each post. Click the last one to scroll back up.</p>
            </div>
        </div> <!-- section-inner -->
    </footer> <!-- footer -->
  </div>
</template>

<script>
// import intersect from "vue-intersect";

export default {
  components: {
    // intersect
  },
  data() {
    return {
      love: "하다",
      selected: null,
      currScroll: 0,
      windowHeight: 0
    };
  },
  mounted() {
    window.scroll();
  },
  methods: {
    onScroll(e) {
      this.setupPostAnimation();
      this.setupFade();
    },
    setupPostAnimation() {
      let posts = this.$refs.post;
      this.currScroll =
        window.pageYoffset || document.documentElement.scrollTop;
      this.windowHeight =
        window.innerHeight || document.documentElement.clientHeight;
      let overScroll = Math.ceil(this.windowHeight * 0.2);
      let threshold = this.currScroll + this.windowHeight - overScroll;

      posts.forEach(post => {
        let rect = post.getBoundingClientRect();
        let postScroll = rect.top + this.currScroll;
        if (postScroll > threshold) {
          post.classList.add("hidden");
        } else {
          post.classList.remove("hidden");
        }
      });
    },
    setupFade() {
      let posts = this.$refs.post.reverse();
      let halfScreen = this.windowHeight / 2;
      let delay = this.delay();
      delay(() => {
        let scrollSplit = this.currScroll + halfScreen;
        posts.forEach(post => {
          post.classList.remove('active')
          let rect = post.getBoundingClientRect();
          let postOffset = rect.top + this.currScroll;
          let postOffsetBottom = rect.bottom + this.currScroll
          if (scrollSplit > postOffset && postOffsetBottom > scrollSplit) {
            post.classList.add("active");
          }
        })
      }, 20);
    },
    delay() {
      let timer = 0;
      return function(callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
      };
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../../node_modules/lesshat/lesshat.less";

// .page-title:hover::after {
//   content: attr(value);
// }

/*==========  Global  ==========*/

@centered-content-width: 1024px;

/*==========  Basics  ==========*/

@body-background: #112c30;
// @body-background: #15373c

html,
body {
  height: 100%;
}
body {
  background: @body-background;
  margin: 0px;
  padding: 0px;
  font-family: sans-serif;
  font-size: 15px;
  line-height: 26px;
  color: #b9cfd0;
  font-family: "Roboto Slab", serif;
  overflow-x: hidden;
  overflow-y: scroll;
}

a {
  color: #b9cfd0;
  text-decoration: none;
  border-bottom: 1px solid #b9cfd0;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Comfortaa", cursive;
}

/*==========  Sections  ==========*/

@header-background: #39acbd;
.header {
  text-align: center;
  position: relative;
  z-index: 1;
  background-image: linear-gradient(
    to bottom,
    lighten(@header-background, 15%) 0%,
    @header-background 100%
  );

  .master-head {
    padding: 7% 30px;
  }

  .page-title {
    padding: 0 30px 0 30px;
    font-size: 60px;
    line-height: 1em;
    letter-spacing: 10px;
    color: #fff;
  }

  .page-description {
    margin: 30px auto;
    max-width: 600px;
    font-size: 18px;
    line-height: 2em;
    color: #fff;
  }

  .scroll-button {
    color: #fff;
    font-size: 20px;
    padding: 15px 20px 15px 20px;
    display: inline-block;
    background: #3093a2; // rgba(0,0,0,.14)
    cursor: pointer;
    transition: all 0.4s;
    user-select: none;

    &:hover {
      background: darken(#3093a2, 10%);
    }
    &:active {
      background: darken(#3093a2, 20%);
    }
  }
}

.main-content {
  margin: 0px auto;
  position: relative;

  .section-inner,
  .post-wrapper {
    .clearfix;
  }
}

.footer {
  background: @body-background;
  padding: 150px 0px 200px 0px;
  position: relative;
  z-index: 1;

  .good-bye {
    text-align: center;
    font-size: 18px;
    line-height: 36px;

    p {
      display: block;
      margin: 0px auto 30px auto;
      max-width: 300px;
      clear: both;
    }
  }
}

.section {
  .section-inner {
    margin: 0px auto;
    width: @centered-content-width;

    @media only screen {
      width: auto;
      max-width: @centered-content-width;
    }
  }
}

/*==========  Stem  ==========*/

@stem-width: 60px;
@stem-default-glow: @header-background;
.stem-wrapper {
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 50%;

  &.color-yellow .stem-background {
    background: #e9e566;
  }
  &.color-green .stem-background {
    background: #35c189;
  }
  &.color-white .stem-background {
    background: #fff;
  }

  .stem,
  .stem-background {
    position: absolute;
    top: 0px;
    left: -(@stem-width / 2);
    width: @stem-width;
  }
  .stem {
    background: lighten(@body-background, 10%);
    height: 100%;
  }
  .stem-background {
    background: @stem-default-glow;
    height: 50%;
    .transition-duration(0.5s);
  }
}

.stem-padding,
.single-stem-icon {
  width: @stem-width;
  height: @stem-width; // Override with inline styling
  margin: 0px auto;
  background: transparent
    url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/22043/stem-mask.png)
    repeat-y top center;
}

.single-stem-icon.scroll-to-top {
  cursor: pointer;
  background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/22043/scroll-to-top-icon.png);
}

/*==========  Post wrapper ==========*/

.post-wrapper {
  @post-stem-padding: 80px;
  @post-width: (@centered-content-width / 2) - @post-stem-padding;

  .clearfix;

  .post {
    position: relative;
    width: @post-width;
    padding: 0px 0px 60px 0px;
    clear: both;
    opacity: 1;
    .perspective(1000px);

    &.hidden .post-content {
      .transform(translateY(100px) rotateX(30deg));
      opacity: 0;
    }

    &:hover .post-content,
    &.active .post-content {
      opacity: 1;
      .meta {
        opacity: 1;
        .transform(none);
      }
    }

    &:nth-child(even) {
      float: right;
    }
    &:nth-child(odd) {
      float: left;
    }

    &:nth-child(even) .stem-overlay {
      left: -110px;
    }
    &:nth-child(odd) .stem-overlay {
      right: -110px;
    }

    &.music-icon .stem-overlay .icon {
      background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/22043/music-icon.png);
    }
    &.bitbucket-icon .stem-overlay .icon {
      background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/22043/bitbucket-icon.png);
    }
    &.m-icon .stem-overlay .icon {
      background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/22043/m-icon.png);
    }
    &.twitter-icon .stem-overlay .icon {
      background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/22043/twitter-icon.png);
    }

    .stem-overlay {
      position: absolute;
      top: 0px;
      bottom: 0px;
      width: @stem-width;

      .icon {
        background: transparent no-repeat center center;
        height: @stem-width;
        width: @stem-width;
        cursor: pointer;
      }

      .stem-mask {
        position: absolute;
        top: @stem-width;
        bottom: 0px;
        left: 0px;
        right: 0px;
        background: transparent
          url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/22043/stem-mask.png)
          repeat-y top center;
      }
    }

    .post-content {
      opacity: 0.3;
      .transition-duration(0.4s);
      .transform(none);

      .meta {
        color: rgba(255, 255, 255, 0.3);
        margin: 0px 0px 15px 0px;
        letter-spacing: 1px;
        opacity: 0;
        .transition-duration(1s);
        .transition-delay(0.2s);
        .transform(translateY(-5px));
      }

      .post-title {
        font-size: 32px;
        line-height: 42px;
        margin: 0px 0px 15px 0px;
      }
    }
  }
}

/*==========  Media queries  ==========*/

@media only screen and (max-width: 1080px) {
  .main-content {
    &,
    .section-inner {
      max-width: none;
    }
  }

  .stem-wrapper {
    left: 80px;
  }

  .stem-padding,
  .single-stem-icon {
    margin: 0px;
    float: left;
    margin-left: 50px;
  }

  .post-wrapper .post {
    // To add extra weight to the selector
    &,
    &:nth-child(even),
    &:nth-child(odd) {
      width: auto;
      margin-left: 110px;
      float: none;

      .stem-overlay {
        left: -60px;
        right: auto;
      }
    }

    .post-content {
      padding: 0px 50px;
    }
  }
}

@media only screen and (max-width: 700px) {
  .header .page-title {
    font-size: 40px;
  }

  .post-wrapper .post {
    margin-left: 90px !important;

    .post-content {
      padding: 0 25px;
    }
  }

  .stem-wrapper {
    left: 60px;
  }

  .stem-padding,
  .single-stem-icon {
    margin-left: 30px;
  }
}

.clearfix {
  .clearfix_mixin;
}
// The micro clearfix http://nicolasgallagher.com/micro-clearfix-hack/
.clearfix_mixin() {
  *zoom: 1;

  &:before,
  &:after {
    content: "";
    display: table;
  }
  &:after {
    clear: both;
  }
}
</style>

