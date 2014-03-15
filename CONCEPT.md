Metrica
========
Brainstorming to planning the development of metrica tool.

Two separate applications for Frontend and Backend.

# Frontend

* Authentication, so we can store user preferences.

* For charts we can use: [d3](https://github.com/mbostock/d3/wiki/Gallery) or [higcharts](http://www.highcharts.com/stock/demo/)

* Similar projects:

	1. [mt-stats](http://bits.meloncholy.com/mt-stats)


# Backend

* Different clients (OS, embedded or unix style)

* An example to see how impelement the different plugins can be the project [dstats](https://github.com/dagwieers/dstat)

* Github project that implements an API to the /proc metrics. [node-procfs-stats](https://github.com/soldair/node-procfs-stats)

* An http server will display/send the data read.

* The http server will have a REST API to access each /proc metric.

* the http server should accept the following configuration parameters:
  - Username
  - Password
  - Port
  - ????
