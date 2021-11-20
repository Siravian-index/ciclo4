const User = require('../models/Users');
const { saltIt } = require('../utils/saltAndPepper');

module.exports.signup_post = async (req, res) => {
  const { firstName, lastName, email, password, rol } = req.body;
  const status = 'pending';
  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: await saltIt(password),
      rol,
      status,
    });
    // change to user._id after tests
    res.status(201).json({ data: user });
  } catch (err) {
    res.status(400).send('Error while creating the user');
  }
};
module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const data = {
      user,
      isLogin: true,
    };
    res.status(200).json({ data });
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

// change this to save
module.exports.updateUser_put = async (req, res) => {
  try {
    const { _id, password } = req.body;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error('User not found');
    }

    if (password) {
      req.body.password = await saltIt(password);
    } else {
      delete req.body.password;
    }
    const updatedUser = await User.findOneAndUpdate({ _id }, req.body, {
      returnOriginal: false,
    });
    res.status(200).json({ data: updatedUser });
  } catch (err) {
    console.log(err);
    res.status(400).send('Error while updating user');
  }
};
