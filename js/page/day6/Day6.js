// /js/page/day1/Day1.js
import React, { Component } from 'react';//从React中导入依赖
import { //从React Native依赖中导入
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

export default class Day6 extends Component {
    render() {//绘制界面的方法
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    欢迎阅读这本书! {/*修改了此处代码*/}
                </Text>
                <Text style={styles.instructions}>{/*修改了此处代码*/}
                    这本书由浅入深,循序渐进的介绍React Native相关知识.
                </Text>
                <Text style={styles.instructions}>
                    让我们开始吧! {/*修改了此处代码*/}
                </Text>
            </View>
        );
    }
}
// 样式文件,类似css
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});