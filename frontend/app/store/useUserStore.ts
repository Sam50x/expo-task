import { create } from 'zustand'
import AsyncStorage from '@react-native-async-storage/async-storage';

type userStore = {
    token: string | null,
    getUser: () => Promise<string | null>,
    setUser: (token: string) => Promise<void>,
    logout: () => Promise<void>,
}

const useUserStore = create<userStore>((set) => ({
    token: null,
    getUser: async () => {
        let value = await AsyncStorage.getItem('token')
        value = value != null ? JSON.parse(value) : null

        set({ token: value })

        return value
    },
    setUser: async (value: string) => {
        await AsyncStorage.setItem('token', JSON.stringify(value))
    },
    logout: async () => {
        await AsyncStorage.removeItem('token')
    }
}))

export default useUserStore