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
            <down-load-cover-guide @click.native="openApp"></down-load-cover-guide>
          </view>
        </view>
        <!--   评论     -->
        <view>
          <comment-wrapper :comment-count="0" main-color="#202020">
            <template slot="body">
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
                  <view v-if="item.refer_comment_list && item.refer_comment_list.length"
                        class="mt-std p-3 bg-gray-200 box-border rounded">
                    <sub-comment-unit v-for="referComment in item.refer_comment_list"
                                      :key="referComment.id"
                                      :refer="referComment.refer"
                                      :comment="referComment.comment"
                                      :nickname="referComment.nickname">
                    </sub-comment-unit>
                    <view v-if="item.comment_count - 2 > 0"
                          class="py-1 text-gray-400 text-base"
                          @click="openApp"
                    >
                      查看{{item.comment_count - 2}}条回复>
                    </view>
                  </view>
                </template>
              </comment-unit>
            </template>
          </comment-wrapper>
        </view>
        <!--    引导下载banner    -->
        <download-banner desc="下载拾趣云，查看更多评论"
                         color="#F4350B"
                         @clickBanner="openApp"></download-banner>
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
        <download-banner desc="下载拾趣云，查看更多文章"
                         color="#F4350B"
                         @clickBanner="openApp"></download-banner>
      </mescroll-body>
    </view>
  </view>
</template>
<script>
import { mapState } from "vuex";
import { getDynamicDetail, getDynamicComments } from "../../api";
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
import CommentWrapper from '../../components/comment/CommentWrapper';
import CommentUnit from '../../components/comment/CommentUnit';
import SubCommentUnit from '../../components/comment/SubCommentUnit';
import DownloadBanner from '../../components/guide/DownloadBanner';

export default {
  components: {
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
  mixins: [PuzzleRichTextMixin, MescrollMixin, OpenAppMixin, FollowMixin],
  data: function () {
    return {
      downOption: {
        use: false, // 禁止下拉
      },
      content: "",
      exercise: {},
      customHead: 0,
      contentHeight: 579,
      comments: []
    };
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  async onLoad() {
    // 加载文章内容
    await Promise.all([
      this.getDynamicDetail(),
      this.getDynamicComment()
    ])
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
    async getDynamicComment(exercise_id = 7334) {
      const res = await getDynamicComments({
        exercise_id,
        page: 1,
        pageSize: 3
      });
      console.log('getDynamicComment', res);
      if (res.result === "ok") {
        this.formatCommentList(res.list);
      } else {
        uni.showToast({
          title: "评论加载失败"
        })
      }
    },
    formatCommentList(arr) {
      // 目前只处理评论中的文字
      this.comments = arr.map((item) => {

        // 一级评论的文字
        const content = JSON.parse(item.content);
        if (content?.length) {
          content.forEach(comment => {
            if (comment.type === "text")
              item.comment = comment.content;
          })
        }

        // 二级评论
        if (item?.refer_comment_list?.length) {
          item.refer_comment_list.forEach((refer_item) => {
            const referContent = JSON.parse(refer_item.content);
            if (referContent?.length) {
              referContent.forEach(refer_comment => {
                if (refer_comment.type === "text")
                  refer_item.comment = refer_comment.content;
                else if (refer_comment.type === "refer")
                  refer_item.refer = refer_comment.content;
              })
            }
          })
        }

        return item;
      })
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
