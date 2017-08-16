<!--
  - Created by Mili on 2017/8/15
 -->

<template lang="html">
  <div class="imageClip">
    <div class="imgSourceBox">
      <img class="imgSource" :src="src">
    </div>
    <div class="handleBox">
      <div class="handleBt">
        <div class="minus"></div>
      </div>
      <div class="sliderBox">
        <div
          :class="['slider', { dragging: dragging }]"
          @mousedown.prevent="mousedown"
          :style="{ left: sliderLeft + 'px' }"
        ></div>
      </div>
      <div class="handleBt">
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
        sliderLeft: -10,
        startX: 0,
        newPosition: 0,
        dragging: false
      }
    },
    methods: {
      mousedown (e) {
        this.dragging = true
        this.startX = e.clientX
        window.addEventListener('mousemove', this.mouseover)
        window.addEventListener('mouseup', this.mouseup)
      },

      mouseup (e) {
        this.dragging = false
        this.newPosition = this.newPosition + e.clientX - this.startX
        window.removeEventListener('mousemove', this.mouseover)
        window.removeEventListener('mouseup', this.mouseup)
      },

      mouseover (e) {
        this.sliderLeft = this.newPosition + e.clientX - this.startX
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
  }

  .imgSource {
    display: block;
    width: 100%;
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
    background: #F1F6FA;
    border-radius: 8px;
    position: relative;
  }

  .slider {
    background-image: linear-gradient(-180deg, #FFFFFF 0%, #F0F5F9 97%);
    border: 1px solid #E1E6EB;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    box-sizing: border-box;
    position: absolute;
    top: calc(50% - 10px);
    cursor: -webkit-grabbing;
    cursor: grab;
    user-select: none;
    transition: .1s;
  }

  .slider:hover {
    transform: scale(1.25);
    background-image: linear-gradient(-180deg, #FFFFFF 0%, #4db3ff 97%);
    border-color: #4db3ff;
  }

  .slider.dragging {
    transform: scale(1.25);
    background-image: linear-gradient(-180deg, #FFFFFF 0%, #4db3ff 97%);
    border-color: #4db3ff;
    cursor: grabbing;
  }
</style>
