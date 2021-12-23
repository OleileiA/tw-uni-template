<template>
  <!-- 固定容器 -->
  <view class="fixed w-screen h-screen top-0 left-0">
    <!-- 背景  -->
    <view
      v-if="richTextObj"
      class="absolute w-full top-0 bottom-0 bg-fixed bg-no-repeat bg-cover"
      :style="{
        backgroundImage: 'url(' + backgroundImg + ')',
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
        <!--   下载引导   -->
        <view class="sticky top-0 left-0 w-full h-15d5 z-10">
          <down-load-guide
            @clickOpenNow="openApp"
            :avatar="user.avatarUrl"
            :nickname="user.nickname"
            desc="观看更多内容精彩打开拾趣云"
            custom-avatar="rounded-full"
          ></down-load-guide>
        </view>
        <!--   自定义头部   -->
        <view class="pt-8d75 pb-std">
          <custom-head-1
            :avatar="user.avatarUrl"
            :nickname="user.nickname"
            :followed="followed || false"
            :title="music.title"
            :created-at="music.createdAt"
            :read-num="visitNum"
            :author="music.singer"
            :title-color="titleFontColor"
            :sub-title-color="subtitleFontColor"
            @clickFollow="clickFollow(user.rrjUserId, followed)"
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
        <!--   鲜花    -->
        <view class="px-std mb-std">
          <send-follow-guide-bar
            v-if="sendFlowerUsers && sendFlowerUsers.length"
            :flower-sender="sendFlowerUsers"
            :flower-num="flowerNum"
          >
          </send-follow-guide-bar>
        </view>
        <!--   用户信息    -->
        <view class="px-std">
          <user-info-guide-bar
            :avatar="user.avatarUrl"
            :nickname="user.nickname"
            :followed="followed || false"
            nickname-color="#fff"
            @clickFollow="clickFollow(user.rrjUserId, followed)"
          >
            <template slot="info-bottom">
              <view class="text-gray-200 text-sm">
                <text>粉丝 {{ user.fansCount }}</text>
                <text class="pl-5">作品 {{ user.drawCount }}</text>
              </view>
            </template>
          </user-info-guide-bar>
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
        <!--    评论    -->
        <comment-wrapper :comment-count="commentsNum" main-color="#fff">
          <template slot="body">
            <comment-unit
              v-for="item in comments"
              :key="item.id"
              :id="item.id"
              :user-id="item.rrjUserId"
              :nickname="item.nickname"
              :avatar="item.avatar"
              :content="item.comment"
              :create-time="item.createdAt"
              :update-time="item.updatedAt"
              :with-border-bottom="false"
              main-color="#fff"
              sub-color="rgba(255, 255, 255, 0.7)"
              @clickCommentPraise="openApp"
              @clickCommentReply="openApp"
            ></comment-unit>
          </template>
        </comment-wrapper>
        <!--  更多内容     -->
        <more-content
          v-if="moreContent && moreContent.length"
          :more-content="moreContent"
        ></more-content>
      </mescroll-body>
      <!--   右侧操作栏   -->
      <view class="fixed w-13 right-std bottom-40">
        <column-options
          :show-gift="true"
          @clickGift="openApp"
          @clickComment="openApp"
          @clickPraise="openApp"
          @clickShare="toggleShareGuide"
        ></column-options>
      </view>
      <!--   底部大按钮   -->
      <view class="fixed l-0 b-0 w-full bottom-0" @click="openApp">
        <large-btn btn-text="我也要读"></large-btn>
      </view>
    </view>
    <!--  分享引导  -->
    <share-guide :show="showShareGuide" @click.native="toggleShareGuide">
    </share-guide>
  </view>
</template>
<script>
import { mapState } from "vuex";
import { getWorksById, getFollowsRankList, getMoreContent } from "../../api";
import MainStyleMixin from "../../mixins/MainStyleMixin";
import MescrollMixin from "mescroll-uni/mescroll-mixins";
import PuzzleRichTextMixin from "../../mixins/PuzzleRichTextMixin";
import FollowMixin from "../../mixins/FollowMixin";
import ShareMixin from "../../mixins/ShareMixin";
import OpenAppMixin from "../../mixins/OpenAppMixin";

import CommentWrapper from "../../components/comment/CommentWrapper";
import CommentUnit from "../../components/comment/CommentUnit";
import AudioController from "../../components/audio/AudioController";
import CustomHead1 from "../../components/customHead/CustomHead1";
import uParse from "uview-ui/components/u-parse/u-parse";
import MescrollBody from "mescroll-uni/mescroll-body";
import UserInfoGuideBar from "../../components/guide/UserInfoGuideBar";
import WechatShare from "../../components/share/WechatShare";
import TimelineShare from "../../components/share/TimelineShare";
import LargeBtn from "../../components/guide/LargeBtn";
import ColumnOptions from "../../components/guide/ColumnOptions";
import MoreContent from "../../components/content/MoreContent";
import SendFollowGuideBar from "../../components/guide/SendFollowGuideBar";
import ShareGuide from "../../components/share/ShareGuide";
import DownLoadGuide from "../../components/guide/DownLoadGuide";

export default {
  components: {
    DownLoadGuide,
    ShareGuide,
    SendFollowGuideBar,
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
    MoreContent,
  },
  mixins: [
    PuzzleRichTextMixin,
    MescrollMixin,
    MainStyleMixin,
    FollowMixin,
    ShareMixin,
    OpenAppMixin,
  ],
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
      moreContent: [],
      flowerNum: 0,
      sendFlowerUsers: [],
    };
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  async onLoad() {
    this.getQueryParameter({
      idKey: "declaimId",
    });
    this.getFollowRankList(this.id);
    await this.getWorksById(this.id);
    await this.getMoreContent();
    this.initWxShare({
      title: this.music.title,
      link: window.location.href,
      imgUrl: this.music.cover,
      desc: "一起来朗诵吧！",
    });
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
        flowerNum,
      } = await getWorksById({ id });
      if (template) {
        // 带有template表示带有模板
        this.richTextObj = JSON.parse(content);
        console.log('this.richTextObj', this.richTextObj);
        this.comments = comments;
        this.commentsNum = commentsNum;
        this.user = user;
        this.music = music;
        this.visitNum = visitNum;
        this.flowerNum = flowerNum;
        this.content = this.puzzleContent(this.richTextObj.contents);
        this.genMainStyle({
          type: "declaim",
          mainStyle: this.richTextObj.template.mainStyle,
        });
        this.updateFollowed(user.followed);
      } else {
        // 最普通的模板
      }
    },
    async getFollowRankList(id = 268703) {
      const res = await getFollowsRankList({ drawId: id });
      if (res?.length) {
        this.sendFlowerUsers = res;
      }
    },
    async getMoreContent() {
      console.log("this.user", this.user);
      const res = await getMoreContent({
        userId: this.user.id,
        rows: 6,
        type: 5,
      });
      if (res?.length) {
        this.$set(this.moreContent, 0, res.slice(0, 3));
        this.$set(this.moreContent, 1, res.slice(3, 6));
      }
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
