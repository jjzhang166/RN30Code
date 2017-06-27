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

export default class SignUpPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: '',
            pass: '',
            passAg: '',
            name: '',
            id: '',
            code: '',
            accountError: false,
            passError: false,
            passAgError: false,
            idError: false,
        }
    }

    render() {
        return (
            <KeyboardAwareScrollView
                style={{ backgroundColor: '#fff' }}
                resetScrollToCoords={{ x: 0, y: 0 }}
                contentContainerStyle={styles.container}
                scrollEnabled={false}>
                <View style={{ flex: 1 }}>
                    <View style={styles.item_container}>
                        <Text style={styles.title}>账户名称</Text>
                        <View style={{ flex: 1 }}>
                            <TextInput style={styles.search_input}
                                multiline={false}
                                underlineColorAndroid={'transparent'}
                                returnKeyLabel='next'
                                placeholder='手机号/邮箱'
                                blurOnSubmit={false}
                                onChangeText={(account) => this.setState({ account })}
                                onSubmitEditing={(event) => {
                                    this.passInput.focus();
                                }} />
                            {this.state.accountError ? <Text style={{ color: 'red', fontSize: px2dp(18) }}>账户名称错误</Text> : null}
                        </View>
                    </View>
                    <View style={styles.item_container}>
                        <Text style={styles.title}>密码</Text>
                        <View style={{ flex: 1 }}>
                            <TextInput style={styles.search_input}
                                ref={(view) => this.passInput = view}
                                multiline={false}
                                underlineColorAndroid={'transparent'}
                                returnKeyLabel='next'
                                placeholder='6-12位数字或字母'
                                blurOnSubmit={false}
                                onSubmitEditing={(event) => {
                                    this.passAgInput.focus();
                                }}
                                onChangeText={(pass) => this.setState({ pass })} />
                            {this.state.passError ? <Text style={{ color: 'red', fontSize: px2dp(18) }}>密码格式错误</Text> : null}
                        </View>
                    </View>
                    <View style={styles.item_container}>
                        <Text style={styles.title}>确认密码</Text>
                        <View style={{ flex: 1 }}>
                            <TextInput style={styles.search_input}
                                multiline={false}
                                underlineColorAndroid={'transparent'}
                                ref={(view) => this.passAgInput = view}
                                returnKeyLabel='next'
                                placeholder='再次输入密码'
                                blurOnSubmit={false}
                                onSubmitEditing={(event) => {
                                    this.nameInput.focus();
                                }}
                                onChangeText={(passAg) => this.setState({ passAg })} />
                            {this.state.passAgError ? <Text style={{ color: 'red', fontSize: px2dp(18) }}>两次输入密码不一致</Text> : null}
                        </View>
                    </View>
                    <View style={styles.item_container}>
                        <Text style={styles.title}>姓名</Text>
                        <View style={{ flex: 1 }}>
                            <TextInput style={styles.search_input}
                                multiline={false}
                                underlineColorAndroid={'transparent'}
                                ref={(view) => this.nameInput = view}
                                placeholder='请输入您的真实姓名'
                                returnKeyLabel='next'
                                blurOnSubmit={false}
                                onSubmitEditing={(event) => {
                                    this.idInput.focus();
                                }}
                                onChangeText={(name) => this.setState({ name })} />
                        </View>
                    </View>
                    <View style={styles.item_container}>
                        <Text style={styles.title}>身份证号码</Text>
                        <View style={{ flex: 1 }}>
                            <TextInput style={styles.search_input}
                                multiline={false}
                                underlineColorAndroid={'transparent'}
                                ref={(view) => this.idInput = view}
                                placeholder='请输入您的身份证号码'
                                returnKeyLabel='next'
                                blurOnSubmit={false}
                                onSubmitEditing={(event) => {
                                    this.codeInput.focus();
                                }}
                                onChangeText={(id) => this.setState({ id })} />
                            {this.state.idError ? <Text style={{ color: 'red', fontSize: px2dp(18) }}>身份证输入有误</Text> : null}
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', backgroundColor: '#fff', borderBottomWidth: 2 / PixelRatio.get(), borderBottomColor: '#c4c4c4' }}>
                        <View style={{ flexDirection: 'row', padding: px2dp(20), flex: 1 }}>
                            <Text style={styles.title}>验证码</Text>
                            <View style={{ flex: 1 }}>
                                <TextInput style={styles.search_input}
                                    multiline={false}
                                    underlineColorAndroid={'transparent'}
                                    ref={(view) => this.codeInput = view}
                                    keyboardType='numeric'
                                    placeholder='请输入收到的验证码'
                                    onChangeText={(code) => this.setState({ code })} />
                            </View>
                        </View>
                        <TouchableOpacity style={styles.search_btn} onPress={this._CodeButtonCallback.bind(this)}>
                            <Text style={{ color: '#fff', fontSize: px2dp(20), padding: px2dp(18) }}>获取验证码</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }} />
                    <View style={{ height: px2dp(100) }}>
                        <TouchableOpacity style={{ flex: 1, backgroundColor: 'red', alignItems: 'center', justifyContent: 'center' }} onPress={this._SignUpButtonCallback.bind(this)}>
                            <Text style={{ color: '#fff', fontSize: theme.text.fontSize }}>注册</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        );
    }

    _CodeButtonCallback() {
        //在这个调用发送验证码的接口
    }

    _SignUpButtonCallback() {
        let currentTime = new Date().getTime();
        if (currentTime - clickTime > 1000) {
            clickTime = currentTime;
            if (this.checkAccount()&this.checkPass()&this.checkPassAg()&this.checkId()) {
                Alert.alert(
                    '提示',
                    "注册成功",
                    [{
                        text: 'OK', onPress: () => {
                            this.props.navigation.goBack();
                        }
                    }]
                );
            }
        }
    }

    //正则表达式检查输入格式是否正确，一般单独写成一个工具类
    checkAccount() {
        var phoneCheck;
        var emailCheck;
        var rePhone = /^1\d{10}$/
        if (rePhone.test(this.state.account)) {
            phoneCheck = true;
        } else {
            phoneCheck = false;
        }
        var reEmail = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
        if (reEmail.test(this.state.account)) {
            emailCheck = true;
        } else {
            emailCheck = false;
        }
        if (phoneCheck || emailCheck) {
            this.setState({
                accountError: false
            })
        } else {
            this.setState({
                accountError: true
            })
        }
        return phoneCheck || emailCheck;
    }

    checkPass() {
        var re = /^(\w){6,12}$/;
        if (re.test(this.state.pass)) {
            this.setState({
                passError: false
            })
        } else {
            this.setState({
                passError: true
            })
        }
        return re.test(this.state.pass);
    }

    checkPassAg() {
        if (this.state.pass == this.state.passAg) {
            this.setState({
                passAgError: false
            })
        } else {
            this.setState({
                passAgError: true
            })
        }
        return this.state.pass == this.state.passAg;
    }

    checkId() {
        var re = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/;
        if (re.test(this.state.id)) {
            this.setState({
                idError: false
            })
        } else {
            this.setState({
                idError: true
            })
        }
        return re.test(this.state.id);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    item_container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: px2dp(20),
        borderBottomWidth: 2 / PixelRatio.get(),
        borderBottomColor: '#c4c4c4'
    },
    search_input: {
        padding: px2dp(0),
        height: px2dp(60),
        fontSize: px2dp(24),
        color: theme.darkColor,
    },
    search_btn: {
        backgroundColor: 'red',
        marginLeft: px2dp(12),
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        color: theme.darkColor,
        width: px2dp(180),
        fontSize: px2dp(24),
        paddingTop: px2dp(14)
    }
});