import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Platform,
    ScrollView,
    SafeAreaView,
    StyleSheet,
    Image,
    RefreshControl,
    TouchableHighlight,
} from 'react-native';
import videoStyle from './video.style';

const Videos = ({ navigation }) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(
                'https://orangevalleycaa.org/api/videos'
            ).then((response) => response.json());
            setData(result);
        };
        fetchData();
    }, []);

    const [refreshing, setRefreshing] = React.useState(false);
    const wait = (timeout) => {
        return new Promise((resolve) => setTimeout(resolve, timeout));
    };
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(300).then(() => setRefreshing(false));
    }, []);

    const videoList = () => {
        return data.map((item) => {
            return (
                <TouchableHighlight style={styles.video} key={item.id} onPress={() => openVideo(item)}
                underlayColor={'rgb(0, 31, 77)'}>
                    <>
                    <Image
                        source={{ uri: item.thumbnail }}
                        style={styles.image}
                    />
                    <Text key={`${item.id}text`} style={styles.text}>
                        {item.name}
                    </Text>
                    </>
                </TouchableHighlight>
            );
        });
    };

    const openVideo = (item) => {
        navigation.navigate('Video', { item });
    }

    return (
        <SafeAreaView>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                style={videoStyle.container}
            >
                {data.length > 0 && <View>{videoList()}</View>}
            </ScrollView>
        </SafeAreaView>
    );
};

export default Videos;

const styles = StyleSheet.create({
    video: {
        width: '100%',
        height: 300,
        backgroundColor: 'rgb(0, 20, 51)',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingVertical: 10,
    },
    image: {
        width: '100%',
        height: 200,
    },
    text: {
        margin: 10,
        fontSize: 19,
        color: 'white'
    }
});
