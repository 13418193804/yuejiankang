  let wechatHelper = {
    checkOauth: function(component, callback) {
      let url = '/wechatapi/getauthorizeurl'
      let params = {
        redirect: component.$route.name
      }
      component.$http.get(url, {
        params: params
      }).then((response) => {
        if (response.status === 200) {
          window.location.href = response.data;
        } else {
          callback(null);
          component.$vux.toast.show({
            text: '服务器异常' + response.status,
            type: 'text',
            time: 3000
          });
        }
      }).catch(function(error) {
        callback(null);
        component.$vux.toast.show({
          text: '异常' + error,
          type: 'text',
          time: 3000
        });
      });
    },
    getJsApiList: function(component, callback) {
      let url = '/wechatapi/jsconfig';
      let params = {
        urlname: component.$route.fullPath,
        jsApiList: component.$route.meta.jsApiList,
        isIos:component.$osinfo.versions.ios
      }
      component.$http.get(url, {
        params: params
      }).then((response) => {
        if (response.status === 200) {
          component.$wechat.config(response.data);
          component.$wechat.ready(function() {
            let checkJsApi = {
              jsApiList: component.$route.meta.jsApiList, // 需要检测的JS接口列表，所有JS接口列表见附录2,
              success: function(res) {
                callback(res.checkResult);
              },
              fail: function(res) {
                callback(null)
              }
            };
            component.$wechat.checkJsApi(checkJsApi);
          });
        } else {
          callback(null);
          component.$vux.toast.show({
            text: '服务器异常' + response.status,
            type: 'text',
            time: 3000
          });
        }
      }).catch(function(error) {
        console.log(error);
        callback(null);
        component.$vux.toast.show({
          text: '异常' + error,
          type: 'text',
          time: 3000
        });
      });
    },
    getUserId: function(component, callback) {
      let url = '/wechatapi/getuseridbycode';
      let params = {
        wechatcode: component.$route.query.code
      }
      component.$http.get(url, {
        params: params
      }).then((response) => {
        if (response.status === 200) {
          component.$cookie.set('userId', response.data.UserId, { expires: '1Y' });
          callback(response.data.UserId);
        } else {
          callback(null);
          component.$vux.toast.show({
            text: '服务器异常' + response.status,
            type: 'text',
            time: 3000
          });
        }
      }).catch(function(error) {
        callback(null);
        component.$vux.toast.show({
          text: '异常' + error,
          type: 'text',
          time: 3000
        });
      });
    },
    getJsPayData: function(component,params, callback) {
      let url = '/wechatpay/getJsPayData';
      //let params = {};
      component.$http.get(url, {
        params: params
      }).then((response) => {
        if (response.status === 200) {
          callback(response.data);
        } else {
          callback(null);
          component.$vux.toast.show({
            text: '服务器异常' + response.status,
            type: 'text',
            time: 3000
          });
        }
      }).catch(function(error) {
        callback(null);
        component.$vux.toast.show({
          text: '异常' + error,
          type: 'text',
          time: 3000
        });
      });
    },

    getSendAppointmentSucceedNew : function(component){
      let url = '/wechatapi/sendAppointmentSucceedTemplate';
      let params = {
        orderInfo: component.$route.query
      }
      component.$http.get(url, {
        params: params
      }).then((response) => {
        if (response.status === 200) {

        }else{

        }
      }).catch(function(error) {

      });
    }
  }
  export default {
    install(Vue) {
      Vue.prototype.$wechatHelper = wechatHelper
    }
  }
