import { View } from 'react-native'
import { Text } from 'react-native-paper'
import { Unit } from '../../types'
import tw from 'twrnc'
import MapView, { Marker, UrlTile } from 'react-native-maps'

const UnitCard = ({ unitData }: { unitData: Unit }) => {

    const {
        name,
        location,
    } = unitData

    const [lng, lat] = location.coordinates

    return (
        <View
            style={tw`flex flex-col justify-start items-center p-2 bg-none border-4 border-black w-full`}
        >
            {/* Map */}
            <View style={tw`w-full aspect-video overflow-hidden`}>
                <MapView
                    style={{ width: '100%', height: '100%' }}
                    initialRegion={{
                        latitude: lat,
                        longitude: lng,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01
                    }}
                    scrollEnabled={false}
                    zoomEnabled={false}
                    rotateEnabled={false}
                    pitchEnabled={false}
                    pointerEvents="none"
                >
                    <UrlTile
                        urlTemplate="https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png"
                        maximumZ={20}
                    />

                    <Marker
                        coordinate={{ latitude: lat, longitude: lng }}
                        title={name}
                    />
                </MapView>
            </View>

            {/* Data */}
            <View>
                <Text>Unit: {name}</Text>
            </View>
        </View>
    )
}

export default UnitCard