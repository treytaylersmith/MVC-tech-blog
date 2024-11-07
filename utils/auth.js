// Protects routes that require the user to be logged in.
const withAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};

// Protects API routes where user must be logged in
const withApiAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    res.status(403).json({ message: 'you must be logged in to perform this action' });
  } else {
    next();
  }
};

// Protects routes where logged-in users should not have access (for example /login or /signup)
const withoutAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    next();
  } else {
    res.redirect('/')
  }
};

module.exports = { withAuth, withApiAuth, withoutAuth };
