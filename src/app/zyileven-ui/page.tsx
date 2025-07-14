"use client";
import Button from "@/components/custom-ui/Button";

function ZyilevenUIPage() {
  const handleClick = () => {
    alert("点击了")
  }
  return (
    <div className="p-10">
      <h1 className="text-3xl my-5 font-extrabold">按钮组件</h1>
      <h2 className="text-2xl">按钮变体</h2>
      <div className="flex gap-3 m-5">
        <Button onClick={handleClick} variant="primary">primary</Button>
        <Button onClick={handleClick} variant="secondary">secondary</Button>
        <Button onClick={handleClick} variant="tertiary">tertiary</Button>
        <Button onClick={handleClick} variant="danger">danger</Button>
        <Button onClick={handleClick} variant="success">success</Button>
      </div>
      <h2 className="text-2xl">特殊效果</h2>
      <div className="flex gap-3 m-5">
        <Button onClick={handleClick} variant="gradient">gradient</Button>
        <Button onClick={handleClick} variant="neon">neon</Button>
      </div>
      <h2 className="text-2xl">尺寸大小</h2>
      <div className="flex gap-3 m-5">
        <Button onClick={handleClick} variant="primary" size="xs">primary</Button>
        <Button onClick={handleClick} variant="primary" size="sm">primary</Button>
        <Button onClick={handleClick} variant="primary" size="md">primary</Button>
        <Button onClick={handleClick} variant="primary" size="lg">primary</Button>
        <Button onClick={handleClick} variant="primary" size="xl">primary</Button>
      </div>
      <h2 className="text-2xl">按钮状态</h2>
      <div className="flex gap-3 m-5">
        <Button onClick={handleClick}>primary</Button>
        <Button onClick={handleClick} loading={true}>loading</Button>
        <Button onClick={handleClick} disabled={true}>disabled</Button>
      </div>
    </div>
  );
}

export default ZyilevenUIPage;