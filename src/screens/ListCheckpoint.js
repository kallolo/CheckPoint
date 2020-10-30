import React, { useEffect, useContext, useState } from 'react';
import { Text, View, FlatList, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { RadioButton } from 'react-native-paper';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { CheckpointContext } from '../contexts/CheckpointContext';
import { navigate } from '../navigationRef';
import Moment from 'moment';

const ListCheckpoint = () => {
    const now = new Date();
    const { state, getCheckpoint } = useContext(CheckpointContext);
    const [datePicker, setDatePicker] = useState(now)
    const [tanggal, setTanggal] = useState(Moment(now).format('YYYY-MM-DD'));
    const [shift, setShift] = useState('1');
    const [showTanggal, setShowTanggal] = useState(false)

    const listDataCheckpoint = (data) => {
        // console.log(item.item)
        return (
            <TouchableOpacity onPress={() => navigate('DetailListCheckpoint', { item: data.item })} style={{ justifyContent: 'center' }}>
                <View style={{ padding: 20, marginHorizontal: 10, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#aaa' }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{data.item.detailUser.userName} ({data.item.detailUser.personalNIK})</Text>
                    <Text style={{ fontSize: 14, color: 'gray' }}>{Moment(data.item.tanggalCheckpoint).format('D MMMM YYYY')}</Text>
                </View>
            </TouchableOpacity>

        )
    }

    useEffect(() => {
        getCheckpoint(tanggal, shift);
    }, [tanggal, shift]);


    return (
        <>
            {showTanggal && <RNDateTimePicker mode="date" display="spinner" value={datePicker} maximumDate={new Date()} onChange={(event, date) => {
                if (date !== undefined) {
                    setShowTanggal(false),
                        setTanggal(Moment(date).format('YYYY-MM-DD')),
                        setDatePicker(date)
                }
                setShowTanggal(false)
            }} />}

            <View style={{ backgroundColor: "#e6e6e6" }}>
                <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                    <View style={{ flex: 1, backgroundColor: '#007acc', alignItems: 'center', marginHorizontal: 5, borderBottomRightRadius: 30, marginLeft: -10, hadowColor: "#000", shadowOffset: { width: 0, height: 5, }, shadowOpacity: 0.34, shadowRadius: 6.27, elevation: 10, }} >
                        <Text style={{ fontSize: 20, color: '#fff', paddingTop: 10 }} onPress={() => setShowTanggal(true)} >{Moment(tanggal).format("D MMMM YYYY")}</Text>

                    </View>

                    <View style={{ flex: 1, alignItems: 'center', marginHorizontal: 5, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20 }}>
                        <RadioButton.Group onValueChange={value => setShift(value)} value={shift}>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{ fontWeight: 'bold' }}>Shit 1</Text>
                                <RadioButton value="1" color="#007acc" />
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{ fontWeight: 'bold' }}>Shift 2</Text>
                                <RadioButton value="2" color="#007acc" />
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{ fontWeight: 'bold' }}>Shift 3</Text>
                                <RadioButton value="3" color="#007acc" />
                            </View>
                        </RadioButton.Group>
                        {/* <TextInput style={{ fontSize: 20, color: '#c5e9fd', padding: 10 }} placeholder="Cari Relasi" value={1} onChangeText={(Shift) => console.log({ Shift })} /> */}
                    </View>
                </View>
            </View>

            {state.isLoading ? <ActivityIndicator size='large' color='#1cacff' /> :
                state.listCheckpoint === null ?
                    (<View style={{ alignContent: 'center', alignItems: 'center' }}>
                        <Image
                            style={{ marginTop: 20, height: 300, width: 300 }}
                            source={require('../assets/img/no-data.png')}
                        /><Text style={{ color: '#007acc', fontSize: 25 }}>Data Kosong</Text></View>)
                    : (<FlatList
                        data={state.listCheckpoint}
                        renderItem={(data) => listDataCheckpoint(data)}
                        keyExtractor={(data, index) => index.toString()}
                    />)}
        </>);
}


ListCheckpoint.navigationOptions = {
    title: "List Checkpoint",
    headerStyle: {
        backgroundColor: '#007acc'
    },
    headerTintColor: '#FFFFFF',
}

export default ListCheckpoint;