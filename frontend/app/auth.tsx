import { useState } from 'react'
import { KeyboardAvoidingView, View } from 'react-native'
import { Text, TextInput, Button } from 'react-native-paper'
import tw from 'twrnc'
import Constants from 'expo-constants'
import { useRouter } from 'expo-router'
import useUserStore from './store/useUserStore'

const API_URL = Constants.expoConfig?.extra?.API_ADDRESS

const AuthScreen = () => {

    const [isSignUp, setIsSignUp] = useState<boolean>(false)
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const setUser = useUserStore((state) => state.setUser)
    const router = useRouter()

    const handleSwitch = () => {
        setIsSignUp(prev => !prev)
    }

    const handleLogin = async () => {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        })

        if (!res.ok) {
            return
        }

        const data = await res.json()

        if (data.status !== 'success') {
            return
        }

        await setUser(data.token)

        router.replace('/')
    }

    const handleSignup = async () => {
        const res = await fetch(`${API_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        })

        if (!res.ok) {
            return
        }

        const data = await res.json()

        if (data.status !== 'success') {
            return
        }

        setName('')
        setEmail('')
        setPassword('')

        setIsSignUp(false)
    }

    const handleSubmitting = async () => {
        setIsSubmitting(true)

        if (isSignUp) {
            await handleSignup()
        }
        else {
            await handleLogin()
        }


        setIsSubmitting(false)
    }

    return (
        <KeyboardAvoidingView style={tw`flex-1 flex justify-center items-center gap-4 px-12`}
            behavior='padding'
        >
            {/* Title */}
            <Text
                variant='headlineSmall'
                style={tw`text-black font-bold`}
            >
                {
                    isSignUp ? 'Create Account'
                        : 'Welcome Back'
                }
            </Text>

            {/* Form */}
            <View
                style={tw`w-full flex justify-center items-center gap-2`}
            >
                {isSignUp &&
                    <TextInput
                        style={tw`w-full max-w-70`}
                        mode='outlined'
                        label='Name'
                        value={name}
                        onChangeText={setName}
                        activeOutlineColor='#000'
                        outlineColor='#000'
                    />
                }
                <TextInput
                    style={tw`w-full max-w-70`}
                    mode='outlined'
                    label='Email'
                    value={email}
                    onChangeText={setEmail}
                    activeOutlineColor='#000'
                    outlineColor='#000'
                    autoCapitalize='none'
                />
                <TextInput
                    style={tw`w-full max-w-70`}
                    mode='outlined'
                    label='Password'
                    value={password}
                    onChangeText={setPassword}
                    activeOutlineColor='#000'
                    outlineColor='#000'
                    autoCapitalize='none'
                    secureTextEntry
                />
            </View>

            {/* Submit */}
            <View
                style={tw`flex justify-center items-center gap-2 w-full`}
            >
                <Button
                    style={tw`w-full max-w-70`}
                    mode='contained'
                    buttonColor='#000'
                    onPress={handleSubmitting}
                    disabled={isSubmitting}
                >
                    {
                        isSignUp ? 'Signup'
                            : 'Login'
                    }
                </Button>
                <Button
                    style={tw`w-full max-w-70`}
                    mode='text'
                    textColor='#000'
                    onPress={handleSwitch}
                    disabled={isSubmitting}
                >
                    {
                        isSignUp ? 'Already have an account?'
                            : 'Don\'t have an account?'
                    }
                </Button>
            </View>
        </KeyboardAvoidingView>
    )
}

export default AuthScreen