'use strict';

import React, { Component, PropTypes } from 'react';
import {
    Image,
    Text,
    View,
    StyleSheet,
    ScrollView,
    Platform,
    PixelRatio,
    TouchableNativeFeedback,
    TouchableOpacity
} from 'react-native';
import px2dp from '../../utils/px2dp';
import theme from '../../config/theme';

//预选写好的数据，实际应用中数据一般通过网络请求获取，格式JSON
let dataAll = [
    { name: '勒布朗-詹姆斯', english: 'LeBron James', score: '26.4分 | 8.6篮板 | 8.7助攻', portrait: require('../../image/Day10/portrait1.png'), power: require('../../image/Day10/power1.png') },
    { name: '凯文-乐福', english: 'Kevin Love', score: '19.0分 | 11.1篮板 | 1.9助攻', portrait: require('../../image/Day10/portrait2.png'), power: require('../../image/Day10/power2.png') },
    { name: '凯文-杜兰特', english: 'Kevin Durant', score: '25.1分 | 8.3篮板 | 4.8助攻', portrait: require('../../image/Day10/portrait3.png'), power: require('../../image/Day10/power3.png') },
    { name: '克雷-汤普森', english: 'Klay Thompson', score: '22.3分 | 3.7篮板 | 2.1助攻', portrait: require('../../image/Day10/portrait4.png'), power: require('../../image/Day10/power4.png') },
    { name: '斯蒂芬-库里', english: 'Stephen Curry', score: '25.3分 | 4.5篮板 | 6.6助攻', portrait: require('../../image/Day10/portrait5.png'), power: require('../../image/Day10/power5.png') }]

export default class NavigationDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0
        }
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={[styles.itemContainer, { height: px2dp(100), backgroundColor: 'blue' }]}>
                    <Text style={{ fontSize: px2dp(36), color: '#fff' }}>球员信息</Text>
                </View>
                <View style={[styles.itemContainer, { height: px2dp(600) }]}>
                    <Image source={dataAll[this.state.id].portrait} />
                    <Text style={styles.text}>{dataAll[this.state.id].name}</Text>
                    <Text style={styles.text}>{dataAll[this.state.id].english}</Text>
                    <Text style={styles.text}>{dataAll[this.state.id].score}</Text>
                </View>
                <View style={[styles.itemContainer, { height: px2dp(100), backgroundColor: 'blue' }]}>
                    <Text style={{ fontSize: px2dp(36), color: '#fff' }}>球员能力</Text>
                </View>
                <View style={[styles.itemContainer, { height: px2dp(550) }]}>
                    <Image source={dataAll[this.state.id].power} />
                </View>
            </ScrollView>
        );
    }

    componentWillMount() {
        const { params } = this.props.navigation.state;
        var id = params.id;
        this.setState({
            id: id
        })
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    itemContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: px2dp(28),
        color: '#000',
        marginTop: px2dp(12)
    }
});