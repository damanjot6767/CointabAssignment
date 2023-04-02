const RateLimit = (req, res, next) => {
    const email = req.body.email;
    const attempts = failedAttemps[email];
    
    if (attempts && attempts.count >= 5 && Date.now() - attempts.lastAttempt < 3600000) {
      let diffTime = 86400000 - (Date.now() - attempts.lastAttempt);
      diffTime=diffTime/1000;
      res.status(403).send({status:"failure",msg:`Too many login attempts. Please try again in ${Math.floor(diffTime /3600)} hours ${Math.floor((diffTime%3600)/60)} minutes.`});
      return;
    }
    
    next();
  };

  module.exports=RateLimit;