/**
 * The Stops component displays the list of stops for the selected route and
 * direction, and also loads next departure time for each stop.
 */
import m from "mithril";
import StopsModel from "../models/StopsModel";

var Stops = {
  oninit: function(vnode) {
    //initialize the model
    StopsModel.load(vnode.attrs.route, vnode.attrs.direction).catch(err => {
      window.location.replace("/");
    });
  },
  onupdate: function(vnode) {
    //detect if the user selected a different route or direction
    //if so, reload our StopsModel
    if (
      StopsModel.route != vnode.attrs.route ||
      StopsModel.direction != vnode.attrs.direction
    ) {
      StopsModel.load(vnode.attrs.route, vnode.attrs.direction).catch(err => {
        window.location.replace("/");
      });
    }
  },
  onremove: function() {
    //this gets rid of flashing the old stops on transitions
    StopsModel.stops = [];
  },
  view: function(vnode) {
    return (
      <div className="stopsContainer">
        <div className="stopHeader">
          <div>Stop</div>
          <div>Next Departure</div>
        </div>
        {StopsModel.stops.map((s, i) => (
          <div className="stop">
            <div>{s.Text}</div>
            <div>{StopsModel.nextDepartures[i]}</div>
          </div>
        ))}
      </div>
    );
  }
};

export default Stops;
