import React, { Component, useEffect, useState, useRef } from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet, ImageBackground, Modal, Pressable, TouchableOpacity, Dimensions, Platform, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
//import { Map, GoogleApiWrapper } from 'google-maps-react';
import MapView, { Marker } from 'react-native-maps';
//import { GOOGLE_MAPS_API_KEY } from "@env";
import { AntDesign } from '@expo/vector-icons';


function UserScreen({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={{ alignSelf: "flex-start" }}>
            <MapView style={styles.map}
                initialRegion={{
                    latitude: 153.0137,
                    longitude: 27.4975,
                    latitudeDelta: 0.5,
                    longitudeDelta: 0.5,
                }}
            >
                <Ionicons name="menu" size={50} style={styles.button} onPress={() => setModalVisible(true)}></Ionicons>
            </MapView>


            <Modal
                transparent={true}
                visible={modalVisible}
            >
                <View //style={styles.modalView}
                    style={{
                        alignSelf: "flex-start",
                        height: '100%',
                        width: '80%',
                    }}
                >
                    <View
                        style={[
                            styles.userbox,
                            { backgroundColor: '#4B2876' },
                        ]}>

                        <Pressable onPress={() => setModalVisible(!modalVisible)}>
                            <Ionicons name="close" size={38} style={styles.modalButton} ></Ionicons>
                        </Pressable>
                    </View>

                    <View
                        style={[
                            styles.box,
                            { backgroundColor: '#FFFFFF' },
                        ]}>
                        <TouchableOpacity
                            onPress={() => { setModalVisible(!modalVisible); navigation.navigate('HistoryScreen') }}
                            style={styles.buttonNav}
                        >
                            <Text>RIDE HISTORY</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => { setModalVisible(!modalVisible); navigation.navigate('HistoryScreen') }}
                            style={styles.buttonNav}
                        >
                            <Text>REWARD</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => { setModalVisible(!modalVisible); navigation.navigate('HistoryScreen') }}
                            style={styles.buttonNav}
                        >
                            <Text>SUPPORT</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => { setModalVisible(!modalVisible); navigation.navigate('HistoryScreen') }}
                            style={styles.buttonNav}
                        >
                            <AntDesign name="poweroff" size={25} style={styles.powerOff} onPress={() => setModalVisible(true)}></AntDesign>
                        </TouchableOpacity>
                    </View>

                </View>

            </Modal>
        </View>

    );
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