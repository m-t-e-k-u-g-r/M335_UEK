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
    btnGroup: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
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
    secondaryButton: {
        backgroundColor: "#e2e8f0",
    },
    secondaryButtonText: {
        color: "#334155",
    },
    assignButton: {
        backgroundColor: "#059669",
    },
    card: {
        backgroundColor: "#ffffff",
        borderRadius: 12,
        padding: 14,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#e2e8f0",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 1,
    },
    groupTitle: {
        fontSize: 15,
        fontWeight: "600",
        color: "#334155",
        marginBottom: 8,
    },
    participantChipList: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
    },
    participantChip: {
        backgroundColor: "#eff6ff",
        borderColor: "#bfdbfe",
        borderWidth: 1,
        borderRadius: 16,
        paddingVertical: 4,
        paddingHorizontal: 10,
    },
    participantChipText: {
        color: "#1d4ed8",
        fontSize: 14,
        fontWeight: "500",
    },
    emptyText: {
        color: "#94a3b8",
        fontSize: 14,
        fontStyle: "italic",
        padding: 4,
    },
});