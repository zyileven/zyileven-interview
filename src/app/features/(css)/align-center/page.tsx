import CodeSyntax from "@/components/CodeSyntax";

const CODE1 = `
<style>
  .father{
    width: 500px;
    height: 300px;
    border: 1px solid #0a3b98;
  }
  .son{
    width: 100px;
    height: 100px;
    background: #f0a238;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
</style>
<div class="father">
  <div class="son"></div>
</div>
`

const CODE2 = `
<style>
  .father{
    position: relative;
    width: 500px;
    height: 300px;
    border: 1px solid #0a3b98;
  }
  .son{
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -50px;
    margin-top: -50px;
    width: 100px;
    height: 100px;
    background: #f0a238;
  }
</style>
<div class="father">
  <div class="son">
    
  </div>   
</div>
`

const CODE3 = `
<style>
  .father{
    position: relative;
    width: 500px;
    height: 300px;
    border: 1px solid #0a3b98;
  }
  .son{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
    background: #f0a238;
  }
</style>

<div class="father">
  <div class="son">
    
  </div>
</div>
`

const CODE4 = `
<style>
  .father{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 500px;
    height: 300px;
    border: 1px solid #0a3b98;
  }
  .son{
    width: 100px;
    height: 100px;
    background: #f0a238;
  }

</style>

<div class="father">
  <div class="son">
    
  </div>
</div>
`

const CODE5 = `
<style>
  .father{
    display: table-cell;
    width: 500px;
    height: 300px;
    border: 1px solid #0a3b98;
    vertical-align: middle;
    text-align: center;
  }
  .son{
    display: inline-block;
    width: 100px;
    height: 100px;
    background: #f0a238;
  }
</style>

<div class="father">
  <div class="son">
    
  </div>
</div>
`

const CODE6 = `
<style>
  .father{
    display: grid;
    align-items: center;
    justify-content: center;
    width: 500px;
    height: 300px;
    border: 1px solid #0a3b98;
  }
  .son{
    width: 100px;
    height: 100px;
    background: #f0a238;
  }
</style>

<div class="father">
  <div class="son">
    
  </div>
</div>
`

function namePage() {

  return (
    <div>
      <h1 className="text-3xl font-bold">元素居中的方式</h1>

      <h2 className="text-2xl font-bold my-6">一、利用定位 + margin:auto</h2>
      <div className="flex">
        <div className="shrink-0 relative w-[500px] h-[300px] border-1 border-[#0a3b98]">
          <div className="w-[100px] h-[100px] bg-[#f0a238] absolute top-0 left-0 right-0 bottom-0 m-auto"></div>
        </div>
        <div className="flex-1 overflow-auto px-4">
          <CodeSyntax code={CODE1} language="jsx" />
        </div>
      </div>

      <h2 className="text-2xl font-bold my-6">二、利用定位 + margin:负值</h2>
      <div className="flex">
        <div className="relative w-[500px] h-[300px] border-1 border-[#0a3b98]">
          <div className="w-[100px] h-[100px] bg-[#f0a238] absolute top-[50%] left-[50%] ml-[-50px] mt-[-50px]"></div>
        </div>
        <div className="flex-1 overflow-auto px-4">
          <CodeSyntax code={CODE2} language="jsx" />
        </div>
      </div>



      <h2 className="text-2xl font-bold my-6">三、利用定位 + transform</h2>
      <div className="flex">
        <div className="relative w-[500px] h-[300px] border-1 border-[#0a3b98]">
          <div className="w-[100px] h-[100px] bg-[#f0a238] absolute top-[50%] left-[50%] transform translate-[-50%]"></div>
        </div>
        <div className="flex-1 overflow-auto px-4">
          <CodeSyntax code={CODE3} language="jsx" />
        </div>
      </div>

      <h2 className="text-2xl font-bold my-6">四、flex布局</h2>
      <div className="flex">
        <div className="relative w-[500px] h-[300px] flex justify-center items-center border-1 border-[#0a3b98]">
          <div className="w-[100px] h-[100px] bg-[#f0a238]"></div>
        </div>
        <div className="flex-1 overflow-auto px-4">
          <CodeSyntax code={CODE4} language="jsx" />
        </div>
      </div>


      <h2 className="text-2xl font-bold my-6">五、table布局</h2>
      <div className="flex">
        <div className="relative">
          <div className="table-cell w-[500px] h-[300px] border-1 border-[#0a3b98] align-middle text-center ">
            <div className="inline-block w-[100px] h-[100px] bg-[#f0a238]"></div>
          </div>
        </div>
        <div className="flex-1 overflow-auto px-4">
          <CodeSyntax code={CODE5} language="jsx" />
        </div>
      </div>

      <h2 className="text-2xl font-bold my-6">六、grid网格布局</h2>
      <div className="flex">
        <div className="relative w-[500px] h-[300px] border-1 border-[#0a3b98] grid items-center justify-center">
          <div className="w-[100px] h-[100px] bg-[#f0a238]"></div>
        </div>
        <div className="flex-1 overflow-auto px-4">
          <CodeSyntax code={CODE6} language="jsx" />
        </div>
      </div>
    </div>
  );
}

export default namePage;