<template>
  <view :style="{ backgroundColor: bg }"
        class="rounded overflow-hidden">
    <custom-audio
      :title="title"
      :cover="cover"
      :playing="playing"
      :value="value"
      :cur-time="curTime"
      :tol-time="tolTime"
      :textColor="textColor"
      @clickPlay="playAudio"
      @clickPause="pauseAudio"
      @sliderChange="sliderChange"
      @sliderChanging="sliderChanging"
    ></custom-audio>
  </view>
</template>
<script>
import Audio from "./Audio";
import { secFormatTime } from "../../common/util";

let audioContext;

export default {
  components: {
    "custom-audio": Audio,
  },
  props: {
    title: String,
    cover: String,
    src: String,
    bg: String,
    textColor: String
  },
  data() {
    return {
      playing: false,
      value: 0,
      curTime: "00:00",
      tolTime: "00:00",
    };
  },
  methods: {
    initAudio() {
      audioContext = uni.createInnerAudioContext();
      audioContext.src = this.src;
      audioContext.onPlay(() => {
        this.playing = true;
        this.tolTime = secFormatTime(audioContext.duration);
      });
      audioContext.onPause(() => {
        this.playing = false;
      });
      audioContext.onEnded(() => {
        this.playing = false;
        this.curTime = "00:00";
        this.value = 0;
      });
      audioContext.onTimeUpdate(() => {
        // #ifdef H5
        // #endif
        this.curTime = secFormatTime(audioContext.currentTime);
        this.value = parseInt(
          (audioContext.currentTime / audioContext.duration) * 100
        );
      });

      // 延迟初始化时间
      setTimeout(() => {
        this.tolTime = secFormatTime(audioContext.duration);
      }, 1000);
    },
    playAudio() {
      audioContext.play();
    },
    pauseAudio() {
      audioContext.pause();
    },
    sliderChange(e) {
      if (audioContext) {
        const value = e.detail.value;
        audioContext.seek((value / 100) * audioContext.duration);
        setTimeout(() => {
          audioContext.play();
        });
      }
    },
    sliderChanging(e) {
      // TODO 节流
      if (audioContext) {
        if (this.playing) audioContext.pause();
        const value = e.detail.value;
        this.curTime = secFormatTime((value / 100) * audioContext.duration);
      }
    },
  },
  mounted() {
    this.initAudio();
  },
};
</script>
