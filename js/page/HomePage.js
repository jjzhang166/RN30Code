'use strict';

import React, { Component } from 'react';
import {
    StatusBar, Text, View, StyleSheet, Platform, Image,
    TouchableOpacity, PixelRatio, FlatList
} from 'react-native';
import theme from '../config/theme';
import px2dp from '../utils/px2dp';


export default class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            list: []
        };
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#F5FCFF" }}>
                <FlatList
                    data={this.state.list}
                    renderItem={this._renderItemComponent}
                    keyExtractor={(item, index) => index}
                    numColumns={3}
                    ItemSeparatorComponent={this._renderSeperatorComponent} />
            </View>
        );
    }

    componentWillMount() {
        let days = [];
        for (let i = 0; i < 30; i++) {
            days[i] = "Day " + (i + 1);
        }
        this.setState({
            list: days
        })
    }

    _renderItemComponent = ({ item, index }) => {
        return (
            <View style={{ flex: 1, flexDirection: 'row' }}>
                {index % 3 == 0 ? null : <View style={{ width: px2dp(1), backgroundColor: theme.lightGray }} />}
                <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: px2dp(200) }} onPress={this._OnPressed.bind(this,index)}>
                    <Image source={require("../image/15.png")} />
                    <Text >{this.state.list[index]}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    _renderSeperatorComponent = () => {
        return (
            <View style={{ flex: 1, height: px2dp(1), backgroundColor: theme.lightGray }}>
            </View>
        );
    }

    _OnPressed(position) {
        const { navigate } = this.props.navigation;
        switch(position){
            case 0:
                navigate("Day1");
                break;
            case 1:
                navigate("Day2");
                break;
            case 2:
                navigate("Day3");
                break;
            case 3:
                navigate("Day4");
                break;
            case 4:
                navigate("Day5");
                break;
            case 5:
                navigate("Day6");
                break;
            case 6:
                navigate("Day7");
                break;
            case 7:
                navigate("Day8");
                break;
            case 8:
                navigate("Day9");
                break;
            case 9:
                navigate("MyDrawer");
                break;
            default:
        }
    }
}
