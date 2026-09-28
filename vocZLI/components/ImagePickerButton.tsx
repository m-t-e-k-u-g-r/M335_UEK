import {Alert, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Image} from "expo-image";
import * as ImagePicker from 'expo-image-picker';
import {File, Paths} from 'expo-file-system';
import {ImageManipulator, SaveFormat} from "expo-image-manipulator";

interface ImagePickerButtonProps {
    imageUri?: string;
    onImageSelected: (uri: string) => void,
}

export default function ImagePickerButton({ imageUri, onImageSelected }: ImagePickerButtonProps) {
    async function handleTap() {
        Alert.alert('Bild für Vokabel auswählen', '', [
            { text: 'Foto aufnehmen', onPress: makePhoto },
            { text: 'Aus Galerie wählen', onPress: openGallery },
            { text: 'Abbrechen' },
        ]);
    }

    async function copyImageToAppDirectory(uri: string) {
        const fileName = `${Date.now()}.webp`;

        const context = ImageManipulator.manipulate(uri);
        context.resize({ width: 800 });

        const rendered = await context.renderAsync();
        const result = await rendered.saveAsync({
            format: SaveFormat.WEBP,
            compress: 0.7
        });

        const resFile = new File(result.uri);
        const copy = new File(Paths.document, fileName);
        await resFile.copy(copy);

        return copy.uri;
    }

    async function makePhoto() {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Fehler', 'Kamera-Zugriff benötigt!');
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            aspect: [1, 1],
        });

        if (!result.canceled) {
            const uri = await copyImageToAppDirectory(result.assets[0].uri);
            onImageSelected(uri);
        }
    }

    async function openGallery() {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Fehler', 'Medien-Zugriff benötigt!');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            aspect: [1, 1],
        });

        if (!result.canceled) {
            const uri = await copyImageToAppDirectory(result.assets[0].uri);
            onImageSelected(uri);
        }
    }

    return (
        <View>
            {imageUri !== undefined ? (
                <Image style={[styles.container]} source={imageUri} />
            ) : (
                <TouchableOpacity
                    style={[styles.container, styles.placeholder]}
                    onPress={handleTap}
                >
                    <Text>Bild hinzufügen</Text>
                </TouchableOpacity>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 120,
        height: 120,
        borderRadius: 20,
    },
    placeholder: {
        backgroundColor: 'grey',

        justifyContent: 'center',
        alignItems: 'center',
    },
})
