import { View } from 'react-native'
import { Text } from 'react-native-paper'
import { Unit } from '../../types'
import tw from 'twrnc'

const UnitCard = ({unitData}: {unitData: Unit}) => {

    const {
        name
    } = unitData

    return (
        <View 
            style={tw`flex`}
        >
            <Text>Unit: {name}</Text>
        </View>
    )
}

export default UnitCard