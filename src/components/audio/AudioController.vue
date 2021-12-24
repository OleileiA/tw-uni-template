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
import AudioControllerMixin from "../../mixins/AudioControllerMixin";

export default {
  components: {
    "custom-audio": Audio,
  },
  mixins: [AudioControllerMixin]
};
</script>
