export default function (err, req, res, next) {
  if(err && err.output){
    const { payload, statusCode } = err.output;
    res.status(statusCode);
    return res.send(payload);
  }

  return res.status(500).send(err);
}