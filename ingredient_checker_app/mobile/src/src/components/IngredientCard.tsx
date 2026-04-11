import React from 'react'
import { View, Text } from 'react-native'

export default function IngredientCard({ ingredient }) {
  return (
    <View>
      <Text>{ingredient.ingredient}</Text>
      <Text>{ingredient.risk_level}</Text>
    </View>
  )
}
