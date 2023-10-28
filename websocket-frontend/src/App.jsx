// import React, { useState, useEffect } from "react";
// import { Client } from "@stomp/stompjs";

// const App = () => {
//   const [client, setClient] = useState(null);
//   const [connected, setConnected] = useState(false);
//   const [name, setName] = useState("");
//   const [greeting, setGreeting] = useState(null);

//   useEffect(() => {
//     const newClient = new Client({
//       brokerURL: "ws://localhost:8080/gs-guide-websocket",
//       connectHeaders: {
//         login: "",
//         passcode: "",
//       },
//       debug: function (str) {
//         console.log(str);
//       },
//       reconnectDelay: 5000,
//       heartbeatIncoming: 4000,
//       heartbeatOutgoing: 4000,
//     });

//     newClient.onConnect = (frame) => {
//       setConnected(true);

//       newClient.subscribe("/topic/greetings", (message) => {
//         console.log("msg-1.........");
//         setGreeting(JSON.parse(message.body).content);
//       });
//     };

//     newClient.onStompError = (frame) => {
//       console.error(`Broker reported error: ${frame.headers["message"]}`);
//       console.error(`Additional details: ${frame.body}`);
//     };

//     setClient(newClient);
//     newClient.activate();

//     return () => {
//       if (client) {
//         client.deactivate();
//       }
//     };
//   }, []);

//   const sendMessage = () => {
//     if (client) {
//       const msg = { name };
//       client.publish({ destination: "/app/hello", body: JSON.stringify(msg) });
//     }
//   };

//   return (
//     <div>
//       <h2>WebSocket Test</h2>
//       <div>{connected ? "Connected" : "Disconnected"}</div>
//       <input
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         placeholder="Enter your name"
//       />
//       <button onClick={sendMessage}>Send</button>
//       {greeting && <div>{greeting}</div>}
//     </div>
//   );
// };

// export default App;

import React, { useState, useEffect } from "react";
import { Client } from "@stomp/stompjs";

const App = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const client = new Client({
      brokerURL: "ws://localhost:8080/gs-guide-websocket",
      reconnectDelay: 1000,
    });

    client.onConnect = () => {
      console.log("Connected to WebSocket");
      client.subscribe("/topic/greetings", (onMessageReceived) => {
        const messageContent = JSON.parse(onMessageReceived.body).content;
        console.log("Received message:", messageContent);
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          messageContent,
        ]);
      });
    };

    client.activate();

    return () => {
      client.deactivate();
    };
  }, []);

  const onMessageReceived = (message) => {
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      message.body,
    ]);
  };

  return (
    <div>
      <h1>Event Reminders</h1>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
