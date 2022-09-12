const knex = require('../models/knext');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../../../CRUD/src/models/user');

exports.register = async (req, res, next) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;

    // if (firstName && lastName && username && email && password === '') {
    //   return res.status(200).send({
    //     message: 'field should not be empty',
    //   });
    // }

    const hashedPassword = bcrypt.hashSync(password, 8);
    let regis = await knex('users')
      .insert({
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        password: hashedPassword,
      })
      .then((insertedId) => {
        return insertedId;
      });

    // const token = jwt.sign(
    //   {
    //     id: regis[0],
    //   },
    //   process.env.JWT_KEY,
    //   { expiresIn: 86400 }
    // );

    return res.status(200).send({
      message: 'register success',
      //   token: token,
    });
  } catch (error) {
    return (
      res.status(500),
      send({
        message: 'error',
      })
    );
  }
};
