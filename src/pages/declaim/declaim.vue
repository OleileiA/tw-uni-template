<template>
  <view>
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
      </template>
    </comment-wrapper>
  </view>
</template>
<script>
import { mapState } from "vuex";
import { getWorksById } from "../../api";
import CommentEntry from "../../components/CommentEntry";
import CommentWrapper from "../../components/CommentWrapper";
import CommentUnit from "../../components/CommentUnit";

export default {
  components: {
    CommentWrapper,
    CommentEntry,
    CommentUnit,
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
    async getWorksById(id = 261511) {
      const { comments, commentsNum } = await getWorksById({ id });
      this.comments = comments;
      this.commentsNum = commentsNum;
    },
  },
};
</script>
