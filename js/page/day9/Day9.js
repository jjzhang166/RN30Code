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
import Picker from 'react-native-picker';

let movieData = [
    {
        2017: [
            '加勒比海盗5:死无对证', '神奇女侠', '速度与激情8', '金刚狼3:殊死一战'
        ]
    },
    {
        2016: [
            '你的名字', '死侍', '疯狂动物城', '血战钢锯岭'
        ]
    },
    {
        2015: [
            '复仇者联盟2:奥创纪元', '霍比特人3:五军之战', '火星救援', '模仿游戏'
        ]
    }
]

export default class Day9 extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={{ padding: px2dp(4), marginTop: px2dp(8), height: px2dp(200), flexDirection: 'row' }} activeOpacity={0.8} onPress={this._PickClicked.bind(this)}>
                    <View style={{ flex: 1, justifyContent: 'center', borderWidth: 2 / PixelRatio.get(), borderColor: 'red', borderTopLeftRadius: px2dp(10), borderBottomLeftRadius: px2dp(10) }}>
                        <Text style={{ fontSize: px2dp(30), color: '#000' }}></Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'center', borderTopRightRadius: px2dp(10), borderBottomRightRadius: px2dp(10) }}>
                        <Image source={require('../../image/Day9/down.png')} />
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    _PickClicked() {

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
});