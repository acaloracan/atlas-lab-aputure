/* eslint-disable react/no-unstable-nested-components */
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store/store';
import {Icon, TextInput} from 'react-native-paper';
import {AddTaskModal} from '../../components/AddTaskModal';
import {TaskListItem} from '../../components/TaskListItem';

import {FONTS} from '../../utils/fonts';
import {COLORS} from '../../utils/colors';

import AputureIcon from '../../assets/icons/Aputure_Logo.svg';
import {TaskList} from '../../types/TaskList';

export const TaskScreen = () => {
  const {taskList} = useSelector((state: RootState) => state);

  const [visible, setVisible] = useState<boolean>(false);

  const [searchQuery, setSearchQuery] = useState<string>('');

  const [filteredResults, setFilteredResults] = useState<TaskList[]>([]);

  function onAddTask() {
    setVisible(true);
  }

  // function onSearch() {
  //   _.filter(taskList, (item)=>{
  //     return _.includes(item.name,)
  //   })
  // }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <View style={styles.logo}>
          <AputureIcon width={169} height={44} />
        </View>

        <View style={styles.searchInputContainer}>
          <View style={styles.searchInput}>
            <TextInput
              mode="outlined"
              placeholder="Search"
              outlineColor={COLORS.background}
              activeOutlineColor={COLORS.background}
              selectionColor={COLORS.red}
              placeholderTextColor={COLORS.placeholder}
              onChangeText={setSearchQuery}
              value={searchQuery}
            />
          </View>
          <TouchableOpacity style={styles.search} onPress={() => {}}>
            <Icon source={'magnify'} size={24} color="white" />
          </TouchableOpacity>
        </View>

        <Text style={styles.allTask}>All Tasks</Text>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={taskList}
          contentContainerStyle={styles.contentContainer}
          renderItem={({item}) => <TaskListItem data={item} />}
          ListEmptyComponent={() => (
            <View style={styles.emptyListContainer}>
              <Text>No Tasks</Text>
            </View>
          )}
        />
        <View style={styles.addTaskContainer}>
          <TouchableOpacity style={styles.addTaskButton} onPress={onAddTask}>
            <Icon source={'plus'} size={14} color={COLORS.white} />
            <Text style={styles.addTask}>Add Task</Text>
          </TouchableOpacity>
        </View>

        <AddTaskModal setVisible={setVisible} visible={visible} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  allTask: {fontSize: 18, fontFamily: FONTS.semiBold, fontWeight: '600'},
  addTask: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: COLORS.white,
  },
  addTaskButton: {
    flexDirection: 'row',
    borderRadius: 16,
    backgroundColor: COLORS.red,
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    gap: 12,
  },
  addTaskContainer: {
    paddingTop: 32,
    width: '40%',
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  container: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    flex: 1,
    gap: 16,
  },
  contentContainer: {gap: 16, paddingBottom: 64},
  safeAreaContainer: {flex: 1},
  emptyListContainer: {alignItems: 'center'},
  search: {
    backgroundColor: COLORS.red,
    width: 42,
    height: 42,
    position: 'absolute',
    right: 8,
    top: 8,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {alignItems: 'center'},
  searchInput: {flex: 1},
  searchInputContainer: {flexDirection: 'row'},
});
