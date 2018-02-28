<template>
  <div class="content-wrapper">
    <div class="top-title">
      <p style="font-size:1.0rem;color:#71a0d1">本报名流程适⽤于以下街道的50-74岁居⺠</p>
    </div>
    <div class="content-first">
      <div v-for="(item,index) in streetList"
           @click="onItemClick(item.street_id,index)" :key="index" class="menu-item">{{item.street_name}}
      </div>
    </div>
  </div>
</template>
<script>
  import webconfig from "@/common/webconfig";
  import {XButton} from "vux";

  export default {
    components: {
      XButton
    },
    data() {
      return {
        streetList: []
      };
    },

    computed: {},
    created() {
      let that = this;
      let url = webconfig.webserverurl + "/api/street/index";//committee
      // let url = webconfig.webserverurl + "/api/committee/index?street_id=1";//committee

      this.$wrapperHttp.get(this, {}, url, function (data) {
        if (data) {
          that.streetList = data;
        }
      });
    },
    methods: {
      onItemClick(street_id, index) {
        this.$AppCacheKey.setStreetId(street_id);
        let params = {};
        params.street_id = street_id;
        //update
        this.$router.push({
          // name: "signUpForStreet",
          name: "wenQuanForCommittee",
          query: params
        });

        //  window.location.href='http://jiankang.aisimob.com/wenquan/ask.html'
        //   switch(index){
        //    case 0:
        //     this.$router.push({
        //        name: "startSignupWriteUserInfoForStreet",
        //        query:params
        //     });
        //     break;
        //    case 1:
        //     this.$router.push({
        //        name: "startSignupWriteUserInfoForStreet",
        //        query:params
        //     });
        //     break;
        //    case 2:
        //     this.$router.push({
        //        name: "startSignupWriteUserInfoForStreet",
        //        query:params
        //     });
        //     break;
        //    case 3:
        //     this.$router.push({
        //        name: "startSignupWriteUserInfoForStreet",
        //        query:params
        //     });
        //     break;
        //  }
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
    background: #ffffff;
  }

  .top-title {
    text-align: center;
    margin-top: 40px;
  }

  .content-first {
    padding: 10px;
  }

  .menu-item {
    text-align: center;
    border-radius: 15px;
    border-color: #ffffff;
    background-color: #ffffff;
    color: rgb(71, 160, 209);
    border: 1.5px solid rgb(71, 160, 209);
    font-size: 1.5rem;
    padding-top: 15px;
    padding-bottom: 15px;
    margin-top: 15px;
    margin-left: 40px;
    margin-right: 40px;
    &:active {
      color: #ffffff;
      background-color: rgb(71, 160, 209);
    }
  }
</style>
