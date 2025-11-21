import { Stack, usePathname, useRouter } from "expo-router";
import useUserStore from "./store/useUserStore";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Text } from 'react-native-paper'
import tw, { useDeviceContext } from 'twrnc'

const RouteGuard = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const router = useRouter()
  const pathname = usePathname()

  const getUser = useUserStore((state) => state.getUser)

  useEffect(() => {
    if (!router || !pathname) return

    const getSession = async () => {
      setIsLoading(true)

      const session = await getUser()

      console.log(session)
      setIsLoading(false)

      if (!session && pathname !== '/auth') {
        router.replace('/auth')
      }
      else if (session && pathname === '/auth') {
        router.replace('/')
      }
    }

    getSession()
  }, [router])

  if (isLoading) {
    return (
      <View style={tw`flex-1 flex justify-center items-center`}>
        <Text style={tw`text-black text-center`}>Loading...</Text>
      </View>
    )
  }

  return (
    <>
      {children}
    </>
  )
}

export default function RootLayout() {
  useDeviceContext(tw)
  return (
    <RouteGuard>
      <Stack
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Home' }} />
        <Stack.Screen name="auth" options={{ title: 'Auth' }} />
      </Stack>
    </RouteGuard>
  )
}
