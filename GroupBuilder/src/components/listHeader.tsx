import {Text, View} from "react-native";
import {styles} from "@/styles";
import Group from "@/components/group";

interface ListHeaderProps {
    participants: string[];
    groups: number;
}

export default function ListHeader({ participants, groups }: ListHeaderProps) {
    return (
        <View>
            <Text style={styles.sectionTitle}>Participants ({participants.length})</Text>
            <Group participants={participants}/>
            {groups > 0 && (
                <Text style={styles.sectionTitle}>Groups ({groups})</Text>
            )}
        </View>
    )
}