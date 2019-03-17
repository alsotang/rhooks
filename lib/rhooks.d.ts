declare type TVoidFn = () => void;
export declare function useConstructor(fn: TVoidFn): void;
export declare function useDidMount(fn: TVoidFn): void;
export declare function useDidUpdate(fn: TVoidFn): void;
export declare function useWillUnmount(fn: TVoidFn): void;
export declare function useForceRender(): () => void;
export declare function useInterval<T extends Function>(callback: T, delay: number): void;
export {};
