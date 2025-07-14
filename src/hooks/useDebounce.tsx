// useDebounce.tsx
import { useCallback, useEffect, useRef } from "react";

export default function useDebounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number,
  immediate?: boolean
) {
  const timerRef = useRef<NodeJS.Timeout>(null)
  const fnRef = useRef(fn);
  
  useEffect(() => {
    fnRef.current = fn;
  }, [fn])

  useEffect(() => { // 组件卸载后清除定时器
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return useCallback((...args: any[]) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (!timerRef.current && immediate) {
      fnRef.current(...args);
    }
    timerRef.current = setTimeout(() => {
      fnRef.current(...args);
    }, delay)
  }, [delay, immediate])
}