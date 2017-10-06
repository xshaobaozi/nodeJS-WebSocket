import css from './../style/index.scss';
import IO from 'socket.io-client';

const Socket = IO.connect();

window.onload = e => {
    init();
}


function init (){
    const Login = document.querySelector('.send-socket-name');
    const Send = document.querySelector('.send-socket-val');
    const text = document.querySelector('.send-val');
    const name = document.querySelector('.send-name');

    Login.addEventListener('click', () => {
        if(name.value.trim().length > 0) {
            Socket.emit('login', name.value);
        }else{
            console.log('请输入名字啊~')
        }
    })
    Send.addEventListener('click', () => {
        let data = {
            name: name.value,
            val: text.value
        };
        Socket.emit('send', data);
    })

    Socket.on('nickExisted',function(val) {
        console.log('用户登录失败')
        console.log(val)
    })

    Socket.on('system', function(val) {
        console.log(val);
    })

    Socket.on('postmsg', function(val) {
        let msg = val;
        console.log(msg);
    })
}