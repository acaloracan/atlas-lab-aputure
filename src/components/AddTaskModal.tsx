import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Portal, Modal, TextInput, Icon} from 'react-native-paper';
import {Controller, useForm} from 'react-hook-form';
import {useAppDispatch} from '../redux/store/store';
import {addTask} from '../redux/reducers/taskReducers';
import moment from 'moment';
import _ from 'lodash';
import {COLORS} from '../utils/colors';
import {FONTS} from '../utils/fonts';

import DatePicker from 'react-native-date-picker';
import {TaskList} from '../types/TaskList';

type FormData = {
  name: string;
  description: string;
  dueDate: string;
};

type Props = {
  visible: boolean;
  setVisible: (value: boolean) => void;
  data?: TaskList;
};

export const AddTaskModal = (props: Props) => {
  const {visible, setVisible} = props;

  const [open, setOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const {control, handleSubmit, setValue, watch, reset} = useForm<FormData>({
    defaultValues: {
      description: '',
      dueDate: moment().format(),
      name: '',
    },
  });

  const dueDate = watch('dueDate');

  function onAddTask() {
    handleSubmit(onSubmit)();
  }

  function onSubmit(value: FormData) {
    setVisible(false);
    dispatch(
      addTask({
        id: moment().unix(),
        description: value.description,
        name: value.name,
        dueDate: moment(value.dueDate).format(),
      }),
    );
    reset();
  }

  function onClose() {
    setVisible(false);
    reset();
  }

  return (
    <>
      <Portal>
        <Modal visible={visible}>
          <View style={styles.modal}>
            <View style={styles.headerContainer}>
              <Text style={styles.addTask}>Add Task</Text>
              <TouchableOpacity onPress={onClose}>
                <Icon source={'close'} size={24} color={COLORS.iconGray} />
              </TouchableOpacity>
            </View>
            <View style={styles.fieldInfoContainer}>
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Name</Text>
                <Controller
                  name="name"
                  control={control}
                  rules={{required: true}}
                  render={({field, formState}) => (
                    <TextInput
                      onBlur={field.onBlur}
                      onChangeText={field.onChange}
                      placeholderTextColor={COLORS.placeholder}
                      value={field.value}
                      placeholder="Name"
                      mode="outlined"
                      error={!_.isEmpty(formState.errors.name)}
                      outlineColor={COLORS.background}
                      activeOutlineColor={COLORS.background}
                      selectionColor={COLORS.red}
                    />
                  )}
                />
              </View>

              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Description</Text>
                <Controller
                  name="description"
                  control={control}
                  rules={{required: true}}
                  render={({field, formState}) => (
                    <TextInput
                      onBlur={field.onBlur}
                      onChangeText={field.onChange}
                      placeholderTextColor={COLORS.placeholder}
                      contentStyle={styles.description}
                      value={field.value}
                      placeholder="Description"
                      mode="outlined"
                      multiline={true}
                      error={!_.isEmpty(formState.errors.description)}
                      outlineColor={COLORS.background}
                      activeOutlineColor={COLORS.background}
                      selectionColor={COLORS.red}
                    />
                  )}
                />
              </View>

              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Due Date</Text>

                <Controller
                  name="dueDate"
                  control={control}
                  rules={{required: true}}
                  render={({field}) => (
                    <TextInput
                      onBlur={field.onBlur}
                      onChangeText={field.onChange}
                      value={moment(field.value).format('DD MMMM, YYYY')}
                      placeholder="Due Date"
                      mode="outlined"
                      placeholderTextColor={COLORS.placeholder}
                      outlineColor={COLORS.background}
                      activeOutlineColor={COLORS.background}
                      selectionColor={COLORS.red}
                      editable={false}
                      right={
                        <TextInput.Icon
                          icon={'calendar-blank'}
                          onPress={() => setOpen(true)}
                          color={COLORS.red}
                        />
                      }
                    />
                  )}
                />
              </View>

              <TouchableOpacity style={styles.saveButton} onPress={onAddTask}>
                <Text style={styles.save}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </Portal>

      <DatePicker
        modal
        open={open}
        mode="date"
        minimumDate={new Date(moment().format())}
        date={new Date(moment(dueDate).format())}
        onConfirm={value => {
          setOpen(false);
          setValue('dueDate', moment(new Date(value)).format());
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  addTask: {
    fontSize: 20,
    fontFamily: FONTS.semiBold,
    fontWeight: '600',
  },
  description: {
    height: 96,
  },
  fieldContainer: {gap: 4},
  fieldInfoContainer: {gap: 16},
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: FONTS.semiBold,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 28,
  },
  modal: {
    backgroundColor: 'white',
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 24,
    borderRadius: 16,
  },
  save: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: COLORS.white,
  },
  saveButton: {
    borderRadius: 15,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.red,
    marginTop: 16,
  },
});
