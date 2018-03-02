var config = {timeout : 15000}
let wrapperHttp = {
  get: function(component, params, url, callback) {
    component.$http.get(url, {
      params: params
    },config).then((response) => {
      console.log('==============');
      console.log(response);
      if (response.status === 200) {
        if(response.data.code === 1 && response.data.data)
            callback(response.data.data);
        else{
          callback(null);
          // component.$vux.toast.show({
          //   text: '数据异常:' + response.data.msg,
          //   type: 'warn',
          //   time: 3000
          // });
        }
      } else {
        callback(null);
        component.$vux.toast.show({
          text: '服务器异常:' + response.status,
          type: 'warn',
          time: 3000
        });
      }
    }).catch(function(error) {
      callback(null);
      component.$vux.toast.show({
        text: '异常:' + error,
        type: 'warn',
        time: 3000
      });
    });
  },

  post: function(component, postdata, url, callback) {
    component.$http.post(url, postdata,config).then((response) => {
      if (response.status === 200) {
        if(response.data.code === 1 && response.data.data)
          callback(response.data.data);
        else{
          callback(null);
          // component.$vux.toast.show({
          //   text: '数据异常:' + response.data.msg,
          //   type: 'warn',
          //   time: 3000
          // });
        }
      } else {
        callback(null);
        component.$vux.toast.show({
          text: '服务器异常:' + response.status,
          type: 'warn',
          time: 3000
        });
      }
    }).catch(function(error) {
      callback(null);
      component.$vux.toast.show({
        text: '异常' + error,
        type: 'warn',
        time: 3000
      });
    });
  },
  roundPost: function(component, postdata, url, callback) {
    component.$http.post(url, postdata,config).then((response) => {
      if (response.status === 200) {
        callback(response.data);
      } else {
        callback(null);
        component.$vux.toast.show({
          text: '服务器异常:' + response.status,
          type: 'warn',
          time: 3000
        });
      }
    }).catch(function(error) {
      callback(null);
      component.$vux.toast.show({
        text: '异常' + error,
        type: 'warn',
        time: 3000
      });
    });
  },
  roundGet: function(component, params, url, callback) {
    component.$http.get(url, {
      params: params
    },config).then((response) => {
      console.log('==============');
      console.log(response);
      if (response.status === 200) {

        callback(response.data);

      } else {
        callback(null);
        component.$vux.toast.show({
          text: '服务器异常:' + response.status,
          type: 'warn',
          time: 3000
        });
      }
    }).catch(function(error) {
      callback(null);
      component.$vux.toast.show({
        text: '异常:' + error,
        type: 'warn',
        time: 3000
      });
    });
  },
}

export default {
  install(Vue) {
    Vue.prototype.$wrapperHttp = wrapperHttp
  }
}
