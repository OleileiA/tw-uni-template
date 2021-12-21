<template>
  <layout>
    <template slot="content">
      <wx-open-launch-app id="launch-btn" appid="需要唤起app的appid" extinfo="">
        <script type="text/wxtag-template">
          <button style="margin-top: 30rpx!important;font-size: 32rpx;">APP内打开</button>
        </script>
      </wx-open-launch-app>
    </template>
  </layout>
</template>
<script>
import Layout from "../common/Layout";

export default {
  components: {
    Layout
  },
  props: {
    show: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    success(e) {
      console.log('success', e);
    },
    error(e) {
      console.log('error', e);
    }
  },
  mounted() {
    console.log("mounted -------------------------------------");
    setTimeout(() => {
      const btn = document.getElementById('launch-btn');
      btn.addEventListener('launch', e => {
        // 在此处可设置粘贴板内数据，数据是传递给 app 的参数进，
        console.log(e);
      });
      btn.addEventListener('error', e => {
        console.log('error', e);
        // if (uni.getSystemInfoSync().platform == 'ios') {
        //   location.href = 'http://itunes.apple.com/app/id1541793795';
        // }
        // else if (uni.getSystemInfoSync().platform === 'android') {
        //   location.href = 'http://app.xiaomi.com/detail/1276426';
        // }
      });
    }, 1000)
  }
}
</script>
