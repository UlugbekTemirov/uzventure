import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Image, Modal, View } from "react-native"

const LocationMarker = ({location}: any) => {
    const [isModalVisible, setModalVisible] = useState(false);
    return <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <Text>Modal</Text>
      </Modal>
        <TouchableOpacity onPress={() => console.log("pressed")} style={styles.customMarker}>
                <Image
                  source={{ uri: location?.image }}
                  style={styles.markerImage}
                />
                <View style={styles.markerArrow} />
              </TouchableOpacity>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    
    customMarker: {
        alignItems: 'center',
        backgroundColor: 'transparent',
        position: 'relative',
      },
      markerImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#FF7F50',
        zIndex: 2,
      },
      markerLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FF7F50',
        padding: 4,
        borderRadius: 8,
        marginTop: 5,
      },
      markerText: {
        color: '#fff',
        fontSize: 12,
        marginLeft: 4,
      },
      markerArrow: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 0,
        height: 0,
        borderLeftWidth: 15,
        borderRightWidth: 15,
        borderTopWidth: 15,
        borderTopColor: '#FF7F50',
        borderRightColor: '#FF7F50',
        borderBottomColor: '#',
        transform: [{ rotate: '45deg' }],
        zIndex: 1,
        backgroundColor: '#FF7F50',
      }
})

export default LocationMarker