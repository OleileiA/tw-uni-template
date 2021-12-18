<template>
  <view class="relative">
    <view class="relative my-0 mx-auto w-15 h-15 rounded-full overflow-hidden">
      <image :src="avatar" class="w-15 h-15"></image>
    </view>
    <view class="m-4 text-9 font-medium text-white text-center">
      朗诵人：{{ nickname }}
    </view>
    <view
      @click="clickFollow"
      class="my-0 mx-auto w-18d75 h-7 text-white text-base leading-7 text-center bg-theme rounded-3d5xl"
      >关注</view
    >
    <view class="mt-5 text-white text-2xl text-center font-black" :style="{ color: titleColor }">{{
      title
    }}</view>
    <view class="flex-wrapper-center mt-1 text-white text-sm">
      <view class="px-3">{{ createdAt | date("mm-dd") }}</view>
      <view class="px-3">阅读 {{ readNum }}</view>
      <view class="px-3">作者 {{ author }}</view>
    </view>
  </view>
</template>
<script>
export default {
  props: {
    avatar: String,
    nickname: String,
    followed: Boolean,
    title: String,
    createdAt: Number,
    readNum: Number,
    author: String,
    titleColor: String,
    subTitleColor: String,
  },
  methods: {
    clickFollow() {
      console.log("clickFollow");
      this.$emit("clickFollow");
    },
  },
};
</script>
