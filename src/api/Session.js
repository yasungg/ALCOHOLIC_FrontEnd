const express = require("express");
const session = require("express-session");

const app = express();
const secret = crypto.randomBytes(64).toString("hex");

//세션 설정(임시작성)
app.use(
  session({
    secret: { secret },
    resave: false,
    saveUninitialized: true,
  })
);

app.listen(8111, () => {
  console.log("server is running on port 8111");
});
