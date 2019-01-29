declare type TEffectFunc = () => void;
export declare function useConstructor(fn: TEffectFunc): void;
export declare function useDidMount(fn: TEffectFunc): void;
export declare function useDidUpdate(fn: TEffectFunc): void;
export declare function useWillUnmount(fn: TEffectFunc): void;
export declare function useForceRender(): () => void;
export {};
