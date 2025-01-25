import bus from './bus'

export let websocket: any = null;
let websocket_host = ""; // webSocket连接地址端口
// console.log(import.meta.env)
if (import.meta.env.MODE == 'development') {
  websocket_host = "ws://127.0.0.1:8800/notify?token="
} else {
  let host = window.location.host;
  websocket_host = `wss://${host}/notify?token=`
}


// 重连次数限制
const limitReconnectedCount = 5;
// 断开连接重连次数
let reconectedCount = 0;

// 初始化weosocket
export function initWebSocket() {
  let token = ''
  // ws地址
  let websocket_url = websocket_host + token
  console.log(`%c init server WebSocket url: ${websocket_url}`, "color: #67C23A;border:1px solid #67C23A;");
  websocket = new WebSocket(websocket_url);

  websocket.onopen = function () {
    // console.log(websocket);
    console.log(`%c websocket 连接成功`, "color: #fff;background-color: #67C23A;");
    reconectedCount = 0;
    heartbeat()
  };
  websocket.onmessage = websocketonmessage;
  websocket.onclose = function (e: any) {
    console.log("%c websocket 连接关闭", "color: #fff;background-color: #F56C6C;");
    stopHeartbeat()
    // reConnectSocket()
  };
  // 连接发生错误的回调方法
  websocket.onerror = function (e: any) {
    console.log("%c websocket 连接发生错误", "color: #fff;background-color: #F56C6C;", e);
    stopHeartbeat()
    // reConnectSocket()
  };
}

// 实际调用的方法
export function sendSock(agentData: any) {
  if (websocket.readyState === websocket.OPEN) {
    // 若是ws开启状态
    websocketsend(agentData);
  } else if (websocket.readyState === websocket.CONNECTING) {
    // 若是 正在开启状态，则等待1s后重新调用
    setTimeout(function () {
      sendSock(agentData);
    }, 1000);
  } else {
    // 若未开启 ，则等待1s后重新调用
    setTimeout(function () {
      sendSock(agentData);
    }, 1000);
  }
}
// 正常关闭WebSocket连接
export const closeServerWebsocket = () => {
  if (websocket.readyState === WebSocket.OPEN) {
    websocket.close(1000, 'close');
  }
}

// 数据接收
function websocketonmessage(e: any) {
  // let _data = e.data;
  // console.log(_data)
  // let data = JSON.parse(_data);
  // console.log(data)
  // let eventId: string = data.id;

}

// 数据发送
function websocketsend(agentData: any) {
  console.log(agentData);
  websocket.send(agentData);
}

/**
 * 重连
 */
const reConnectSocket = () => {
  if (reconectedCount < limitReconnectedCount) {
    reconectedCount++;
    console.error(`websocket 正在第 ${reconectedCount} 次重连`);
    initWebSocket();
  } else {
    console.error("websocket 超出重连次数");
  }
};

let heartbeatId: any = null;
let beatInterval = 30; //心跳间隔，秒
/**
 * 心跳保活
 */
const heartbeat = () => {
  beatInterval = beatInterval || 30;
  let interval = beatInterval * 1000;
  if (heartbeatId) {
    stopHeartbeat()
  }
  heartbeatId = setInterval(() => {
    websocket.send("heartbeat");
  }, interval);
};
/**
 * 停止保活
 */
export const stopHeartbeat = () => {
  clearInterval(heartbeatId);
};

// initWebSocket();
