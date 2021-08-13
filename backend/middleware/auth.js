const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "6b9adNtSEFFY5ZID6rRFHZ4FWnOMVr");
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw "User Id non valide !";
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({ error: error || "Requête non authentifiée !" });
  }
};