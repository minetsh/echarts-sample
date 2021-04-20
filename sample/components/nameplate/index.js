Component({
  data: {
    theme: 'light',
  },

  methods: {
    onGitHubTap: function () {
      wx.setClipboardData({
        data: 'https://github.com/minetsh/echarts-sample',
        success: () => {
          wx.showToast({
            title: 'GitHub 链接已复制',
          });
        },
      });
    },
    onThemeChange: function () {
      const { theme } = this.data;
      if (theme === 'light') {
        this.triggerEvent('themechange', 'dark');
        this.setData({ theme: 'dark' });
      } else {
        this.triggerEvent('themechange', 'light');
        this.setData({ theme: 'light' });
      }
    },
  },
});
