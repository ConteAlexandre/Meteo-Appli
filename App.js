import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import MapView from "react-native-maps";

const DEFAULT_COORD = {
    lat: 48.859268,
    lng: 2.347060
}

class App extends Component {
    render() {
        return (
                <MapView
                    style={{flex: 1}}
                    region={{
                        latitude: DEFAULT_COORD.lat,
                        longitude: DEFAULT_COORD.lng,
                        latitudeDelta: 0.2000,
                        longitudeDelta: 0.1000,
                    }}
                    scrollEnabled={false}
                    liteMode={true}
                >

                </MapView>
        );
    }
}

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
