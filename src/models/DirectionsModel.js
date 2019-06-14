import m from "mithril";
//just to remember
const SOUTH = 1;
const EAST = 2;
const WEST = 3;
const NORTH = 4;

var DirectionsModel = {
  Description: "",
  ProviderID: "",
  Route: "",
  Directions: [],
  Stops: [],
  VehicleLocations: [],
  load: function(desc, pID, route) {
    DirectionsModel.Description = desc;
    DirectionsModel.ProviderID = pID;
    DirectionsModel.Route = route;
    return DirectionsModel.getDirections();
  },
  getDirections: function() {
    //request the routes as a json list and store them in our POJO
    return m
      .jsonp({
        url:
          "http://svc.metrotransit.org/NexTrip/Directions/" +
          DirectionsModel.Route +
          "?format=json"
      })
      .then(d => (DirectionsModel.Directions = d));
  }
};

export default DirectionsModel;
