<template>
  <!-- 固定容器 -->
  <view class="fixed w-screen h-screen top-0 left-0">
    <!-- 背景  -->
    <view
      v-if="richTextObj"
      class="absolute w-full top-0 bottom-0 bg-fixed bg-no-repeat bg-cover"
      :style="{
        backgroundImage: 'url(' + richTextObj.background + ')',
        backgroundColor: backgroundColor,
      }"
    >
      <mescroll-body
        class="overflow-scroll"
        ref="mescrollRef"
        @init="mescrollInit"
        @down="downCallback"
        @up="upCallback"
        :down="downOption"
      >
        <!--   自定义头部   -->
        <view class="pt-8d75 pb-std">
          <custom-head-1
            :avatar="user.avatarUrl"
            :nickname="user.nickname"
            :followed="user.followed"
            :title="music.title"
            :created-at="music.createdAt"
            :read-num="visitNum"
            :author="music.singer"
            :title-color="titleFontColor"
            :sub-title-color="subtitleFontColor"
          ></custom-head-1>
        </view>
        <!--   音频播放器   -->
        <view class="relative p-std">
          <audio-controller
            :cover="richTextObj.audio.cover"
            :title="richTextObj.audio.title"
            :src="richTextObj.audio.src"
          ></audio-controller>
        </view>
        <!--  富文本   -->
        <view :style="{ color: textFontColor, padding: padding }">
          <u-parse :content="content"></u-parse>
        </view>
        <!--   用户信息    -->
        <view class="px-std">
          <user-info-guide-bar
            :avatar="user.avatarUrl"
            :nickname="user.nickname"
            :fans="user.fansCount"
            :works="user.drawCount"
            :followed="user.followed"
          ></user-info-guide-bar>
        </view>
        <!--   share     -->
        <view class="p-std">
          <view class="mb-std text-white text-base text-center text-opacity-70">
            创作不易快来分享支持一下
          </view>
          <view class="flex-wrapper-around">
            <wechat-share></wechat-share>
            <timeline-share></timeline-share>
          </view>
        </view>
        <comment-wrapper :comment-count="commentsNum" main-color="#fff">
          <template slot="body">
            <comment-unit
              v-for="(item, index) in comments"
              :key="item.id"
              :id="item.id"
              :user-id="item.rrjUserId"
              :nickname="item.nickname"
              :avatar="item.avatar"
              :content="item.comment"
              :create-time="item.createdAt"
              :update-time="item.updatedAt"
              :with-border-bottom="index !== comments.length - 1"
              main-color="#fff"
              sub-color="rgba(255, 255, 255, 0.7)"
            ></comment-unit>
          </template>
        </comment-wrapper>
        <!--    更多内容    -->
        <view class="flex-wrapper-between flex-wrap p-std bg-white rounded-t-2xl">
          <view class="text-dark text-20 font-medium pb-std">Ta的其他作品</view>
          <u-row class=" w-full mb-std" justify="start" v-for="(item, index) in moreContent" :key="index">
            <u-col span="4" v-for="in_item in item" :key="in_item.id">
              <content-card class="inset-0 m-auto" :cover="in_item.background" :title="in_item.music.title">
              <template slot="card-bottom">
                <view class="flex-wrapper-between justify-start">
                  <image class="w-3d5 h-3d5" src="../../static/images/airpod.png"></image>
                  <view class="pl-1 text-gray-400 text-sm">{{in_item.music.drawingCount}}</view>
                </view>
              </template>
            </content-card>
            </u-col>
          </u-row>
        </view>
      </mescroll-body>
      <!--   右侧操作栏   -->
      <view class="fixed w-13 right-std bottom-40">
        <column-options></column-options>
      </view>
      <!--   底部大按钮   -->
      <view class="fixed l-0 b-0 w-full bottom-0">
        <large-btn btn-text="我也要读"></large-btn>
      </view>
    </view>
  </view>
</template>
<script>
import { mapState } from "vuex";
import { getWorksById, getFollowsRankList, getMoreContent } from "../../api";
import MainStyleMixin from "../../mixins/MainStyleMixin";
import MescrollMixin from "mescroll-uni/mescroll-mixins";
import PuzzleRichTextMixin from "../../mixins/PuzzleRichTextMixin";
import CommentWrapper from "../../components/comment/CommentWrapper";
import CommentUnit from "../../components/comment/CommentUnit";
import AudioController from "../../components/audio/AudioController";
import CustomHead1 from "../../components/customHead/CustomHead1";
import uParse from "uview-ui/components/u-parse/u-parse";
import MescrollBody from "mescroll-uni/mescroll-body";
import UserInfoGuideBar from "../../components/guide/UserInfoGuideBar";
import WechatShare from "../../components/share/WechatShare";
import TimelineShare from "../../components/share/TimelineShare";
import LargeBtn from '../../components/guide/LargeBtn';
import ColumnOptions from '../../components/guide/ColumnOptions';
import ContentCard from '../../components/ContentCard/ContentCard';
import uRow from 'uview-ui/components/u-row/u-row';
import uCol from 'uview-ui/components/u-col/u-col';

export default {
  components: {
    CommentWrapper,
    CommentUnit,
    AudioController,
    CustomHead1,
    uParse,
    MescrollBody,
    UserInfoGuideBar,
    WechatShare,
    TimelineShare,
    LargeBtn,
    ColumnOptions,
    ContentCard,
    uRow,
    uCol,
  },
  mixins: [PuzzleRichTextMixin, MescrollMixin, MainStyleMixin],
  data: function () {
    return {
      downOption: {
        use: false, // 禁止下拉
      },

      richTextObj: null,
      comments: [],
      commentsNum: 0,
      user: null,
      music: null,
      visitNum: 0,
      content: "",
      moreContent: []
    };
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  async onLoad() {
    this.getFollowRankList();
    await this.getWorksById();
    await this.getMoreContent();
  },
  methods: {
    async getWorksById(id = 268703) {
      const {
        template,
        content,
        comments,
        commentsNum,
        user,
        music,
        visitNum,
      } = await getWorksById({ id });
      if (template) {
        // 带有template表示带有模板
        this.richTextObj = JSON.parse(content);
        this.comments = comments;
        this.commentsNum = commentsNum;
        this.user = user;
        this.music = music;
        this.visitNum = visitNum;
        this.content = this.puzzleContent(this.richTextObj.contents);
        this.genMainStyle({
          type: "declaim",
          mainStyle: this.richTextObj.template.mainStyle,
        });
        console.log("richTextObj richTextObj richTextObj", JSON.parse(content));
      } else {
        // 最普通的模板
      }
    },
    async getFollowRankList(id = 268703) {
      const res = await getFollowsRankList({ drawId: id });
      console.log("getFollowRankList", res);
    },
    async getMoreContent() {
      const res = await getMoreContent({
        userId: this.user.id,
        rows: 6,
        type: 5
      });
      if (res?.length) {
        this.$set(this.moreContent, 0, res.slice(0, 3));
        this.$set(this.moreContent, 1, res.slice(3, 6));
      }
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
