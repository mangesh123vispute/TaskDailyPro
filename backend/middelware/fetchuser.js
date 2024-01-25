const jwt = require("jsonwebtoken");
const JWT_SECRET = "Mangeshisgood$boy";

const fetchuser = (req, res, next) => {
  const reqs = req?.body;
  console.log("this is reqs,auth-token", reqs["authToken"]);

  const token = req.header("auth-token") || reqs["authToken"];
  console.log("this is the token", token);

  if (!token) {
    console.log("this is inside error ", token);
    return res
      .status(401)
      .send({ error: "Please authenticate using a valid token..11" });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    return res
      .status(401)
      .send({ error: "Please authenticate using a valid token" });
  }
};

module.exports = fetchuser;
