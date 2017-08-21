<!--
  - Created by Mili on 2017/8/15
 -->

<template lang="html">
  <div class="imageClip">
    <!--<div-->
      <!--class="imgSourceBox"-->
      <!--ref="imgDragBox"-->
      <!--@mousedown.prevent="imgDragStart"-->
      <!--@mouseout.prevent="imgDragEnd"-->
    <!--&gt;-->
      <!--<img class="imgSource" :src="src" :style="imgSourceStyle" ref="image">-->
    <!--</div>-->
    <div class="handleBox">
      <div class="handleBt" @click="minusBtClick">
        <div class="minus"></div>
      </div>
      <div class="sliderBox" :style="sliderBoxStyle" ref="sliderBox">
        <div
          :class="['slider', { dragging: sliderDragging }]"
          @mousedown.prevent="sliderStart"
          :style="sliderStyle"
        ></div>
      </div>
      <div class="handleBt" @click="plusBtClick">
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
        sliderPos: 0,
        sliderStartX: 0,
        sliderMaxX: 480,
        sliderDragging: false,
        imgStartXY: {
          x: 0,
          y: 0
        },
        imgStartTranslate: {
          x: 0,
          y: 0
        },
        imgNewXY: {
          x: 0,
          y: 0
        }
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
          left: `${this.sliderMaxX * this.sliderPre - 10}px`
        }
      },

      imgSourceStyle: function () {
        return {
          transform: `scale(${this.sliderPre}) translate(${this.imgNewXY.x}px, ${this.imgNewXY.y}px)`
        }
      }
    },
    mounted () {
      this.sliderMaxX = this.$refs.sliderBox.offsetWidth
      this.sliderPre = 0.5
      this.sliderPos = this.sliderMaxX * this.sliderPre
    },
    methods: {
      imgDragStart (e) {
        this.imgStartXY.x = e.clientX
        this.imgStartXY.y = e.clientY
        this.$refs.imgDragBox.addEventListener('mousemove', this.imgDraging)
        this.$refs.imgDragBox.addEventListener('mouseup', this.imgDragEnd)
      },

      imgDraging (e) {
        this.imgNewXY.x = this.imgStartTranslate.x + e.clientX - this.imgStartXY.x
        this.imgNewXY.y = this.imgStartTranslate.y + e.clientY - this.imgStartXY.y
      },

      imgDragEnd (e) {
        this.$refs.imgDragBox.removeEventListener('mousemove', this.imgDraging)
        this.$refs.imgDragBox.removeEventListener('mouseup', this.imgDragEnd)
        let imgTransform = this.$refs.image.style.transform
        let translateX = imgTransform.split(' ')[1].slice(10, imgTransform.split(' ')[1].length - 3)
        let translateY = imgTransform.split(' ')[2].slice(0, imgTransform.split(' ')[2].length - 3)
        this.imgStartTranslate.x = parseFloat(translateX)
        this.imgStartTranslate.y = parseFloat(translateY)
      },

      sliderStart (e) {
        if (this.dragging) return
        this.sliderDragging = true
        this.sliderStartX = e.clientX
        window.addEventListener('mousemove', this.sliderDargging)
        window.addEventListener('mouseup', this.sliderEnd)
      },

      sliderDargging (e) {
        let left = this.sliderPos + e.clientX - this.sliderStartX
        if (left <= 0) {
          this.sliderPre = 0
        } else if (left >= this.sliderMaxX) {
          this.sliderPre = 1
        } else {
          this.sliderPre = parseFloat((left / this.sliderMaxX).toFixed(3))
        }
      },

      sliderEnd (e) {
        this.sliderDragging = false
        window.removeEventListener('mousemove', this.sliderDargging)
        window.removeEventListener('mouseup', this.sliderEnd)

        let left = this.sliderPos + e.clientX - this.sliderStartX
        if (left <= 0) {
          this.sliderPos = 0
        } else if (left >= this.sliderMaxX) {
          this.sliderPos = this.sliderMaxX
        } else {
          this.sliderPos = left
        }
      },

      plusBtClick () {
        if (this.sliderPre > 0.99 && this.sliderPre < 1) {
          this.sliderPre = 1
          this.sliderPos = this.sliderMaxX
        } else if (this.sliderPre <= 0.99) {
          this.sliderPre = (parseFloat(this.sliderPre) + 0.01).toFixed(3)
          this.sliderPos = this.sliderMaxX * this.sliderPre
        }
      },

      minusBtClick () {
        if (this.sliderPre < 0.01 && this.sliderPre > 0) {
          this.sliderPre = 0
          this.sliderPos = 0
        } else if (this.sliderPre >= 0.01) {
          this.sliderPre = (parseFloat(this.sliderPre) - 0.01).toFixed(3)
          this.sliderPos = this.sliderMaxX * this.sliderPre
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
    cursor: grab;
  }

  .imgSource {
    display: block;
    user-select: none;
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
