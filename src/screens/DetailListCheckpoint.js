import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, Text, View, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import Timeline from 'react-native-timeline-flatlist';
import { CheckpointContext } from '../contexts/CheckpointContext';
import ImageView from "react-native-image-viewing";
import Moment from 'moment';

const DetailListCheckpoint = ({ navigation }) => {
    
    const { stateC, getDetailCheckpoint } = useContext(CheckpointContext);
    const item = navigation.state.params.item;
    const detailCheckpoint = stateC.detailCheckpoint === null ? [] : stateC.detailCheckpoint;
    const [images, setImages] = useState([]);
    const [imageTitle , setImageTitle] = useState('');
    const [imageWaktu , setImageWaktu] = useState('');
    const [imagesIndex, setImagesIndex] = useState(0);
    const [visible, setIsVisible] = useState(false);

    useEffect(() => {
        getDetailCheckpoint(item.tanggalCheckpoint, item.shiftCheckpoint, item.createdBy);
    }, []);

    const DataCheckpoint = detailCheckpoint.map((data) => {
        return {
            time: Moment(data.waktuCheckpoint).format('H:mm'),
            title: data.detailLokasi.namaLokasi,
            description: data.keteranganCheckpoint,
            image: data.fotoCheckpoint,
            datetime : Moment(data.waktuCheckpoint).format('D MMMM YYYY - H:mm')
        };
    });

    const DataImageCheckpoint = (image) => {
        const parseImage = JSON.parse(image)
        const listFoto = parseImage.map((foto , key) => {
            return {
                uri : "https://apiku.sambu.co.id/APICheckpoint/file/photo/" + foto,
            }
        })
        // console.log(listFoto)
        setImages(listFoto)
    }

    const Detail = (rowData, sectionID, rowID) => {
        return (
            <TouchableOpacity onPress={() => {
                setIsVisible(true),
                DataImageCheckpoint(rowData.image),
                setImagesIndex(0),
                setImageTitle(rowData.title)
                setImageWaktu(rowData.datetime)
            }
            }>
                <View style={{ flex: 1, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#aaa' }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{rowData.title} </Text>
                    <Text style={{ fontSize: 14, marginBottom:10 }}>{rowData.description} </Text>
                </View>
            </TouchableOpacity>
        )
    }
    
    const HeaderImage = () =>{
        // console.log('title')
        return(<View style={{flexDirection:"row", justifyContent:"space-between", paddingLeft:15, paddingVertical:10, backgroundColor:"#00000077"}}>
            <View style={{flexDirection:'column'}}>
                <Text style={{color:'white' , fontSize:30}}>{imageTitle}</Text>
                <Text style={{color:'white' , fontSize:20}}>{imageWaktu}</Text>
            </View>
            <View>
            <TouchableOpacity onPress={() => setIsVisible(false)}>
                <Text style={{color:'red', fontSize:25}}>✕</Text>
            </TouchableOpacity>
            </View>
            
        </View>)
    } 
    const ImageFooter = ({ imageIndex, imagesCount }) => {
        // console.log(imageIndex)
        return(<View style={{alignItems:"center"}}><Text style={{color:'white'}}>{`${imageIndex+1} / ${imagesCount}`}</Text></View>)
    }
   
    return (<>
        {/* tampil gambar */}
        <ImageView
            images={images}
            imageIndex={imagesIndex}
            visible={visible}
            presentationStyle="fullScreen"
            onRequestClose={() => setIsVisible(false)}
            HeaderComponent={HeaderImage}
            FooterComponent={({imageIndex}) => (
                <ImageFooter imageIndex={imageIndex} imagesCount={images.length}/>
            )}
        />
        {/* tampil gambar */}
        <ScrollView showsVerticalScrollIndicator={false}>
            {stateC.isLoading ? <ActivityIndicator size='large' color='#1cacff' /> :
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
        title: screenProps.navigation.state.params.item.detailPersonal.personalName + " (Shift-" + screenProps.navigation.state.params.item.shiftCheckpoint + ", " + Moment(screenProps.navigation.state.params.item.tanggalCheckpoint).format('D MMM YYYY') + ")",
        headerStyle: {
            backgroundColor: '#007acc'
        },
        headerTintColor: '#FFFFFF',
    }
)

export default DetailListCheckpoint;