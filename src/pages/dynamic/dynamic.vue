<template>
  <!-- 固定容器 -->
  <view class="fixed w-screen h-screen top-0 left-0">
    <view
      v-if="content"
      class="absolute w-full top-0 bottom-0 bg-fixed bg-no-repeat bg-cover"
    >
      <mescroll-body
        class="overflow-scroll"
        ref="mescrollRef"
        @init="mescrollInit"
        @down="downCallback"
        @up="upCallback"
        :down="downOption"
      >
        <!--   下载引导   -->
        <view class="sticky top-0 left-0 w-full h-15d5 z-10">
          <down-load-guide
            @clickOpenNow="openApp"
            avatar="../../static/images/sqy_icon.png"
            nickname="拾趣云"
            desc="中老年的高品质生活社区"
            custom-avatar="rounded"
          ></down-load-guide>
        </view>
        <!--   head     -->
        <view
          v-if="customHead === 0"
          class="p-std pb-0 text-themeDark text-5 font-semibold line2-overflow break-all">
          {{ exercise.title }}
        </view>
        <!--   用户信息    -->
        <view>
          <user-info-guide-bar
            :avatar="exercise.avatar"
            :nickname="exercise.nickname"
            :followed="followed || false"
            @clickFollow="clickFollow(exercise.user_id, followed)"
          >
            <template slot="info-bottom">
              <view class="text-gray-400 text-sm">{{
                exercise.updated_at | date("yyyy-mm-dd")
              }}</view>
            </template>
          </user-info-guide-bar>
        </view>
        <!--   内容    -->
        <view id="contentWrapper" class="relative px-std box-border overflow-hidden" :style="{ height: contentHeight + 'px' }">
          <u-parse :content="content"></u-parse>
          <view class="absolute left-0 bottom-0 w-full">
            <down-load-cover-guide></down-load-cover-guide>
          </view>
        </view>
        <!--   评论     -->
        <view></view>
        <!--   用户信息    -->
        <view>
          <user-info-guide-bar
              :avatar="exercise.avatar"
              :nickname="exercise.nickname"
              :followed="followed || false"
              @clickFollow="clickFollow(exercise.user_id, followed)"
          >
            <template slot="info-bottom">
              <view class="text-gray-400 text-sm">{{
                  exercise.updated_at | date("yyyy-mm-dd")
                }}</view>
            </template>
          </user-info-guide-bar>
        </view>
        <!--   更多信息    -->
      </mescroll-body>
    </view>
  </view>
</template>
<script>
import { mapState } from "vuex";
import { getDynamicDetail } from "../../api";
import { getSysInfo } from '../../common/util';
import uParse from "uview-ui/components/u-parse/u-parse";
import PuzzleRichTextMixin from "../../mixins/PuzzleRichTextMixin";
import MescrollMixin from "mescroll-uni/mescroll-mixins";
import MescrollBody from "mescroll-uni/mescroll-body";
import OpenAppMixin from "../../mixins/OpenAppMixin";
import DownLoadGuide from "../../components/guide/DownLoadGuide";
import UserInfoGuideBar from "../../components/guide/UserInfoGuideBar";
import FollowMixin from "../../mixins/FollowMixin";
import DownLoadCoverGuide from '../../components/guide/DownLoadCoverGuide';

export default {
  components: {
    DownLoadCoverGuide,
    MescrollBody,
    uParse,
    DownLoadGuide,
    UserInfoGuideBar,
  },
  mixins: [PuzzleRichTextMixin, MescrollMixin, OpenAppMixin, FollowMixin],
  data: function () {
    return {
      downOption: {
        use: false, // 禁止下拉
      },
      content: "",
      exercise: {},
      customHead: 0,
      contentHeight: 579
    };
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  async onLoad() {
    // 加载文章内容
    await this.getDynamicDetail();
    // 处理位置信息
    this.$nextTick(() => {
      this.calContentDomInfo();
    })
  },
  methods: {
    async getDynamicDetail(exercise_id = 7334, label) {
      const data = await getDynamicDetail({ exercise_id, label });
      if (data?.id) {
        this.exercise = data;
        const parsedContent = JSON.parse(data.content);
        console.log("parsed", parsedContent);
        this.content = this.puzzleContent(
          parsedContent?.contents,
          parsedContent?.layout
        );

        // 判断是否有主题
        if (parsedContent?.template?.mainStyle?.templateType === 0) {
          // 无主题
          this.customHead = 0;
        } else {
          // 主题处理
          // 头部处理
          if (parsedContent?.template?.head?.customHead > 0) {
            // 自定义头部
          } else {
            // 默认头部
            this.customHead = 0;
          }
        }
      }
      else {
        uni.showToast({
          title: '数据获取失败'
        })
      }
    },

    calContentDomInfo() {
      this.$uGetRect("#contentWrapper").then(res => {
        const { windowHeight } = getSysInfo();
        this.contentHeight = windowHeight - res.top;
      })
    }
  },
};
</script>
<style>
.overflow-scroll {
  position: absolute;
  top: 0;
  bottom: 0;
  overflow: auto !important;
}
</style>
