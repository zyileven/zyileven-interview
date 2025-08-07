"use client";
import { useState, useRef } from "react";

const Carousel = ({ images, autoPlayInterval = 3000 }) => {
  const autoPlayRef = useRef<NodeJS.Timeout>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 手动切换时暂停自动播放
  const pauseAutoPlay = () => {
    if (!autoPlayRef.current) return;
    clearInterval(autoPlayRef.current);
    setTimeout(() => {
      if (images.length > 1) {
        autoPlayRef.current = setInterval(goToNext, autoPlayInterval);
      }
    }, 5000); // 5秒后恢复自动播放
  };

  const goToPrev = () => {
    setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
    pauseAutoPlay();
  };

  const goToNext = () => {
    setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  console.log("currentIndex:zzz", currentIndex);


  return <div className="relative w-[100%] h-[300px] max-w-[1200px] m-auto overflow-hidden">
    {/* 轮播内容区 */}
    <div className="relative h-[100%]">
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-[100%] h-[100%] bg-cover bg-center ${index === currentIndex ? "opacity-100 z-[10]" : "opacity-50 z-0"} delay-[0.5s] ease-in-out`}
        >
          <img alt="tupian" src={img} />
        </div>
      ))}
    </div>

    {/* 导航按钮 */}
    {images.length > 1 && (
      <>
        <button className="absolute top-[50%] transform translate-y-[-50%] bg-[rgba(0,0,0,0.5)] text-white border-none w-[40px] h-[40px] rounded-[50%] text-[1.2rem] cursor-pointer z-[10] left-[15px]" onClick={goToPrev}>
          &lt;
        </button>
        <button className="absolute top-[50%] transform translate-y-[-50%] bg-[rgba(0,0,0,0.5)] text-white border-none w-[40px] h-[40px] rounded-[50%] text-[1.2rem] cursor-pointer z-[10] right-[15px]" onClick={goToNext}>
          &gt;
        </button>
      </>
    )}
  </div>
}



function namePage() {

  const imagesUrl = [
    "https://act-webstatic.mihoyo.com/puzzle/mall/mall_cn__1754042320/resource/puzzle/2025/07/04/859500f5e2f8d7790afd779ef5e00986_4661879743165144288.jpg?x-oss-process=image/format,webp/quality,Q_90",
    "https://act-webstatic.mihoyo.com/puzzle/mall/mall_cn__1754042320/resource/puzzle/2025/03/31/993dc22a3834ad666f9be2c9fe9f4144_7879624449462779833.jpg?x-oss-process=image/format,webp/quality,Q_90",
    "https://act-webstatic.mihoyo.com/puzzle/mall/mall_cn__1754042320/resource/puzzle/2025/07/04/8aed2ebb7bcbed2096d718ed5f33e1d6_2383739158903760266.jpg?x-oss-process=image/format,webp/quality,Q_90",
    "https://act-webstatic.mihoyo.com/puzzle/mall/mall_cn__1754042320/resource/puzzle/2025/07/21/6d75236a9a00c0701864f966fc6cba9b_3807332525643835693.jpg?x-oss-process=image/format,webp/quality,Q_90",
    "https://act-webstatic.mihoyo.com/puzzle/mall/mall_cn__1754042320/resource/puzzle/2024/04/18/22730979b037dbd4d122b66cf2542dd4_4177210147370488611.jpg?x-oss-process=image/format,webp/quality,Q_90"
  ]

  return (
    <div>
      <Carousel images={imagesUrl} />
    </div>
  );
}

export default namePage;