import React, { Component } from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet, Modal, Pressable, TouchableOpacity, Dimensions, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { PROVIDER_GOOGLE, Marker, AnimatedRegion, Animated } from "react-native-maps";
import { GOOGLE_MAPS_API_KEY } from "@env";
import { AntDesign } from '@expo/vector-icons';
//import { StackNavigator, useNavigation } from "react-navigation";
//import geolocation from "react-native-geolocation-service";

export class UserScreen extends React.Component {
    state = {
        modalVisible: false,
        initialLocation: null,
        latitude: null,
        longitude: null,
    };

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    };

    getCurrentLocation() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                let region = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                };
                this.setState({
                    initialLocation: region,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
                //console.log('position: ', position);
                //console.log('this.map: ', this.map);
            },
            error => console.log(error),
            {
                enableHighAccuracy: true,
                timeout: 2000,
                maximumAge: 1000
            }
        );
    }

    render() {
        const { modalVisible } = this.state;
        const { navigate } = this.props.navigation;

        return (
            <View style={{ alignSelf: "flex-start" }} >

                <MapView style={styles.map}
                    //provider={PROVIDER_GOOGLE}
                    //ref={(map) => { this.map = map; }}
                    region={this.state.initialLocation}
                    showsUserLocation={true}
                    followsUserLocation
                >
                    {/* <Marker
                        coordinate={this.state.initialLocation}
                    /> */}
                    <SafeAreaView>
                        <Ionicons name="menu" size={50} style={styles.button} onPress={() => this.setModalVisible(true)}></Ionicons>
                    </SafeAreaView>
                </MapView>

                <Modal
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(!modalVisible);
                    }}
                >
                    <View
                        style={{
                            alignSelf: "flex-start",
                            height: '100%',
                            width: '80%',
                        }}>

                        <SafeAreaView
                            style={[
                                styles.userbox,
                                { backgroundColor: '#4B2876' },
                            ]}>

                            <Pressable onPress={() => this.setModalVisible(!modalVisible)}>
                                <Ionicons name="close" size={38} style={styles.modalButton} ></Ionicons>
                            </Pressable>

                        </SafeAreaView>

                        <View
                            style={[
                                styles.box,
                                { backgroundColor: '#FFFFFF' },
                            ]}>
                            <TouchableOpacity
                                onPress={() => { this.setModalVisible(!modalVisible); navigate('HistoryScreen') }}
                                style={styles.buttonNav}
                            >
                                <Text>RIDE HISTORY</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => { this.setModalVisible(!modalVisible); navigate('HistoryScreen') }}
                                style={styles.buttonNav}
                            >
                                <Text>REWARD</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => { this.setModalVisible(!modalVisible); navigate('HistoryScreen') }}
                                style={styles.buttonNav}
                            >
                                <Text>SUPPORT</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => { this.setModalVisible(!modalVisible); navigate('HistoryScreen') }}
                                style={styles.buttonNav}
                            >
                                <AntDesign name="poweroff" size={25} style={styles.powerOff} onPress={() => setModalVisible(true)}></AntDesign>
                            </TouchableOpacity>
                        </View>

                    </View>

                </Modal>
            </View >

        );
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,

    },
    box: {
        padding: 20,
        height: '60%',
    },
    userbox: {
        width: '100%',
        height: '40%',
        padding: 20,
    },
    buttonNav: {
        //left: '8%',
        //top: '10%',
        padding: 40,
        color: 'black',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    button: {
        position: 'relative',
        left: '2%',
        top: '5%',
        color: '#4B2876',
    },
    powerOff: {
        padding: 40,
        color: 'black',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    modalView: {

    },
    modalText: {

    },
    modalButton: {
        position: 'relative',
        // left: '3%',
        top: '90%',
        color: '#A278A9',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('screen').height,
    },
})


export default UserScreen;
