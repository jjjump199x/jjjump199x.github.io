$(document).ready(function(){
    // DEFINING VARIABLES
    // For broker
    var client = mqtt.connect(document.getElementById('broker_input').value);
    // For date and time
    var dt = new Date();
    var date = dt.toDateString();
    var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
    // // For publish topic
    // var topic = $('#publish-input').val();
    // // For publish payload
    // var payload = $('#publish-input-payload').val();


    // FUNCTION USE TO CINNECT TO THE BROKER
    $('#connect_btn').click(function(){
        console.log("Connecting to " + client);

        client.on('connect', function(){
            $('#display-status').val("Successfully Connected!");
            console.log("Successfully connected to " + client);
        })

        // FUNCTION FOR PUBLISH
        $('#publish-button').click(function(){
            var topic = $('#publish-input').val();
            console.log(topic);
            var payload = $('#publish-input-payload').val();
            console.log(payload);

            client.publish(topic, payload);
            $('#tbl-body-pub').append("<tr><td>" + topic + "</td> <td> " + payload + "</td><td>" + date + " " + time + "</td></tr>")
        })


        //  FUNCTION FOR SUBSCRIBE
        $('#subscribe-button').click(function(){
            var topic = $('#subscribe-input').val();
            console.log(topic);

            client.subscribe(topic);
            $('#tbl-body-sub').append("<tr><td>" + topic + "</td><td>" + date + " " + time + "</td></tr>");
        })


        // FUNCTION FOR INCOMING MESSAGES
        client.on('message', function(topic, payload) {  
            var topic = $('#publish-input').val();
            $('#tbl-body').append("<tr><td>" + topic + "</td> <td> " + payload + "</td><td>" + date + " " + time + "</td></tr>")
        })
    })
})