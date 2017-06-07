//import liraries
import React, { Component } from 'react';
import { Image } from 'react-native';

// create a component
class TabBarItem extends Component {
    render() {
        let selectedImage = this.props.selectedImage ? this.props.selectedImage : this.props.normalImage
        let normalImage=this.props.normalImage;
        return (
            <Image
                source={this.props.focused
                    ? selectedImage
                    : normalImage}
            />
        );
    }
}

//make this component available to the app
export default TabBarItem;
