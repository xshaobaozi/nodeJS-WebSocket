class Chat {
    constructor() {
        this.list = [];
    }
    //检查用户
    checkUser(info) {
        return this.list.findIndex(arr => arr === info) > -1
    }
    getListCount() {
        return this.list.length;
    }
    //添加用户
    addUser(info) {
        if(this.checkUser(info)){
            return false;
        }else{
            this.list.push(info);
            return true
        }
    }
    //删除用户
    deleteUser(info) {
        if(this.checkUser(info)){
            const index = this.list.findIndex(item => item === info);
            this.list.splice(index, 1);
        }
    }
    // //发送消息
    // sendMsg(Methods, info) {
    //     this._socket.broadcast.emit(Methods, info);
    // }
    // //接收信息
    // getMsg(Methods, info) {
    //     this.sendMsg(Methods, info);
    // }
    
    //断开连接
    disconnect(info) {
        if(this.checkUser(info)){
            this.deleteUser(info)
            return true;
        }else{
            return false;
        }
    }
}

module.exports = Chat;