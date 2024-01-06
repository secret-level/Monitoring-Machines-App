getLogout = (request, response) =>
{
  request.session.destroy();
  response.status(200).end();
};

module.exports = {
  getLogout
};