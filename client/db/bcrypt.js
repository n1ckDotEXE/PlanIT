const bcrypt = require("bcrypt");
const saltRounds = 5;
const myPlaintextPassword = "password";
const someOtherPlaintextPassword = "not_bacon";

bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
  // Store hash in your password DB.
});
