import { Image, View } from 'react-native'
import { Text } from 'react-native-paper'
import { Unit } from '../../types'
import tw from 'twrnc'
import MapView, { Marker, UrlTile } from 'react-native-maps'

const UnitCard = ({ unitData }: { unitData: Unit }) => {

    const {
        name,
        location,
        project,
        developer,
        zone,
        imageUrl,
        price,
        distanceKm
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
            <View style={tw`flex flex-row w-full justify-between items-center px-2 mt-4`}>
                <View style={tw`w-40 h-40 mr-2`}>
                    <Image
                        source={{ uri: imageUrl }}
                        style={tw`w-full h-full`}
                        resizeMode='cover'
                    />
                </View>
                <View style={tw`flex flex-col justify-between items-start gap-2`}>
                    <View style={tw`flex flex-col justify-start items-start gap-0`}>
                        <Text>Name</Text>
                        <Text style={tw`font-bold text-lg`}>{name}</Text>
                    </View>
                    <View style={tw`flex flex-col justify-start items-start gap-0`}>
                        <Text>Price</Text>
                        <Text style={tw`font-bold text-lg`}>${price}</Text>
                    </View>
                    <View style={tw`flex flex-col justify-start items-start gap-0`}>
                        <Text>Distance from you</Text>
                        <Text style={tw`font-bold text-lg`}>{distanceKm.toFixed(2)} KMs</Text>
                    </View>
                </View>
            </View>
            <View style={tw`w-full flex flex-row flex-wrap justify-between items-center py-2`}>
                <View style={tw`flex flex-col justify-start items-start gap-1`}>
                    <Text style={tw`text-xs text-black pl-2`}>Developer</Text>
                    <Text style={tw`text-sm text-white bg-black rounded-full py-2 px-4`}>{developer.name}</Text>
                </View>
                <View style={tw`flex flex-col justify-start items-start gap-1`}>
                    <Text style={tw`text-xs text-black pl-2`}>Project</Text>
                    <Text style={tw`text-sm text-white bg-black rounded-full py-2 px-4`}>{project.name}</Text>
                </View>
                <View style={tw`flex flex-col justify-start items-start gap-1`}>
                    <Text style={tw`text-xs text-black pl-2`}>Zone</Text>
                    <Text style={tw`text-sm text-white bg-black rounded-full py-2 px-4`}>{zone.name}</Text>
                </View>
            </View>
        </View>
    )
}

export default UnitCard