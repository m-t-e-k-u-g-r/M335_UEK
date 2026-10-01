import {View} from "react-native";
import {useState} from "react";
import {styles} from "@/styles";
import ParticipantInput from "@/components/participantInput";

export type ConfigType = 'Groups' | 'Members';

export default function Index() {
    const [input, setInput] = useState<string>("");
    const [participants, setParticipants] = useState<string[]>([]);

    return (
        <View style={styles.container}>
            <ParticipantInput
                input={input} setInput={setInput}
                participants={participants} setParticipants={setParticipants}
            />
        </View>
    );
}
