// TODO sprada: A proper way to define different types
// of status codes that come through Boom
export default function (err, req, res, next) {
  console.log(err); //Development help, remove for production
  
  return res.status(500).send(err);
}