import isEmail from 'validator/lib/isEmail';
import * as argon2 from 'argon2';
import useMiddleware from '../../middlewares/useMiddleware';

const handler = (req, res) => {
  console.log('hit user.handler.req:::', req.body);
  console.log('hit user.handler.res:::', res.statusCode);
  if (req.method === 'POST') {
    const { email, name, password } = req.body;
    if (!isEmail(email)) {
      return res.send({
        status: 'error',
        message: 'The email you entered is invalid.'
      });
    }
    return req.db
      .collection('users')
      .countDocuments({ email })
      .then(count => {
        if (count) {
          return Promise.reject(Error('The email has already been used.'));
        }
        return argon2.hash(password);
      })
      .then(hashedPassword =>
        req.db.collection('users').insertOne({
          email,
          password: hashedPassword,
          name
        })
      )
      .then(user => {
        req.session.userId = user.insertedId;
        res.status(201).send({
          status: 'ok',
          message: 'User signed up successfully'
        });
      })
      .catch(error =>
        res.send({
          status: 'error',
          message: error.toString()
        })
      );
  }
  return res.status(405).end();
};

export default useMiddleware(handler);
