import { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  FlatList,
} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import GoalInput from './components/GoalInput'
import GoalItem from './components/GoalItem'

export default function App() {
  const [courseGoals, setCourseGoals] = useState([])
  const [modalIsVisible, setModalIsVisible] = useState(false)

  function startAddGoalHandler() {
    setModalIsVisible(true)
  }

  function endAddGoalHandler() {
    setModalIsVisible(false)
  }

  function addGoalHandler(enteredGoalText) {
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      { text: enteredGoalText, id: Math.random().toString() },
    ])
    setModalIsVisible(false)
  }

  function deleteGoalHandler(id) {
    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((goal) => goal.id !== id)
    })
  }

  console.log(courseGoals)
  return (
    <>
      <StatusBar style='light' />
      <View style={styles.appContainer}>
        <Button
          title='Add new goal'
          color='#a06acf'
          onPress={startAddGoalHandler}
        />
        <GoalInput
          onAddGoal={addGoalHandler}
          visible={modalIsVisible}
          onCancel={endAddGoalHandler}
        />
        <View style={styles.goalsContainer}>
          <FlatList
            data={courseGoals}
            renderItem={(itemData) => {
              return (
                <GoalItem
                  text={itemData.item.text}
                  onDeleteItem={deleteGoalHandler}
                  id={itemData.item.id}
                />
              )
            }}
            keyExtractor={(item, index) => {
              return item.id
            }}
          />
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    // This needs to take up all available height
    flex: 1, // Amount of available height that the component shouls take
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: '#1e085a',
  },
  goalsContainer: {
    flex: 5,
  },
})
