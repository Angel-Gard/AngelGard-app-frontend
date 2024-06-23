import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
//@ts-ignore
const DiaryDetail = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.headerText}>X</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>6월 22일</Text>
        <View />
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>오늘 기분 최상이다</Text>
        <Text style={styles.description}>
          우리 아이가 좋아하는 이유식도 만들고, 이웃집이랑 {'\n'}인사도 나누었던
          하루였다. 육아에 대해서 더더욱 배우게 된 하루였다. 언젠가는 완벽한
          부모가 되길 바라며.
        </Text>
        <Image
          source={require('../assets/imgaes/icons/diary1.png')}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 48,
    marginBottom: 8,
  },
  headerText: {
    fontFamily: 'SUITE',
    fontSize: 14,
    fontWeight: '400',
    color: '#000000',
  },
  contentContainer: {
    flex: 1,
    marginTop: 71,
  },
  title: {
    fontFamily: 'SUITE',
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 25,
  },
  description: {
    fontFamily: 'SUITE',
    fontSize: 14,
    fontWeight: '400',
    color: '#333333',
    lineHeight: 20,
    marginBottom: 40,
  },
  image: {
    width: '100%',
    height: 320,
    borderRadius: 8,
  },
});

export default DiaryDetail;
