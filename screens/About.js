import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Block, Text, theme } from 'galio-framework';

export default class About extends React.Component {
  render() {
    return (
      <Block flex>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.about} overScrollMode='always'>
          <Text size={16}>Shares of the giant tech companies tumbled on Monday, pushing major stock market indexes into negative territory for November and leaving investors clinging  to a gain of less than 1 percent for the year.</Text>
          <Text muted size={16} style={{ paddingTop: 9 }}>
            Apple, Amazon, Facebook and Microsoft were all down by more than 3 percent shortly after midday, as investors digested a series of negative reports that suggested they face growing risks to their extraordinary pipeline of profits.
          </Text>
          <Text muted size={16} style={{ paddingTop: 9 }}>
            In an interview with Axios, Tim Cook, the chief executive of Apple, called new regulations for the tech sector “inevitable.” That prospect could significantly raise compliance costs for tech firms and potentially weigh on profits of the iPhone maker as well as other large, dominant tech companies like Amazon and Microsoft. Facebook has already seen its share price plummet after it reported that it significantly increased the amount it spends on security.
          </Text>
          <Text muted size={16} style={{ paddingTop: 9 }}>
            The beauty in opening with “tell me about yourself” is that it allows you to start a conversation without the fear that you’re going to inadvertently make someone uncomfortable or self-conscious. Posing a broad question lets people lead you to who they are. As an interviewer, Ms. Gross’s goal is to find out how her subject became who they are; as a conversationalist, make that goal your own.
          </Text>
        </ScrollView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  about: {    
    padding: theme.SIZES.BASE,
  },
});
