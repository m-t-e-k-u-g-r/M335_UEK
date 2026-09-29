import {Pressable, StyleSheet, Text, View} from "react-native";
import {useAccelerometer} from "@/context/accelerometer_context";
import {useEffect, useState} from "react";
import {LineChart} from "react-native-chart-kit/v2";

export default function SensorDebug() {
    const { measurement, subscribe } = useAccelerometer();
    const [subscription, setSubscription] = useState<any>(null);

    const unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
    };

    useEffect(() => {
        const subscription = subscribe();
        setSubscription(subscription);
        return () => subscription?.remove();
    }, []);

    const chartData = measurement.map(({ xDelta, yDelta, zDelta, time }) => ({
        xDelta,
        yDelta,
        zDelta,
        time,
    }));

    return (
        <View style={[styles.container]}>
            <Text style={[styles.title]}>Accelerometer</Text>
            <Pressable
                style={[styles.btn]}
                onPress={subscription !== null ? unsubscribe : () => {
                    const subscription = subscribe();
                    setSubscription(subscription);
                }}
            >
                <Text style={[styles.btnText]}>{ subscription == null ? 'Resume' : 'Pause' }</Text>
            </Pressable>
            <View>
                <Text style={[styles.chartTitle]}>Live Values</Text>
                <LineChart
                    data={chartData}
                    xKey="time"
                    series={[
                        { yKey: "xDelta", label: 'X', strokeWidth: 0.5 },
                        { yKey: "yDelta", label: 'Y', strokeWidth: 0.5 },
                        { yKey: "zDelta", label: 'Z', strokeWidth: 0.5 },
                    ]}
                    showDots={false}
                    formatXLabel={() => ""}
                    width={350}
                    height={200}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20,
    },
    chartTitle: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    btn: {
        backgroundColor: 'red',
        marginBottom: 20,
        width: 80,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
