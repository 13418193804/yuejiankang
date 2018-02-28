<template>
  <div class="content-wrapper">
    <div class="content-first">
        <p>您尚未填写⾃测问卷，请填写后查看</p>
    </div>
     <div class="bottom-btn-place-wrapper">
    </div>
    <div class="bottom-btn-white-wrapper" style="background-color:#ffffff">
      <x-button text="填写问卷" class="custom-primary-button" @click.native="gotoNext()">
      </x-button>
    </div>
  </div>
</template>
<script>
import webconfig from "@/common/webconfig";
import { XButton } from "vux";
export default {
  components: {
    XButton
  },
  data() {
    return {
    };
  },
  computed: {
    uploadstatus() {}
  },
  methods: {
    gotoNext() {
    }
  }
};
</script>
<style lang="less" scoped>
.content-wrapper {
  display: flex;
  position: absolute;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.top-title {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}

.top-title-content {
  text-align: center;
}

.content-first {
  color:#515151;
  font-size: 1.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}

</style>
