import {createContext, ReactNode, useContext, useEffect, useRef, useState} from "react";
import {Accelerometer, AccelerometerMeasurement} from "expo-sensors";

interface AccelerometerContextType {
    measurement: AccelerometerData[];
    subscribe: () => any;
}

export interface AccelerometerData {
    xDelta: number;
    yDelta: number;
    zDelta: number;
    time: number;
}

const AccelerometerContext = createContext<AccelerometerContextType | undefined>(undefined);

export function AccelerometerProvider({ children}: { children: ReactNode }) {
    const lastMeasurementRef = useRef<AccelerometerMeasurement | null>(null);
    const [data, setData] = useState<AccelerometerData[]>([]);

    const _subscribe = () => {
        Accelerometer.setUpdateInterval(100);
        return Accelerometer.addListener((measurement) => {
            const previous = lastMeasurementRef.current ?? { x: 0, y: 0, z: 0, timestamp: 0 };
            lastMeasurementRef.current = measurement;

            const delta: AccelerometerData = {
                xDelta: measurement.x - previous.x,
                yDelta: measurement.y - previous.y,
                zDelta: measurement.z - previous.z,
                time: measurement.timestamp,
            };

            setData((prev) => [
                ...prev.slice(-99),
                delta,
            ]);
        });
    };

    return (
        <AccelerometerContext.Provider value={{
            measurement: data,
            subscribe: _subscribe,
        }}>
            { children }
        </AccelerometerContext.Provider>
    )
}

export function useAccelerometer() {
    const context = useContext(AccelerometerContext);
    if (!context) throw new Error("useAccelerometer() muss innerhalb von <AccelerometerProvider> verwendet werden.");
    return context;
}
