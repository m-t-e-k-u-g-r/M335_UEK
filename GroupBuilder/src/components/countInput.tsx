import {TextInput, View} from "react-native";
import {styles} from "@/styles";
import {Picker} from "@react-native-picker/picker";
import {ConfigType} from "@/app";

interface CountInputProps {
    setCount: (c: string) => void;
    count: string;
    type: ConfigType,
    setType: (t: ConfigType) => void;
}

export default function CountInput({ setCount, count, type, setType }: CountInputProps) {
    function handleNumberChange(t: string) {
        const cleaned = t.replace(/[^0-9]/g, '');
        setCount(cleaned);
    }

    return (
        <View style={[styles.inputGroup, styles.fullWidth]}>
            <View style={styles.pickerWrapper}>
                <TextInput
                    keyboardType="numeric"
                    style={[styles.input, styles.numInput]}
                    value={count}
                    onChangeText={handleNumberChange}
                />

                <View style={styles.pickerContainer}>
                    <Picker
                        style={styles.picker}
                        selectedValue={type}
                        onValueChange={(v) => setType(v)}
                        mode="dropdown"
                    >
                        <Picker.Item label="Groups" value="Groups" />
                        <Picker.Item label="Members" value="Members" />
                    </Picker>
                </View>
            </View>
        </View>
    )
}