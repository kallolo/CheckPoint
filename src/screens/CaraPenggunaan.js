import React from 'react';
import { Text, View, Dimensions } from "react-native";
import Video from 'react-native-video';
const windowWidth = Dimensions.get('window').width;
const CaraPenggunaan = () => {
    return (
        <View style={{ flex: 1, alignItems: "center" }}>
            <Video
                source={require('../assets/videos/tutorial-checkpoint.mp4')}
                style={{ width: windowWidth, height: 300 }}
                controls={true}
                repeat={true}
                resizeMode='contain'
            />
            <View style={{ paddingHorizontal: 10 }}>
                <Text style={{fontSize:14, color:'#007acc'}}>Catatan : Jika aplikasi tidak bisa berjalan sesuai video di atas silahkan hubungi Tim IT (No Telepon : 264) </Text>
            </View>
        </View>
    );
}

CaraPenggunaan.navigationOptions = {
    title: "Cara Penggunaan",
    headerStyle: {
        backgroundColor: '#007acc'
    },
    headerTintColor: '#FFFFFF',
}
export default CaraPenggunaan;