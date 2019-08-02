import React, {Component} from 'react';
import { View } from 'react-native';
import MapView from "react-native-maps";
import {SearchBar} from "react-native-elements";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";

const DEFAULT_COORD = {
    lat: 48.859268,
    lng: 2.347060
}

class SearchScreen extends Component {

    state = {search: ""}

    updateSearch = search => {
        this.setState({ search })
    }

    submitSearch = () => {
        console.log(this.state.search)
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <MapView
                    style={{flex: 1, zIndex: 0, alignItems: "center"}}
                    region={{
                        latitude: DEFAULT_COORD.lat,
                        longitude: DEFAULT_COORD.lng,
                        latitudeDelta: 0.2000,
                        longitudeDelta: 0.1000,
                    }}
                    scrollEnabled={false}
                    liteMode={true}
                />
                    <SearchBar
                        lightTheme
                        onChangeText={this.updateSearch}
                        value={this.state.search}
                        onSubmitEditing={this.submitSearch}
                        placeholder={"Ecrit la ville ..."}
                        containerStyle={{
                            position: "absolute",
                            bottom: hp("50%"),
                            left: wp("5%"),
                            width: wp("90%")
                        }}
                    />
            </View>
        );
    }
}

export default SearchScreen;

