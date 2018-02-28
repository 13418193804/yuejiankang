<template>
  <div class="content-wrapper">
    <vue-loading :size="{width: '60px', height: '60px'}" v-show="!isShowContent"></vue-loading>
    <hsy-dialog class="confirm" v-model="showDialog">
      <div slot="body">
        <div style="padding:10px;max-height:100px;line-height:20px">
           <p style="font-size:1.0rem">确定取消该团体预约?</p>
          </div>
        <div class="confirm_filter">
            <span class="filter_button_style first" @click="handleNo()">取消</span>
            <span class="filter_button_style" @click="handleYes(selectTeam.team_id)">确定</span>
        </div>
      </div>
    </hsy-dialog>
    <div class="weui-search-bar weui-search-bar_focusing" style="background-color:rgb(71,160,209)">
       <form class="weui-search-bar__form">
          <div class="weui-search-bar__box">
              <i class="weui-icon-search"></i>
              <input type="search" class="weui-search-bar__input" placeholder="搜索" v-model="searchName">
              <a href="javascript:" class="weui-icon-clear" @click="onClearSearch()" v-show="searchName.length>0"></a>
          </div>
        </form>
      <a href="javascript:" class="weui-search-bar__cancel-btn" style="color:#ffffff"  @click="onNameSearch()">搜索</a>
    </div>
    <div class="list-wrapper" v-show="isShowContent">
      <div class="list-item-line" v-for="(team,index) in teamList" :key="index">
       <div class="weui-form-preview__bd">
        <div class="weui-form-preview__item">
           <label class="weui-form-preview__label" style="color:#000000">团队名称：{{team.team_name}}</label>
           <div class="weui-form-preview__value"><span class="user-tag" @click="onItemClick(team)">取消团体预约</span></div>
        </div>
        <div class="weui-form-preview__item">
           <label class="weui-form-preview__label" style="color:#000000">负责人：{{team.team_leader_name}}</label>
           <span class="weui-form-preview__value">联系电话:{{team.team_leader_mobile}}</span>
        </div>
        <div class="weui-form-preview__item">
          <p style="font-size:0.8rem;color:rgb(71,160,209)" v-show="false">详情>></p>
        </div>
        </div>
        <div style="padding-left:20px;font-size:0.8rem">
          <p style="display:inline-block;width:50%" v-for="(teamtime,teamtimeindex) in team.times" :key="teamtimeindex">
            <span>{{teamtime.day}}: </span><span>{{teamtime.total}}人</span>
          </p> 
        </div>
      </div>
    </div>
     <div class="bottom-btn-place-wrapper">
    </div>
    <div class="bottom-btn-white-wrapper">
      <x-button class="custom-primary-button" text="新增加团队预约" @click.native="gotoNext()">
      </x-button>
    </div>
  </div>
</template>
<script>
import vueLoading from "@/components/widget/loading/loading";
import webconfig from "@/common/webconfig";
import HsyDialog from "@/components/widget/dialog/Dialog";
import { XButton } from "vux";
export default {
  name: "screenList",
  components: {
    XButton,
    vueLoading,
    HsyDialog
  },
  props: {
    selectHospitalId: {
      type: String
    }
  },
  data() {
    return {
      selectTeam: {},
      showDialog: false,
      isShowContent: true,
      teamList: [],
      currentIndex: 0,
      inUploading: 1,
      searchName: "",
    };
  },
  computed: {},
  created() {
    let params = {
      hospital_id: this.selectHospitalId
    };
    this.getData(params);
  },
  methods: {
    onNameSearch() {
      var params;
      if (this.searchName && this.searchName.length > 0) {
        params = {
          search: this.searchName,
          hospital_id: this.selectHospitalId
        };
      } else {
        params = {
          hospital_id: this.selectHospitalId
        };
      }
      this.getData(params);
    },
    onClearSearch() {
      this.searchName = "";
    },
    getData(params) {
      console.log(params);
      this.isShowContent = false;
      let that = this;
      let url = webconfig.webserverurl + "/api/order/teamOrderList";

      this.$wrapperHttp.get(this, params, url, function(data) {
        if (data) {
          that.teamList = data;
        } else {
          that.teamList = [];
        }
        that.isShowContent = true;
      });
    },
    handleNo() {
      this.showDialog = false;
    },
    handleYes(teamId) {
      this.showDialog = false;
      let url = webconfig.webserverurl + "/api/order/cancelTeamOrder";
      let that = this;
      let userdata =
        "team_id=" + teamId + "&hospital_id=" + this.selectHospitalId;
      this.$wrapperHttp.post(this, userdata, url, function(data) {
        console.log(data);
        if (data) {
          that.$vux.toast.show({
            text: "取消成功",
            type: "text",
            onHide() {
              let params = {
                hospital_id: that.selectHospitalId
              };
              that.getData(params);
            }
          });
        } else {
          that.$vux.toast.show({
            text: "取消失败",
            type: "warn",
            onHide() {
              let params = {
                hospital_id: that.selectHospitalId
              };
              that.getData(params);
            }
          });
        }
      });
    },
    onItemClick(item) {
      this.showDialog = true;
      this.selectTeam = item;
    },
    gotoNext() {
      let params = {};
      params.hospital_id = this.selectHospitalId;
      this.$router.push({
        name: "newAppoinment",
        query: params
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import "~vux/src/styles/weui/widget/weui_cell/weui_cell_global.less";
@import "~vux/src/styles/weui/widget/weui_panel/weui_panel.less";
@import "~vux/src/styles/weui/widget/weui_searchbar/weui_searchbar.less";
@import "~vux/src/styles/weui/widget/weui_cell/weui_form/weui-form-preview.less";
@import "~vux/src/styles/weui/widget/weui_cell/weui_form.less";
.content-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
}

.list-wrapper {
  overflow: scroll;
  flex: 1;
}

.user-tag {
  border-radius: 5px;
  color: #666;
  background-color: #ffffff;
  font-size: 0.6rem;
  border: 1px solid #000000;
  padding: 2px 4px 2px 4px;
  margin-left: 8px;
}

.confirm_filter {
  display: flex;
  width: 100%;
  border-top: 1px solid #ccc;
}

.confirm_filter .filter_button_style {
  width: 50%;
  text-align: center;
  padding: 0.8rem;
  color: rgb(71, 160, 209);
}

.confirm_filter .filter_button_style.first {
  border-right: 1px solid #ccc;
  color: #999999;
}

.banner-wrapper {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}

.item-wrapper {
  display: flex;
  margin: 5px;
}

.item-left {
  padding: 5px;
  flex: 1;
  text-align: center;
}

.item-right {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
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
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #000000;
  margin-left: 3px;
}

.user-tag {
  border-radius: 5px;
  color: #666;
  background-color: #ffffff;
  font-size: 0.6rem;
  border: 1px solid #000000;
  padding: 4px 6px 4px 6px;
}

.list-item-line {
  position: relative;
}

.list-item-line::before {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 1px;
  border-top: 1px solid #d9d9d9;
  color: #d9d9d9;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  left: 15px;
}

</style>
