<template>
  <view class="relative w-full p-std box-border" :style="{ color: mainColor }">
    <slot name="header"></slot>
    <view class="flex-wrapper-between">
      <view class="flex-wrapper-between text-lg font-semibold">
        <u-icon name="chat" size="30" color="mainColor"></u-icon>
        <text class="pl-1">精彩评论</text>
      </view>
      <text class="pl-1 text-std" v-if="commentCount > 0">{{
        commentCount
      }}</text>
    </view>
    <slot name="body"></slot>
    <slot name="footer"></slot>
  </view>
</template>
<script>
import uIcon from "uview-ui/components/u-icon/u-icon";
export default {
  components: {
    uIcon,
  },
  props: {
    mainColor: String,
    subColor: String,
    commentCount: Number,
  },
};
</script>
