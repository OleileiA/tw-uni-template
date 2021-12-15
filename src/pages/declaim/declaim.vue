<template>
  <view class="fixed w-screen h-screen top-0 left-0">
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
          :with-border-bottom="index !== (comments.length - 1)"
        ></comment-unit>
        <text-guide-bar color="#F4350B" text="下载拾趣云，查看更多评论"></text-guide-bar>
      </template>
    </comment-wrapper>
  </view>
</template>
<script>
import { mapState } from "vuex";
import { getWorksById } from "../../api";
import CommentEntry from "../../components/comment/CommentEntry";
import CommentWrapper from "../../components/comment/CommentWrapper";
import CommentUnit from "../../components/comment/CommentUnit";
import TextGuideBar from '../../components/guide/TextGuideBar';

export default {
  components: {
    CommentWrapper,
    CommentEntry,
    CommentUnit,
    TextGuideBar
  },
  data: function () {
    return {
      comments: [],
      commentsNum: 0,
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
      const { comments, commentsNum } = await getWorksById({ id });
      this.comments = comments;
      this.commentsNum = commentsNum;
    },
  },
};
</script>
