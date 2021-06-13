Component({
  properties: {
    source: {
      type: Object,
    },
  },

  data: {
    theme: 'light',
  },

  methods: {
    onGitHubTap: function () {
      wx.setClipboardData({
        data: 'https://github.com/minetsh/echarts-sample',
        success: () => {
          wx.showToast({
            title: '示例链接已复制',
          });
        },
      });
    },
    onThemeChange: function () {
      const { theme } = this.data;
      if (theme === 'light') {
        this.triggerEvent('themechange', 'dark');
        this.setData({ theme: 'dark', style: 'color: white;' });
      } else {
        this.triggerEvent('themechange', 'light');
        this.setData({ theme: 'light', style: 'color: black;' });
      }
    },
    onSourceClick: function () {
      const { source } = this.data;
      if (source) {
        wx.setClipboardData({
          data: source.link,
          success: () => {
            wx.showToast({
              title: '链接已复制',
            });
          },
        });
      }
    },
  },
});
