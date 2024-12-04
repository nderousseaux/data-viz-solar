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

Then, the first time you launch the project, you should create the data into
influxdb database with the following command :
```bash
influx write \
  -b solar-data \
  -f data/data-2016.txt
```

### Access Grafana

To access dashboards, you can go to the following URL:
[http://localhost:3000/dashboards](http://localhost:3000/dashboards).
The default login and password are `solar-data-viz`.


## Stop the project

To stop the project, you can use the following command:

```bash
docker-compose down

# or, if you want to remove the volumes
docker-compose down -v
```

## Doing modifications

If you want to edit the dashboard, you can edit it in the Grafana interface, 
and then export the dashboard to the `dashboards` folder.

### The `Charts` folder

The `Charts` folder contains the Apache ECharts code to vizualize the data.
It's not directly used in grafana, so if you want to update the charts, you
should copy the code from the `Charts` folder to the Grafana dashboard.