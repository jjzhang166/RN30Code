'use strict';

import {PixelRatio, Dimensions, Platform} from 'react-native';
import px2dp from '../utils/px2dp';

const globalTextColor = '#333333';

export default module={
    screenWidth: Dimensions.get('window').width,
    screenHeight: Dimensions.get('window').height,
    themeColor: 'rgb(255,255,255)',
    pageBackgroundColor: '#f5f5f5',
    grayColor: '#999999',
    lightDarkColor:"#666666",
    darkColor:"#333333",
    btnActiveOpacity: 0.5,
    lightGray:"#f5f5f5",
    actionBar: {
        height: (Platform.OS === 'android') ? px2dp(98) : px2dp(128),
        backgroundColor: 'rgb(255,255,255)',
        fontSize: px2dp(34),
        fontColor: 'black'
    },
    text: {
        color: globalTextColor,
        fontSize: px2dp(24)
    },
    red:'#ef2d36',
    scrollView: {
        fontSize: px2dp(30),
        underlineStyle: {
            backgroundColor: 'white'
        }
    }
};