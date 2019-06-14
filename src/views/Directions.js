/**
 * The Directions component contains another select for choosing a direction
 */
import m from "mithril";
import DirectionsModel from "../models/DirectionsModel";

var Directions = {
  oninit: function(vnode) {
    //initialize the model
    DirectionsModel.load(
      vnode.attrs.description,
      vnode.attrs.providerID,
      vnode.attrs.route
    )
      .then(r => {
        //check the direction url param, if it is not in our model redirect to /
        if (
          vnode.attrs.direction &&
          !DirectionsModel.Directions.map(d => d.Value).includes(
            vnode.attrs.direction
          )
        )
          throw "Not a valid direction";
      })
      .catch(err => {
        console.log(err);
        m.route.set("/:route", { route: vnode.attrs.route });
      });
  },
  onupdate: function(vnode) {
    //detect if the user selected a different route
    //if so, reload our DirectionsModel
    if (DirectionsModel.Route != vnode.attrs.route) {
      DirectionsModel.load(
        vnode.attrs.description,
        vnode.attrs.providerID,
        vnode.attrs.route
      )
        .then(r => {
          //now check our direction url param to see if it is valid
          if (
            vnode.attrs.direction &&
            !DirectionsModel.Directions.map(d => d.Value).includes(
              vnode.attrs.direction
            )
          )
            m.route.set("/:route", { route: vnode.attrs.route });
        })
        .catch(err => {
          console.log(err);
          m.route.set("/:route", { route: vnode.attrs.route });
        });
    }
  },
  view: function(vnode) {
    return (
      <div className="directionContainer">
        <label for="directionSelect">Direction:</label>
        <select
          className="directionSelect"
          value={vnode.attrs.direction}
          onchange={function(e) {
            m.route.set("/:route/:direction", {
              route: vnode.attrs.route,
              direction: e.target[e.target.selectedIndex].value
            });
          }}
        >
          {DirectionsModel.Directions.map(d => (
            <option value={d.Value} selected={vnode.attrs.direction == d.Value}>
              {d.Text}
            </option>
          )).concat(
            vnode.attrs.direction ? (
              []
            ) : (
              <option value="" selected hidden disabled>
                Choose
              </option>
            )
          )}
        </select>
      </div>
    );
  }
};

export default Directions;
