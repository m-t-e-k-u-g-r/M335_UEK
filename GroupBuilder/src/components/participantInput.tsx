import {Pressable, Text, TextInput, View} from "react-native";
import {styles} from "@/styles";

interface ParticipantInputProps {
    input: string;
    setInput: (i: string) => void;
    participants: string[];
    setParticipants: (p: string[]) => void;
}

export default function ParticipantInput({ input, setInput, participants, setParticipants }: ParticipantInputProps) {
    return (
        <View style={[styles.inputGroup, styles.fullWidth]}>
            <TextInput
                placeholder="Add participant name..."
                placeholderTextColor="#94a3b8"
                style={styles.input}
                value={input}
                onChangeText={setInput}
            />
            <Pressable
                style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
                onPress={() => {
                    if (input.trim() == "") return;
                    setParticipants([...participants, input.trim()]);
                    setInput("");
                }}>
                <Text style={styles.buttonText}>Add</Text>
            </Pressable>
        </View>
    )
}