import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, Text, View, TouchableOpacity, StyleSheet, ActivityIndicator, Image } from 'react-native';
import Timeline from 'react-native-timeline-flatlist';
import ImageView from "react-native-image-viewing";
import Moment from 'moment';
import { RadioButton } from 'react-native-paper';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { AuthContext } from '../contexts/AuthContext';
import { CheckpointContext } from '../contexts/CheckpointContext';

const RiwayatCheckpoint = () => {
    const {stateAuth} = useContext(AuthContext);
    const { state, getDetailCheckpoint } = useContext(CheckpointContext);
    const now = new Date();
    const detailCheckpoint = state.detailCheckpoint === null ? [] : state.detailCheckpoint;
    const [images, setImages] = useState([]);
    const [visible, setIsVisible] = useState(false);
    const [datePicker, setDatePicker] = useState(now)
    const [tanggal, setTanggal] = useState(Moment(now).format('YYYY-MM-DD'));
    const [shift, setShift] = useState('1');
    const [showTanggal, setShowTanggal] = useState(false)

    useEffect(()=>{
        getDetailCheckpoint(tanggal, shift, stateAuth.detailUser.personalNIK)
    }, [tanggal, shift]);

    const DataCheckpoint = detailCheckpoint.map((data) => {
        return {
            time: Moment(data.waktuCheckpoint).format('H:mm'),
            title: data.detailLokasi.namaLokasi,
            description: 'Telah Melakukan Checkpoint dan Mengecek Semuanya, Telah Melakukan Checkpoint dan Mengecek Semuanya',
            image: data.fotoCheckpoint
        };
    });

    const DataImageCheckpoint = (image) => {
        // console.log(image)
        setImages([{ uri: "http://192.168.10.66:4321/file/photo/" + image }])
    }

    const Detail = (rowData, sectionID, rowID) => {
        return (
            <TouchableOpacity onPress={() => {
                setIsVisible(true),
                    DataImageCheckpoint(rowData.image)
            }
            }>
                <View style={{ flex: 1, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#aaa' }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{rowData.title} </Text>
                    <Text style={{ fontSize: 14 }}>{rowData.description} </Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (<>
    {/* tampil gambar */}
    <ImageView
            images={images}
            imageIndex={0}
            visible={visible}
            onRequestClose={() => setIsVisible(false)}
        />
        {/* tampil gambar */}
        {showTanggal && <RNDateTimePicker mode="date" display="spinner" value={datePicker} maximumDate={new Date()} onChange={(event, date) => {
                if (date !== undefined) {
                    setShowTanggal(false),
                        setTanggal(Moment(date).format('YYYY-MM-DD')),
                        setDatePicker(date)
                }
                setShowTanggal(false)
            }} />}

            <View style={{ backgroundColor: "#e6e6e6" , shadowColor: "#000", shadowOffset: { width: 0, height: 5, }, shadowOpacity: 0.34, shadowRadius: 6.27, elevation: 10}}>
                <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                    <View style={{ flex: 1, backgroundColor: '#007acc', alignItems: 'center', marginHorizontal: 5, borderBottomRightRadius: 30, marginLeft: -10, shadowColor: "#000", shadowOffset: { width: 0, height: 5, }, shadowOpacity: 0.34, shadowRadius: 6.27, elevation: 10, }} >
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

        <ScrollView showsVerticalScrollIndicator={false}>
            {state.isLoading ? <ActivityIndicator size='large' color='#1cacff' /> :
             state.detailCheckpoint === null ?
                 (<View style={{ alignContent: 'center', alignItems: 'center' }}>
                     <Image
                         style={{ marginTop: 20, height: 300, width: 300 }}
                         source={require('../assets/img/no-data.png')}
                     /><Text style={{ color: '#007acc', fontSize: 25 }}>Data Kosong</Text></View>)
                 :
                <Timeline
                    data={DataCheckpoint}
                    circleSize={20}
                    innerCircle={'dot'}
                    circleColor='rgb(45,156,219)'
                    lineColor='rgb(45,156,219)'
                    timeContainerStyle={{ minWidth: 52 }}
                    timeStyle={{ textAlign: 'center', backgroundColor: '#59c3ad', color: 'white', padding: 4, borderRadius: 20 }}
                    descriptionStyle={{ color: 'gray', borderBottomWidth: 2, borderBottomColor: 'grey' }}
                    options={{
                        style: { padding: 20 }
                    }}
                    renderDetail={Detail}
                />
            }
        </ScrollView>
    {/* <View>
       <Text>: {JSON.stringify(state, null, 4)}</Text>
    </View> */}
    </>);
}

RiwayatCheckpoint.navigationOptions = {
    title: "Riwayat Checkpoint",
    headerStyle: {
        backgroundColor: '#007acc'
    },
    headerTintColor: '#FFFFFF',
}

 
export default RiwayatCheckpoint;