import {Alert, FlatList, View} from "react-native";
import {useState} from "react";
import {styles} from "@/styles";
import ParticipantInput from "@/components/participantInput";
import CountInput from "@/components/countInput";
import {mix} from "@/utils";
import ButtonContainer from "@/components/buttonContainer";
import Group from "@/components/group";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import ListHeader from "@/components/listHeader";

export type ConfigType = 'Groups' | 'Members';

export default function Index() {
    const insets = useSafeAreaInsets();
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

    function addParticipants(names: string[]) {
        setParticipants([...participants, ...names]);
    }

    return (
        <View style={[styles.container, {
            paddingBottom: insets.bottom
        }]}>
            <View style={styles.inputCard}>
                <ParticipantInput
                    input={input} setInput={setInput}
                    participants={participants} setParticipants={setParticipants}
                />

                <CountInput
                    setCount={setCount} count={count}
                    type={type} setType={setType}
                />

                <ButtonContainer
                    addParticipants={addParticipants}
                    assign={assign}
                />
            </View>

            <FlatList
                style={[styles.groupsList]}
                data={groups}
                keyExtractor={(_, index) => `group-${index}`}
                ListHeaderComponent={ <ListHeader groups={groups.length} participants={participants} /> }
                renderItem={({ item, index }) =>
                    <Group title={`Group ${index + 1}`} participants={item} />
                }
            />
        </View>
    );
}
