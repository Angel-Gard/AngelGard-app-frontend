import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StackScreenProps} from '@react-navigation/stack';
import {getDiaryDetail} from '../../api/diary.api';
import SelectBabyModal from '../../components/Modal/SelectBabyModal';
import OptionsMenu from '../../components/OptionsMenus';
import {ParamListBase} from '@react-navigation/native';

type DiaryDetailProps = StackScreenProps<ParamListBase, 'DiaryDetail'>;

interface RouteParams {
  babyBoardId: string;
}

interface DiaryDetailType {
  baby_board_title: string;
  baby_board_date: string;
  baby_board_content: string;
  baby_board_image?: string;
}

const DiaryDetail: React.FC<DiaryDetailProps> = ({navigation, route}) => {
  // Define the expected route parameters
  const {babyBoardId} = route.params as RouteParams;

  const [modalVisible, setModalVisible] = useState(false);
  const [diaryDetail, setDiaryDetail] = useState<DiaryDetailType | null>(null);
  const [optionsMenuVisible, setOptionsMenuVisible] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}. ${month}. ${day}. ${hours}:${minutes}`;
  };

  const fetchDiaryDetail = async () => {
    try {
      const detail = await getDiaryDetail(babyBoardId);
      setDiaryDetail(detail);
    } catch (error) {
      console.error('Failed to fetch diary detail:', error);
    }
  };

  useEffect(() => {
    if (babyBoardId) {
      fetchDiaryDetail();
    }
  }, [babyBoardId]);

  if (!diaryDetail) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#A6A6A6" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>{diaryDetail.baby_board_title}</Text>
          <View style={styles.dateContainer}>
            <Text style={styles.date}>
              {formatDate(diaryDetail.baby_board_date)}
            </Text>
            <TouchableOpacity
              onPress={() => setOptionsMenuVisible(prev => !prev)}>
              <Image
                source={require('../../assets/images/icons/dotmenuBar.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.depContainer}>
          <Text style={styles.depText}>{diaryDetail.baby_board_content}</Text>
          {diaryDetail.baby_board_image && (
            <Image
              source={{
                uri: `http://34.47.76.73:3000/uploads/${diaryDetail.baby_board_image
                  .split('/')
                  .pop()}`,
              }}
              style={styles.hamsterImage}
            />
          )}
        </View>
      </View>

      <SelectBabyModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      />
      <OptionsMenu
        visible={optionsMenuVisible}
        onClose={() => setOptionsMenuVisible(false)}
        onEdit={() => setOptionsMenuVisible(false)}
        onDelete={() => {
          console.log('Delete tapped');
          setOptionsMenuVisible(false);
        }}
        babyBoardId={babyBoardId}
        title={diaryDetail.baby_board_title}
        content={diaryDetail.baby_board_content}
        image={
          diaryDetail.baby_board_image
            ? `http://34.47.76.73:3000/${diaryDetail.baby_board_image}`
            : null
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  headerContainer: {
    marginTop: 10,
    paddingTop: 15,
    width: '90%',
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',
    paddingBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: '400',
    color: 'black',
    textAlign: 'left',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  date: {
    fontSize: 12,
    color: '#A6A6A6',
    textAlign: 'right',
    marginRight: 7,
  },
  icon: {
    width: 15,
    height: 16,
  },
  depContainer: {
    width: '90%',
    marginTop: 21,
  },
  depText: {
    textAlign: 'left',
    fontSize: 15,
    color: 'black',
    marginBottom: 21,
  },
  hamsterImage: {
    overflow: 'hidden',
    borderRadius: 10,
    width: 350,
    height: 350,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#A6A6A6',
  },
});

export default DiaryDetail;
