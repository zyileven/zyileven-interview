let i = 1

function simpleCount() {
  i++
  self.postMessage(i)
  setTimeout(simpleCount, 1000)
}

simpleCount()

// self 代表子线程自身
self.onerror = (ev) => { // 指定 worker 线程发生错误时的回调
  self.close(); // worker 线程关闭自己
}

self.onmessage = ev => { // 指定主线程发 worker 线程消息时的回调
  postMessage(ev.data + ' 呵呵~') // worker 线程往主线程发消息，消息可以是任意类型数据，包括二进制数据
}