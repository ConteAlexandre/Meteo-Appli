import React, {Component} from 'react';
import SearchScreen from "./screen/search-screen";
import store from "./store";
import {Provider} from "react-redux";

class App extends Component {

    render() {
        return (
            <Provider store={store} ><SearchScreen/></Provider>
        );
    }
}

export default App;
