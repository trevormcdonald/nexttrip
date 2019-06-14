import m from "mithril";
//just for notes
const SOUTH = 1;
const EAST = 2;
const WEST = 3;
const NORTH = 4;

var RoutesModel = {
  routes: [],
  load: function() {
    return RoutesModel.getRoutes();
  },
  getRoutes: function() {
    //request the routes as a json list and store them in our POJO
    return m
      .jsonp({
        url: "http://svc.metrotransit.org/NexTrip/Routes?format=json"
      })
      .then(r => (RoutesModel.routes = r));
  }
};

export default RoutesModel;
