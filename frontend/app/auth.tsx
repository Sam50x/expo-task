import { useState } from 'react'
import { View } from 'react-native'
import { Text, TextInput, Button } from 'react-native-paper'
import tw from 'twrnc'
import Constants from 'expo-constants'

const API_URL = Constants.expoConfig?.extra?.API_ADDRESS

const AuthScreen = () => {

    const [isSignUp, setIsSignUp] = useState<boolean>(false)
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const handleSwitch = () => {
        setIsSignUp(prev => !prev)
    }

    const handleSubmitting = async () => {
        setIsSubmitting(true)

        const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            })
        })

        console.log(res)

        setIsSubmitting(false)
    }

    return (
        <View style={tw`flex-1 flex justify-center items-center gap-4 px-12`}>
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
                />
                <TextInput
                    style={tw`w-full max-w-70`}
                    mode='outlined'
                    label='Password'
                    value={password}
                    onChangeText={setPassword}
                    activeOutlineColor='#000'
                    outlineColor='#000'
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
        </View>
    )
}

export default AuthScreen