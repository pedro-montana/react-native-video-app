import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Platform,
    StyleSheet,
    Alert,
    SafeAreaView,
    Modal,
    Dimensions,
    StatusBar,
    ScrollView,
    Pressable,
    BackHandler,
} from 'react-native';
import { Video } from 'expo-av';
import videoStyle from './video.style';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import * as ScreenOrientation from 'expo-screen-orientation';

const myHight = Dimensions.get('screen').height;
const myWidth = Dimensions.get('screen').width;

const Videos = ({ navigation, route }) => {
    const { item } = route.params;
    const [landscape, setLandscape] = useState(false);

    async function changeScreenOrientation() {
        await ScreenOrientation.lockAsync(
            landscape
                ? ScreenOrientation.OrientationLock.PORTRAIT_UP
                : ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
        ).then(setTimeout(function() {
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);    
        }, 600));
        
        setLandscape(!landscape);
    }

    async function back() {
        await ScreenOrientation.lockAsync(
            ScreenOrientation.OrientationLock.DEFAULT
        );
        setLandscape(false);
        navigation.goBack();
    }

    useEffect(() => {
        const backAction = () => {
            back();
            return true;
          };
      
          const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
          );
          return () => backHandler.remove();
    }, [])

    useEffect(() => {
        Dimensions.addEventListener('change', ({ window: { width, height} }) => {
            if (width < height) {
                setLandscape(false)
            } else {
                setLandscape(true)
            }
        })
    }, [])

    return (
        <SafeAreaView style={videoStyle.container}>
            <StatusBar hidden={true} />
            {item && (
                <>
                    {landscape ? (
                        // LANDSCAPE
                        <ScrollView
                            contentContainerStyle={styles.contentContainer}
                        >
                            <View style={[styles.topBar, { paddingTop: 5 }]}>
                                <Pressable
                                    style={styles.backButton}
                                    onPress={back}
                                >
                                    <Ionicons
                                        name="arrow-back-circle-outline"
                                        size={45}
                                        color="white"
                                    />
                                </Pressable>
                                <Pressable
                                    onPress={changeScreenOrientation}
                                    style={styles.orientationButton}
                                >
                                    <AntDesign
                                        name="mobile1"
                                        size={35}
                                        color="white"
                                    />
                                </Pressable>
                            </View>
                            <Video
                                source={{
                                    uri: item.video_url,
                                }}
                                rate={1.0}
                                volume={1.0}
                                isMuted={true}
                                resizeMode="contain"
                                shouldPlay
                                isLooping={false}
                                useNativeControls
                                style={styles.landscapeVideo}
                            />
                            <View style={styles.textContainer}>
                                <Text style={styles.heading}>{item.name}</Text>
                                <Text style={styles.desc}>
                                    {item.description}
                                </Text>
                            </View>
                        </ScrollView>
                    ) : (
                        // PORTRAIT
                        <>
                            <View style={styles.topBar}>
                                <Pressable
                                    style={styles.backButton}
                                    onPress={() => navigation.goBack()}
                                >
                                    <Ionicons
                                        name="arrow-back-circle-outline"
                                        size={45}
                                        color="white"
                                    />
                                </Pressable>
                                <Pressable
                                    onPress={changeScreenOrientation}
                                    style={styles.orientationButton}
                                >
                                    <AntDesign
                                        name="mobile1"
                                        size={35}
                                        color="white"
                                    />
                                </Pressable>
                            </View>
                            <Video
                                source={{
                                    uri: item.video_url,
                                }}
                                rate={1.0}
                                volume={1.0}
                                isMuted={true}
                                resizeMode="contain"
                                shouldPlay
                                isLooping={false}
                                useNativeControls
                                style={{
                                    width: '100%',
                                    height: 200,
                                }}
                            />
                            <ScrollView style={styles.textContainer}>
                                <Text style={styles.heading}>{item.name}</Text>
                                <Text style={styles.desc}>
                                    {item.description}
                                </Text>
                            </ScrollView>
                        </>
                    )}
                </>
            )}
        </SafeAreaView>
    );
};

export default Videos;

const styles = StyleSheet.create({
    textContainer: {
        margin: 10,
    },
    heading: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        marginBottom: 15,
    },
    desc: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
    },
    backButton: {
        width: 45,
        height: 45,
    },
    orientationButton: {
        width: 45,
        height: 45,
        transform: [{ rotate: '90deg' }],
        // position: 'absolute',
        // right: 20,
    },
    topBar: {
        top: 0,
        left: 0,
        paddingHorizontal: 15,
        paddingTop: 20,
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexDirection: 'row',
        width: '100%',
        marginBottom: 10,
    },
    landscapeVideo: {
        width: (myHight > myWidth ? myHight : myWidth) * 0.9,
        height: (myHight > myWidth ? myHight : myWidth) * 0.9 * 0.5625,
    },
    contentContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
});
