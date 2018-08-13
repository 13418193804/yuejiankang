<template>
  <div class="content-wrapper">
    <div class="top-title">
      <p style="font-size:1.2rem;color:#71a0d1">请选择相应的居委会选项</p>
    </div>
    <div class="content-first">
      <div v-for="(item,index) in committeeList"
           @click="onItemClick(item.committee_id,index)" :key="index" class="menu-item">{{item.committee_name}}
      </div>
    </div>
  </div>
</template>

<script>
  import webconfig from "@/common/webconfig";

  export default {
    components: {},
    data() {
      return {
        // neighborhoodNames: [{id:1,name:""}, {id:2,name:""},{id:3,name:""},{id:4,name:""}]

        committeeList: []
      };
    },
    created() {
      let that = this;
      let url = webconfig.webserverurl + "/api/committee/index?street_id="+this.$route.query.street_id;
      //如果street_id == 0
      //for(var i =0 ;i<committeeList.length;i++)
      this.$wrapperHttp.get(this, {}, url, function (data) {
        if (data) {
          that.committeeList = data;
        }

      });
    },
    methods: {
      onClickNeighborhood(neighborhoodName, index) {
        this.$AppCacheKey.setNeighborhoodId(index + 1);
        let params = {};
        params.neighborhood_id = index + 1;
        this.$router.push({
          name: "signUpForStreet",
          query: params
        });
      },
      onItemClick(committee_id, index) {

        this.$AppCacheKey.setCommitteeId(committee_id);
        let params = {committee_id:0};
        params.committee_id = committee_id;
        sessionStorage.committee_id =committee_id;
      //alert(JSON.stringify(params));
        //update
        this.$router.push({
          name: "signUpForStreet",
          // name: "wenQuanForCommittee",
          query: params
        });
      }
    }
  };
</script>

<style lang="less">
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
