import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import useUserStore from "./store/useUserStore";
import { useRouter } from "expo-router";
import tw from 'twrnc'
import { useEffect, useState } from "react";
import { Unit } from "../types";
import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.API_ADDRESS

export default function Index() {

  const token = useUserStore((state) => state.token)
  const logout = useUserStore((state) => state.logout)
  const router = useRouter()

  const [units, setUnits] = useState<Unit[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const userLng = 29
  const userLat = 31
  const radius = 1000

  const handleLogout = async () => {
    await logout()
    router.replace('/auth')
  }

  useEffect(() => {
    const getUnits = async () => {

      setIsLoading(true)

      const res = await fetch(`${API_URL}/search/nearby?userLng=${userLng}&userLat=${userLat}&radius=${radius || 10}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": token || '',
        },
      })

      if (!res.ok) {
        return
      }

      const data = await res.json()

      if (data.status !== 'success') {
        return
      }

      console.log(data)
      setUnits(data.data)
    }

    getUnits()

    setIsLoading(false)
  }, [token])

  return (
    <View
      style={tw`flex-1 flex justify-start items-center`}
    >
      {/* Header */}
      <View
        style={tw`flex w-full p-6 flex-row justify-between items-center`}
      >
        <Text
          style={tw`text-black font-bold`}
          variant="headlineSmall"
        >Units</Text>
        <Button
          mode="contained"
          buttonColor="black"
          textColor="#f1f1f1"
          onPress={handleLogout}
        >Sign Out</Button>
      </View>

      {/* Units */}
      {
        isLoading ? (
          <View style={tw`flex-1 flex justify-start items-center`}>
            <Text style={tw`text-black text-center`}>Loading...</Text>
          </View>
        ) : (
          <View style={tw`flex-1 flex justify-start items-start`}>
            <Text style={tw`text-black text-center`}>{units.length}</Text>
          </View>
        )
      }
    </View>
  );
}
