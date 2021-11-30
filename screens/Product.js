import React from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Image,
  Animated,
  Platform,
} from 'react-native';
// import Animated from 'react-native-reanimated';
import { Block, Text, Button, theme } from 'galio-framework';
import { Icon } from '../components';
import materialTheme from '../constants/Theme';
import Images from "../constants/Images";
import { iPhoneX, HeaderHeight } from "../constants/utils";
const { height, width } = Dimensions.get('window');

export default class Product extends React.Component {
  state = {
    selectedSize: null,
  };

  scrollX = new Animated.Value(0);

  renderGallery = () => {
    const { navigation, route } = this.props;
    // const { params } = navigation && navigation.state;
    const product = route.params?.product;
    // const product = params.product;
    const productImages = [product.image, product.image, product.image, product.image];

    return (
      <ScrollView
        horizontal={true}
        pagingEnabled={true}
        decelerationRate={0}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: this.scrollX } } }], {useNativeDriver: false})}
      >
        {productImages.map((image, index) => (
          <TouchableWithoutFeedback
            key={`product-image-${index}`}
            onPress={() => navigation.navigate('Gallery', { images: productImages, index })}>
            <Image
              resizeMode="cover"
              source={{ uri: image }}
              style={{ width, height: iPhoneX() ? width + 32 : width + 32 }}
            />
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    )
  }

  renderProgress = () => {
    const { route } = this.props;
    const product = route.params?.product;
    const productImages = [product.image, product.image, product.image, product.image];

    const position = Animated.divide(this.scrollX, width);
    return (
      <Block row>
        {productImages.map((_, i) => {
          const opacity = position.interpolate({
            inputRange: [i - 1, i, i + 1],
            outputRange: [0.5, 1, 0.5],
            extrapolate: 'clamp'
          });
          const width = position.interpolate({
            inputRange: [i - 1, i, i + 1],
            outputRange: [8, 18, 8],
            extrapolate: 'clamp'
          });
          return <Animated.View key={i} style={[styles.dots, {opacity, width}]} />;
        })}
      </Block>
    )
  }

  renderSize = (label) => {
    const active = this.state.selectedSize === label;

    return (
      <TouchableHighlight
        style={styles.sizeButton}
        underlayColor={materialTheme.COLORS.PRICE_COLOR}
        onPress={() => this.setState({ selectedSize: label })}>
        <Text color={active ? theme.COLORS.PRIMARY : null}>{label}</Text>
      </TouchableHighlight>
    );
  }

  renderChatButton = () => {
    const { navigation } = this.props;
    return (
      <Block style={styles.chatContainer}>
        <Button
          radius={28}
          opacity={0.9}
          style={styles.chat}
          color={materialTheme.COLORS.BUTTON_COLOR}
          onPress={() => navigation.navigate('Chat')}>
          <Icon size={16} family="GalioExtra" name="chat-33" color="white" />
        </Button>
      </Block>
    )
  }

  render() {
    const { selectedSize } = this.state;
    const { navigation, route } = this.props;
    // const { params } = navigation && navigation.state;
    // const product = params.product;
    const product = route.params?.product;

    return (
        <Block flex style={styles.product}>
          <Block flex style={{ position: 'relative' }}>
            {this.renderGallery()}
            <Block center style={styles.dotsContainer}>
              {this.renderProgress()}
            </Block>
          </Block>
          <Block flex style={styles.options}>
            {this.renderChatButton()}
            <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
              <Block style={{ paddingHorizontal: theme.SIZES.BASE, paddingTop: theme.SIZES.BASE * 2 }}>
                <Text size={28} style={{ paddingBottom: 24 }}>{product.title}</Text>
                <Block row space="between">
                  <Block row>
                    <Image source={{ uri: Images.Profile }} style={styles.avatar} />
                    <Block>
                      <Text size={14}>Rachel Brown</Text>
                      <Text size={14} muted>Pro Seller</Text>
                    </Block>
                  </Block>
                  <Text size={18} bold>$735</Text>
                </Block>
              </Block>
              <Block style={{ padding: theme.SIZES.BASE }}>
                <Text size={16}>Size</Text>
                <Block card style={{ marginTop: 16 }}>
                  <Block row>
                    <Block flex middle style={[styles.size, styles.roundTopLeft, selectedSize === 'XS' ? styles.active : null ]}>
                      {this.renderSize('XS')}
                    </Block>
                    <Block flex middle style={[styles.size, selectedSize === 'S' ? styles.active : null, ]}>
                      {this.renderSize('S')}
                    </Block>
                    <Block flex middle style={[styles.size, styles.roundTopRight, selectedSize === 'M' ? styles.active : null, ]}>
                      {this.renderSize('M')}
                    </Block>
                  </Block>
                  <Block row>
                    <Block flex middle style={[styles.size, styles.roundBottomLeft, selectedSize === 'L' ? styles.active : null, ]}>
                      {this.renderSize('L')}
                    </Block>
                    <Block flex middle style={[styles.size, { borderBottomWidth: 0 }, selectedSize === 'XL' ? styles.active : null, ]}>
                      {this.renderSize('XL')}
                    </Block>
                    <Block flex middle style={[styles.size, styles.roundBottomRight, selectedSize === '2XL' ? styles.active : null, ]}>
                      {this.renderSize('2XL')}
                    </Block>
                  </Block>
                </Block>
                <Button
                  shadowless
                  style={styles.addToCart}
                  color={materialTheme.COLORS.BUTTON_COLOR}
                  onPress={() => navigation.navigate('Cart')}>
                  ADD TO CART
                </Button>
              </Block>
            </ScrollView>
          </Block>
        </Block>
    );
  }
}

const styles = StyleSheet.create({
  product: {
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
  },
  options: {
    position: 'relative',
    marginHorizontal: theme.SIZES.BASE,
    marginTop: -theme.SIZES.BASE * 2,
    marginBottom: 0,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2
  },
  galleryImage: {
    width: width,
    height: 'auto'
  },
  dots: {
    height: theme.SIZES.BASE / 2,
    margin: theme.SIZES.BASE / 2,
    borderRadius: 4,
    backgroundColor: 'white'
  },
  dotsContainer: {
    position: 'absolute',
    bottom: theme.SIZES.BASE,
    left: 0,
    right: 0,
    bottom: height / 12,
  },
  addToCart: {
    width: width - theme.SIZES.BASE * 4,
    marginTop: theme.SIZES.BASE * 2,
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    shadowOpacity: 1
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginBottom: theme.SIZES.BASE,
    marginRight: 8,
  },
  chat: {
    width: 56,
    height: 56,
    padding: 20,
    borderRadius: 28,
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    shadowOpacity: 1
  },
  chatContainer: {
    top: -30,
    right: theme.SIZES.BASE,
    zIndex: 2,
    position: 'absolute',
  },
  size: {
    height: theme.SIZES.BASE * 3,
    width: (width - theme.SIZES.BASE * 2) / 3,
    borderBottomWidth: 0.5,
    borderBottomColor: materialTheme.COLORS.BORDER_COLOR,
    overflow: 'hidden',
  },
  sizeButton: {
    height: theme.SIZES.BASE * 3,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundColor: materialTheme.COLORS.PRICE_COLOR,
  },
  roundTopLeft: {
    borderTopLeftRadius: 4,
    borderRightColor: materialTheme.COLORS.BORDER_COLOR,
    borderRightWidth: 0.5,
  },
  roundBottomLeft: {
    borderBottomLeftRadius: 4,
    borderRightColor: materialTheme.COLORS.BORDER_COLOR,
    borderRightWidth: 0.5,
    borderBottomWidth: 0,
  },
  roundTopRight: {
    borderTopRightRadius: 4,
    borderLeftColor: materialTheme.COLORS.BORDER_COLOR,
    borderLeftWidth: 0.5,
  },
  roundBottomRight: {
    borderBottomRightRadius: 4,
    borderLeftColor: materialTheme.COLORS.BORDER_COLOR,
    borderLeftWidth: 0.5,
    borderBottomWidth: 0,
  },
});
