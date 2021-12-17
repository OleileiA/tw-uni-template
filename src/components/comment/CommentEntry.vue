<template>
  <view class="relative flex-wrapper-between py-std box-border">
    <slot name="entry-slot"></slot>
    <view class="relative flex-none w-8d5 h-8d5 rounded-full overflow-hidden">
      <img :src="avatar" alt="头像" class="w-full h-full" />
      <slot name="avatar-slot"></slot>
    </view>
    <view
      class="flex-wrapper-between flex-auto h-8d5 ml-3 px-std bg-gray-100 rounded-4xl"
    >
      <view class="text-gray-500 text-lg"> 发表你的感想吧... </view>
      <view>
        <u-icon name="edit-pen" color="#8B8B8B" size="28"></u-icon>
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
    avatar: String,
  },
};
</script>
