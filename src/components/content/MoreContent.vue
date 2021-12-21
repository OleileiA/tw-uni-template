<template>
  <!--    更多内容    -->
  <view class="flex-wrapper-between flex-wrap p-std bg-white rounded-t-2xl">
    <view class="text-dark text-20 font-medium pb-std">Ta的其他作品</view>
    <u-row
      class="w-full mb-std"
      justify="start"
      v-for="(item, index) in moreContent"
      :key="index"
    >
      <u-col span="4" v-for="in_item in item" :key="in_item.id">
        <content-card
          class="inset-0 m-auto"
          :cover="in_item.background"
          :title="in_item.music.title"
        >
          <template slot="card-bottom">
            <view class="flex-wrapper-between justify-start">
              <image
                class="w-3d5 h-3d5"
                src="../../static/images/airpod.png"
              ></image>
              <view class="pl-1 text-gray-400 text-sm">{{
                in_item.music.drawingCount
              }}</view>
            </view>
          </template>
        </content-card>
      </u-col>
    </u-row>
  </view>
</template>
<script>
import ContentCard from "./ContentCard";
import uRow from "uview-ui/components/u-row/u-row";
import uCol from "uview-ui/components/u-col/u-col";

export default {
  components: {
    uRow,
    uCol,
    ContentCard,
  },
  props: {
    moreContent: Array,
  },
};
</script>
