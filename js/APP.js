import {
    StackNavigator,
    TabNavigator,
    TabBarBottom,
    DrawerNavigator
} from 'react-navigation';

import React from 'react';
import Storage from 'react-native-storage';

import {
    Platform,
    AsyncStorage,
    PixelRatio,
    Text,
    TouchableOpacity
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
import Day1 from './page/day1/Day1';
import Day2 from './page/day2/Day2';
import Day3 from './page/day3/Day3';
import Day4 from './page/day4/Day4';
import Day5 from './page/day5/Day5';
import Day6 from './page/day6/Day6';
import Day7 from './page/day7/Day7';
import Day8 from './page/day8/Day8';
import Day9 from './page/day9/Day9';
import LoginPage from './page/day11/LoginPage';
import SignUpPage from './page/day11/SignUpPage';
import ContactPage ,{getNavigation} from './page/day12/ContactPage';
import DetailPage from './page/day12/DetailPage';
import TodayHeader from './page/day13/TodayHeader';
import VideoPlayer from './page/day14/VideoPlayer';

// 系统是iOS
global.iOS = (Platform.OS === 'ios');
// 系统是安卓
global.Android = (Platform.OS === 'android');

let storage = new Storage({
    // 最大容量，默认值1000条数据循环存储
    size: 1000,

    // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
    // 如果不指定则数据只会保存在内存中，重启后即丢失
    storageBackend: AsyncStorage,

    // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
    defaultExpires: null,

    // 读写时在内存中缓存数据。默认启用。
    enableCache: true,
})

global.storage = storage;

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
            headerTitle:'状态机和属性',
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
            headerTitle:'相册',
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
            headerTitle:'热门电影',
        }
    },
    LoginPage:{
        screen:LoginPage,
        navigationOptions: {
            gesturesEnabled: true,
            headerTitle:'登录',
        }
    },
    SignUpPage:{
        screen:SignUpPage,
        navigationOptions: {
            gesturesEnabled: true,
            headerTitle:'注册',
        }
    },
    ContactPage:{
        screen:ContactPage,
        navigationOptions: {
            gesturesEnabled: true,
            headerTitle:'通讯录',
            headerRight:(<TouchableOpacity style={{paddingRight:8}} onPress={()=>{getNavigation().navigate('DetailPage')}}>
                <Text>新联系人</Text>
            </TouchableOpacity>),
        }
    },
    DetailPage:{
        screen:DetailPage,
        navigationOptions: {
            gesturesEnabled: true,
            headerTitle:'联系人信息',
        }
    },
    TodayHeader:{
        screen:TodayHeader,
        navigationOptions: {
            gesturesEnabled: true,
            headerTitle:'今日头条标签栏',
        }
    },
    VideoPlayer:{
        screen:VideoPlayer,
        navigationOptions: {
            gesturesEnabled: true,
            headerTitle:'视频播放',
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
