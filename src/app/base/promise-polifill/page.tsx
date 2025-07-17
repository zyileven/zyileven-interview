import CodeSyntax from '@/components/CodeSyntax';
import { getFileContentByPath } from '@/lib/server-utils';

async function PromisePolyfillPage() {

  const content = getFileContentByPath("src/lib/js-lib/PromisePolyfill.js")

  return (
    <div>
      <p>以下是一个基础 Promise polyfill 实现，支持 then 方法、状态管理和异步执行：</p>
      <CodeSyntax code={content} />

      <h3 className='text-2xl'>关键实现点​：</h3>
      <div className='font-bold my-4'>状态机​：</div>
      通过 state 管理状态（pending/fulfilled/rejected），确保不可逆。
      <div className='font-bold my-4'>回调队列​：</div>
      异步回调存储在 onFulfilledCallbacks 和 onRejectedCallbacks 中，状态变更时触发。
      <div className='font-bold my-4'>异步执行​：</div>
      setTimeout 模拟微任务（原生 Promise 使用微任务队列），确保 then 回调在当前宏任务后执行。
      <div className='font-bold my-4'>链式调用​：</div>
      then 返回新 Promise，支持连续调用和值传递。
      <div className='font-bold my-4'>局限性​：</div>
      <p>{`>未实现 catch、finally 或静态方法（如 Promise.all）。`}</p>
      <p>{`>生产环境建议使用成熟 polyfill 库（如 es6-promise）。`}</p>

    </div>
  );
}

export default PromisePolyfillPage;