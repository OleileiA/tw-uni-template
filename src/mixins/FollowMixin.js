import { sqyFollow, sqyUnfollow } from '../api';

export default {
  data() {
    return {
      followed: false
    }
  },
  methods: {
    updateFollowed(bool) {
      this.followed = bool;
    },
    async clickFollow(userId, followStatus) {
      const _this = this;
      if (followStatus) {
        uni.showModal({
          title: "取消关注",
          content: "是否取消关注？",
          async success(e) {
            if (e.confirm) {
              await _this.unFollow(userId);
            }
          }
        })
      } else {
        await this.follow(userId);
      }
    },
    async follow(userId) {
      console.log('userId', userId);
      const res = await sqyFollow({ userId });
      console.log('follow follow follow', res);
    },
    async unFollow(userId) {
      const res = await sqyUnfollow({ userId });
      if (res.code === 200) {
        this.updateFollowed(false);
      }
    },
  }
}
