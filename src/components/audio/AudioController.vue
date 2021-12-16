<template>
  <view>
    <custom-audio
      :title="title"
      :cover="cover"
      :playing="playing"
      :cur-time="curTime"
      :tol-time="tolTime"
      @clickPlay="playAudio"
      @clickPause="pauseAudio"
    ></custom-audio>
  </view>
</template>
<script>
import Audio from "./Audio";

let innerAudioContext;

export default {
  components: {
    "custom-audio": Audio,
  },
  props: {
    title: String,
    cover: String,
    src: String,
  },
  data() {
    return {
      playing: false,
      curTime: "00:00",
      tolTime: "00:00",
    };
  },
  methods: {
    initAudio() {
      innerAudioContext = uni.createInnerAudioContext();
      innerAudioContext.volume = 0;
      // innerAudioContext.src = this.src;
      innerAudioContext.src =
        "https://cdn-hz.renrenjiang.cn/shiquyun/uploads/songs/12e846971d6e47eaa6e18e6d15d1c81c.mp3";
      innerAudioContext.onPlay(() => {
        console.log("开始播放");
        this.playing = true;
      });
      innerAudioContext.onPause(() => {
        this.playing = false;
      });
      innerAudioContext.onEnded(() => {
        this.playing = false;
      });
      innerAudioContext.onError((res) => {
        console.log(res.errMsg);
        console.log(res.errCode);
      });
      innerAudioContext.onTimeUpdate((timeupdate) => {
        console.log("res", timeupdate);
      });
      console.log("innerAudioContext", innerAudioContext);
      // this.tolTime = innerAudioContext.duration;
    },
    playAudio() {
      innerAudioContext.play();
    },
    pauseAudio() {
      innerAudioContext.pause();
    },
  },
  mounted() {
    this.initAudio();
  },
};
</script>
