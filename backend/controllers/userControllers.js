const User = require('../models/Users');

module.exports.signup_post = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const user = await User.create({ firstName, lastName, email, password });
    // change to user._id after tests
    res.status(201).json({ user: user });
  } catch (err) {
    res.status(400).send('Error while creating the user');
  }
};
module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    // return something useful to the frontend
    const access = {
      user: user._id,
      permission: true,
    };
    res.status(200).json({ access: access });
  } catch (err) {
    res.status(400).send('Error while logging');
  }
};

module.exports.allUsers_get = async (req, res) => {
  try {
    const users = await User.find({});
    res.send({ data: users });
  } catch (err) {
    res.status(500).send('Error while getting all users');
  }
};
