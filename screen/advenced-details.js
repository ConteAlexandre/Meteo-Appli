import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from "react-navigation";
import { getForecastWeatherByCity } from "../actions";
import { LineChart } from "react-native-chart-kit";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import { kelvinToCelcius } from "../services/temperature";

class AdvencedDetails extends Component {

    componentDidMount() {
        const city = this.props.navigation.getParam("city");
        this.props.getForecastWeatherByCity(city);
    }

    getTemperature() {
        return this.props.forecastWeather.list.map( weather => {
            return (kelvinToCelcius(weather.main.temp))
        })
    }

    getHumidity() {
        return this.props.forecastWeather.list.map( weather => {
            return (weather.main.humidity)
        })
    }

    getLabels() {
        return this.props.forecastWeather.list.map((_, index) => {
            let day = index / 8;
            return index === 0 ?  "t" : index % 8 === 0 ? "t+" + day + "j" : ""
        })
    }

    renderChart(data){
        return (
            <LineChart
                data={{
                    labels: this.getLabels(),
                    datasets: [{
                        data
                    }]
                }}
                width={wp("90%")} // from react-native
                height={hp("30%")}
                chartConfig={{
                    backgroundColor: '#e26a00',
                    backgroundGradientFrom: '#fb8c00',
                    backgroundGradientTo: '#ffa726',
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    }
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            />
        )
    }

    renderCharts() {
        return (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Text style={{ fontSize: 30, paddingTop: hp("1%")}}>
                    {this.props.forecastWeather.city.name} sur 5 Jours
                </Text>
                <Text style={{ marginBottom: hp("2%"), marginTop: hp("2%"), fontSize: 20 }}>
                    Graph Température en °C
                </Text>
                {this.renderChart(this.getTemperature())}
                <Text style={{ marginBottom: hp("2%"), fontSize: 20 }}>
                    Graph Humidité
                </Text>
                {this.renderChart(this.getHumidity())}
            </View>
        )
    }

    render() {
        return (
            <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
                {this.props.forecastWeather ? this.renderCharts() : <Text>Loading...</Text>}
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        forecastWeather : state.weather.ForecastWeather
    };
};

const mapDispatchToProps = {getForecastWeatherByCity};


export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(AdvencedDetails));