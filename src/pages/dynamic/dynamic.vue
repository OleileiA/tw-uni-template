<template>
  <!-- 固定容器 -->
  <view class="fixed w-screen h-screen top-0 left-0">
    <view
      v-if="exercise.id"
      class="absolute w-full top-0 bottom-0 bg-fixed bg-no-repeat bg-cover"
    >
      <mescroll-body
        class="w-full overflow-scroll"
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
        <template v-if="type === 2">
          <!--   head     -->
          <view
            v-if="customHead === 0"
            class="p-std pb-0 text-themeDark text-5 font-semibold line2-overflow break-all"
          >
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
          <view
            id="contentWrapper"
            class="relative px-std box-border overflow-hidden"
            :style="{ height: contentHeight + 'px' }"
          >
            <u-parse :content="content"></u-parse>
            <view class="absolute left-0 bottom-0 w-full">
              <down-load-cover-guide
                @click.native="openApp"
              ></down-load-cover-guide>
            </view>
          </view>
        </template>
        <template v-else-if="type === 1">
          <swiper v-if="images.length"
                  :autoplay="false"
                  :indicator-dots="true"
                  indicator-active-color="rgb(250, 93, 92)"
                  indicator-color="rgb(221, 222, 224)"
                  :duration="500"
                  :style="{ height: (maxHeight + 30) + 'px' }">
            <swiper-item v-for="item in images" :key="item">
              <image :src="item" class="w-full h-full"
                     mode="aspectFill"></image>
            </swiper-item>
          </swiper>
          <view class="p-std text-xl font-semibold text-themeDark">{{exercise.title}}</view>
          <view class="px-std text-textDarkTheme text-base">
            <view v-for="item in texts" :key="item">{{item}}</view>
          </view>
          <view class="p-std" v-if="audio">
            <audio-controller bg="rgba(209, 213, 219, 1)"
                              text-color="#202020"
                              cover="../../static/images/sqy_icon.png"
                              title="录音"
                              :src="audio"></audio-controller>
          </view>
        </template>
        <!--   评论     -->
        <view v-if="comments.length">
          <comment-wrapper :comment-count="0" main-color="#202020">
            <template slot="body">
              <comment-entry :avatar="userInfo.avatar"></comment-entry>
              <comment-unit
                v-for="item in comments"
                :key="item.id"
                :id="item.id"
                :user-id="item.user_id"
                :nickname="item.nickname"
                :avatar="item.avatar"
                :content="item.comment"
                :create-time="item.createdAt"
                :update-time="item.updatedAt"
                :with-border-bottom="false"
                main-color="#202020"
                sub-color="#818181"
                :praise-count="item.praise_count"
                @clickCommentPraise="openApp"
                @clickCommentReply="openApp"
              >
                <template slot="sub-comment">
                  <view
                    v-if="
                      item.refer_comment_list && item.refer_comment_list.length
                    "
                    class="mt-std p-3 bg-gray-200 box-border rounded"
                  >
                    <sub-comment-unit
                      v-for="referComment in item.refer_comment_list"
                      :key="referComment.id"
                      :refer="referComment.refer"
                      :comment="referComment.comment"
                      :nickname="referComment.nickname"
                    >
                    </sub-comment-unit>
                    <view
                      v-if="item.comment_count - 2 > 0"
                      class="py-1 text-gray-400 text-base"
                      @click="openApp"
                    >
                      查看{{ item.comment_count - 2 }}条回复>
                    </view>
                  </view>
                </template>
              </comment-unit>
            </template>
          </comment-wrapper>
        </view>
        <!--    引导下载banner    -->
        <download-banner
            v-if="comments.length"
          desc="下载拾趣云，查看更多评论"
          color="#F4350B"
          @clickBanner="openApp"
        ></download-banner>
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
        <!--    引导下载banner    -->
        <download-banner
          desc="下载拾趣云，查看更多文章"
          color="#F4350B"
          @clickBanner="openApp"
        ></download-banner>
      </mescroll-body>

      <!--  侧边栏   -->
      <view class="fixed w-13 right-std bottom-40">
        <column-options
          :show-gift="false"
          @clickGift="openApp"
          @clickComment="openApp"
          @clickPraise="openApp"
          @clickShare="toggleShareGuide"
        >
        </column-options>
      </view>
      <!--  分享引导  -->
      <share-guide :show="showShareGuide" @click.native="toggleShareGuide">
      </share-guide>
    </view>
  </view>
</template>
<script>
import { mapState } from "vuex";
import { getDynamicDetail, getDynamicComments } from "../../api";
import uParse from "uview-ui/components/u-parse/u-parse";
import PuzzleRichTextMixin from "../../mixins/PuzzleRichTextMixin";
import MescrollMixin from "mescroll-uni/mescroll-mixins";
import MescrollBody from "mescroll-uni/mescroll-body";
import OpenAppMixin from "../../mixins/OpenAppMixin";
import DownLoadGuide from "../../components/guide/DownLoadGuide";
import UserInfoGuideBar from "../../components/guide/UserInfoGuideBar";
import FollowMixin from "../../mixins/FollowMixin";
import DownLoadCoverGuide from "../../components/guide/DownLoadCoverGuide";
import CommentWrapper from "../../components/comment/CommentWrapper";
import CommentUnit from "../../components/comment/CommentUnit";
import SubCommentUnit from "../../components/comment/SubCommentUnit";
import DownloadBanner from "../../components/guide/DownloadBanner";
import ColumnOptions from "../../components/guide/ColumnOptions";
import ShareMixin from "../../mixins/ShareMixin";
import ShareGuide from "../../components/share/ShareGuide";
import CommentEntry from "../../components/comment/CommentEntry";
import DynamicType1Mixin from "../../mixins/DynamicType1Mixin";
import DynamicType2Mixin from "../../mixins/DynamicType2Mixin";
import AudioController from '../../components/audio/AudioController';

export default {
  components: {
    AudioController,
    CommentEntry,
    ShareGuide,
    ColumnOptions,
    DownloadBanner,
    SubCommentUnit,
    CommentWrapper,
    CommentUnit,
    DownLoadCoverGuide,
    MescrollBody,
    uParse,
    DownLoadGuide,
    UserInfoGuideBar,
  },
  mixins: [
    PuzzleRichTextMixin,
    MescrollMixin,
    OpenAppMixin,
    FollowMixin,
    ShareMixin,
    DynamicType1Mixin,
    DynamicType2Mixin,
  ],
  data: function () {
    return {
      downOption: {
        use: false, // 禁止下拉
      },
      exercise: {},
      comments: [],
    };
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  async onLoad() {
    this.getQueryParameter({
      idKey: "dynamicId",
    });
    // 加载文章内容
    await Promise.all([
      this.getDynamicDetail(this.id),
      this.getDynamicComment(this.id),
    ]);
    // 处理位置信息
    this.$nextTick(() => {
      this.calContentDomInfo();
    });
  },
  // 7334 / 7492
  methods: {
    async getDynamicDetail(exercise_id = 7334, label) {
      const data = await getDynamicDetail({ exercise_id, label });
      if (data?.id) {
        this.exercise = data;
        this.type = data.type;
        if (data.type === 2) {
          this.processRichTextDynamic(data);
        } else if (data.type === 1) {
          this.processNormalDynamic(data);
        }
      } else {
        uni.showToast({
          title: "数据获取失败",
        });
      }
    },
    async getDynamicComment(exercise_id = 7334) {
      const res = await getDynamicComments({
        exercise_id,
        page: 1,
        pageSize: 3,
      });
      console.log("getDynamicComment", res);
      if (res.result === "ok") {
        this.formatCommentList(res.list);
      } else {
        uni.showToast({
          title: "评论加载失败",
        });
      }
    },
    formatCommentList(arr) {
      // 目前只处理评论中的文字
      this.comments = arr.map((item) => {
        // 一级评论的文字
        const content = JSON.parse(item.content);
        if (content?.length) {
          content.forEach((comment) => {
            if (comment.type === "text") item.comment = comment.content;
          });
        }

        // 二级评论
        if (item?.refer_comment_list?.length) {
          item.refer_comment_list.forEach((refer_item) => {
            const referContent = JSON.parse(refer_item.content);
            if (referContent?.length) {
              referContent.forEach((refer_comment) => {
                if (refer_comment.type === "text")
                  refer_item.comment = refer_comment.content;
                else if (refer_comment.type === "refer")
                  refer_item.refer = refer_comment.content;
              });
            }
          });
        }

        return item;
      });
    },
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
