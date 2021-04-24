import React from 'react';
import {
    Text,
    View,
    Button,
    RefreshControl,
    ScrollView,
    StyleSheet,
    SafeAreaView,
} from 'react-native';

export default function Landing({ navigation }) {
    const [refreshing, setRefreshing] = React.useState(false);
    const wait = (timeout) => {
        return new Promise((resolve) => setTimeout(resolve, timeout));
    };
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(300).then(() => setRefreshing(false));
    }, []);
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                contentContainerStyle={styles.scrollView}
            >
                <Button
                    title="Register"
                    onPress={() => navigation.navigate('Register')}
                />
                <Button
                    title="Videos"
                    onPress={() => navigation.navigate('Videos')}
                />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
        backgroundColor: 'pink',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
