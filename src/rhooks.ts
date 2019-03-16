import { useCallback, useEffect, useRef, useState } from "react";

type TVoidFn = () => void;

// Like in a constructor. Only run once when the function component init.
export function useConstructor(fn: TVoidFn) {
    useState(fn);
}

// Like componentDidMount
export function useDidMount(fn: TVoidFn) {
    useEffect(() => {
        fn();
    }, []);
}

// Like componentDidUpdate.
export function useDidUpdate(fn: TVoidFn) {
    const firstRunRef = useRef(true);

    useEffect(() => {
        if (firstRunRef.current) {
            firstRunRef.current = false;
        } else {
            fn();
        }
    });
}

// Like componentWillUnmount
export function useWillUnmount(fn: TVoidFn) {
    useEffect(() => fn, []);
}

// Force component rerender
export function useForceRender() {
    const [, setTick] = useState(true);

    const forceRender = useCallback(() => {
        setTick((v) => !v);
    }, []);

    return forceRender;
}

// according tohttps://overreacted.io/making-setinterval-declarative-with-react-hooks/
export function useInterval(callback: () => void, delay: number) {
    const savedCallback = useRef<typeof callback>();

    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        const id = setInterval(tick, delay);
        return () => clearInterval(id);
      } else {
        return undefined;
      }
    }, [delay]);
  }
