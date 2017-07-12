

//子进程
//接受来自父进程的消息
process.on('message', function(msg) {
  console.log('收到父进程的消息:', msg);
});

//向父进程发送消息
process.send({ Hello: 'Mr.zhao' });