
const setCustomerSession = (req, res, next) => {
    if (!req.cookies.sessionId) {
      const sessionId = userId;
      res.cookie('sessionId', sessionId, { httpOnly: true });
    }
    next();
  };
  

  const verifyUserSession = (req, res, next) => {
    const sessionId = req.cookie.get('sessionId');
  }
  module.exports = { setCustomerSession };
  