import React from 'react';
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  ScrollView,
  FlatList,
  KeyboardAvoidingView,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { Input, Block, Text, Button, theme } from 'galio-framework';
import { Icon } from '../components/';

import Images from "../constants/Images";
import materialTheme from '../constants/Theme';

const { width } = Dimensions.get('screen');
const messages = [
  {
    id: 1,
    avatar: Images.Avatar,
    message: `Hey there! How are you today? Can we me et and talk? Thanks!`,
    time: `10:31 PM`,
  },
  {
    id: 2,
    message: `Sure, just let me finish something and I’ll call you.`,
    time: `10:34 PM`,
  },
  {
    id: 3,
    avatar: Images.Avatar,
    message: `OK. Cool! See you!`,
    time: `10:35 PM`,
  },
  {
    id: 4,
    message: `Bye bye`,
    time: `10:36 PM`,
  },
];

export default class Chat extends React.Component {
  state = {
    messages: messages,
    height: 0
  };

  messagesScroll = React.createRef();

  itemLayout = (data, index) => (
    { length: (this.state.messages.length - 1), offset: 32 * index, index }
  )

  handleScroll = () => {
    // const totalIndex = this.state.messages.length - 1;
    // const insetBottom = this.state.messages.length * (theme.SIZES.BASE * 6.5) + 64; // total messages x message height
    setTimeout(() => {
        this.messagesScroll.current.scrollToOffset({ offset: this.state.height });
    }, 1);
    
  }

  onContentSizeChange = (width,height) => {
    this.setState({
      height
    });
  }

  componentDidMount() {
    // this.handleScroll();
  }

  renderMessage = (msg) => {
    return (
      <Block key={msg.id}>
        <Block row space={!msg.avatar? 'between' : null}>
          <Image source={{ uri: msg.avatar }} style={[styles.avatar, styles.shadow]} />
          <Block style={styles.messageCardWrapper}>
            {msg.avatar ?
              <Block style={[styles.messageCard, styles.shadow]}>
                <Text>{msg.message}</Text>
              </Block> :
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#6C24AA', '#AC2688']}
                style={[styles.messageCard, styles.shadow]}>              
                <Text color={theme.COLORS.WHITE}>{msg.message}</Text>
              </LinearGradient>
            }
            <Block right>
              <Text style={styles.time}>{msg.time}</Text>
            </Block>
          </Block>
        </Block>
      </Block>
    )
  }

  renderMessages = () => {
    const insetBottom = this.state.messages.length * (theme.SIZES.BASE * 6.5) + 64; // total messages x message height
    return (
      <FlatList
        ref={this.messagesScroll}
        data={this.state.messages}
        keyExtractor={item => `${item.id}`}
        showsVerticalScrollIndicator={false}
        getItemLayout={this.itemLayout}
        contentContainerStyle={[styles.messagesWrapper]}
        renderItem={({ item }) => this.renderMessage(item)}
        onContentSizeChange={this.onContentSizeChange}
      />
    )
  }

  handleMessageChange = (type, text) => {
    this.setState({ message: text });
  }

  handleMessage = () => {
    const { messages, message } = this.state;
    const date = new Date();

    messages.push({
      id: messages.length + 1,
      message: message,
      time: date.toLocaleString('en-US', { hour: '2-digit', minute: 'numeric' }),
    });

    this.setState({ messages, message: '' });
    this.handleScroll();
  }

  messageForm = () => {
    const { navigation } = this.props;
    
    return (
      <View style={styles.messageFormContainer}>
        <Block flex row middle space="between" >
          <Button
            round
            shadowless
            radius={28}
            opacity={0.9}
            style={styles.iconButton}
            color={materialTheme.COLORS.BUTTON_COLOR}
            onPress={() => navigation.navigate('Chat')}>
            <Icon size={16} name="camera-18" family="GalioExtra" color={theme.COLORS.MUTED} />
          </Button>
          <Input
            borderless
            color="#9fa5aa"
            multiline
            blurOnSubmit
            style={styles.input}
            placeholder="Message"
            autoCapitalize="none"
            returnKeyType="send"
            textContentType="none"
            placeholderTextColor="#9fa5aa"
            defaultValue={this.state.message}
            onSubmitEditing={this.handleMessage}
            onChangeText={text => this.handleMessageChange('message', text)}
          />
        </Block>
      </View>
    );
  }

  render() {
    return (
      <Block flex space="between" style={styles.container}>
        <KeyboardAvoidingView
          enabled
          behavior="padding"
          style={{ flex: 1 }}
          keyboardVerticalOffset={theme.SIZES.BASE * 3.2}>
          {this.renderMessages()}
          {this.messageForm()}
        </KeyboardAvoidingView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    
  },
  messageFormContainer: {
    height: 96,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,    
  },
  input: {
    width: width * 0.78,
    height: theme.SIZES.BASE * 3,
    backgroundColor: theme.COLORS.WHITE,
  },
  iconButton: {
    width: 40,
    height: 40,
    backgroundColor: 'transparent',
  },
  messagesWrapper: {
    flexGrow: 1,
    top: 0,
    paddingLeft: 8,
    paddingRight: 16,
    paddingVertical: 16,
    paddingBottom: 68
  },
  messageCardWrapper: {
    maxWidth: '85%',
    marginLeft: 8,
    marginBottom: 32,
  },
  messageCard: {
    paddingHorizontal: 8,
    paddingVertical: 16,
    borderRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
  },
  shadow: {
    shadowColor: "rgba(0, 0, 0, 0.12)",
    shadowOffset: { width: 0, height: 7 },
    shadowRadius: 20,
    shadowOpacity: 1
  },
  time: {
    fontSize: 11,
    opacity: 0.5,
    marginTop: 8,
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginBottom: theme.SIZES.BASE,
  },
});
