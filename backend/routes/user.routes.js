const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const auth_controller = require("../controllers/auth.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // app.get("/api/accounts/all", controller.allAccess);

    app.get(
        "/api/accounts/user",
        [authJwt.verifyToken],
        controller.userBoard
    );

    app.get(
        "/api/accounts/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    );

    app.get("/api/accounts/all", auth_controller.findAll);
};