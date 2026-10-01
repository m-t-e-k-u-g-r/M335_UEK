import {Text, View} from "react-native";
import {styles} from "@/styles";

export default function Group({ participants, title }: { participants: string[]; title?: string }) {
    return (
        <View style={styles.card}>
            {title ? <Text style={styles.groupTitle}>{title}</Text> : null}
            {participants.length === 0 ? (
                <Text style={styles.emptyText}>No participants</Text>
            ) : (
                <View style={styles.participantChipList}>
                    {participants.map((p, index) => (
                        <View key={`${p}-${index}`} style={styles.participantChip}>
                            <Text style={styles.participantChipText}>{p}</Text>
                        </View>
                    ))}
                </View>
            )}
        </View>
    );
}
