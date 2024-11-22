import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import {useRouter} from "expo-router";
import { Image, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "./ThemedText";
import { Ionicons } from "@expo/vector-icons";

export default function CustomDrawerContent(props: any) {
    const router = useRouter();
    const {top, bottom} = useSafeAreaInsets()

    return <View style={{ flex: 1 }}>
        <DrawerContentScrollView contentContainerStyle={{backgroundColor: '#fff'}} scrollEnabled={false} {...props}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
  <Image
    source={{ uri: 'https://avatar.iran.liara.run/public/boy' }}
    style={{ width: 60, height: 60 }}
  />
  <View style={{ marginLeft: 20, flexDirection: 'column' }}>
  <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Ulugbek Temirov</Text>
  <Text style={{ fontSize: 15, fontWeight: 'normal', fontStyle: 'italic' }}>Tourist</Text>
  </View>

</View>

        <View style={{
            paddingTop: 10
        }}>
        <DrawerItemList {...props} />
        {/* @ts-ignore */}
        <DrawerItem label={"Logout"} onPress={() => router.push("/(auth)/login")} />
        </View>

    </DrawerContentScrollView>

    <View style={{
        borderTopColor: '#dde3fe',
        borderTopWidth: 1,
        padding: 20,
        paddingBottom: 20 + bottom
    }}>
        <ThemedText>
            Footer
        </ThemedText>
    </View>
    </View>
}