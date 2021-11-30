import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  ImageBackground,
  Dimensions
} from 'react-native';
import { Button, Block, Text, Input, theme } from 'galio-framework';

import { materialTheme, products, Images, tabs } from '../constants/';
import { Select, Icon, Header, Product, Switch, Tabs } from '../components/';

const { width } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;
const cardWidth = width - (theme.SIZES.BASE * 2);
const categories = [
  {
    title: 'Flower',
    description: 'Using plant materials and flowers to create a pleasing composition.',
    image: 'https://images.unsplash.com/photo-1507290439931-a861b5a38200?fit=crop&w=840&q=80'
  },
  {
    title: 'Shower',
    description: 'Put personal touch on your bathroom with stylish shower accessories.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?fit=crop&w=840&q=80'
  },
  {
    title: 'Candle',
    description: 'Decorative candleholders, shaped as a pedestal, are called candlesticks.',
    image: 'https://images.unsplash.com/photo-1536942338469-91c7022e55a7?fit=crop&w=840&q=80'
  },
];

export default class Components extends React.Component {
  state = {
    'switch-1': true,
    'switch-2': false,
  };

  toggleSwitch = switchId => this.setState({ [switchId]: !this.state[switchId] });

  renderProduct = (item, index) => {
    const { navigation } = this.props;

    return (
      <TouchableWithoutFeedback
        style={{ zIndex: 3 }}
        key={`product-${item.title}`}
        onPress={() => navigation.navigate('Pro', { product: item })}>
        <Block center style={styles.productItem}>
          <Image resizeMode='cover' style={styles.productImage} source={{ uri: item.image }} />
          <Block center style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Text center size={16} color={theme.COLORS.MUTED} style={styles.productPrice}>$125</Text>
            <Text center size={34}>{item.title}</Text>
            <Text center size={16} color={theme.COLORS.MUTED} style={styles.productDescription}>{item.description}</Text>
          </Block>
        </Block>
      </TouchableWithoutFeedback>
    )
  };

  renderButtons = () => {
    return (
      <Block flex>
        <Text bold size={16} style={styles.title}>Buttons</Text>
        <Block style={{ paddingHorizontal: 16 }}>
          <Button shadowless color={materialTheme.COLORS.DEFAULT} style={[styles.button, styles.shadow]}>
            DEFAULT
          </Button>
          <Button shadowless style={[styles.button, styles.shadow]}>
            PRIMARY
          </Button>
          <Button shadowless color="info" style={[styles.button, styles.shadow]}>
            INFO
          </Button>
          <Button shadowless color="success" style={[styles.button, styles.shadow]}>
            SUCCESS
          </Button>
          <Button shadowless color="warning" style={[styles.button, styles.shadow]}>
            WARNING
          </Button>
          <Button shadowless color="danger" style={[styles.button, styles.shadow]}>
            ERROR
          </Button>
          <Block row space="evenly">
            <Block flex left style={{marginTop: 8, marginLeft: 10}}>
              <Select
                defaultIndex={1}
                options={[1, 2, 3, 4, 5]}
                style={styles.shadow}
              />
            </Block>
            <Block flex center>
              <Button
                center
                shadowless
                color={materialTheme.COLORS.DEFAULT}
                textStyle={styles.optionsText}
                style={[styles.optionsButton, styles.shadow]}>
                DELETE
              </Button>
            </Block>
            <Block flex={1.25} right>
              <Button
                center
                shadowless
                color={materialTheme.COLORS.DEFAULT}
                textStyle={styles.optionsText}
                style={[styles.optionsButton, styles.shadow]}>
                SAVE FOR LATER
              </Button>
            </Block>
          </Block>
        </Block>
      </Block>
    )
  }

  renderText = () => {
    return (
      <Block flex style={styles.group}>
        <Text bold size={16} style={styles.title}>Typography</Text>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Text h1 style={{ marginBottom: theme.SIZES.BASE / 2 }}>Heading 1</Text>
          <Text h2 style={{ marginBottom: theme.SIZES.BASE / 2 }}>Heading 2</Text>
          <Text h3 style={{ marginBottom: theme.SIZES.BASE / 2 }}>Heading 3</Text>
          <Text h4 style={{ marginBottom: theme.SIZES.BASE / 2 }}>Heading 4</Text>
          <Text h5 style={{ marginBottom: theme.SIZES.BASE / 2 }}>Heading 5</Text>
          <Text p style={{ marginBottom: theme.SIZES.BASE / 2 }}>Paragraph</Text>
          <Text muted>This is a muted paragraph.</Text>
        </Block>
      </Block>
    )
  }

  renderInputs = () => {
    return (
      <Block flex style={styles.group}>
        <Text bold size={16} style={styles.title}>Inputs</Text>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Input
            borderless
            color="white"
            placeholder="placeholder"
            bgColor="transparent"
            style={[styles.input, styles.inputDefault]}
            placeholderTextColor={materialTheme.COLORS.DEFAULT}
          />

          <Input
            borderless
            placeholder="theme"
            bgColor="transparent"
            color={materialTheme.COLORS.PRIMARY}
            style={[styles.input, styles.inputTheme]}
            placeholderTextColor={materialTheme.COLORS.PRIMARY}
          />

          <Input
            borderless
            placeholder="info"
            bgColor="transparent"
            color={materialTheme.COLORS.INFO}
            style={[styles.input, styles.inputInfo]}
            placeholderTextColor={materialTheme.COLORS.INFO}
          />

          <Input
            borderless
            placeholder="success"
            bgColor="transparent"
            color={materialTheme.COLORS.SUCCESS}
            style={[styles.input, styles.inputSuccess]}
            placeholderTextColor={materialTheme.COLORS.SUCCESS}
          />

          <Input
            borderless
            placeholder="warning"
            bgColor="transparent"
            color={materialTheme.COLORS.WARNING}
            style={[styles.input, styles.inputWarning]}
            placeholderTextColor={materialTheme.COLORS.WARNING}
          />

          <Input
            borderless
            placeholder="danger"
            bgColor="transparent"
            color={materialTheme.COLORS.ERROR}
            style={[styles.input, styles.inputDanger]}
            placeholderTextColor={materialTheme.COLORS.ERROR}
          />

          <Input
            password
            viewPass
            borderless
            bgColor="transparent"
            placeholder="password"
            style={[styles.input, styles.inputDefault]}
          />

          <Input
            right
            placeholder="icon right"
            placeholderTextColor={materialTheme.COLORS.DEFAULT}
            style={{ borderRadius: 3, borderColor: materialTheme.COLORS.INPUT }}
            iconContent={<Icon size={16} color={theme.COLORS.ICON} name="camera-18" family="GalioExtra" />}
          />

          <Input
            borderless
            placeholder="borderless"
            style={{ borderRadius: 3 }}
            placeholderTextColor={materialTheme.COLORS.DEFAULT}
          />

        </Block>
      </Block>
    )
  }

  renderSwitches = () => {
    return (
      <Block flex style={styles.group}>
        <Text bold size={16} style={styles.title}>Switches</Text>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Block row middle space="between" style={{ marginBottom: theme.SIZES.BASE }}>
            <Text size={14}>Switch is ON</Text>
            <Switch
              value={this.state['switch-1']}
              onValueChange={() => this.toggleSwitch('switch-1')}
            />
          </Block>
          <Block row middle space="between">
            <Text size={14}>Switch is OFF</Text>
            <Switch
              value={this.state['switch-2']}
              onValueChange={() => this.toggleSwitch('switch-2')}
            />
          </Block>
        </Block>
      </Block>
    )
  }

  renderTableCell = () => {
    const { navigation } = this.props;
    return (
      <Block flex style={styles.group}>
        <Text bold size={16} style={styles.title}>Table Cell</Text>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Block style={styles.rows}>
            <TouchableOpacity onPress={() => navigation.navigate('Pro')}>
              <Block row middle space="between" style={{ paddingTop: 7 }}>
                <Text size={14}>Manage Options</Text>
                <Icon name="angle-right" family="font-awesome" style={{ paddingRight: 5 }} />
              </Block>
            </TouchableOpacity>
          </Block>
        </Block>
      </Block>
    )
  }

  renderNavigation = () => {
    return (
      <Block flex style={styles.group}>
        <Text bold size={16} style={styles.title}>Navigation</Text>
        <Block>
          <Block style={{ marginBottom: theme.SIZES.BASE }}>
            <Header back title="Title" navigation={this.props.navigation} />
          </Block>

          <Block style={{ marginBottom: theme.SIZES.BASE }}>
            <Header tabs={tabs.categories} title="Title" navigation={this.props.navigation} />
          </Block>

          <Block style={{ marginBottom: theme.SIZES.BASE }}>
            <Header search title="Title" navigation={this.props.navigation} />
          </Block>

          <Block style={{ marginBottom: theme.SIZES.BASE }}>
            <Header
              search
              options
              title="Title"
              optionLeft="Option 1"
              optionRight="Option 2"
              navigation={this.props.navigation} />
          </Block>
        </Block>
      </Block>
    )
  }

  renderSocial = () => {
    return (
      <Block flex style={styles.group}>
        <Text bold size={16} style={styles.title}>Social</Text>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE, marginTop: theme.SIZES.BASE }}>
          <Block row center space="between">
            <Block flex middle right>
              <Button
                round
                onlyIcon
                shadowless
                icon="facebook"
                iconFamily="font-awesome"
                iconColor={theme.COLORS.WHITE}
                iconSize={theme.SIZES.BASE * 1.625}
                color={theme.COLORS.FACEBOOK}
                style={[styles.social, styles.shadow]}
              />
            </Block>
            <Block flex middle center>
              <Button
                round
                onlyIcon
                shadowless
                icon="twitter"
                iconFamily="font-awesome"
                iconColor={theme.COLORS.WHITE}
                iconSize={theme.SIZES.BASE * 1.625}
                color={theme.COLORS.TWITTER}
                style={[styles.social, styles.shadow]}
              />
            </Block>
            <Block flex middle left>
              <Button
                round
                onlyIcon
                shadowless
                icon="dribbble"
                iconFamily="font-awesome"
                iconColor={theme.COLORS.WHITE}
                iconSize={theme.SIZES.BASE * 1.625}
                color={theme.COLORS.DRIBBBLE}
                style={[styles.social, styles.shadow]}
              />
            </Block>
          </Block>
        </Block>
      </Block>
    )
  }

  renderCards = () => {
    return (
      <Block flex style={styles.group}>
        <Text bold size={16} style={styles.title}>Cards</Text>
        <Block flex>
          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Product product={products[0]} horizontal />
            <Block flex row>
              <Product product={products[1]} style={{ marginRight: theme.SIZES.BASE }} />
              <Product product={products[2]} />
            </Block>
            <Product product={products[3]} horizontal />
            <Product product={products[4]} full />
            <Block flex card shadow style={styles.category}>
              <ImageBackground
                source={{ uri: Images.Products['Accessories'] }}
                style={[styles.imageBlock, { width: width - (theme.SIZES.BASE * 2), height: 252 }]}
                imageStyle={{ width: width - (theme.SIZES.BASE * 2), height: 252 }}>
                <Block style={styles.categoryTitle}>
                  <Text size={18} bold color={theme.COLORS.WHITE}>Accessories</Text>
                </Block>
              </ImageBackground>
            </Block>
          </Block>
          <Block flex style={{ marginTop: theme.SIZES.BASE / 2 }}>
            <ScrollView
              horizontal={true}
              pagingEnabled={true}
              decelerationRate={0}
              scrollEventThrottle={16}
              snapToAlignment="center"
              style={{width}}
              showsHorizontalScrollIndicator={false}
              snapToInterval={cardWidth + (theme.SIZES.BASE * 0.375)}
              contentContainerStyle={{ paddingHorizontal: theme.SIZES.BASE / 2 }}
            >
              {categories && categories.map((item, index) => this.renderProduct(item, index))}
            </ScrollView>
          </Block>
        </Block>
      </Block>
    )
  }

  renderAlbum = () => {
    const { navigation } = this.props;

    return (
      <Block flex style={[styles.group, { paddingBottom: theme.SIZES.BASE * 5 }]}>
        <Text bold size={16} style={styles.title}>Album</Text>
        <Block style={{ marginHorizontal: theme.SIZES.BASE * 2 }}>
          <Block flex right>
            <Text
              size={12}
              color={theme.COLORS.PRIMARY}
              onPress={() => navigation.navigate('Home')}>
              View All
            </Text>
          </Block>
          <Block row space="between" style={{ marginTop: theme.SIZES.BASE, flexWrap: 'wrap' }} >
            {Images.Viewed.map((img, index) => (
              <Block key={`viewed-${img}`} style={styles.shadow}>
                <Image
                  resizeMode="cover"
                  source={{ uri: img }}
                  style={styles.albumThumb}
                />
              </Block>
            ))}
          </Block>
        </Block>
      </Block>
    )
  }

  render() {
    return (
      <Block flex>
        <ScrollView
          style={styles.components}
          showsVerticalScrollIndicator={false}>
          {this.renderButtons()}
          {this.renderText()}
          {this.renderInputs()}
          {this.renderSwitches()}
          {this.renderTableCell()}
          {this.renderNavigation()}
          {this.renderSocial()}
          {this.renderCards()}
          {this.renderAlbum()}
        </ScrollView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  components: {
    paddingTop: theme.SIZES.BASE * 3,
  },
  title: {
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
  },
  group: {
    paddingTop: theme.SIZES.BASE * 3.75,
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.2,
    elevation: 2,
  },
  button: {
    marginBottom: theme.SIZES.BASE,
    width: width - (theme.SIZES.BASE * 3),
  },
  options: {
    paddingHorizontal: theme.SIZES.BASE / 2,
  },
  optionsText: {
    fontSize: theme.SIZES.BASE * 0.75,
    color: '#4a4a4a',
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: -0.29,
  },
  optionsButton: {
    width: 'auto',
    height: 34,
    paddingHorizontal: theme.SIZES.BASE,
    paddingVertical: 10,
  },
  input: {
    borderBottomWidth: 1,
  },
  inputDefault: {
    borderBottomColor: materialTheme.COLORS.PLACEHOLDER,
  },
  inputTheme: {
    borderBottomColor: materialTheme.COLORS.PRIMARY,
  },
  inputTheme: {
    borderBottomColor: materialTheme.COLORS.PRIMARY,
  },
  inputInfo: {
    borderBottomColor: materialTheme.COLORS.INFO,
  },
  inputSuccess: {
    borderBottomColor: materialTheme.COLORS.SUCCESS,
  },
  inputWarning: {
    borderBottomColor: materialTheme.COLORS.WARNING,
  },
  inputDanger: {
    borderBottomColor: materialTheme.COLORS.ERROR,
  },
  imageBlock: {
    overflow: 'hidden',
    borderRadius: 4,
  },
  rows: {
    height: theme.SIZES.BASE * 2,
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
  },
  category: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE / 2,
    borderWidth: 0,
  },
  categoryTitle: {
    height: '100%',
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productItem: {
    width: cardWidth - theme.SIZES.BASE * 2,
    marginHorizontal: theme.SIZES.BASE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 7 },
    shadowRadius: 10,
    shadowOpacity: 0.2,
  },
  productImage: {
    width: cardWidth - theme.SIZES.BASE,
    height: cardWidth - theme.SIZES.BASE,
    borderRadius: 3,
  },
  productPrice: {
    paddingTop: theme.SIZES.BASE,
    paddingBottom: theme.SIZES.BASE / 2,
  },
  productDescription: {
    paddingTop: theme.SIZES.BASE,
    // paddingBottom: theme.SIZES.BASE * 2,
  },
  albumThumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure
  },
});