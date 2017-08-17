<!--
  - Created by Mili on 2017/8/15
 -->

<template lang="html">
  <div class="imageClip">
    <div class="imgSourceBox">
      <img class="imgSource" :src="src" :style="imgSource">
    </div>
    <div class="handleBox">
      <div class="handleBt" @click="sliderBtClick(0)">
        <div class="minus"></div>
      </div>
      <div class="sliderBox" :style="sliderBoxStyle" ref="sliderBox">
        <div
          :class="['slider', { dragging: dragging }]"
          @mousedown.prevent="mousedown"
          :style="sliderStyle"
        ></div>
      </div>
      <div class="handleBt" @click="sliderBtClick(1)">
        <div class="plus"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'imageClip',
    props: {
      src: String
    },
    data () {
      return {
        sliderPre: 0,
        newPosition: 0,
        startX: 0,
        maxX: 480,
        dragging: false
      }
    },
    computed: {
      sliderBoxStyle: function () {
        let pre = this.sliderPre * 100
        return {
          background: `linear-gradient(90deg, #4db3ff ${pre}%, #F1F6FA ${pre}%)`
        }
      },

      sliderStyle: function () {
        return {
          left: `${this.maxX * this.sliderPre - 10}px`
        }
      },

      imgSource: function () {
        return {
          transform: `scale(${this.sliderPre})`
        }
      }
    },
    mounted () {
      this.maxX = this.$refs.sliderBox.offsetWidth
      this.sliderPre = 0.5
    },
    methods: {
      mousedown (e) {
        if (this.dragging) return
        this.dragging = true
        this.startX = e.clientX
        window.addEventListener('mousemove', this.mouseover)
        window.addEventListener('mouseup', this.mouseup)
      },

      mouseup (e) {
        this.dragging = false
        window.removeEventListener('mousemove', this.mouseover)
        window.removeEventListener('mouseup', this.mouseup)

        this.setSliderPre(e)
      },

      mouseover (e) {
        this.setSliderPre(e)
      },

      setSliderPre (e) {
        let left = this.maxX * this.sliderPre + e.clientX - this.startX
        this.startX = e.clientX
        if (left <= 0) {
          this.sliderPre = 0
        } else if (left >= this.maxX) {
          this.sliderPre = 1
        } else {
          this.sliderPre = (left / this.maxX).toFixed(3)
        }
      },

      sliderBtClick (type) {
        if (type === 0) {   // 缩小
          if (this.sliderPre < 0.01 && this.sliderPre > 0) {
            this.sliderPre = 0
          } else if (this.sliderPre >= 0.01) {
            this.sliderPre = (parseFloat(this.sliderPre) - 0.01).toFixed(3)
          }
        } else {   // 放大
          if (this.sliderPre > 0.99 && this.sliderPre < 1) {
            this.sliderPre = 1
          } else if (this.sliderPre <= 0.99) {
            this.sliderPre = (parseFloat(this.sliderPre) + 0.01).toFixed(3)
          }
        }
      }
    }
  }
</script>

<style scoped>
  .imageClip {
    width: 600px;
  }

  .imgSourceBox {
    width: 100%;
    height: 400px;
    overflow: hidden;
    background: #e7f6ff;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .imgSource {
    display: block;
  }

  .handleBox {
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .handleBt {
    width: 40px;
    height: 40px;
    border: 1px solid #E1E6EB;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .handleBt:hover {
    border-color: #4db3ff;
  }

  .handleBt .minus {
    width: 16px;
    height: 2px;
    background: #5F6369;
  }

  .handleBt .plus {
    width: 2px;
    height: 16px;
    background: #5F6369;
  }

  .handleBt .plus::after {
    content: "";
    display: block;
    width: 16px;
    height: 2px;
    background: #5F6369;
    transform: translate(-7px, 7px);
  }

  .handleBt:hover .minus,
  .handleBt:hover .plus,
  .handleBt:hover .plus::after {
    background: #4db3ff;
  }

  .sliderBox {
    width: 480px;
    height: 6px;
    border-radius: 8px;
    position: relative;
  }

  .slider {
    background: linear-gradient(-180deg, #FFFFFF 0%, #F0F5F9 97%);
    border: 1px solid #E1E6EB;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    box-sizing: border-box;
    position: absolute;
    top: calc(50% - 10px);
    user-select: none;
    cursor: grab;
  }

  .slider:hover {
    transform: scale(1.25);
    background: linear-gradient(-180deg, #FFFFFF 0%, #4db3ff 97%);
    border-color: #4db3ff;
  }

  .slider.dragging {
    transform: scale(1.25);
    background: linear-gradient(-180deg, #FFFFFF 0%, #4db3ff 97%);
    border-color: #4db3ff;
    cursor: grabbing;
  }
</style>
