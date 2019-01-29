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
    const runOnceRef = useRef(false);
    useEffect(() => {
        if (runOnceRef.current) {
            fn();
        }
        else {
            runOnceRef.current = true;
        }
    });
}
// Like componentWillUnmount
export function useWillUnmount(fn) {
    useEffect(() => fn, []);
}
// Force component rerender
export function useForceRender() {
    const [, setTick] = useState(null);
    const forceRender = useCallback(() => {
        setTick(null);
    }, []);
    return forceRender;
}
//# sourceMappingURL=rhooks.js.map