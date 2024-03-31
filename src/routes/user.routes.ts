import * as express from "express";
import { authentification } from "../middleware/authentification";
import { UserController } from "../controllers/user.controller";
import { authorization } from "../middleware/authorization";
import { AuthController } from "../controllers/auth.controller";
const Router = express.Router();

Router.get(
  "/users",
  // authentification,
  // authorization(["admin"]),
  UserController.getUsers
);
Router.get(
  "/profile",
  // authentification,
  // authorization(["user", "admin", "operateur"]),
  AuthController.getProfile
);
Router.post("/signup", UserController.signup);

Router.post("/login", AuthController.login);
Router.put(
  "/update/:id",
  // authentification,
  // authorization([
  //   "admin",    
  //   "client",
  // ]),
  UserController.updateUser

  // authentification,
  // authorization(["user", "admin"]),
);
// Delete user 
Router.delete(
  "/delete/:id",
  // authentification,
  // authorization(["admin"]),
  UserController.deleteUser
);
// Find user by Id
Router.get("/find/:id",  
// authentification,
// authorization(["admin"]),
UserController.getUserById);
// Count all users
Router.get("/count", 
// authentification,
// authorization(["admin"]),
UserController.countUsers);

Router.get('/operateurs',
// authentification,
// authorization(["admin"]),
 UserController.getAllOperators);

Router.get('/clients',
// authentification,
// authorization(["admin"]),
 UserController.getAllClients)


export { Router as userRouter };
