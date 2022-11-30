import * as SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { serverAddress } from "./constants";
import { update} from './edit';


let stompClient;
const socketFactory = () => {
  return new SockJS(serverAddress + "/ws");
};

const onMessageReceived = (payload) => {
  var message = JSON.parse(payload.body);
  console.log(message);
  update(message);
};

const onConnected = () => {
  console.log("on connected");
  stompClient.subscribe("/topic/updates", onMessageReceived);
  stompClient.send("/app/hello", [], JSON.stringify({ name: "Default user" }));
};

const openConnection = () => {
  console.log("on open connected");
  const socket = socketFactory();
  stompClient = Stomp.over(socket);
  stompClient.connect({}, onConnected);
};


const addUpdate = (token, content, position,startPos,endPos,docId) => {
  sendUpate(token, "APPEND", content, position,startPos,endPos,docId)
}

const sendUpate = (user, type, content, position,startPos,endPos,docId) => {
  console.log(user + "sendUpdate");
  stompClient.send("/app/update", [], JSON.stringify({
      user: user,
      type: type,
      content: content,
      position: position,
      startPos: startPos,
      endPos: endPos,
      docId: docId
  }))
}

export { openConnection, addUpdate };
