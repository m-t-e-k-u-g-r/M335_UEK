import {View} from "react-native";
import {useState} from "react";
import {styles} from "@/styles";
import ParticipantInput from "@/components/participantInput";
import CountInput from "@/components/countInput";

export type ConfigType = 'Groups' | 'Members';

export default function Index() {
    const [input, setInput] = useState<string>("");
    const [participants, setParticipants] = useState<string[]>([]);
    const [count, setCount] = useState<string>('2');
    const [type, setType] = useState<ConfigType>('Groups');

    return (
        <View style={styles.container}>
            <ParticipantInput
                input={input} setInput={setInput}
                participants={participants} setParticipants={setParticipants}
            />

            <CountInput
                setCount={setCount} count={count}
                type={type} setType={setType}
            />
        </View>
    );
}
