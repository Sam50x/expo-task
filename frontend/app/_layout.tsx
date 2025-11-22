import { Stack, usePathname, useRouter } from "expo-router";
import useUserStore from "./store/useUserStore";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Text } from 'react-native-paper'
import tw, { useDeviceContext } from 'twrnc'
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

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
  }, [router, pathname, getUser])

  if (isLoading) {
    return (
      <SafeAreaView style={tw`flex-1`}>
        <View style={tw`flex-1 flex justify-center items-center`}>
          <Text style={tw`text-black text-center`}>Loading...</Text>
        </View>
      </SafeAreaView>
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
    <SafeAreaProvider style={tw`bg-black`}>
      <SafeAreaView style={tw`flex-1`}>
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
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
