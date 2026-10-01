import {styles} from "@/styles";
import {Pressable, Text, View} from "react-native";

interface ButtonContainerProps {
    assign: () => void;
}

export default function ButtonContainer({ assign }: ButtonContainerProps) {
    return (
        <View style={[styles.btnGroup, styles.fullWidth]}>
            <Pressable
                style={({ pressed }) => [styles.button, styles.assignButton, pressed && styles.buttonPressed]}
                onPress={assign}>
                <Text style={styles.buttonText}>Assign</Text>
            </Pressable>
        </View>
    )
}