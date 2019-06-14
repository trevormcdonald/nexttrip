/**
 * The component that always renders, showing a header and route select
 * it contains the other views as children
 */
import m from "mithril";
import RoutesModel from "../models/RoutesModel";

var Routes = {
  oninit: function(vnode) {
    //initialize our model
    RoutesModel.load()
      .then(r => {
        //if the route url param is not in our model, redirect to /
        if (
          vnode.attrs.route &&
          !RoutesModel.routes
            .map(route => route.Route)
            .includes(vnode.attrs.route)
        )
          throw "Not a valid route";
      })
      .catch(err => {
        console.log(err);
        m.route.set("/");
      });
  },
  onupdate: function(vnode) {
    //if the route url param is not on our model, redirect to /
    //check the length of our route model to catch the edge case where update
    //is called before the model has loaded
    if (
      vnode.attrs.route &&
      RoutesModel.routes.length > 0 &&
      !RoutesModel.routes.map(route => route.Route).includes(vnode.attrs.route)
    )
      m.route.set("/");
  },
  view: function(vnode) {
    return (
      <main>
        <h1>NextTrip: Find your route</h1>
        <div className="routeContainer">
          <label for="routeSelect">Route:</label>
          <select
            className="routeSelect"
            name="routeSelect"
            value={vnode.attrs.route}
            onchange={function(e) {
              m.route.set("/:route", {
                route: RoutesModel.routes[e.target.selectedIndex].Route
              });
            }}
          >
            {RoutesModel.routes
              .map(r => (
                <option value={r.Route} selected={vnode.attrs.route == r.Route}>
                  {r.Description}
                </option>
              ))
              .concat(
                vnode.attrs.route ? (
                  []
                ) : (
                  <option value="" selected hidden disabled>
                    Choose
                  </option>
                )
              )}
          </select>
        </div>
        <div>{vnode.children}</div>
      </main>
    );
  }
};

export default Routes;
