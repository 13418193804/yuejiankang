<template>
  <div class="content-wrapper" style="background:#ffffff">
    <notification :options.sync="options" :show.sync="showNotification" @close="closeNotification"></notification>
    <div class="weui-search-bar weui-search-bar_focusing" style="background-color:rgb(71,160,209)">
            <form class="weui-search-bar__form">
                <div class="weui-search-bar__box">
                    <i class="weui-icon-search"></i>
                    <input type="search" class="weui-search-bar__input" placeholder="搜索" v-model="searchTeamName">
                    <a href="javascript:" class="weui-icon-clear" @click="onClearSearch()" v-show="searchTeamName.length>0"></a>
                </div>
            </form>
            <a href="javascript:" class="weui-search-bar__cancel-btn" style="color:#ffffff"  @click="onTeamNameSearch()">搜索</a>
    </div>
    <div class="content-first">
      <vue-loading-top :size="{width: '25px', height: '25px'}" v-show="!isShowContent"></vue-loading-top>
      <div v-show="isShowContent" class="first-item-wrapper" v-for="(teamInfo,index) in teamInfos" 
          @click="onItemClick(teamInfo,index)" :key="index" :class="{'first-item-select':currentIndex === index}">
            {{teamInfo.team_name}}
      </div>
    </div>
    <div class="bottom-btn-place-wrapper">
    </div>
    <div class="bottom-btn-white-wrapper">
      <x-button text="开始预约" class="custom-primary-button" @click.native="gotoNext()">
      </x-button>
    </div>
  </div>
</template>
<script>
import webconfig from "@/common/webconfig";
import vueLoadingTop from "@/components/widget/loading/loadingTop";
import Notification from "@/components/widget/notification";
import { XButton, Selector, Popup } from "vux";
export default {
  components: {
    XButton,
    Selector,
    vueLoadingTop,
    Notification
  },
  data() {
    return {
      showNotification: false,
      options: {},
      searchTeamName: "",
      currentIndex: -1,
      isShowContent: true,
      teamInfos: [],
      selectTeam:null
    };
  },
  computed: {},
  created() {
    if(this.$AppCacheKey.getPeopleType()!=2){
        this.$router.push({
            name: "notFoundComponent",
        });
    }else{
        this.onTeamNameSearch();
    }
  },
  methods: {
    closeNotification() {
      this.showNotification = false;
    },
    onTeamNameSearch() {
      this.isShowContent = false;
      let that = this;
      let url = webconfig.webserverurl + "/api/nurse/teamList";
      var params;
      if (this.searchTeamName && this.searchTeamName.length > 0) {
        params = {
          search: this.searchTeamName
        };
      } else {
        params = {};
      }
      this.$wrapperHttp.get(this, params, url, function(data) {
        if (data) {
          var datasource = [];
          if (!(data instanceof Array)) {
            datasource.push(data);
          } else {
            datasource = data;
          }
          that.teamInfos = datasource;
          that.currentIndex = -1;
        }else{
          that.teamInfos = [];
        }
        that.isShowContent = true;
      });
    },
    onItemClick(teamInfo, index) {
      this.currentIndex = index;
      this.selectTeam = teamInfo;
    },
    onClearSearch() {
      this.searchTeamName = "";
    },
    gotoNext() {
       if (!this.selectTeam){
        this.showNotification = true;
        this.options = { 
          autoClose: true,
          backgroundColor: '#fc5050',
          content: '请先选择团队',
          showTime:1000
        };
        return;
      }
      let params = {};
      params.team_id = this.selectTeam.team_id;
      params.team_name = this.selectTeam.team_name;
      params.hospital_id = this.selectTeam.hospital_id;
      params.hospital_name = this.selectTeam.hospital_name;
      this.$router.push({
          name: "startSignupWriteUserInfoForTeam",
          query: params
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import "~vux/src/styles/weui/widget/weui_cell/weui_cell_global.less";
@import "~vux/src/styles/weui/widget/weui_searchbar/weui_searchbar.less";
.content-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
}

.banner-wrapper {
  width: auto;
  height: 100px;
}

.item-wrapper {
  display: flex;
  margin: 10px;
  border: 1.5px solid #cccccc;
}

.item-left {
  border-right: 1.5px solid #cccccc;
  padding: 10px;
}

.item-right {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 10px;
}

.item-right p {
  flex: 1;
  text-align: center;
}

.item-right-icon {
  content: "";
  display: inline-block;
  vertical-align: 4px;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid #000000;
  margin-left: 6px;
}

.content-first {
  background: #ffffff;
  flex: 1;
}

.first-item-wrapper {
  margin: 10px;
  border: 1.5px solid #cccccc;
  padding: 10px;
}

.first-item-select {
  border-color: rgb(71, 160, 209);
}

.city-item {
  width: 33.333%;
  float: left;
  border-bottom: 1px solid #ccc;
}

.city-item-item {
  padding-bottom: 10px;
  padding-top: 10px;
  text-align: center;
  border-right: 1px solid #ccc;
}
</style>
