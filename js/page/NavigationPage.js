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
import px2dp from '../utils/px2dp';
import theme from '../config/theme';
import PageComponent from '../component/BackPageComponent';

export default class AboutPage extends PageComponent {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <View style={styles.container}>
            </View>
        );
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