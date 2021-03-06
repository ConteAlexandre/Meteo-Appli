import React, {Component} from 'react';
import SearchScreen from "./screen/search-screen";
import AdvencedDetail from './screen/advenced-details.js';
import store from "./store";
import {Provider} from "react-redux";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack"
import IndexScreen from "./screen/index-screen";

class App extends Component {

    render() {
        return (
            <Provider store={store} ><Route/></Provider>
        );
    }
}

const StackNavigator = createStackNavigator(
    {
        Index : IndexScreen,
        Search : SearchScreen,
        Detail : AdvencedDetail
    },
    {
        initialRouteName: "Index",
        headerMode: "none"
    }
);

const Route = createAppContainer(StackNavigator)

export default App;
