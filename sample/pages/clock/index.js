import option from './data';

Page({
  data: {
    theme: 'light',
    source: {
      name: 'ECharts官方网站',
      link: 'https://echarts.apache.org/examples/zh/editor.html?c=gauge-clock',
    },
  },

  onLoad() {
    this.option = option;
    this.timeUpdatedStatus = {
      second: false,
      minute: false,
      hour: false,
    };
  },

  onInstance({ detail }) {
    this.instance = detail;
    this.onTimeTrigger();
    this.onClock();
  },

  onThemeChange({ detail }) {
    const { theme } = this.data;
    this.setData({ theme: detail });
    wx.setNavigationBarColor({
      frontColor: theme === 'light' ? '#ffffff' : '#000000',
      backgroundColor: theme === 'light' ? '#100c2a' : '#ffffff',
    });
  },

  onClock() {
    if (this.timer) {
      clearInterval(this.timer);
    }

    this.timer = setInterval(() => {
      this.onTimeTrigger();
    }, 1000);
  },

  onTimeTrigger() {
    const { option } = this;
    const date = new Date();
    const second = date.getSeconds();
    const minute = date.getMinutes() + second / 60;
    const hour = (date.getHours() % 12) + minute / 60;

    this.updateSeries(second, option.series[2], 'second');
    this.updateSeries(minute, option.series[1], 'minute');
    this.updateSeries(hour, option.series[0], 'hour');

    option.animationDurationUpdate = 300;
    this.instance.setOption(option, true);
  },

  updateSeries(time, series, type) {
    const isCritical =
      Math.floor(time) === 0 || (type === 'second' && time === 1);
    if (isCritical && this.timeUpdatedStatus[type] === true) {
      this.timeUpdatedStatus[type] = false;
      series.data[0].value = 0;
      series.clockwise = true;
      option.animationDurationUpdate = 0;
      this.instance.setOption(option, true);
    }
    series.data[0].value = time;
    series.clockwise = true;
    if (time === 0) {
      this.timeUpdatedStatus[type] = true;
      series.clockwise = false;
    }
  },

  onShareAppMessage() {
    return {
      title: 'ECharts 插件：动态时钟',
    };
  },

  onShareTimeline() {
    return {
      title: 'ECharts 插件：动态时钟',
    };
  },
});
