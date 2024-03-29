// app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      });

      this.globalData = {};

      // ---------------检测navbar高度
    let menuButtonObject = wx.getMenuButtonBoundingClientRect();
    console.log("小程序胶囊信息",menuButtonObject)
    wx.getSystemInfo({
      success: res => {
        let statusBarHeight = res.statusBarHeight,
          navTop = menuButtonObject.top,//胶囊按钮与顶部的距离
          navHeight = menuButtonObject.height + (menuButtonObject.top - statusBarHeight)*2;//导航高度  (24-24)x2 + 32
          console.log( menuButtonObject.height + "+" + "(" + menuButtonObject.top + "-" + statusBarHeight + ") * 2" )
        this.globalData.navHeight = navHeight;
        this.globalData.statusBarHeight = statusBarHeight;
        this.globalData.windowHeight = res.windowHeight;
        this.globalData.menuButtonObject = menuButtonObject;
      },
      fail(err) {
        console.log(err);
      }
    })
    }

    
  }
});
