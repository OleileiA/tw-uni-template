<template>
  <view class="content">
    <image class="logo" src="/static/logo.png"></image>
    <view>
      <text class="text-green-500 p-1d5">{{ title }}</text>
    </view>
    <u-icon name="phone"></u-icon>
  </view>
</template>

<script>
import uIcon from "uview-ui/components/u-icon/u-icon";

export default {
  components: {
    "u-icon": uIcon,
  },
  data() {
    return {
      title: "Hello",
    };
  },
  onLoad() {},
  methods: {},
};
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin: 200rpx auto 50rpx auto;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
