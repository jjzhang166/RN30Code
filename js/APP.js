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
import NavigationPage from './page/day10/NavigationPage';
import NavigationOne from './page/day10/NavigationOne';
import NavigationTwo from './page/day10/NavigationTwo';
import NavigationDetail from './page/day10/NavigationDetail';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator';
import Day1 from './page/day1/Day1'
import Day2 from './page/day2/Day2'
import Day3 from './page/day3/Day3'
import Day4 from './page/day4/Day4'
import Day5 from './page/day5/Day5'
import Day6 from './page/day6/Day6'
import Day7 from './page/day7/Day7'
import Day8 from './page/day8/Day8'
import Day9 from './page/day9/Day9'

// 系统是iOS
global.iOS = (Platform.OS === 'ios');
// 系统是安卓
global.Android = (Platform.OS === 'android');


const MyTab = TabNavigator({
        HomePage: {
            screen: HomePage,
            navigationOptions: {
                headerTitle:'30 Days of React-Native',
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
                headerTitle:'30 Days of React-Native',
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
        swipeEnabled: true,// 禁止左右滑动
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
            drawerLabel: '总览',
            headerTitle:'NBA Final',
        }
    },
    NavigationOne:{
        screen:NavigationOne,
        navigationOptions: {
            gesturesEnabled: true,
            drawerLabel: '骑士',
            headerTitle:'骑士',
        }
    },
    NavigationTwo:{
        screen:NavigationTwo,
        navigationOptions: {
            gesturesEnabled: true,
            drawerLabel: '勇士',
            headerTitle:'勇士',
        }
    },
},{
    drawerWidth:200
})

const MyApp = StackNavigator({
    MyTab: {
        screen: MyTab,
    },
	MyDrawer: {
        screen: MyDrawer,
        navigationOptions: {
            gesturesEnabled: true,           
        }
    },
    NavigationDetail:{
        screen:NavigationDetail,
        nanavigationOptions: {
            gesturesEnabled: true,         
        }
    },
    Day1:{
        screen:Day1,
        navigationOptions: {
            gesturesEnabled: true,
            headerTitle:'第一天',
        }
    },
    Day2:{
        screen:Day2,
        navigationOptions: {
            gesturesEnabled: true,
            headerTitle:'第二天',
        }
    },
    Day3:{
        screen:Day3,
        navigationOptions: {
            gesturesEnabled: true,
            headerTitle:'第三天',
        }
    },
    Day4:{
        screen:Day4,
        navigationOptions: {
            gesturesEnabled: true,
            headerTitle:'第四天',
        }
    },
    Day5:{
        screen:Day5,
        navigationOptions: {
            gesturesEnabled: true,
            headerTitle:'第五天',
        }
    },
    Day6:{
        screen:Day6,
        navigationOptions: {
            gesturesEnabled: true,
            headerTitle:'第六天',
        }
    },
    Day7:{
        screen:Day7,
        navigationOptions: {
            gesturesEnabled: true,
            headerTitle:'第七天',
        }
    },
    Day8:{
        screen:Day8,
        navigationOptions: {
            gesturesEnabled: true,
            headerTitle:'第八天',
        }
    },
    Day9:{
        screen:Day9,
        navigationOptions: {
            gesturesEnabled: true,
            headerTitle:'第九天',
        }
    },
}, {
    mode: 'card',// 页面切换模式, 左右是card(相当于iOS中的push效果), 上下是modal(相当于iOS中的modal效果)
    headerMode: 'screen',//// 导航栏的显示模式, screen: 有渐变透明效果, float: 无透明效果, none: 隐藏导航栏
    transitionConfig: () => ({
        screenInterpolator: CardStackStyleInterpolator.forHorizontal,
    })
});


export default MyApp;
