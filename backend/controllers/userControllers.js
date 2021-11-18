const User = require('../models/Users');
const bcrypt = require('bcrypt');

module.exports.signup_post = async (req, res) => {
  const { firstName, lastName, email, password, rol } = req.body;
  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      rol,
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
    // return something useful to the frontend
    const data = {
      user: user._id,
      permission: true,
    };
    res.status(200).json({ data: data });
  } catch (err) {
    res.status(400).send('Error while logging');
  }
};

module.exports.allUsers_get = async (req, res) => {
  try {
    const users = await User.find({});
    res.send({ data: users });
  } catch (err) {
    console.log(err);
    res.status(500).send('Error while getting all users');
  }
};

/**
 * Dado que ingresé al sistema de gestión de proyectos

Cuando necesite actualizar la información personal

Entonces podré ingresar los datos que deseo actualizar
 */

module.exports.updateUser_put = async (req, res) => {
  try {
    const { _id } = req.body;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error('User not found');
    }
    let updatedUser = await User.findOneAndUpdate({ _id }, req.body, {
      returnOriginal: false,
    });
    const salt = await bcrypt.genSalt();
    updatedUser.password = await bcrypt.hash(updatedUser.password, salt);
    res.send({ data: updatedUser });
  } catch (err) {
    console.log(err);
    res.status(400).send('Error while updating user');
  }
};
