var rpc = new (require("./kafkarpc"))();

//make request to kafka
function make_request(queue_name, action, msg_payload, callback) {
  console.log("in make request");
  console.log(msg_payload, action);
  rpc.makeRequest(queue_name, action, msg_payload, function (error, response) {
    if (error) {
      callback(error, null);
    } else {
      console.log("response", response);
      callback(null, response);
    }
  });
}

exports.make_request = make_request;
