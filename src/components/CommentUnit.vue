<template>
  <view class="flex-wrapper-between items-start">
    <!--  左半区  -->
    <view class="flex-none w-17 h-full py-2 box-border">
      <view class="relative w-17 h-17 rounded-full overflow-hidden">
        <img :src="avatar" alt="头像" class="w-full h-full" />
        <slot name="avatar-slot"></slot>
      </view>
    </view>
    <!--  右半区  -->
    <view class="flex-auto pl-2d5 py-std box-border border-bottom">
      <view class="text-gray-400 text-base">{{ nickname }}</view>
      <view class="py-3 text-gray-800 text-base">{{
        content + content + content + content
      }}</view>
      <view class="flex-wrapper-between">
        <view class="text-gray-400 text-sm">{{ fromNow }}</view>
        <view class="flex-wrapper-between text-black text-base">
          <u-icon name="thumb-up" color="#000000" size="23"></u-icon>
          <text>赞</text>
        </view>
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
    id: Number,
    userId: Number,
    nickname: String,
    avatar: String,
    content: String,
    createTime: Number,
    updateTime: Number,
  },
  computed: {
    fromNow: function () {
      return uni.$u.timeFrom(this.updateTime);
    },
  },
};
</script>
