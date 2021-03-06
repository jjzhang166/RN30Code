'use strict';
import {Dimensions,PixelRatio} from 'react-native';
// import ReactNative from 'react-native';
// const uiHeightPx = 667;  //设计稿的尺寸

// export default function px2dp(uiElementPx) {
//     console.log(deviceHeightDp);
//     console.log(deviceHeightDp);
//     return uiElementPx *  deviceHeightDp / uiHeightPx;
// }

// http://blog.csdn.net/vv_bug/article/details/54958200
/**
 * 屏幕工具类
 * ui设计基准,iphone 6
 * width:750
 * height:1334
 */
export var screenW = Dimensions.get('window').width;
export var screenH = Dimensions.get('window').height;
const fontScale = PixelRatio.getFontScale();
export var pixelRatio = PixelRatio.get();
const r2=2;
const w2 = 750/r2;
const h2 = 1334/r2;
/**
 * 设置text为sp
 * @param size  sp
 * @returns {Number} dp
 */
export const DEFAULT_DENSITY=2;
export function setSpText(size) {
    var scaleWidth = screenW / w2;
    var scaleHeight = screenH / h2;
    var scale = Math.min(scaleWidth, scaleHeight);
    size = Math.round((size * scale + 0.5) * pixelRatio / fontScale);
    return size;
}
/**
 * 屏幕适配,缩放size
 * @param size
 * @returns {Number}
 * @constructor
 */
export default function px2dp(size) {
    var scaleWidth = screenW / w2;
    var scaleHeight = screenH / h2;
    var scale = Math.min(scaleWidth, scaleHeight);
    size = Math.round((size * scale + 0.5));
    return size/DEFAULT_DENSITY;
}


export function px2dpForHeight(size) {
   // var scaleWidth = screenW / w2;
    var scaleHeight = screenH / h2;
    //var scale = Math.min(scaleWidth, scaleHeight);
    size = Math.round((size * scaleHeight + 0.5));
    return size/DEFAULT_DENSITY;
}