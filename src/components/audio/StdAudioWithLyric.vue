<template>
  <view
    class="relative w-full h-70 box-border bg-fixed bg-no-repeat bg-cover"
    :style="{ backgroundImage: 'url(' + bg + ')' }"
  >
    <view class="absolute inset-0 px-12 pt-6d25 pb-16d5 bg-black bg-opacity-50">
      <scroll-view
        class="mask w-full h-full text-xl text-white font-semibold"
        scroll-y
      >
        <view v-for="item in lyric" :key="item" class="text-center leading-10">
          {{ item }}
        </view>
      </scroll-view>
      <view class="absolute left-0 bottom-0 flex-wrapper-around w-full h-16d5">
        <view
          @click="clickBtn"
          class="flex-wrapper-between w-51d25 h-9 px-2 text-base bg-white bg-opacity-50 rounded-4xl box-border"
        >
          <image
            class="flex-none w-6 h-6"
            src="../../static/images/yinfu.png"
          ></image>
          <view
            class="flex-auto w-0 text-white overflow-hidden whitespace-nowrap"
          >
            <view :class="{ 'scroll-notice': playing }">{{
              title + " 原唱 " + author
            }}</view>
          </view>
          <u-icon
            class="flex-none"
            name="arrow-right"
            color="#fff"
            size="16"
          ></u-icon>
        </view>
        <view
          class="flex-wrapper-center w-31d25 h-9 text-base font-semibold bg-red-600 rounded-4xl"
        >
          <u-icon name="mic" color="#fff" size="20"></u-icon>
          <view class="text-white text-base">我要唱</view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import uIcon from "uview-ui/components/u-icon/u-icon";
import AudioControllerMixin from "../../mixins/AudioControllerMixin";
export default {
  components: {
    uIcon,
  },
  mixins: [AudioControllerMixin],
  props: {
    lyric: Array,
  },
  methods: {
    clickBtn() {
      if (this.playing) {
        this.pauseAudio();
      } else {
        this.playAudio();
      }
    },
  },
};
</script>
<style scoped>
@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}
.scroll-notice {
  animation: marquee 10s linear infinite;
}
.mask {
  -webkit-mask-image: linear-gradient(
    transparent,
    blue 15%,
    blue 85%,
    transparent
  );
}
</style>
