import {styles} from "@/styles";
import {Alert, Pressable, Text, View} from "react-native";
import * as DocumentPicker from 'expo-document-picker';

interface ButtonContainerProps {
    assign: () => void;
    addParticipants: (p: string[]) => void;
}

export default function ButtonContainer({ assign, addParticipants }: ButtonContainerProps) {
    async function pickDocument() {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                multiple: false,
                type: "text/csv",
            });

            if (result.canceled) return Alert.alert("Document selection cancelled");

            const successResult = result as DocumentPicker.DocumentPickerSuccessResult;
            const file = successResult.assets[0].file
            if (!file) return Alert.alert("No document selected");

            const csvText = await file.text();
            const rows = csvText.split(/\r\n|\r|\n/);
            const names = rows
                .filter(r => r.trim() !== '')
                .map(r => r
                    .split(';').join(',')
                    .split(',')
                    .map(c => c.replace(/^["']|["']\$/g, '').trim()))
                .flat();
            addParticipants(names);
        } catch (e) {
            console.error(`Failed to read names: ${e}`);
            Alert.alert("Failed to read input file");
        }
    }

    return (
        <View style={[styles.btnGroup, styles.fullWidth]}>
            <Pressable
                style={({ pressed }) => [styles.button, styles.assignButton, pressed && styles.buttonPressed]}
                onPress={assign}>
                <Text style={styles.buttonText}>Assign</Text>
            </Pressable>

            <Pressable
                style={({ pressed }) => [styles.button, styles.secondaryButton, pressed && styles.buttonPressed]}
                onPress={pickDocument}>
                <Text style={[styles.buttonText, styles.secondaryButtonText]}>Upload</Text>
            </Pressable>
        </View>
    )
}