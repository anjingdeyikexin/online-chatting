/**
 * Created by plter on 2016/11/10.
 */

(function () {

    var socket = io(location.origin);/* 当前页面所在的服务器   连接指定服务器*/

    var chatOut = document.querySelector("#ta-chat-out");
    var chatInputForm = document.querySelector("#form-chat-input");

    chatInputForm.addEventListener("submit", function (e) {
        e.preventDefault();
        // 通过socket往服务器发
        socket.emit("chat", {
            name: this['name'].value,
            message: this['chat-input'].value
        });

        this['chat-input'].value = "";
    });

    socket.on("chat", function (data) {/*侦听
      如果别人发了消息 前端侦听到服务器发的消息
      把主页上的输出框添加上 */
        chatOut.innerHTML += data.name + ":\n" + data.message + "\n";
        chatOut.scrollTop = chatOut.scrollHeight;
        /*滚动到最下面*/
    });

})();