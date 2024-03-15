"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const ImageChanger = () => {
  const [windowWidth, setWindowWidth] = useState(0);

  // ウィンドウサイズが変更された際にwindowWidthを更新する
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize(); // 初期値をセット
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 画面の幅によって画像を切り替える
  let imageSrc;
  if (windowWidth < 768) {
    imageSrc = "/images/bg-mobile.svg";
  } else {
    imageSrc = "/images/bg.svg";
  }
  return (
    <div>
      <div className={`fixed top-0 left-0 w-full h-screen z-[-1]`}>
        <Image
          src={"/images/bg.svg"}
          layout={`fill`}
          objectFit={`cover`}
          alt={"背景画像"}
        />
      </div>
    </div>
  );
};

export default ImageChanger;
