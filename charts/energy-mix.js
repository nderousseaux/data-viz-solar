let gen = 0;
let cons = 0;

const gen_series = context.panel.data.series.find(serie => serie.name === 'italy.gen');
const cons_series = context.panel.data.series.find(serie => serie.name === 'italy.cons');

// Extracting the data
gen = gen_series.fields.find(field => field.type === 'number').values.buffer || gen_series.fields.find(field => field.type === 'number').values[0];
cons = cons_series.fields.find(field => field.type === 'number').values.buffer || cons_series.fields.find(field => field.type === 'number').values[0];

let other_sources = cons - gen;

// Convert into GWh, but keep not floating 
gen = gen / 1000;
other_sources = other_sources / 1000;
cons = cons / 1000;
gen = gen.toFixed(0);
other_sources = other_sources.toFixed(0);
cons = cons.toFixed(0);

let gen_percents = (gen / cons) * 100;
let other_percents = (other_sources / cons) * 100;


let data = [
  { value: gen, name: 'Solar Power (GWh) - ' + gen_percents.toFixed(0) + '%' },
  { value: other_sources, name: 'Other Sources (GWh) - ' + other_percents.toFixed(0) + '%', itemStyle: { color: '#fec05a' } }
];

return {
  tooltip: {
    trigger: 'item'
  },
  series: [
    {
      type: 'pie',
      radius: ['40%', '70%'],
      padAngle: 5,
      itemStyle: {
        borderRadius: 10
      },
      label: {
        show: true,
        fontSize: 20,
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 24,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: data
    }
  ]
};