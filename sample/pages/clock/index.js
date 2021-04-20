import option from '../../options/clock';

Page({
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
    this.instance.setOption(this.option);
    this.onClock();
  },

  onClock() {
    if (this.timer) {
      clearInterval(this.timer);
    }

    const { option } = this;
    this.timer = setInterval(() => {
      const date = new Date();
      const second = date.getSeconds();
      const minute = date.getMinutes() + second / 60;
      const hour = (date.getHours() % 12) + minute / 60;

      this.updateSeries(second, option.series[2], 'second');
      this.updateSeries(minute, option.series[1], 'minute');
      this.updateSeries(hour, option.series[0], 'hour');

      option.animationDurationUpdate = 300;
      this.instance.setOption(option, true);
    }, 1000);
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
});
