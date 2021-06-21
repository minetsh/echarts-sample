Page({
  data: {},
  onGitHubTap: function () {
    wx.setClipboardData({
      data: 'https://github.com/minetsh/echarts-sample',
      success: () => {
        wx.showToast({
          title: '项目地址已复制',
        });
      },
    });
  },
});
