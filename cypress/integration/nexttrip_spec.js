/**
 * User Interface tests for the NextTrip Case Study components
 * There are views for Routes, Directions, and Stops
 * which are the three types of concepts important to the user.
 * Cypress is used to visit the page and check that the Route select
 * and Direction select both retain user values and successfully update the
 * window location hash, and  vice versa.

 * This also tests whether using the page responds correctly to the back and
 * forward arrows used to traverse browser history.

 * Currently these tests choose a few arbitrary inputs to use and do not
 * exhaustively test all possible inputs.
 */

describe("NextTrip Case Study", function() {
  describe("The home page", function() {
    it("successfully loads", function() {
      cy.visit("/");
      //check that Mithril added our hash symbols
      cy.url().should("include", "#!");
    });
  });

  describe("The route select", function() {
    it("responds to user selections", function() {
      cy.visit("/");
      cy.get(".routeSelect")
        .select("A Line")
        .should("have.value", "921");
    });

    it("and correctly updates the window hash", function() {
      cy.hash().should("include", "921");
    });
  });

  describe("The direction select", function() {
    it("responds to user selections", function() {
      cy.get(".directionSelect")
        .select("NORTHBOUND")
        .should("have.value", "4");
    });

    it("correctly updates the window hash", function() {
      cy.hash().should("include", "/4");
    });

    it("and lets stops be displayed", function() {
      cy.contains("Stop");
      cy.contains("Rosedale Transit Center");
    });
  });

  describe("The home page ", function() {
    it("responds well to clicking the back button", function() {
      cy.go("back");
      cy.hash().should("eq", "#!/921");
    });

    it("and to clicking the forward button", function() {
      cy.go("forward");
      cy.hash().should("eq", "#!/921/4");
    });

    it("can handle going back multiple times", function() {
      cy.go("back");
      cy.go("back");
      cy.hash().should("eq", "#!/");
      cy.get(".routeSelect").should("have.value", null);
      cy.get(".directionSelect").should("have.length", "");
    });

    it("and can handle going forward multiple times", function() {
      cy.go("forward");
      cy.go("forward");
      cy.get(".routeSelect").should("have.value", "921");
      cy.get(".directionSelect").should("have.value", "4");
      cy.hash().should("eq", "#!/921/4");
    });

    it("should also handle switching to a new route", function() {
      cy.get(".routeSelect")
        .select("223 - Rosedale - Little Canada - Maplewood")
        .should("have.value", "223");
      cy.get(".directionSelect").should("have.value", null);
      cy.hash().should("eq", "#!/223");
    });

    it("and manually changing the window location hash", function() {
      cy.get(".routeSelect").should("have.value", "223");
      cy.visit("#!/921/4", { timeout: 15000 });
      cy.get(".routeSelect").should("have.value", "921");
      cy.get(".directionSelect").should("have.value", "4");
      cy.contains("Stop");
      cy.contains("Rosedale Transit Center");
    });
  });

  describe("The home page", function() {
    it("should redirect if we give it a nonsense route", function() {
      cy.visit("/#!/wrong/info");
      cy.hash().should("eq", "#!/");
    });
  });
});
