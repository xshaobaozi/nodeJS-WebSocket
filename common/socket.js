const Chat = new (require('./chat'))();
const api = require('./api');


//socket.emit 只有当前客户端收到
//socket.broadcast.emit 除了自己以外的所有客户端收到
//IO表示个Socket连接 所有 IO.socket.emit表示所有客户端收到
const SOCKET = socket => {
    //登录
    socket.on('login',function(info){
        if(Chat.addUser(info)){
            const val = `新用户登录登录, 当前在线人数${Chat.getListCount()}人`;
            socket.info = info;
            socket.emit('loginSuccess');
            socket.broadcast.emit('system', api.success({val}));
        }else {
            const msg = '已经有相同角色'
            socket.emit('nickExisted', api.error({msg}))
        }
    })

    //发送消息
    socket.on('send', function(val) {
        let msg = val;
        socket.broadcast.emit('postmsg', api.success({msg}));
    })

    //用户断开连接
    socket.on('disconnect', function() {
        if(!socket.info){
            return false;
        }
        if(Chat.disconnect(socket.info)){
            let msg = `当前在线人数${Chat.getListCount()}人`;
            socket.broadcast.emit('system', api.success({msg}))
        }else{
            console.log('用户退出错误');
            console.log(socket.info);
        }
    })
}

module.exports = SOCKET;