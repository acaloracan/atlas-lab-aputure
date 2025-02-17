import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {TaskList} from '../types/TaskList';
import {Divider, Icon, Menu} from 'react-native-paper';
import moment from 'moment';
import {FONTS} from '../utils/fonts';
import {COLORS} from '../utils/colors';
import {useAppDispatch} from '../redux/store/store';
import {deleteTask} from '../redux/reducers/taskReducers';

type Props = {
  data: TaskList;
};

export const TaskListItem = (props: Props) => {
  const {data} = props;

  const [menuVisible, setMenuVisible] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <Text style={styles.name}>{data.name}</Text>
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          contentStyle={styles.menu}
          anchor={
            <TouchableOpacity
              onPress={() => setMenuVisible(true)}
              style={styles.optionContainer}>
              <Icon
                source={'dots-vertical'}
                size={20}
                color={COLORS.iconGray}
              />
            </TouchableOpacity>
          }>
          <Menu.Item
            onPress={() => {
              setMenuVisible(false);
            }}
            title="Edit"
          />
          <Divider />
          <Menu.Item
            onPress={() => {
              setMenuVisible(false);
              dispatch(deleteTask(data));
            }}
            title="Delete"
          />
        </Menu>
      </View>

      <View style={styles.bodyContainer}>
        <Text style={styles.description}>{data.description}</Text>

        <View style={styles.dateContainer}>
          <Text style={styles.date}>
            {moment(data.dueDate).format('DD MMMM, YYYY')}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bodyContainer: {paddingRight: 16},
  container: {
    backgroundColor: COLORS.background,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    borderRadius: 16,
    margin: 1,
    gap: 12,
  },
  date: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.grey,
  },
  dateContainer: {alignSelf: 'flex-end'},
  description: {fontSize: 14, fontFamily: FONTS.regular, color: COLORS.text},
  optionContainer: {paddingRight: 8},
  menu: {backgroundColor: COLORS.white, borderRadius: 8},
  name: {
    fontSize: 16,
    fontFamily: FONTS.semiBold,
    fontWeight: '600',
    lineHeight: 24,
    color: COLORS.black,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
