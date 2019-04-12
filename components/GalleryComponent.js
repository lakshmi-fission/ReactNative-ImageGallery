import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity, Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { loadImages } from './LoadImages';



let width = wp('90%');
let height = hp('30%');
let borderRadius = 20;

class GalleryComponent extends Component {
    constructor(props) {
        super(props);
        /**
         * initiating values of the state variables
         */
        this.state = {
            noOfColumns: 1,
            imageUrls: [],
        };
        this._changeView = this._changeView.bind(this);
    }
    /**
     *this function will update the imagesdata after loading image data
     */
    async componentDidMount() {
        let imagesData = [];
        let data = await loadImages();
        for (let i = 0; i < data.length; i++) {
            imagesData.push(data[i].urls.regular);
        }
        //This is for just adding extra images to check performance
        for (let i = 0; i < 200; i++) {
            imagesData.push('https://images.unsplash.com/photo-1553531768-a0f91bcfbd3e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjY1ODE2fQ');
        }
        this.setState({ imageUrls: imagesData });

    }

    /**
     * function to update the width,height,borderradius with respect to number of columns in flat list
     */
    async _changeView() {
        if (this.state.noOfColumns === 1) {
            width = wp('40%');
            height = hp('15%');
            borderRadius = 20
            this.setState({ noOfColumns: 2 });
        }
        else if (this.state.noOfColumns === 2) {
            width = wp('20%');
            height = hp('8%');
            borderRadius = 10;
            this.setState({ noOfColumns: 4 });
        }
        else {
            width = wp('90%');
            height = hp('30%');
            borderRadius = 20;
            this.setState({ noOfColumns: 1 });
        }
    }
    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity style={styles.changeView} onPress={() => this._changeView()}>
                    <Text>Change View</Text>
                </TouchableOpacity>
                <FlatList
                    data={this.state.imageUrls}
                    style={styles.listlayout}
                    key={this.state.noOfColumns}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={this.state.noOfColumns}
                    renderItem={({ item }) => {
                        return (
                            <Image style={{ borderRadius: borderRadius, width: width, height: height, margin: 5, resizeMode: 'cover' }} source={{ uri: item }}></Image>
                        );
                    }}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    changeView: {
        alignSelf: 'flex-end',
        marginTop: Platform.OS === 'ios' ? hp('4%') : hp('2%'),
        marginRight: hp('2%'),
        fontSize: 16
    },
    listlayout: {
        marginTop: hp('2%')
    }
})
export default GalleryComponent;
