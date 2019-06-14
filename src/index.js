/**
 * Entry point for the NextTrip Case Study, and for WebPack
 * This uses Mithril's routing to sync the hash with our components,
 * only drawing components if the hash matches a specific state
 */

import m from "mithril";
import Routes from "./views/Routes";
import Directions from "./views/Directions";
import Stops from "./views/Stops";
import "./styles/styles.css";

m.route(document.body, "/", {
  "/": Routes,
  "/:route": {
    render: function(vnode) {
      return (
        <Routes route={vnode.attrs.route}>
          <Directions route={vnode.attrs.route} />
        </Routes>
      );
    }
  },
  "/:route/:direction": {
    render: function(vnode) {
      return (
        <Routes route={vnode.attrs.route}>
          <Directions
            route={vnode.attrs.route}
            direction={vnode.attrs.direction}
          />
          <Stops route={vnode.attrs.route} direction={vnode.attrs.direction} />
        </Routes>
      );
    }
  }
});
