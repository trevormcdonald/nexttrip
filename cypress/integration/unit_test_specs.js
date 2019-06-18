/**
 * Unit tests for the NextTrip Case Study models
 * There are models for Routes, Directions, and Stops
 * which are the three types of concepts important to the user.
 * Each model is imported and checked for initial state.
 * Then load() is called for each model, which makes a request to the NextTrip
 * API and stores the result in the model.
 * These tests then check that the stored values are in the form we expect.

 * Currently, this only tests and arbitrary route and direction, though it could
 * be used to thoroughly test all possible routes and directions.
 */
import RoutesModel from "../../src/models/RoutesModel";
import DirectionsModel from "../../src/models/DirectionsModel";
import StopsModel from "../../src/models/StopsModel";

describe("Unit Test our models", function() {
  describe("The Route model", function() {
    it("should load the routes list", function() {
      //initially empty routes list
      expect(RoutesModel.routes.length).to.eq(0);
      //load the routes
      return RoutesModel.load().then(r => {
        //now the routes list should have entries
        expect(RoutesModel.routes.length).to.be.greaterThan(0);
      });
    });

    it("should populate each Route object in the list", function() {
      RoutesModel.routes.forEach(r => {
        expect(r).to.have.property("Route");
        expect(r).to.have.property("Description");
      });
    });
  });

  describe("The Directions model", function() {
    it("should load the directions list", function() {
      //initially empty directions list
      expect(DirectionsModel.Directions.length).to.eq(0);
      //load the directions, picking an arbitrary route
      return DirectionsModel.load("", "", RoutesModel.routes[100].Route).then(
        r => {
          //a route should only have two direction options to store here
          expect(DirectionsModel.Directions.length).to.be.eq(2);
          //check that the stored Route is a positive number
          expect(DirectionsModel.Route).to.be.greaterThan(0);
        }
      );
    });

    it("should populate each Direction object in the list", function() {
      DirectionsModel.Directions.forEach(d => {
        expect(d).to.have.property("Text");
        expect(d).to.have.property("Value");
      });
    });
  });

  describe("The Stops model", function() {
    it("should load the stops list", function() {
      //initially empty stops list
      expect(StopsModel.stops.length).to.eq(0);
      //load the stops, using our loaded arbitrary route and picking an arbitrary direction
      return StopsModel.load(
        RoutesModel.routes[100].Route,
        DirectionsModel.Directions[0].Value
      ).then(r => {
        //now the stop list should have entries (unless it is a weird connector like 906 or 888)
        expect(StopsModel.stops.length).to.be.greaterThan(0);
      });
    });

    it("should populate each Stop object in the list", function() {
      StopsModel.stops.forEach(s => {
        expect(s).to.have.property("Text");
        expect(s).to.have.property("Value");
      });
    });
  });
});
