'use strict';

import React, { Component, PropTypes } from 'react';
import {
    Image,
    Text,
    View,
    StyleSheet,
    Platform,
    ScrollView,
    PixelRatio,
    Alert,
    TouchableNativeFeedback,
    TouchableOpacity
} from 'react-native';
import px2dp from '../../utils/px2dp';
import theme from '../../config/theme';

export default class NavigationOne extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={{ height: px2dp(500), flexDirection: 'row', alignItems: 'center', borderBottomWidth: 2 / PixelRatio.get(), borderBottomColor: '#c4c4c4' }}>
                    <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', borderRightWidth: 2 / PixelRatio.get(), borderRightColor: '#c4c4c4' }}>
                        <Image source={require('../../image/Day10/cleve.png')} />
                        <Text style={styles.text}>克利夫兰骑士</Text>
                        <Text style={styles.text}>Cleveland Cavaliers</Text>
                        <Text style={styles.text}>中部区第1｜51胜-31负</Text>
                    </View>
                    <View style={{ flex: 1, paddingRight: px2dp(30), paddingLeft: px2dp(30) }}>
                        <Text style={{ fontSize: px2dp(30), color: 'blue' }}>球队信息</Text>
                        <Text style={styles.text}>成立时间：1970</Text>
                        <Text style={styles.text}>所属地区：俄亥俄州克里夫兰</Text>
                        <Text style={styles.text}>主场馆：速贷球馆</Text>
                        <Text style={styles.text}>现任主教练：泰伦-卢</Text>
                        <Text style={styles.text}>总冠军次数：1次</Text>
                    </View>
                </View>
                <Text style={{ fontSize: px2dp(30), color: 'blue', paddingLeft: px2dp(30), paddingTop: px2dp(20) }}>球队实力</Text>
                <View style={{ height: px2dp(350), justifyContent: 'center', alignItems: 'center', borderBottomWidth: 2 / PixelRatio.get(), borderBottomColor: '#c4c4c4' }}>
                    <Image source={require('../../image/Day10/clevepower.png')} />
                </View>
                <Text style={{ fontSize: px2dp(30), color: 'blue', paddingLeft: px2dp(30), paddingTop: px2dp(20) }}>主力球员</Text>
                <View style={{ paddingBottom: px2dp(100) }}>
                    <View style={{ height: px2dp(200), flexDirection: 'row', alignItems: 'center', marginTop: px2dp(12) }}>
                        <TouchableOpacity style={styles.imageContainer} onPress={this._itemPressed.bind(this, 0)}>
                            <Image style={styles.circleImage} source={require('../../image/Day10/cleve1.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.imageContainer} onPress={this._itemPressed.bind(this, 1)}>
                            <Image style={styles.circleImage} source={require('../../image/Day10/cleve2.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.imageContainer} onPress={this._itemPressed.bind(this, 2)}>
                            <Image style={styles.circleImage} source={require('../../image/Day10/cleve3.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: px2dp(200), flexDirection: 'row', alignItems: 'center', marginTop: px2dp(12) }}>
                        <TouchableOpacity style={styles.imageContainer} onPress={this._itemPressed.bind(this, 3)}>
                            <Image style={styles.circleImage} source={require('../../image/Day10/cleve4.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.imageContainer} onPress={this._itemPressed.bind(this, 4)}>
                            <Image style={styles.circleImage} source={require('../../image/Day10/cleve5.png')} />
                        </TouchableOpacity>
                        <View style={{ flex: 1 }} />
                    </View>
                </View>
            </ScrollView>
        );
    }

    _itemPressed(index) {
        switch (index) {
            case 0:
                this.props.navigation.navigate('NavigationDetail', { id: 0 })
                break;
            case 1:
                this.props.navigation.navigate('NavigationDetail', { id: 1 })
                break;
            case 2:
                Alert.alert('暂无欧文的数据')
                break;
            case 3:
                break;
            case 4:
                break;
        }
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    text: {
        fontSize: px2dp(26),
        color: '#000',
        marginTop: px2dp(12)
    },
    circleImage: {
        width: px2dp(200),
        height: px2dp(200),
        borderRadius: px2dp(100)
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});