
function FlipPage() {

  return (
    <div className="overflow-hidden">
      <h1 className="text-2xl">使用 CSS 实现左右/上下翻转的操作</h1>

      <h2 className="text-xl my-3">左右翻转</h2>
      <div className="text-[14px] font-bold my-2">
        1.使用 scaleX(-1) 实现左右方向翻转
      </div>
      <div className="flex gap-10">
        <div className="w-[100px] h-[100px] border-2 border-l-[red] border-r-[blue]">
          scaleX
        </div>
        <div className="w-[100px] h-[100px] border-2 border-l-[red] border-r-[blue] scale-x-[-1]">
          scaleX
        </div>
      </div>
      <div className="text-[14px] font-bold my-2">
        2.使用 rotateY(180deg) 实现左右翻转
      </div>
      <div className="flex gap-10">
        <div className="w-[100px] h-[100px] border-2 border-l-[red] border-r-[blue]">
          rotateY
        </div>
        <div className="w-[100px] h-[100px] border-2 border-l-[red] border-r-[blue] rotate-y-[180deg]">
          rotateY
        </div>
      </div>
      <div className="text-[14px] font-bold my-2">
        3.使用 matrix() 实现左右翻转（矩阵变换）matrix(1, 0, 0, -1, 0, 0)
      </div>
      <div className="flex gap-10">
        <div className="w-[100px] h-[100px] border-2 border-l-[red] border-r-[blue]">
          matrix
        </div>
        <div className="w-[100px] h-[100px] border-2 border-l-[red] border-r-[blue] transform transform-flip-horizontal">
          matrix
        </div>
      </div>

      <h2 className="text-xl my-3">上下翻转</h2>
      <div className="text-[14px] font-bold my-2">
        1.使用 scaleY(-1) 实现上下方向翻转
      </div>
      <div className="flex gap-10">
        <div className="w-[100px] h-[100px] border-2 border-t-[red] border-b-[blue]">
          scaleY
        </div>
        <div className="w-[100px] h-[100px] border-2 border-t-[red] border-b-[blue] scale-y-[-1]">
          scaleY
        </div>
      </div>
      <div className="text-[14px] font-bold my-2">
        2.使用 rotateX(180deg) 实现上下翻转
      </div>
      <div className="flex gap-10">
        <div className="w-[100px] h-[100px] border-2 border-t-[red] border-b-[blue]">
          rotateX
        </div>
        <div className="w-[100px] h-[100px] border-2 border-t-[red] border-b-[blue] rotate-x-[180deg]">
          rotateX
        </div>
      </div>
      <div className="text-[14px] font-bold my-2">
        3.使用 matrix() 实现上下翻转（矩阵变换）matrix(-1, 0, 0, 1, 0, 0)
      </div>
      <div className="flex gap-10">
        <div className="w-[100px] h-[100px] border-2 border-t-[red] border-b-[blue]">
          matrix
        </div>
        <div className="w-[100px] h-[100px] border-2 border-t-[red] border-b-[blue] transform transform-flip-matrix">
          matrix
        </div>
      </div>

    </div>
  );
}

export default FlipPage;