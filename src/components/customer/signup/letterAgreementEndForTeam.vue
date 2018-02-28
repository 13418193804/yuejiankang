<template>
  <div class="content-wrapper">
    <div class="content-first">
      <div>
      <p style="font-size:1.0rem">您的检测医院为:</p>
      <p style="font-size:1.0rem;margin-top:10px;">{{teamName}}</p>
      </div>
    </div>
    <div class="bottom-btn-place-wrapper">
    </div>
    <div class="bottom-btn-wrapper">
      <x-button text="开始预约" class="custom-primary-button" @click.native="gotoNext()">
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
      teamName:this.$route.query.hospital_name
    };
  },
  computed: {},
  methods: {
    gotoNext() {
      if (this.$route.query.order_id && this.$route.query.user_id) {
        let params = {};
        params.order_id = this.$route.query.order_id;
        params.user_id = this.$route.query.user_id;
        params.team_id = this.$route.query.team_id;
        params.hospital_id = this.$route.query.hospital_id;
        params.hospital_name = this.$route.query.hospital_name;
        this.$router.push({
          name: "teamAppointmentChooseDate",
          query: params
        });
      } else {
      }
    }
  }
};
</script>
<style lang="less" scoped>
.content-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
}

.top-title {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 25px;
}

.content-first {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 20px;
}
</style>
