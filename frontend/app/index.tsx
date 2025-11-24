import { View, FlatList } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import useUserStore from "./store/useUserStore";
import { useRouter } from "expo-router";
import tw from 'twrnc'
import { useEffect, useState } from "react";
import { Unit } from "../types";
import Constants from "expo-constants";
import * as Location from 'expo-location'
import UnitCard from "./components/UnitCard";

const API_URL = Constants.expoConfig?.extra?.API_ADDRESS

export default function Index() {

  const token = useUserStore((state) => state.token)
  const logout = useUserStore((state) => state.logout)
  const router = useRouter()

  const [units, setUnits] = useState<Unit[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const [userLocation, setUserLocation] = useState<number[] | null[]>([null, null])
  const [radius, setRadius] = useState<number>(10)

  const handleLogout = async () => {
    await logout()
    router.replace('/auth')
  }

  useEffect(() => {
    const getUserLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()

      if (status !== 'granted') {
        console.log('denied')
        return
      }

      const location = await Location.getCurrentPositionAsync()

      console.log(location)

      setUserLocation([location.coords.longitude, location.coords.latitude])
    }

    getUserLocation()
  }, [])

  useEffect(() => {
    const getUnits = async () => {

      setIsLoading(true)

      if (!userLocation[0] || !userLocation[1]) {
        setIsLoading(false)
        return
      }

      const res = await fetch(`${API_URL}/search/nearby?userLng=${userLocation[0]}&userLat=${userLocation[1]}&radius=${radius || 10}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": token || '',
        },
      })

      if (!res.ok) {
        setIsLoading(false)
        return
      }

      const data = await res.json()

      if (data.status !== 'success') {
        setIsLoading(false)
        return
      }

      console.log(data)
      setUnits(data.data)
    }

    getUnits()

    setIsLoading(false)
  }, [token, radius, userLocation])

  return (
    <View
      style={tw`flex-1 flex justify-start items-center p-6 gap-2`}
    >
      {/* Header */}
      <View
        style={tw`flex w-full flex-row justify-between items-center`}
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

      {/* Radius Filter */}
      <View
        style={tw`w-full flex justify-start items-start mt-6`}
      >
        <TextInput
          label='Radius'
          keyboardType="number-pad"
          style={tw`w-full max-w-40`}
          autoCapitalize='none'
          value={String(radius)}
          onChangeText={(txt) => {
            const num = parseInt(txt)
            setRadius(Number.isNaN(num) ? 0 : num)
          }}
          mode="outlined"
          outlineColor="#000"
          activeOutlineColor="#000"
        />
      </View>

      {/* Units */}
      {
        isLoading ? (
          <View style={tw`flex-1 flex justify-start items-center`}>
            <Text style={tw`text-black text-center`}>Loading...</Text>
          </View>
        ) : (
          <View style={tw`flex-1 flex justify-start items-start mt-6 w-full flex-1`}>
            <FlatList
              data={units}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => <UnitCard unitData={item} />}
              style={tw`w-full`}
              contentContainerStyle={tw`flex flex-col gap-4`}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )
      }
    </View>
  );
}
