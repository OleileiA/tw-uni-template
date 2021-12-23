<template>
  <view
    class="relative flex-wrapper-between items-start"
    :style="{ color: mainColor }"
  >
    <slot name="unit-slot"></slot>
    <!--  左半区  -->
    <view class="relative flex-none w-8d5 h-full py-3 box-border">
      <slot name="left-slot"></slot>
      <view class="relative w-8d5 h-8d5 rounded-full overflow-hidden">
        <img :src="avatar" alt="头像" class="w-full h-full" />
        <slot name="avatar-slot"></slot>
      </view>
    </view>
    <!--  右半区  -->
    <view
      class="relative flex-auto pl-2d5 py-std box-border"
      :class="{ 'border-bottom': withBorderBottom }"
    >
      <slot name="right-slot"></slot>
      <view class="text-base" :style="{ color: subColor }">{{ nickname }}</view>
      <view class="py-3 text-base">{{ content }}</view>
      <view class="flex-wrapper-between">
        <view class="flex-1 text-sm" :style="{ color: subColor }">{{
          fromNow
        }}</view>
        <view class="w-1s2 flex-none flex-wrapper-between">
          <view
            class="flex-wrapper-between text-base"
            @click="clickCommentReply"
          >
            <u-icon name="more-circle" :color="mainColor" size="23"></u-icon>
            <text>回复</text>
          </view>
          <view
            class="flex-wrapper-between text-base"
            @click="clickCommentPraise"
          >
            <u-icon name="thumb-up" :color="mainColor" size="23"></u-icon>
            <text>{{ praiseCount || "赞" }}</text>
          </view>
        </view>
      </view>
      <slot name="sub-comment"></slot>
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
    mainColor: String,
    subColor: String,
    praiseCount: {
      type: Number,
      default: 0,
    },
    withBorderBottom: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    fromNow: function () {
      return uni.$u.timeFrom(this.updateTime);
    },
  },
  methods: {
    clickCommentReply() {
      this.$emit("clickCommentReply");
    },
    clickCommentPraise() {
      this.$emit("clickCommentPraise");
    },
  },
};
</script>
<style>
.border-bottom {
  border: 0 solid;
  @apply border-b border-gray-200;
}
</style>
