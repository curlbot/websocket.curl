/// Copyright (C) SCSK Corp. All Rights Reserved.

/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
/// 
///     http://www.apache.org/licenses/LICENSE-2.0
/// 
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.

/* 
   Websocket server on node.js

   1. Install node.js
   2. npm install websocket-server
 */

var server = require('websocket-server').createServer();

server.addListener('connection', 
    function(con) {
	console.log('Connected!! id=' + con.id); // client id

        // send message to client.
        con.send('Hello!!');
        con.send(con.id, 'Hello me!!');
        con.broadcast('Hello (broadcast)!!');


        // event handlers
        con.addListener('message', function(message) {
	    console.log('Received!! message=' + message);
        });

        con.addListener('stateChange', function(state) {
		/*
                    0. unknown
                    1. opening
                    2. waiting
                    3. handshaking
                    4. connected
                    5. closing
                    6. closed
		*/
	    console.log('Changed Status!! state=' + state);
        });

        con.addListener('close', function() {
	    console.log('Closed!!');
        });
    }
);
server.addListener('disconnect', 
    function(con) {
        console.log('Disconnected!! id=' + con.id);
    }
);

server.listen(10080);
