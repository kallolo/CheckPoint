import React, { useContext, useEffect, useState } from 'react';
import { Text, View, ActivityIndicator, Image, ScrollView, FlatList, Animated, TouchableOpacity, RefreshControl } from 'react-native';
import { List, FAB } from 'react-native-paper';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/Ionicons';
import { MasterLokasiContext } from '../contexts/MasterLokasiContext';
import { navigate } from '../navigationRef';

const MasterLokasi = () => {
    const { stateML, refresh, getMasterLokasi, deleteMasterLokasi } = useContext(MasterLokasiContext);
    const [showLabel, setShowLabel] = useState(true)

    const listMasterLokasi = (data) => {
        // console.log(data.item)
        return (
            <Swipeable
                renderRightActions={(progress, dragX) => {
                    const scale = dragX.interpolate({
                        inputRange: [-100, 0],
                        outputRange: [0.7, 0]
                    })
                    return (<>
                        <TouchableOpacity onPress={() => deleteMasterLokasi(data.item.idLokasi)}>
                            <View style={{ flex: 1, backgroundColor: 'red', justifyContent: 'center' }}>
                                <Animated.View style={{ paddingHorizontal: 5, transform: [{ scale }] }}>
                                    <Icon name='ios-trash-outline' size={45} color="white" />
                                </Animated.View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigate('UbahLokasi', { item: data.item })}>
                            <View style={{ flex: 1, backgroundColor: 'green', justifyContent: 'center' }}>
                                <Animated.View style={{ paddingHorizontal: 5, transform: [{ scale }] }}>
                                    <Icon name='ios-create-outline' size={45} color="white" />
                                </Animated.View>
                            </View>
                        </TouchableOpacity>
                    </>)
                }}
                containerStyle={{ backgroundColor: "#e0e0e0" }}>

                <List.Item
                    title={data.item.namaLokasi}
                    titleStyle={{ fontSize: 20, fontWeight: 'bold' }}
                    description={"long : " + data.item.longitudeLokasi + ", lat :" + data.item.latitudeLokasi}
                    left={props => <List.Icon {...props} icon="map-marker-radius" color="#007acc" />}
                    style={{ borderBottomWidth: 1, borderBottomColor: 'grey', backgroundColor: 'white' }}
                />
            </Swipeable>
        )
    }

    useEffect(() => {
        getMasterLokasi()
    }, [stateML.refreshing])
    return (
        <>
            <ScrollView
                showsVerticalScrollIndicator={false}
                onScroll={() => setShowLabel(false)}
                onMomentumScrollEnd={() => setShowLabel(true)}
                refreshControl={
                    <RefreshControl
                        refreshing={stateML.refreshing}
                        onRefresh={() => refresh()}
                    />
                }
            >
                {
                    stateML.isLoading ? <ActivityIndicator size='large' color='#1cacff' /> :
                        stateML.masterLokasi === null ?
                            (
                                <View style={{ alignContent: 'center', alignItems: 'center' }}>
                                    <Image
                                        style={{ marginTop: 20, height: 300, width: 300 }}
                                        source={require('../assets/img/no-data.png')}
                                    />
                                    <Text style={{ color: '#007acc', fontSize: 25 }}>Data Kosong</Text>
                                </View>
                            )
                            : <FlatList
                                data={stateML.masterLokasi}
                                renderItem={(data) => listMasterLokasi(data)}
                                keyExtractor={(data, index) => index.toString()}
                            />
                }
            </ScrollView>

            <FAB
                style={{ position: 'absolute', margin: 20, right: 0, bottom: 0, backgroundColor: '#007acc' }}
                label={showLabel ? "Tambah Lokasi" : ""}
                icon="plus"
                color="white"
                onPress={() => navigate('TambahLokasi')}
            />
        </>
    );
}

MasterLokasi.navigationOptions = {
    title: "Master Lokasi",
    headerStyle: {
        backgroundColor: '#007acc'
    },
    headerTintColor: '#FFFFFF',
}
export default MasterLokasi;