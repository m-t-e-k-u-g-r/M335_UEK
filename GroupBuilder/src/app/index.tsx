import {Alert, FlatList, Text, View} from "react-native";
import {useState} from "react";
import {styles} from "@/styles";
import ParticipantInput from "@/components/participantInput";
import CountInput from "@/components/countInput";
import {mix} from "@/utils";
import ButtonContainer from "@/components/buttonContainer";
import Group from "@/components/group";

export type ConfigType = 'Groups' | 'Members';

export default function Index() {
    const [input, setInput] = useState<string>("");
    const [participants, setParticipants] = useState<string[]>([]);
    const [groups, setGroups] = useState<string[][]>([]);
    const [count, setCount] = useState<string>('2');
    const [type, setType] = useState<ConfigType>('Groups');

    function assign() {
        const c = parseInt(count);
        if (c > participants.length) {
            Alert.alert("Invalid count", `Number of ${type} can't be larger than number of participants`);
            return;
        }

        const mixed = mix(participants);

        const groupCount: number = type == 'Groups' ? c
            : Math.floor(participants.length / c);
        let groups: string[][] = Array.from({ length: groupCount }, () => []);
        for (let [i, p] of mixed.entries()) {
            groups[i % groups.length][groups[i % groups.length].length] = p;
        }
        setGroups(groups);
    }

    return (
        <View style={styles.container}>
            <View>
                <ParticipantInput
                    input={input} setInput={setInput}
                    participants={participants} setParticipants={setParticipants}
                />

                <CountInput
                    setCount={setCount} count={count}
                    type={type} setType={setType}
                />

                <ButtonContainer assign={assign}/>
            </View>

            <Text style={styles.sectionTitle}>Participants ({participants.length})</Text>
            <Group participants={participants}/>

            {groups.length > 0 && (
                <>
                    <Text style={styles.sectionTitle}>Groups ({groups.length})</Text>
                    <FlatList
                        style={styles.groupsList}
                        data={groups}
                        keyExtractor={(_, index) => `group-${index}`}
                        renderItem={({ item, index }) =>
                            <Group title={`Group ${index + 1}`} participants={item} />
                        }
                    />
                </>
            )}
        </View>
    );
}
