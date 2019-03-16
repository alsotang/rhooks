import { useCallback, useEffect, useRef, useState } from "react";
// Like in a constructor. Only run once when the function component init.
export function useConstructor(fn) {
    useState(fn);
}
// Like componentDidMount
export function useDidMount(fn) {
    useEffect(() => {
        fn();
    }, []);
}
// Like componentDidUpdate.
export function useDidUpdate(fn) {
    const firstRunRef = useRef(true);
    useEffect(() => {
        if (firstRunRef.current) {
            firstRunRef.current = false;
        }
        else {
            fn();
        }
    });
}
// Like componentWillUnmount
export function useWillUnmount(fn) {
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
export function useInterval(callback, delay) {
    const savedCallback = useRef();
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
        }
        else {
            return undefined;
        }
    }, [delay]);
}
//# sourceMappingURL=rhooks.js.map