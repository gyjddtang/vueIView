<!--
  - Created by Mili on 2017/8/21
 -->

<template lang="html">
  <div class="canvasContainer">
    <div class="imgSourceBox">
      <img :src="imgSrc" class="imgSource" ref="imageSource" />
      <canvas ref="canvasImg" width="600" height="400"></canvas>
    </div>
    <div class="canvasBox">
      <img :src="imgSrc" class="imgSource" ref="imageSource" />
      <canvas ref="canvas" width="600" height="400"></canvas>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'canvas',
    data () {
      return {
        imgSrc: require('../assets/image.jpg')
      }
    },
    mounted () {
      let cxt = this.$refs.canvas.getContext('2d')
      let cxtImg = this.$refs.canvasImg.getContext('2d')

      cxtImg.beginPath()
      cxtImg.moveTo(50, 50)
      cxtImg.lineTo(100, 100)
      cxtImg.lineTo(50, 150)
      cxtImg.closePath()
      cxtImg.strokeStyle = '#ff2169'
      cxtImg.fillStyle = '#fff'
      cxtImg.stroke()
      cxtImg.fill()

      cxtImg.beginPath()
      cxtImg.arc(300, 100, 50, 0, 2 * Math.PI)
      cxtImg.fill()
      cxt.fillRect(0, 0, 600, 400)
      cxt.save()
      cxt.globalCompositeOperation = 'destination-out'// 设置裁剪模式
      cxt.beginPath()
      cxt.arc(300, 200, 100, 0, 2 * Math.PI)
      cxt.fill()
      cxt.restore()
//      cxt.beginPath()
//      cxt.arc(300, 200, 100, 0, 2 * Math.PI)
//      cxt.clip()
//      cxt.fillStyle = 'rgba(0, 0, 0, .4)'
//      cxt.fillRect(0, 0, 600, 400)
    }
  }
</script>

<style scoped>
  .canvasContainer {
    width: 600px;
    margin: 0 auto;
  }

  .imgSourceBox {
    width: 600px;
    height:400px;
    background: #e7f6ff;
    position: relative;
  }

  .imgSourceBox canvas {
    position: absolute;
    top: 0;
    left: 0;
  }

  .imgSource {
    width: 600px;
    display: block;
  }

  .canvasBox {
    width: 600px;
    height: 400px;
    margin-top: 40px;
    background: #e7f6ff;
    position: relative;
  }

  .canvasBox canvas {
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
