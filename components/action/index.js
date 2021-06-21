const style = {
  width: '80rpx',
  height: '80rpx',
  padding: 0,
  border: 0,
  'background-color': '#fff',
  'font-size': '25rpx',
};

const toStyle = (sty) => {
  return Object.keys(sty)
    .map((name) => `${name}: ${sty[name]}`)
    .join(';');
};

Component({
  properties: {
    openType: {
      type: String,
    },
    theme: {
      type: String,
      observer: function (theme) {
        this.setData({
          style: toStyle({
            ...style,
            'background-color': theme === 'light' ? 'white' : 'black',
          }),
        });
      },
      value: 'light',
    },
  },

  data: {
    style: toStyle(style),
  },

  methods: {},
});
