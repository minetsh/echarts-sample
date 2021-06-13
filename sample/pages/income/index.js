const { echarts } = requirePlugin('echarts');

Page({
  data: {
    theme: 'light',
    source: {
      name: 'ECharts官方网站',
      link: 'https://echarts.apache.org/examples/zh/editor.html?c=line-race',
    },
  },

  onLoad() {
    wx.request({
      method: 'GET',
      url: 'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples/data/asset/data/life-expectancy-table.json',
      success: (response) => {
        if (response.statusCode === 200) {
          this.onData(response.data);
        } else {
          wx.showToast({
            title: `请求错误：${response.data}`,
          });
        }
      },
    });
  },

  onInstance({ detail }) {
    this.instance = detail;
    if (this.data.option) {
      this.instance.setOption(this.data.option);
    }
  },

  onData(rawData) {
    const countries = [
      'Finland',
      'France',
      'Germany',
      'Iceland',
      'Norway',
      'Poland',
      'Russia',
      'United Kingdom',
    ];
    const datasetWithFilters = [];
    const seriesList = [];
    echarts.util.each(countries, function (country) {
      const datasetId = 'dataset_' + country;
      datasetWithFilters.push({
        id: datasetId,
        fromDatasetId: 'dataset_raw',
        transform: {
          type: 'filter',
          config: {
            and: [
              { dimension: 'Year', gte: 1950 },
              { dimension: 'Country', '=': country },
            ],
          },
        },
      });
      seriesList.push({
        type: 'line',
        datasetId: datasetId,
        showSymbol: false,
        name: country,
        endLabel: {
          show: true,
          formatter: function (params) {
            return params.value[3] + ': ' + params.value[0];
          },
        },
        labelLayout: {
          moveOverlap: 'shiftY',
        },
        emphasis: {
          focus: 'series',
        },
        encode: {
          x: 'Year',
          y: 'Income',
          label: ['Country', 'Income'],
          itemName: 'Year',
          tooltip: ['Income'],
        },
      });
    });

    const option = {
      animationDuration: 10000,
      dataset: [
        {
          id: 'dataset_raw',
          source: rawData,
        },
      ].concat(datasetWithFilters),
      title: {
        text: 'Income of Germany and France since 1950',
      },
      tooltip: {
        order: 'valueDesc',
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        nameLocation: 'middle',
      },
      yAxis: {
        name: 'Income',
      },
      grid: {
        right: 140,
        left: 60,
      },
      series: seriesList,
    };

    this.setData({ option });
  },

  onThemeChange({ detail }) {
    const { theme } = this.data;
    this.setData({ theme: detail });
    wx.setNavigationBarColor({
      frontColor: theme === 'light' ? '#ffffff' : '#000000',
      backgroundColor: theme === 'light' ? '#100c2a' : '#ffffff',
    });
  },

  onShareAppMessage() {
    return {
      title: 'Income of Germany and France since 1950',
    };
  },

  onShareTimeline() {
    return {
      title: 'Income of Germany and France since 1950',
    };
  },
});
