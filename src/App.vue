<template>
  <div class="wedding">
    <Editor/>
  </div>
</template>

<script>
import Editor from "./components/Editor.vue"
import wx from './utils/wx'

export default {
  props: [],
  components: {
    Editor
  },
  name: 'Wedding',

  mounted() {
      let wxShareData = {
        title: "袁峰&陆杨柳的结婚请柬",
        linkurl: location.origin + "/index.html",
        desc: "感谢您参加我们的婚礼!",
        img: "http://wedding.mupaiwan.com/images/mini-photo.png"
      };
      wx.getJSSDK(wxShareData);
    },
}

</script>

<style lang="less">
@import './assets/base.less';
html,
body{
  height: 100%;
}
.wedding{
  position: relative;
  max-width: 568px!important;
  height: 100%;
  min-height: 100%;
  margin: 0 auto;
  background: #2B2B48;
  perspective: 500px;
}
</style>