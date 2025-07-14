import { useCallback, useEffect, useRef } from "react";

export default function useThrottle<T extends (...args: any[]) => any>(
  fn: T,
  delay: number,
  immediate?: boolean
) {

  const fnRef = useRef(fn);
  const lastTimeRef = useRef(0);
  const timerRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    fnRef.current = fn;
  }, [fn])

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return useCallback((...args: any[]) => {

    const now = Date.now(); // 当前时间
    const shouldExecuteImmediately = immediate && lastTimeRef.current === 0;

    // 1. 立即执行（首次调用）
    if (shouldExecuteImmediately) {
      fnRef.current(...args);
      lastTimeRef.current = now;
      return;
    }

    // 2. 清除待执行定时器
    if (timerRef.current) clearTimeout(timerRef.current);

    // 3. 计算距离下次执行的剩余时间
    const elapsed = now - lastTimeRef.current;
    const remainTime = delay - elapsed;

    if (remainTime <= 0) {
      // 超过节流间隔：立即执行
      fnRef.current(...args);
      lastTimeRef.current = now;
    } else {
      // 未超过节流间隔：设置延迟执行
      timerRef.current = setTimeout(() => {
        fnRef.current(...args);
        lastTimeRef.current = Date.now(); // 更新执行时间
      }, remainTime);
    }

  }, [delay, immediate])
}



