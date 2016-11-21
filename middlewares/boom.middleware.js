// TODO sprada: A proper way to define different types
// of status codes that come through Boom
export default function (err, req, res, next) {
  return res.status(500).send();
}