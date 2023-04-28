import { RequestHandler, Router } from "express";

const router = Router();

const urlRedirect = {
  successRedirect: "/api/successlogin",
  failureRedirect: "/api/successlogin",
};

/**
 * Router que se ejecuta cuando se ha realizado al autenticación del usuario...
 */
router.get<RequestHandler>("/api/successlogin", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/online");
  } else {
    res.redirect("/");
  }
});

/**
 * Router que trae la información del usuario que este auénticado...
 */
router.get<RequestHandler>("/api/me", (_, res) => {
  // authOptions
  res.json({ isAuth: false });
});

/**
 * Para hacer el logout del usuario...
 */
router.get<RequestHandler>("/api/logout", (req, res) => {
  if (req.isAuthenticated()) {
    req.logout();
  }

  res.redirect("/");
});

export default router;
