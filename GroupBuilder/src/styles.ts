import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8fafc",
        padding: 16,
    },
    inputGroup: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
        marginVertical: 6,
    },
    fullWidth: {
        width: "100%",
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#cbd5e1",
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 14,
        fontSize: 16,
        backgroundColor: "#ffffff",
        color: "#1e293b",
    },
    numInput: {
        width: 60,
        height: 50,
        textAlign: "center",
        flex: 0,
    },
    pickerWrapper: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        flex: 1,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: "#cbd5e1",
        borderRadius: 8,
        backgroundColor: "#ffffff",
        justifyContent: "center",
        flex: 1,
        height: 50,
    },
    picker: {
        height: 55,
        width: "100%",
        color: "#1e293b",
    },
    button: {
        backgroundColor: "#2563eb",
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        minHeight: 44,
    },
    buttonPressed: {
        opacity: 0.8,
        transform: [{ scale: 0.98 }],
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 15,
        fontWeight: "600",
    },
});