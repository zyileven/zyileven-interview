## readline



### 核心作用

**逐行读取**：从可读流（如 `process.stdin`）按行读取输入，适用于命令行交互场景

**交互控制**：管理用户输入流程，支持提示、确认、选择等交互逻辑



### 关键方法与属性

**createInterface()**

创建接口实例，绑定输入/输出流（如 `stdin/stdout`）

**rl.question()**

显示提示信息，等待用户输入后触发回调

**rl.close()**

关闭接口并释放流资源，触发 `'close'` 事件

**rl.on('line', ...)**

监听用户按回车键提交的输入行，用户输入一行内容并按下回车时触发

**rl.on('close', ...)**

监听接口关闭时触发的事件

**rl.on('SIGINT', ...)**

监听 `Ctrl+C` 信号，实现优雅退出

**rl.pause()**

暂停输入流（如防止事件冲突）

**rl.resume()**

恢复输入流

**rl.write()**

直接向输出流写入内容（如模拟按键 `Ctrl+U` 删除文本）

**rl.setPrompt()**

修改命令行提示符样式





#### 创建接口实例并接收用户输入

```ts
rl = readline.createInterface({ 
	input: process.stdin, // 使用标准输入（键盘）作为输入源
  output: process.stdout // 使用标准输出（屏幕）作为输出目标
})

try {
  const commitMessage = await new Promise((resolve) => {
    rl.question('请输入提交信息 (可选): ', resolve);
  });
} catch (err) {
  console.error('❌ 发生错误:', error.message);
  process.exit(1);
} finally {
  rl.close(); // 关闭 readline 接口
}
```

#### 自动补全

```ts
readline.createInterface({
  input: process.stdin, // 使用标准输入（键盘）作为输入源
  output: process.stdout // 使用标准输出（屏幕）作为输出目标
  completer: (line) => [['major','minor','patch'], line]
});
```

