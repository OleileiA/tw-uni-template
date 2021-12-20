<template>
  <view class="relative w-full h-16d25 px-std py-2d5 bg-white box-border">
    <view class="w-full h-full text-xl leading-11 text-white text-center
    bg-gradient-to-r from-yellow-400 to-red-500 rounded-5xl">{{ btnText }}</view>
  </view>
</template>
<script>
export default {
  props: {
    btnText: String
  }
}
</script>
