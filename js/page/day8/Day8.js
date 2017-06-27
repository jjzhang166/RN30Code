// /js/page/day1/Day1.js
import React, { Component } from 'react';//从React中导入依赖
import { //从React Native依赖中导入
    StyleSheet,
    WebView
} from 'react-native';

export default class Day8 extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
      }
    render() {//绘制界面的方法
        return (
            <WebView
                ref="webView"
                style={{ height: this.state.webViewHeight }}
                javaScriptEnabled={true}
                source={(iOS || (__DEV__)) ? require("./html/index.html") : { uri: 'file:///android_asset/pages/index.html' }}
                onLoad={this._onLoadWeb.bind(this)}
                onMessage={this._onMessage} />
        );
    }
    _onMessage = e => {
        console.log(e.nativeEvent.data);
        this.setState({ webViewHeight: parseInt(e.nativeEvent.data) - 1 })
    };
    _onLoadWeb() {
        if (this.refs.webView) {
            console.log("onLoad");
            this.refs.webView.injectJavaScript("sc();");
        }
        //网络请求  //传递数据
        // this.refs.webView.postMessage(JSON.stringify(this.state))
        // let that = this;
        // NetUtils.get("gept/api/mainPage/init", "length=3", (e) => {
        //         that.setState({
        //             networkActivityIndicatorVisible: false
        //         })
        //     })
        //     .then((result) => {
        //         that.setState({
        //             networkActivityIndicatorVisible: false
        //         })
        //         that.setState(result.data);
        //         if (this.refs.webView) {
        //             console.log("传递数据")
        //             this.refs.webView.postMessage(JSON.stringify(this.state))
        //         }
        //     })
    }
}
