'use strict';

import React, { Component, PropTypes } from 'react';
import {
    Image,
    Text,
    View,
    StyleSheet,
    TextInput,
    Platform,
    PixelRatio,
    Alert,
    TouchableNativeFeedback,
    TouchableOpacity
} from 'react-native';
import px2dp from '../../utils/px2dp';
import theme from '../../config/theme';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

var clickTime = 0;

export default class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: '',
            password: ''
        }
    }

    render() {
        return (
            <KeyboardAwareScrollView
                style={{ backgroundColor: '#fff' }}
                resetScrollToCoords={{ x: 0, y: 0 }}
                contentContainerStyle={styles.container}
                scrollEnabled={false}>
                <View
                    style={{ flex: 1, justifyContent: 'center', paddingLeft: px2dp(30), paddingRight: px2dp(30), paddingBottom: px2dp(100) }}>
                    <View style={styles.logo}>
                        <Image source={require('../../image/Day11/logo.png')} />
                    </View>
                    <View style={styles.input_area}>
                        <Text style={styles.input_title}>账号</Text>
                        <TextInput style={{ flex: 1, fontSize: theme.text.fontSize, marginLeft: px2dp(40) }}
                            multiline={false}
                            placeholder='请输入账户名称'
                            underlineColorAndroid={'transparent'}
                            returnKeyLabel='next'
                            blurOnSubmit={false}
                            onSubmitEditing={(event) => {
                                this.passInput.focus();
                            }}
                            onChangeText={(account) => this.setState({ account })} />
                    </View>
                    <View style={{ height: px2dp(4) }} />
                    <View style={styles.input_area}>
                        <Text style={styles.input_title}>密码</Text>
                        <TextInput style={{ flex: 1, fontSize: theme.text.fontSize, marginLeft: px2dp(40) }}
                            multiline={false}
                            placeholder='请输入密码'
                            underlineColorAndroid={'transparent'}
                            ref={(view) => this.passInput = view}
                            secureTextEntry={true}
                            onChangeText={(password) => this.setState({ password })} />
                    </View>
                    <TouchableOpacity
                        style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: px2dp(20), alignItems: 'center' }}
                        onPress={this._ForgetButtonCallback.bind(this)}>
                        <Image style={{ height: px2dp(50), width: px2dp(50) }} source={require('../../image/Day11/question.png')} />
                        <Text style={{ fontSize: theme.text.fontSize, color: theme.grayColor, marginLeft: px2dp(4) }}>忘记密码</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.login_btn} onPress={this._LoginButtonCallback.bind(this)}>
                        <Text style={{ fontSize: theme.text.fontSize, color: '#fff' }}>登录</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.signup_btn} onPress={this._SignUpButtonCallback.bind(this)}>
                        <Text style={{ fontSize: theme.text.fontSize, color: theme.red }}>注册</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        );
    }

    _ForgetButtonCallback() {
        //在这里执行找回密码的操作
        Alert.alert('忘记密码');
    }

    _LoginButtonCallback() {
        //在这里调用登录接口
        Alert.alert('登录');
    }

    _SignUpButtonCallback() {
        let currentTime = new Date().getTime();
        if (currentTime - clickTime > 1000) {
            clickTime = currentTime;
            this.props.navigation.navigate("SignUpPage");
        }
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: px2dp(30)
    },
    logo: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: px2dp(12)
    },
    input_area: {
        height: px2dp(120),
        backgroundColor: '#F5F5F5',
        flexDirection: 'row',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input_title: {
        width: px2dp(150),
        color: '#000',
        fontSize: theme.text.fontSize,
        textAlign: 'center',
        borderRightWidth: 2 / PixelRatio.get(),
        borderRightColor: '#E5E5E5'
    },
    login_btn: {
        height: px2dp(120),
        backgroundColor: 'red',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: px2dp(20)
    },
    signup_btn: {
        height: px2dp(120),
        backgroundColor: '#fff',
        borderWidth: 2 / PixelRatio.get(),
        borderColor: theme.red,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: px2dp(12)
    }
});