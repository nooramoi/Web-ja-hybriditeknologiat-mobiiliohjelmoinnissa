import React, { useState, useEffect } from 'react';
import { View, TextInput, Text } from 'react-native';
import { Card } from 'react-native-paper';

const HeartRateCalculator = () => {
  const [age, setAge] = useState('');
  const [lowerLimit, setLowerLimit] = useState('');
  const [upperLimit, setUpperLimit] = useState('');

  useEffect(() => {
    if (age !== '') {
      const ageNumber = parseInt(age);
      if (!isNaN(ageNumber)) {
        const lower = Math.round((220 - ageNumber) * 0.65);
        const upper = Math.round((220 - ageNumber) * 0.85);
        setLowerLimit(lower.toString());
        setUpperLimit(upper.toString());
      }
    } else {
      setLowerLimit('');
      setUpperLimit('');
    }
  }, [age]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Card>
        <Card.Content>
          <Text style={{ fontSize: 20 }}>Heart Rate Calculator</Text>
          <TextInput
            placeholder="Enter Age"
            keyboardType="numeric"
            value={age}
            onChangeText={(text) => setAge(text)}
            style={{ fontSize: 18, marginTop: 20 }}
          />
          <Text style={{ fontSize: 18, marginTop: 20 }}>
            Lower Limit: {lowerLimit}
          </Text>
          <Text style={{ fontSize: 18, marginTop: 10 }}>
            Upper Limit: {upperLimit}
          </Text>
        </Card.Content>
      </Card>
    </View>
  );
};

export default HeartRateCalculator;