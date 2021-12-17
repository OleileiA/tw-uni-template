<template>
  <!-- 固定容器 -->
  <view class="fixed w-screen h-screen top-0 left-0">
    <!-- 背景  -->
    <view
      v-if="richTextObj"
      class="absolute w-full top-0 bottom-0 bg-fixed bg-no-repeat bg-cover"
      :style="{ backgroundImage: 'url(' + richTextObj.background + ')' }"
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
      <view>
        <u-parse :content="content"></u-parse>
      </view>

      <comment-wrapper :comment-count="commentsNum">
        <template slot="body">
          <comment-entry :avatar="userInfo.avatar"></comment-entry>
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
          ></comment-unit>
          <text-guide-bar
            color="#F4350B"
            text="下载拾趣云，查看更多评论"
          ></text-guide-bar>
        </template>
      </comment-wrapper>
    </view>
  </view>
</template>
<script>
import { mapState } from "vuex";
import { getWorksById } from "../../api";
import puzzleRichText from "../../common/mixins/puzzleRichText";
import CommentEntry from "../../components/comment/CommentEntry";
import CommentWrapper from "../../components/comment/CommentWrapper";
import CommentUnit from "../../components/comment/CommentUnit";
import TextGuideBar from "../../components/guide/TextGuideBar";
import AudioController from "../../components/audio/AudioController";
import CustomHead1 from "../../components/customHead/CustomHead1";
import uParse from "uview-ui/components/u-parse/u-parse";

export default {
  components: {
    CommentWrapper,
    CommentEntry,
    CommentUnit,
    TextGuideBar,
    AudioController,
    CustomHead1,
    uParse,
  },
  mixins: [puzzleRichText],
  data: function () {
    return {
      richTextObj: null,
      comments: [],
      commentsNum: 0,
      user: null,
      music: null,
      visitNum: 0,
      content: "",
    };
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  async onLoad() {
    await this.getWorksById();
  },
  methods: {
    async getWorksById(id = 268703) {
      const { content, comments, commentsNum, user, music, visitNum } =
        await getWorksById({ id });
      this.richTextObj = JSON.parse(content);
      this.comments = comments;
      this.commentsNum = commentsNum;
      this.user = user;
      this.music = music;
      this.visitNum = visitNum;
      this.content = this.puzzleContent(this.richTextObj.contents);
    },
  },
};
</script>
