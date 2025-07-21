"use client";

import React, { useRef, useEffect, ReactNode } from "react";

const ShadowView = ({ children, mode = 'open' }: {
  children: ReactNode,
  mode?: ShadowRootMode
}) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const shadowRootRef = useRef<ShadowRoot>(null);

  useEffect(() => {
    if (hostRef.current && !shadowRootRef.current) {
      // 创建 Shadow DOM
      const shadowRoot = hostRef.current.attachShadow({ mode });
      shadowRootRef.current = shadowRoot;
      
      // 移动所有子节点到 Shadow DOM
      while (hostRef.current.firstChild) {
        shadowRoot.appendChild(hostRef.current.firstChild);
      }
    }
  }, [mode]);

  return <div className="max-w-full" ref={hostRef}>{children}</div>;
};

export default ShadowView;