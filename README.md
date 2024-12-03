# Solar data vizualisation

This project implements data vizualisation for time series solar generation and
demand Italy for years 2015 and 2016. 

This project use influxdb to store the data and Grafana and Apache ECharts to
vizualize the data. 

## Launch the project

To launch the project, you need to have docker and docker-compose installed on
your machine. 

Then, you can launch the project with the following command:

```bash
docker-compose up
```

### Setting up InfluxDB CLI

To access the influxdb CLI, you should have the influxdb client installed on
your machine. 

Then, you can access the influxdb CLI with the following command:
```bash
influx config create \
	--config-name solar-data \
  --host-url http://localhost:8086 \
  --org solar-data-viz \
  --username-password solar-data-viz:solar-data-viz \
  --active
```

Then, add the data to the influxdb database with the following commands:
```bash
influx write \
	-b solar-data \
	-f data/data-2015.txt

influx write \
	-b solar-data \
	-f data/data-2016.txt
```