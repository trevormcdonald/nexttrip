import m from "mithril";

var StopsModel = {
  route: "",
  direction: "",
  stops: [],
  nextDepartures: [],
  load: function(route, direction) {
    StopsModel.route = route;
    StopsModel.direction = direction;
    return StopsModel.getStops().then(r => StopsModel.getNextDepartureTimes());
  },
  getStops: function() {
    //request the routes as a json list and store them in our POJO
    return m
      .jsonp({
        url:
          "http://svc.metrotransit.org/NexTrip/Stops/" +
          StopsModel.route +
          "/" +
          StopsModel.direction +
          "?format=json"
      })
      .then(s => (StopsModel.stops = s));
  },
  getNextDepartureTimes: function() {
    /**
     * loop over our stops and request the departure times for each, only storing
     * the first one returned by the api
     * using promises ensures the order is maintained regardless of how fast each
     * request takes
     */
    let promises = StopsModel.stops.map(stop => {
      return m
        .jsonp({
          url:
            "http://svc.metrotransit.org/NexTrip/" +
            StopsModel.route +
            "/" +
            StopsModel.direction +
            "/" +
            stop.Value +
            "?format=json"
        })
        .then(departures =>
          departures.length == 0 ? "" : departures[0].DepartureText
        );
    });

    return Promise.all(promises).then(results => {
      StopsModel.nextDepartures = results;
    });
  }
};

export default StopsModel;
