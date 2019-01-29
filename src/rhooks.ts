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
    const [, setTick] = useState(null);

    const forceRender = useCallback(() => {
        setTick(null);
    }, []);

    return forceRender;
}
