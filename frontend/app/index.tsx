import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import useUserStore from "./store/useUserStore";
import { useRouter } from "expo-router";

export default function Index() {

  const token = useUserStore((state) => state.token)
  const logout = useUserStore((state) => state.logout)
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.replace('/auth')
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        mode="outlined"
        onPress={handleLogout}
      >Sign Out</Button>
    </View>
  );
}
