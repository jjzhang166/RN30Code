import {
    StackNavigator,
    TabNavigator,
    TabBarBottom,
    DrawerNavigator
} from 'react-navigation';

import React from 'react';

import {
    Image,
    StyleSheet,
    Text,
    Platform,
    AsyncStorage,
    PixelRatio
} from 'react-native';
import theme from './config/theme';
import TabBarItem from './component/TabBarItem';
import HomePage from './page/HomePage';
import MyPage from './page/MyPage';
import NavigationPage from './page/NavigationPage';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator';
import Day1 from './page/day1/Day1'

// 系统是iOS
global.iOS = (Platform.OS === 'ios');
// 系统是安卓
global.Android = (Platform.OS === 'android');


const MyTab = TabNavigator({
        HomePage: {
            screen: HomePage,
            navigationOptions: {
                header: null,
                tabBarLabel: '首页',
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItem
                        focused={focused}
                        normalImage={require('./image/tab_home.png')}
                        selectedImage={require('./image/tab_home_sg.png')}
                    />
                )
            }
        },
        MyPage: {
            screen: MyPage,
            navigationOptions: {
                header: null,
                tabBarLabel: '我的',
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItem
                        focused={focused}
                        normalImage={require('./image/tab_person.png')}
                        selectedImage={require('./image/tab_person_sg.png')}
                    />
                )
            }
        },
    },
    {
        tabBarPosition: 'bottom',// 显示在底端，android 默认是显示在页面顶端的
        swipeEnabled: false,// 禁止左右滑动
        animationEnabled: false,//切换页面时不显示动画
        backBehavior: 'none',
        lazy: true,
        tabBarComponent: TabBarBottom,

        tabBarOptions: {
            // tabbar上label的style
            labelStyle: {
                // marginTop:0
            },
            // tabbar的Iconstyle
            iconStyle: {
                height: 35,
                width: 35,
                margin: 0
            },
            // tabbar的style
            style: {
                height: 49,
                backgroundColor: 'white',
                borderTopWidth: 2 / PixelRatio.get(),
                borderTopColor: '#c4c4c4'
            },
            // label和icon的背景色 活跃状态下
            activeBackgroundColor: 'white',
            // label和icon的前景色 活跃状态下（选中）
            activeTintColor: theme.red,
            // label和icon的背景色 不活跃状态下
            inactiveBackgroundColor: 'white',
            // label和icon的前景色 不活跃状态下(未选中)
            inactiveTintColor: theme.grayColor,
            showIcon: true,
            // 是否显示label，默认为true
            showLabel: true,
            // 不透明度为按选项卡(iOS和Android < 5.0)
            pressOpacity: 0.3,

            indicatorStyle: {
                height: 0, // android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了,
            }
        }

    }
);

const MyDrawer = DrawerNavigator({
    NavigationPage: {
        screen: NavigationPage,
        navigationOptions: {
            gesturesEnabled: true,
            title: (<Text style={{ flex: 1, textAlign: 'center', color: theme.actionBar.fontColor, fontSize: theme.actionBar.fontSize }}>Navigation组件用法</Text>),
            drawerLabel: 'Home',
        }
    }
})

const MyApp = StackNavigator({
    MyTab: {
        screen: MyTab,
    },
	MyDrawer: {
        screen: MyDrawer,
    },
    Day1:{
        screen:Day1,
        navigationOptions: {
            gesturesEnabled: true,
            header: null
        }
    }
}, {
    mode: 'card',// 页面切换模式, 左右是card(相当于iOS中的push效果), 上下是modal(相当于iOS中的modal效果)
    headerMode: 'none',//// 导航栏的显示模式, screen: 有渐变透明效果, float: 无透明效果, none: 隐藏导航栏
    transitionConfig: () => ({
        screenInterpolator: CardStackStyleInterpolator.forHorizontal,
    })
});


export default MyApp;
