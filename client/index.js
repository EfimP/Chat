let socket = new WebSocket("ws://localhost:8000");

socket.onopen = (event) =>{
    console.log("Socket open");
};

socket.onmessage = (event) => { 
    $("#MsgArea").append(event.data + "\n");
};

export function OnMouseClick (text) {
    socket.send(text);
    console.log("Message:", text);
}