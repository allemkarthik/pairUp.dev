const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailID, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error(" firstname and lastname is required");
  } else if (firstName.length < 4 || firstName.length > 50) {
    throw new Error(" firstname should be in 4-50 characters");
  } else if (!validator.isEmail(emailID)) {
    throw new Error(" Email is not Valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error(" choose strong password");
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "photoUrl",
    "age",
    "gender",
    "about",
    "skills",
  ];

  const isAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field),
  );
  return isAllowed;
};

module.exports = {
  validateSignUpData,
  validateEditProfileData,
};
