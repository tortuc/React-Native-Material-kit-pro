import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Block, theme } from 'galio-framework';

import { Product } from '../components/';

import deals from '../constants/images/deals';

const { width } = Dimensions.get('screen');
// import products from '../constants/products';

const menu = [
  {id: 'popular', title: 'POPULAR', },
  {id: 'beauty', title: 'BEAUTY', },
  {id: 'cars', title: 'CARS', },
  {id: 'motocycles', title: 'MOTOCYCLES', },
];

export default class Deals extends React.Component {
  renderProducts = () => {
    const { navigation, route } = this.props;
    const tabId = route.params?.tabId;
    const products = tabId ? deals[tabId] : deals.popular;

    return (
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.products}>
        <Block flex>
          <Product product={products[0]} horizontal />
          <Block flex row>
            <Product product={products[1]} style={{ marginRight: theme.SIZES.BASE }} />
            <Product product={products[2]} />
          </Block>
          <Product product={products[3]} horizontal />
          <Product product={products[4]} full />
        </Block>
      </ScrollView>
    )
  }

  render() {
    return (
      <Block flex center style={styles.deals}>
        {this.renderProducts()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  deals: {
    width: width,
  },
  products: {
    justifyContent: 'center',
    marginTop: theme.SIZES.BASE * 2,
  },
});
