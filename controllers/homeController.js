const getHome = (req, res) => {
  res.status(200).json({
    message: 'Video Game Library API'
  });
};

module.exports = {
  getHome
};