import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Image, View } from "react-native";
import { Marker } from "react-native-maps";

const LocationMarker = ({ location }: any) => {
  const router = useRouter()
  return (
    <Marker
      onPress={() => router.push(`/location/${location.id}`)}
      coordinate={{
        latitude: location.geoLocation.latitude,
        longitude: location.geoLocation.longitude,
      }}
    >
      <TouchableOpacity style={styles.customMarker}>
        <Image source={{ uri: location?.image }} style={styles.markerImage} />
        <View style={styles.markerArrow} />
      </TouchableOpacity>
    </Marker>
  );
};

const styles = StyleSheet.create({
  customMarker: {
    alignItems: "center",
    backgroundColor: "transparent",
    position: "relative",
  },
  markerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#FF7F50",
    zIndex: 2,
  },
  markerLabel: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF7F50",
    padding: 4,
    borderRadius: 8,
    marginTop: 5,
  },
  markerText: {
    color: "#fff",
    fontSize: 12,
    marginLeft: 4,
  },
  markerArrow: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 0,
    height: 0,
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderTopWidth: 15,
    borderTopColor: "#FF7F50",
    borderRightColor: "#FF7F50",
    borderBottomColor: "#",
    transform: [{ rotate: "45deg" }],
    zIndex: 1,
    backgroundColor: "#FF7F50",
  },
});

export default LocationMarker;
