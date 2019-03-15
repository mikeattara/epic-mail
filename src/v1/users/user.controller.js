import userService from './user.service';

function authenticate(req, res, next) {
  userService
    .authenticate(req.body)
    .then(user =>
      user
        ? res.status(202).send(user)
        : res.status(400).json({ error: 'Username or password is incorrect' })
    )
    .catch(err => next(err));
}

function register(req, res, next) {
  userService
    .create(req.body)
    .then(data => res.status(201).send(data))
    .catch(err => next(err));
}

function getById(req, res, next) {
  userService
    .getUserById(req.params.id)
    .then(user => (user ? res.json(user) : res.sendStatus(404)))
    .catch(err => next(err));
}

function update(req, res, next) {
  userService
    .update(req.params.id, req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

export default { update, getById, register, authenticate };
