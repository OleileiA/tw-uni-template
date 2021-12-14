<template>
  <view class="relative w-full p-std box-border">
    <slot name="header"></slot>
    <view>
      <text class="text-lg font-semibold">精彩评论</text>
      <text class="pl-1 text-std" v-if="commentCount > 0">{{
        commentCount
      }}</text>
    </view>
    <slot name="body"></slot>
    <slot name="footer"></slot>
  </view>
</template>
<script>
export default {
  props: {
    commentCount: Number,
  },
};
</script>
