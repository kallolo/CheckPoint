import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, Text, View, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import Timeline from 'react-native-timeline-flatlist';
import { CheckpointContext } from '../contexts/CheckpointContext';
import ImageView from "react-native-image-viewing";
import Moment from 'moment';

const DetailListCheckpoint = ({ navigation }) => {
    const { state, getDetailCheckpoint } = useContext(CheckpointContext);
    const item = navigation.state.params.item;
    const detailCheckpoint = state.detailCheckpoint;
    const [images, setImages] = useState([]);
    const [visible, setIsVisible] = useState(false);

    useEffect(() => {
        getDetailCheckpoint(item.tanggalCheckpoint, item.shiftCheckpoint, item.createdBy);
    }, []);

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
        <ScrollView showsVerticalScrollIndicator={false}>
            {state.isLoading ? <ActivityIndicator size='large' color='#1cacff' /> :
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

    </>
    );
}

DetailListCheckpoint.navigationOptions = screenProps => (
    // console.log(screenProps.navigation.state.params.item.tanggalCheckpoint)
    {
        title: screenProps.navigation.state.params.item.detailUser.userName + " (Shift-" + screenProps.navigation.state.params.item.shiftCheckpoint + ", " + Moment(screenProps.navigation.state.params.item.tanggalCheckpoint).format('D MMM YYYY') + ")",
        headerStyle: {
            backgroundColor: '#007acc'
        },
        headerTintColor: '#FFFFFF',
    }
)

export default DetailListCheckpoint;