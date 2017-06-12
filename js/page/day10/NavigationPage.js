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

export default class NavigationPage extends PageComponent {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ height: px2dp(600), flexDirection: 'row', alignItems: 'center', borderBottomWidth: 2 / PixelRatio.get(), borderBottomColor: '#c4c4c4' }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../../image/Day10/cleve.png')} />
                        <Text style={{ fontSize: px2dp(60), color: 'red' }}>1</Text>
                        <Text style={styles.text}>胜51负31东部第2</Text>
                    </View>
                    <Text style={{ fontSize: px2dp(60), color: '#000' }}>VS</Text>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../../image/Day10/golden.png')} />
                        <Text style={{ fontSize: px2dp(60), color: 'red' }}>3</Text>
                        <Text style={styles.text}>胜67负15西部第1</Text>
                    </View>
                </View>
                <View style={{height:px2dp(100),justifyContent:'center',alignItems:'center', borderBottomWidth: 2 / PixelRatio.get(), borderBottomColor: '#c4c4c4' }}>
                    <Text style={{fontSize:px2dp(40),color:'#000'}}>比赛赛程</Text>
                </View>
                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                    <Text style={styles.text}>06/02 91-113</Text>
                    <Text style={styles.text}>06/05 113-132</Text>
                    <Text style={styles.text}>06/08 113-118</Text>
                    <Text style={styles.text}>06/10 137-116</Text>
                    <Text style={styles.text}>06/13 未开赛</Text>
                </View>
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
    },
    text: {
        fontSize: px2dp(26),
        color: '#000',
        marginTop: px2dp(12)
    }
});