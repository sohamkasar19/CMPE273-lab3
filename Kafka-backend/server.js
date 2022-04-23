var connection =  new require('./kafka/Connection');

var mongoose = require("mongoose");
const ATLAS_URI = "mongodb+srv://dbuser:dbpassword@etsy-cluster.l1wsv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(ATLAS_URI, { useNewUrlParser: true });

//topics files
//var signin = require('./services/signin.js');
var itemService = require('./service/itemService.js')

function handleTopicRequest(topic_name,handle_request){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name );
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        handle_request(data.data, data.action, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
// handleTopicRequest("post_book",Books)
// handleTopicRequest("add-item", itemController.add_item)
// handleTopicRequest("edit-item", itemController.edit_item)
handleTopicRequest("item-topic", itemService.item_functions)
// handleTopicRequest("add-item", itemController.add_item)
