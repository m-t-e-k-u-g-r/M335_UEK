import {Text, View} from "react-native";
import {styles} from "@/styles";
import Group from "@/components/group";
import {useState} from "react";

interface ListHeaderProps {
    participants: string[];
    groups: number;
}

export default function ListHeader({ participants, groups }: ListHeaderProps) {
    const [showParticipants, setShowParticipants] = useState<boolean>(false);
    return (
        <View>
            <Text onPress={() => setShowParticipants(!showParticipants)} style={styles.sectionTitle}>Participants ({participants.length})</Text>
            {showParticipants && <Group participants={participants}/> }
            {groups > 0 && (
                <Text style={styles.sectionTitle}>Groups ({groups})</Text>
            )}
        </View>
    )
}