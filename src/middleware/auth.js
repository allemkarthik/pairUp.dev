const jwt = require("jsonwebtoken");
const User = require("../models/user");


const userAuth = async (req, res, next) => {
  try {
    // read the token from request cookies
    const cookies = req.cookies;

    const { token } = cookies;
    if(!token){
        return res.status(401).send("please login")
    }

    // validate token
    const isvalidToken = await jwt.verify(token, "PairUp@dev$4275");

    // find user
    const { _id } = isvalidToken;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("seems New user! please login...");
    }
    req.user=user
    next();
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

module.exports = {
  userAuth,
};
