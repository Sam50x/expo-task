import { View, Text } from 'react-native'
import tw from 'twrnc'

const AuthScreen = () => {
    return (
        <View style={tw`flex-1 flex justify-center items-center`}>
            <Text style={tw`text-black text-center`}>AuthScreen</Text>
        </View>
    )
}

export default AuthScreen