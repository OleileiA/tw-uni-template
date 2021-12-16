<template>
  <view
    class="relative flex-wrapper-between w-full h-18d75 p-2d5 bg-white bg-opacity-50 rounded-md box-border"
  >
    <view class="relative flex-none w-13d75 h-13d75 rounded-sm overflow-hidden">
      <image :src="cover" class="w-full h-full"></image>
      <u-icon
        v-if="playing"
        @click="clickPause"
        class="absolute inset-0 m-auto w-10 h-10"
        name="pause"
        size="30"
        color="#fff"
      ></u-icon>
      <u-icon
        v-else
        @click="clickPlay"
        class="absolute inset-0 m-auto w-10 h-10"
        name="play-right-fill"
        size="30"
        color="#fff"
      ></u-icon>
    </view>
    <view class="flex-auto ml-std">
      <slider
        class="m-0"
        :value="value"
        @change="sliderChange"
        @changing="sliderChanging"
        block-size="12"
        block-color="#FF0000"
        activeColor="#FF0000"
        backgroundColor="rgba(255, 255, 255, 0.8)"
      ></slider>
      <view class="flex-wrapper-between text-sm text-white">
        <view class="flex-1 w-0 font-semibold line1-overflow">{{ title }}</view>
        <view class="flex-1 text-right">{{ curTime }} / {{ tolTime }}</view>
      </view>
    </view>
  </view>
</template>
<script>
import uIcon from "uview-ui/components/u-icon/u-icon";
export default {
  components: {
    uIcon,
  },
  props: {
    cover: String,
    title: String,
    playing: Boolean,
    curTime: String,
    tolTime: String,
  },
  data() {
    return {
      value: 0,
    };
  },
  methods: {
    clickPlay() {
      console.log("click play");
      this.$emit("clickPlay");
    },
    clickPause() {
      console.log("click pause");
      this.$emit("clickPause");
    },
    sliderChange(e) {
      console.log("sliderChange", e);
    },
    sliderChanging(e) {
      console.log("sliderChanging", e);
    },
  },
};
</script>
