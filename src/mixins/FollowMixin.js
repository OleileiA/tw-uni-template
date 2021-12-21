import { sqyFollow, sqyUnfollow } from '../api';

export default {
  data() {
    return {
    }
  },
  methods: {
    async clickFollow(userId, followStatus) {
      console.log(
          'clickFollow',
          userId,
          followStatus
      );
    },
    async follow(userId) {
      console.log('userId', userId);
      const res = await sqyFollow({ userId });
      console.log(res);
    },
    async unFollow(userId) {
      const res = await sqyUnfollow({ userId });
      console.log("unFollow", res);
    },
  }
}
