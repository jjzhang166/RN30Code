'use strict';

import React, { Component, PropTypes } from 'react';
import {
    Image,
    Text,
    View,
    StyleSheet,
    Platform,
    PixelRatio,
    TouchableNativeFeedback,
    TouchableOpacity
} from 'react-native';
import px2dp from '../../utils/px2dp';
import theme from '../../config/theme';
import PageComponent from '../../component/BackPageComponent';
import { NavigationActions } from 'react-navigation'

export default class AboutPage extends PageComponent {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.actionBar} >
                    <TouchableOpacity style={{ height: theme.actionBar.height, width: px2dp(80), justifyContent: 'center', alignItems: 'center' }} onPress={this._handleBackHome.bind(this)}>
                        <Image source={require("../../image/back.png")} />
                    </TouchableOpacity>
                    <Text style={{ flex: 1, textAlign: 'center', color: theme.actionBar.fontColor, fontSize: theme.actionBar.fontSize }}>Navigation使用方法</Text>
                    <View style={{ height: theme.actionBar.height, width: px2dp(80) }} />
                </View>
            </View>
        );
    }

    _handleBackHome() {
        const backAction = NavigationActions.back({
        })
        this.props.navigation.dispatch(backAction)
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    actionBar: {
        height: theme.actionBar.height,
        backgroundColor: theme.actionBar.backgroundColor,
        paddingTop: (Platform.OS === 'ios') ? px2dp(35) : 0,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 2 / PixelRatio.get(),
        borderBottomColor: '#c4c4c4'
    }
});