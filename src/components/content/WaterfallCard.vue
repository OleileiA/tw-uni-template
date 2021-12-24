<template>
  <view class="w-42d5 h-87d5 box-border shadow">
    <view class="relative w-full h-64d5 rounded overflow-hidden">
      <image class="w-full h-full" :src="cover" mode="aspectFill"></image>
      <slot name="cover-slot"></slot>
    </view>
    <view class="px-1 pt-1 pb-std box-border">
      <view
        class="text-themeDark text-base font-semibold break-all line2-overflow"
        >{{ title }}</view
      >
      <view class="mt-2 flex-wrapper-between">
        <view class="flex-auto flex-wrapper-between">
          <image class="w-5 h-5 rounded-full" :src="avatar"></image>
          <view
            class="pl-1 text-sm text-gray-400 flex-auto w-0 line1-overflow"
            >{{ nickname }}</view
          >
        </view>
        <view class="flex-auto flex-grow-0 flex-wrapper-center">
          <u-icon name="heart" color="#8B8B8B"></u-icon>
          <view class="text-sm text-gray-400">{{
            praiseCount | numShorter
          }}</view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import uIcon from "uview-ui/components/u-icon/u-icon";
import { calShortNum } from "../../common/util";

export default {
  components: {
    uIcon,
  },
  props: {
    cover: String,
    title: String,
    avatar: String,
    nickname: String,
    praiseCount: Number,
  },
  filters: {
    numShorter: function (num) {
      return calShortNum(num);
    },
  },
};
</script>
