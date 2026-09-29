import {Pressable, StyleSheet, Text, View} from "react-native";
import {useEffect, useState} from "react";
import { Accelerometer } from 'expo-sensors';
import { BarChart } from "react-native-chart-kit/v2";

export default function SensorDebug() {
    const [{ x, y, z }, setData] = useState({ x: 0, y: 0, z: 0 });
    const [subscription, setSubscription] = useState<any>(null);

    const _subscribe = () => {
        setSubscription(Accelerometer.addListener(setData));
    };

    const _unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
    };

    useEffect(() => {
        Accelerometer.setUpdateInterval(100);
        _subscribe();
        return () => _unsubscribe();
    }, []);

    const data = () => {
        return [
            { label: 'X', value: x },
            { label: 'Y', value: y },
            { label: 'Z', value: z },
        ]
    };

    return (
        <View style={[styles.container]}>
            <Text style={[styles.title]}>Accelerometer</Text>
            <Pressable
                style={[styles.btn]}
                onPress={subscription ? _unsubscribe : _subscribe}
            >
                <Text style={[styles.btnText]}>{ subscription ? 'Pause' : 'Resume' }</Text>
            </Pressable>
            <View>
                <Text style={[styles.chartTitle]}>Live Values</Text>
                <BarChart
                    data={data()}
                    xKey="label"
                    yKey="value"
                    width={350}
                    height={200}
                    yDomain={{ min: -1.5, max: 1.5 }}
                    orientation="horizontal"
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
