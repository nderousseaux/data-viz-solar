
let time = [];
let power_gen = [];
let power_cons = [];
let power_import = [];

// looking for serie named italy.power_gen
const serie_gen = context.panel.data.series.find(serie => serie.name === 'italy.power_gen');
const serie_cons = context.panel.data.series.find(serie => serie.name === 'italy.power_cons');
const serie_import = context.panel.data.series.find(serie => serie.name === 'italy.power_import');

// Extracting the data
time = serie_gen.fields.find(field => field.type === 'time').values.buffer || serie_gen.fields.find(field => field.type === 'time').values;
power_gen = serie_gen.fields.find(field => field.type === 'number').values.buffer || serie_gen.fields.find(field => field.type === 'number').values;
power_cons = serie_cons.fields.find(field => field.type === 'number').values.buffer || serie_cons.fields.find(field => field.type === 'number').values;
power_import = serie_import.fields.find(field => field.type === 'number').values.buffer || serie_import.fields.find(field => field.type === 'number').values;

// Cut after comma
power_gen = power_gen.map(value => value.toFixed(0));
power_cons = power_cons.map(value => value.toFixed(0));
power_import = power_import.map(value => value.toFixed(0));

// Readable time, without the time, just the date
time = time.map(ts => new Date(ts).toLocaleString());
time = time.map(ts => ts.split(',')[0]);

return {
  legend: {
    top: 'bottom',
    data: ['Power Generation (MWh)', 'Power Consumption (MWh)', 'Power Import/Export (MWh)']
  },
  tooltip: {
    trigger: 'axis',
  },
  xAxis: {
    data: time
  },
  yAxis: {
    axisLabel: {
      formatter: '{value} MWh'
    }
  },
  series: [
    {
      name: 'Power Generation (MWh)',
      data: power_gen,
      type: 'line',
      areaStyle: {}
    },
    {
      name: 'Power Consumption (MWh)',
      data: power_cons,
      type: 'line',
      areaStyle: {}
    },
    {
      name: 'Power Import/Export (MWh)',
      data: power_import,
      type: 'line',
      areaStyle: {}
    }
  ]
};