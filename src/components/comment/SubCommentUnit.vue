<template>
  <view class="flex-wrapper-between text-base text-themeDark">
    <view class="">{{nickname}}</view>
    <view v-if="refer">
      <text class="px-1 text-sm text-blue-600">回复</text>
      <text>{{refer}}:</text>
    </view>
    <view v-else>:</view>
    <view class="flex-auto w-0 pl-2 line1-overflow">{{comment}}</view>
  </view>
</template>
<script>
export default {
  props: {
    nickname: String,
    refer: String,
    comment: String
  }
}
</script>
