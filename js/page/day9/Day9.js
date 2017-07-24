'use strict';

import React, { Component, PropTypes } from 'react';
import {
    Image,
    Text,
    View,
    StyleSheet,
    ScrollView,
    Platform,
    PixelRatio,
    TouchableNativeFeedback,
    TouchableOpacity
} from 'react-native';
import px2dp from '../../utils/px2dp';
import theme from '../../config/theme';
import Picker from 'react-native-picker';

let movieData = [
    {
        2017: [
            '加勒比海盗5:死无对证', '神奇女侠', '速度与激情8'
        ]
    },
    {
        2016: [
            '你的名字', '疯狂动物城', '血战钢锯岭'
        ]
    },
    {
        2015: [
            '复仇者联盟2:奥创纪元', '霍比特人3:五军之战', '火星救援'
        ]
    }
]

//模拟数据（来源于百度百科），实际是一般来源于网络请求，JSON格式
let movieInfo = [
    {
        name: '加勒比海盗5:死无对证',
        url: 'https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike272%2C5%2C5%2C272%2C90/sign=6ded1c37b20e7bec37d70bb34e47d25d/e1fe9925bc315c60604463d787b1cb1349547730.jpg',
        intro: '杰克船长（约翰尼·德普饰）发现令人闻风丧胆的萨拉查船长 （哈维尔·巴登饰）竟率领着一众夺命亡灵水手逃出了百慕大三角区。他们扬言要杀尽世上所有的海盗，头号目标就是杰克船长。要想改写命运，杰克船长唯一的希望就是找到传说中海神波塞冬的三叉戟，拥有它就能拥有统治整个海洋的力量。为了寻获这件神器，杰克船长被迫和聪明美丽的天文学家卡琳娜·史密斯（卡雅·斯考达里奥饰）以及固执的年轻皇家海军亨利（布兰顿·思怀兹饰）联手出击。航行着他那破破烂烂的“黑珍珠”号，杰克船长不但决心要改变自己的厄运，同时也力求能从史上最狠毒可怕的敌人那里捡回一条命。'
    },
    {
        name: '神奇女侠',
        url: 'https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike116%2C5%2C5%2C116%2C38/sign=90ca739f5bda81cb5aeb8b9f330fbb73/4afbfbedab64034f4554596da5c379310a551d3b.jpg',
        intro: '戴安娜·普林斯（盖尔·加朵饰）生活在亚马逊天堂岛，岛上只有女性，作为众神之王宙斯与亚马逊女王希波吕忒（康妮·尼尔森饰）的女儿，在她的成长过程中，一直受到母亲和姨母安提俄珀（罗宾·怀特饰）的悉心呵护。直到有一天，一架战机坠入天堂岛附近海域，戴安娜的平静生活由此被打破。戴安娜将坠海的飞行员史蒂夫（克里斯·派恩饰）救起，但其母亲对这位普通男人的世界没有一点兴趣。史蒂夫强调自己的目标是结束第一次世界大战，而戴安娜则认为这场人类的浩劫或许是战神阿瑞斯捣的鬼，于是决定与史蒂夫一起前往战争前线，第一次亲身体验到了人类战争的威力，并逐渐理解了身为英雄的意义和代价。'
    },
    {
        name: '速度与激情8',
        url: 'https://gss2.bdstatic.com/-fo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike272%2C5%2C5%2C272%2C90/sign=d3898fd599ef76c6c4dff379fc7f969f/9358d109b3de9c82e70ca47b6581800a18d843dc.jpg',
        intro: '多米尼克·托莱多（范·迪塞尔饰）与莱蒂（米歇尔·罗德里格兹饰）共度蜜月，布莱恩与米娅退出了赛车界，这支曾环游世界的顶级飞车家族队伍的生活正渐趋平淡。然而，一位神秘女子塞弗（查理兹·塞隆饰）的出现，她引诱多米尼克·托莱多走上犯罪道路，令整个队伍卷入信任与背叛的危机，生死患难的情义面临瓦解崩溃，前所未有的灾难考验着最个飞车家族。'
    },
    {
        name: '你的名字',
        url: 'https://gss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike272%2C5%2C5%2C272%2C90/sign=3682361ff4faaf5190ee89eded3dff8b/cdbf6c81800a19d844a71a3c3afa828ba61e4667.jpg',
        intro: '故事发生的地点是在每千年回归一次的彗星造访过一个月之前，日本飞驒市的乡下小镇糸守町。在这里女高中生三叶每天都过着忧郁的生活，而她烦恼的不光有担任镇长的父亲所举行的选举运动，还有家传神社的古老习俗。在这个小小的城镇，周围都只是些爱瞎操心的老人。为此三叶对于大都市充满了憧憬。然而某一天，自己做了一个变成男孩子的梦。这里有着陌生的房间、陌生的朋友。而眼前出现的则是东京的街道。三叶虽然感到困惑，但是能够来到朝思暮想的都市生活，让她觉得神清气爽。另一方面在东京生活的男高中生立花泷也做了个奇怪的梦，他在一个从未去过的深山小镇中，变成了女高中生。两人就这样在梦中邂逅了彼此。'
    },
    {
        name: '疯狂动物城',
        url: 'https://gss3.bdstatic.com/7Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike272%2C5%2C5%2C272%2C90/sign=74f26be6d658ccbf0fb1bd6878b1d75b/f9dcd100baa1cd11b5a7b074be12c8fcc3ce2d55.jpg',
        intro: '一个现代化的动物都市，每种动物在这里都有自己的居所，有沙漠气候的撒哈拉广场、常年严寒的冰川镇等等，它就像一座大熔炉，动物们在这里和平共处——无论是大象还是小老鼠，只要努力，都能闯出一番名堂。兔子朱迪从小就梦想能成为动物城市的警察，尽管身边的所有人都觉得兔子不可能当上警察，但她还是通过自己的努力，跻身到了全是大块头动物城警察局，成为了第一个兔子警官。为了证明自己，她决心侦破一桩神秘案件。追寻真相的路上，朱迪迫使在动物城里以坑蒙拐骗为生的狐狸尼克帮助自己，却发现这桩案件背后隐藏着一个意欲颠覆动物城的巨大阴谋，他们不得不联手合作，去尝试揭开隐藏在这巨大阴谋后的真相。'
    },
    {
        name: '血战钢锯岭',
        url: 'https://gss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=ccec510433292df583cea447dd583705/8326cffc1e178a82e103eb8bff03738da977e8da.jpg',
        intro: '在1942年的太平洋战场，军医戴斯蒙德·道斯（安德鲁·加菲尔德饰）不愿意在前线举枪射杀任何一个人，他因自己的和平理想遭受着其他战士们的排挤。尽管如此，他仍坚守信仰及原则，孤身上阵，无惧枪林弹雨和凶残日军，誓死拯救即使一息尚存的战友。数以百计的同胞在敌人的土地上伤亡惨重，他一人冲入枪林弹雨，不停地祈祷，乞求以自己的绵薄之力尽再救一人，75名受伤战友最终被奇迹般的运送至安全之地，得以生还。'
    },
    {
        name: '复仇者联盟2:奥创纪元',
        url: 'https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike150%2C5%2C5%2C150%2C50/sign=ff7f34f43f12b31bd361c57be7715d1f/63d0f703918fa0ec8408ccbe209759ee3c6ddbb2.jpg',
        intro: '身经百战的超级英雄们产生了职业倦怠，已经卸下钢铁战甲的托尼·斯塔克因此发明了“奥创”——有自我意识、有学习能力的人工智能机器人，并将指挥机器人军团的重任交给奥创。令超级英雄们始料不及的是，不断进化的奥创得出了“人类是地球上最大的威胁”这一结论，进而开始实施清洗人类的毁灭计划。有强大能力的改造人兄妹快银和猩红女巫也成为奥创的帮手，四处制造麻烦。复仇者联盟必须再度集合，解决这个由他们亲手制造的危机。'
    },
    {
        name: '霍比特人3:五军之战',
        url: 'https://gss2.bdstatic.com/-fo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=416f31278126cffc7d27b7e0d86821f5/64380cd7912397dd576edfba5a82b2b7d0a2877d.jpg',
        intro: '夺回孤山的“矮人王”索林顺理成章的占据了无数远古矮人的财宝，同时这些堆积如山的财宝也吸引着人类勇士巴德和精灵王瑟兰迪尔所率的联军，矮人一族面临着一场巨大的危机。随后冲着无尽财宝而来的半兽人大军蜂拥而至，面对这些邪恶、贪婪的半兽人，与人类和精灵联军对峙已久的矮人一族也终于放下隔阂，在“矮人王”索林的率领下与人类、精灵歃血为盟，共同对抗半兽人部队。'
    },
    {
        name: '火星救援',
        url: 'https://gss3.bdstatic.com/7Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike180%2C5%2C5%2C180%2C60/sign=33cdd70aa5cc7cd9ee203c8b58684a5a/5d6034a85edf8db15471b0830f23dd54574e74fe.jpg',
        intro: '人类实现了首次在火星上登陆，美国宇航员马克·沃特尼（马特·达蒙饰），他与其他五位宇航员遭遇巨型风暴，外太空之旅只能提前结束，他因为被误认为无法生还而被留在火星，成了太空鲁宾逊。清醒后的沃特尼发现自己远离地球家园，食物只够一个月的供应。幸好他天性幽默乐观，而且是个植物学专家，决定靠自己的力量生存下去，等到下次火星任务的到来，虽然这一等就要四年。沃特尼精心计算如何最大限度地利用他在这颗干旱星球上的时间，开始利用自制的肥料种植土豆，对手头的所有材料物尽其用。而在地球上，公众哀悼马克的悲剧死亡后，一位眼尖的NASA技术员在监看时注意到火星表面的运动迹象，怀疑可能是马克还活着。双方重新取得联系后，火星救援任务由此启动。'
    },]

export default class Day9 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            name: '加勒比海盗5:死无对证',
            image: 'https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike272%2C5%2C5%2C272%2C90/sign=6ded1c37b20e7bec37d70bb34e47d25d/e1fe9925bc315c60604463d787b1cb1349547730.jpg',
            intro: '杰克船长（约翰尼·德普饰）发现令人闻风丧胆的萨拉查船长 （哈维尔·巴登饰）竟率领着一众夺命亡灵水手逃出了百慕大三角区。他们扬言要杀尽世上所有的海盗，头号目标就是杰克船长。要想改写命运，杰克船长唯一的希望就是找到传说中海神波塞冬的三叉戟，拥有它就能拥有统治整个海洋的力量。为了寻获这件神器，杰克船长被迫和聪明美丽的天文学家卡琳娜·史密斯（卡雅·斯考达里奥饰）以及固执的年轻皇家海军亨利（布兰顿·思怀兹饰）联手出击。航行着他那破破烂烂的“黑珍珠”号，杰克船长不但决心要改变自己的厄运，同时也力求能从史上最狠毒可怕的敌人那里捡回一条命。'
        }
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <TouchableOpacity style={{ padding: px2dp(4), marginTop: px2dp(8), height: px2dp(80), flexDirection: 'row' }} activeOpacity={0.8} onPress={this._PickClicked.bind(this)}>
                    <View style={{ flex: 1, justifyContent: 'center', borderWidth: 2 / PixelRatio.get(), borderColor: 'red', borderTopLeftRadius: px2dp(10), borderBottomLeftRadius: px2dp(10) }}>
                        <Text style={{ fontSize: px2dp(30), color: '#000', paddingLeft: px2dp(8) }} numberOfLines={1}>{this.state.name}</Text>
                    </View>
                    <View style={{ width: px2dp(50), justifyContent: 'center', alignItems: 'center', backgroundColor: 'red', borderTopRightRadius: px2dp(10), borderBottomRightRadius: px2dp(10) }}>
                        <Image style={{ height: px2dp(30), width: px2dp(40) }} source={require('../../image/Day9/down.png')} />
                    </View>
                </TouchableOpacity>
                <Image style={{ height: px2dp(1100), marginTop: px2dp(8) }} source={{ uri: this.state.image }} resizeMode='cover' onLoadStart={this._loadStart.bind(this)} onLoad={this._load.bind(this)} />
                {this.state.loading ?
                    <View style={{ position: 'absolute', left: theme.screenWidth/2-50, top: theme.screenHeight/2-50, justifyContent: 'center', alignItems: 'center' ,backgroundColor:'#fff',padding:px2dp(30),borderRadius:px2dp(5)}}>
                        <Image source={require('../../image/Day9/loading.gif')} />
                        <Text style={{ marginTop: px2dp(20) }}>图片加载中...</Text>
                    </View>
                    :
                    null}
                <Text style={{ padding: px2dp(4), fontSize: px2dp(36), color: 'red' }}>剧情简介：</Text>
                <Text style={{ padding: px2dp(4) }}>{this.state.intro}</Text>
            </ScrollView>
        );
    }

    _loadStart() {
        this.setState({
            loading: true
        })
    }

    _load() {
        this.setState({
            loading: false
        })
    }

    _PickClicked() {
        Picker.init({
            pickerData: movieData,
            pickerConfirmBtnText: '确认',
            pickerCancelBtnText: '取消',
            pickerTitleText: '请选择要查看的电影',
            pickerBg: [245, 245, 245, 1],
            pickerFontSize: px2dp(36),
            onPickerConfirm: data => {
                console.log(data);
                for (var i = 0; i < movieInfo.length; i++) {
                    if (data[1] == movieInfo[i].name) {
                        this.setState({
                            name: movieInfo[i].name,
                            image: movieInfo[i].url,
                            intro: movieInfo[i].intro
                        })
                    }
                }
            }
        });
        Picker.show();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
});