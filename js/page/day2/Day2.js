// /js/page/day2/Day2.js
import React, { Component } from 'react';//从React中导入依赖
import {AppRegistry, StyleSheet, Text, View} from 'react-native';


class Counter extends Component {

    state = {count: 0}

    componentDidMount() {
        this.timer=setInterval(() => {
            this.setState({count: this.state.count + 1})
        }, 1000)
    }

    render() {
        const {count} = this.state
        const {color, size} = this.props

        return (
            <Text style={{color, fontSize: size}}>
                {count}
            </Text>
        )
    }
    componentWillUnmount() {
        // 请注意Un"m"ount的m是小写
        // 如果存在this.timer，则使用clearTimeout清空。
        // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        this.timer && clearInterval(this.timer);
    }
}


export default class Day2 extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Counter color={'lightblue'} size={16} />
                <Counter color={'skyblue'} size={32} />
                <Counter color={'steelblue'} size={80} />
                <Counter color={'darkblue'} size={140} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})