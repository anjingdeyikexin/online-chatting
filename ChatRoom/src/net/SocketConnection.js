/**
 * Created by plter on 2016/11/10.
 */

function removeObjectFromArray(obj, arr) {
    var index = arr.indexOf(obj);
    if (index != -1) {
        arr.splice(index, 1);
    }
}

class SocketConnection {

    constructor(socket) {

        this._socket = socket;

        SocketConnection.allConnections.push(this);

        socket.on("chat", function (data) {
            /*添加当前连接对象      聊天室*/
            SocketConnection.allConnections.forEach(sc=> {
                sc.socket.emit("chat", data);
            });
        });

        socket.on("disconnect", ()=> {
            removeObjectFromArray(this, SocketConnection.allConnections);
        });
    }

    get socket() {
        return this._socket;
    }
}

SocketConnection.allConnections = [];/*静态成员*/

module.exports = SocketConnection;