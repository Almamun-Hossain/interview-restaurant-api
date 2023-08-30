const sendToken = (user, statusCode, res) => {
  const token = user.getJwtToken();
  //option for cookies
  // const options = {
  //   expires: new Date(
  //     Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
  //   ),
  //   httpOnly: true,
  //   sameSite: "none",
  // };
  //send the response
  res.status(statusCode).json({ success: true, user, token });
    // .cookie("token", token, options)
    
};

module.exports = sendToken;
