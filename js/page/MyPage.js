'use strict';

import React, { Component } from 'react';
import {
    StatusBar, Text, View, StyleSheet, Platform, Image,
    TouchableOpacity, PixelRatio, FlatList
} from 'react-native';
import theme from '../config/theme';
import px2dp from '../utils/px2dp';


export default class MyPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#fff" }}>

            </View>
        );
    }
}


const styles = StyleSheet.create({
    actionBar: {
        height: theme.actionBar.height,
        backgroundColor: theme.actionBar.backgroundColor,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: (Platform.OS === 'ios') ? px2dp(40) : 0,
        flexDirection: 'row'
    }
});