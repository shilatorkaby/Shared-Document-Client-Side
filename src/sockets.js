import * as SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { serverAddress } from "./constants";
import { update} from './edit';
// import { update } from './doc-functions';


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


const addUpdate = (sender, reciever, type, content, position,startPos,endPos, senderDocId, recieverDocId) => {
  sendUpate(sender, reciever, "APPEND", content, position,startPos,endPos, senderDocId, recieverDocId)
}

const sendUpate = (sender, reciever, type, content, position,startPos,endPos, senderDocId, recieverDocId) => {
  // console.log(user + "sendUpdate");
  stompClient.send("/app/update", [], JSON.stringify({
      sender: sender,
      reciever: reciever,
      type: type,
      content: content,
      position: position,
      startPos: startPos,
      endPos: endPos,
      senderDocId : senderDocId,
      recieverDocId : recieverDocId,
  }))
}

export { openConnection, addUpdate };
