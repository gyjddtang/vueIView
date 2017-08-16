<!--
  - Created by Mili on 2017/8/15
 -->

<template lang="html">
  <div class="clipTest">
    <ImageClip :src="imgSrc" />
  </div>
</template>

<script>
  import ImageClip from '../components/ImageClip'

  export default {
    name: 'clipTest',
    components: {
      ImageClip
    },
    data () {
      return {
        imgSrc: require('../assets/image.jpg')
      }
    }
  }
</script>

<style scoped>
  .clipTest {
    width: 600px;
    margin: 0 auto;
  }
</style>
