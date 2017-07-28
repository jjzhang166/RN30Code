const React = require('react');
import {
    StyleSheet,
    Text,
    Image,
    View,
    ScrollView,
    TouchableOpacity
} from 'react-native';

import px2dp from '../../utils/px2dp';

const CustomTabBar = React.createClass({
    propTypes: {
        goToPage: React.PropTypes.func,
        activeTab: React.PropTypes.number,
        tabs: React.PropTypes.array,
        backgroundColor: React.PropTypes.string,
        addIconPressed: React.PropTypes.func
    },

    getDefaultProps() {
        return {
            activeTextColor: 'navy',
            inactiveTextColor: 'black',
            backgroundColor: '#fff',
        };
    },

    renderTabOption(name, page) {
        const color = this.props.activeTab === page ? "red" : "#000"; // 判断是否是当前选中的tab，设置不同的颜色
        const size = this.props.activeTab === page ? px2dp(30) : px2dp(26);
        return (
            <TouchableOpacity onPress={() => this.props.goToPage(page)} style={styles.tab} key={name}>
                <Text allowFontScaling={false}
                      style={{color: color, padding: px2dp(8), textAlign: 'center', fontSize: size}}>{name}</Text>
            </TouchableOpacity>
        );
    },

    render() {
        return (
            <View style={[styles.tabs, {backgroundColor: this.props.backgroundColor}]}>
                <ScrollView style={{flex: 1, flexDirection: 'row'}}
                            automaticallyAdjustContentInsets={false}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            directionalLockEnabled={true}
                            bounces={false}
                            scrollsToTop={false}>
                    {this.props.tabs.map((name, page) => this.renderTabOption(name, page))}
                </ScrollView>
                <TouchableOpacity style={{paddingLeft: px2dp(20), paddingRight: px2dp(20), borderLeftWidth:px2dp(1),borderLeftColor:'#c5c5c5'}} onPress={this.props.addIconPressed}>
                    <Image source={require('./image/new.png')}/>
                </TouchableOpacity>
            </View>
        );
    },
});

const styles = StyleSheet.create({
    tab: {
        width: px2dp(110),
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabs: {
        height: px2dp(60),
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderColor: '#ccc',
    },
});

module.exports = CustomTabBar;