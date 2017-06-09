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
            <View style={{ flex: 1, backgroundColor: "#fff" }}>
                <View style={styles.actionBar} >
                    <Text >30 Days of React-Native</Text>
                </View>
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
        if(position===0){
            navigate("Day1");
        }
    }
}


const styles = StyleSheet.create({
    actionBar: {
        height: theme.actionBar.height,
        backgroundColor: theme.actionBar.backgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: (Platform.OS === 'ios') ? px2dp(40) : 0,
        flexDirection: 'row',
        borderBottomWidth: 2 / PixelRatio.get(),
        borderBottomColor: '#c4c4c4'
    }
});