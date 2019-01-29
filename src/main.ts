import { useCallback, useEffect, useState} from "react"

export function useUnmount(fn: () => void) {
    useEffect(() => fn, [])
}

export function useForceUpdate() {
    const [, setTick] = useState(null)

    const forceUpdate = useCallback(() => {
        setTick(null)
    }, [])

    return forceUpdate
}
