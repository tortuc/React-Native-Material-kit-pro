import React from 'react';
import { StyleSheet, Dimensions, ImageBackground, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import appImages from '../constants/images/app';
// import Images from '../constants/Images';

const { width } = Dimensions.get('screen');

const menuCategories = {
  popular: [
    { id: 'auto', title: 'Auto', image: appImages.Categories['Auto'] },
    { id: 'motocycle', title: 'Motocycle', image: appImages.Categories['Motocycle'] },
    { id: 'watches', title: 'Watches', image: appImages.Categories['Watches'] },
  ],
  beauty: [
    { id: 'makeup', title: 'Makeup', image: appImages.Categories['Makeup'] },
    { id: 'accessories', title: 'Accessories', image: appImages.Categories['Accessories'] },
    { id: 'fragrance', title: 'Fragrance', image: appImages.Categories['Fragrance'] },
  ],
  car_motorcycle: [
    { id: 'bmw', title: 'BMW', image: appImages.Categories['BMW'] },
    { id: 'mustang', title: 'Mustang', image: appImages.Categories['Mustang'] },
    { id: 'harley', title: 'Harley-Davidson', image: appImages.Categories['Harley-Davidson'] },
  ],
};

export default class Categories extends React.Component {
  renderCategories = () => {
    const { navigation, route } = this.props;
    const tabId = route.params?.tabId;
    const categories = tabId ? menuCategories[tabId] : menuCategories.beauty;

    return (
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.categoryList}>
        <Block flex>
          {categories.map(category => (
            <TouchableWithoutFeedback
              key={`category-${category.id}`}
              onPress={() => navigation.navigate('Category', { ...category })}>
              <Block flex card style={[styles.category, styles.shadow]}>
                <ImageBackground
                  source={{ uri: category.image }}
                  style={[styles.imageBlock, { width: width - (theme.SIZES.BASE * 2), height: 252 }]}
                  imageStyle={{ width: width - (theme.SIZES.BASE * 2), height: 252 }}
                >
                <Block style={styles.categoryTitle}>
                  <Text size={18} bold color={theme.COLORS.WHITE}>{category.title}</Text>
                </Block>
                </ImageBackground>
              </Block>
            </TouchableWithoutFeedback>
          ))}
        </Block>
      </ScrollView>
    )
  }

  render() {
    return (
      <Block flex center style={styles.categories}>
        {this.renderCategories()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  categories: {
    width: width,
  },
  categoryList: {
    justifyContent: 'center',
    paddingTop: theme.SIZES.BASE * 1.5,
  },
  category: {
    backgroundColor: theme.COLORS.WHITE,
    marginHorizontal: theme.SIZES.BASE,
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
  imageBlock: {
    overflow: 'hidden',
    borderRadius: 4,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    shadowOpacity: 0.1,
    elevation: 2,
  }
});
