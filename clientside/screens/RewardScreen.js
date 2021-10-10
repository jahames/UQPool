import React, { Component } from 'react';
import {StyleSheet,Text,View, TouchableOpacity, Image, Alert, FlatList} from 'react-native';

export default class Store extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [
        /*can only get images to work with links, not through assets folder */
        {id:1, title: "UQ-Pool T-Shirt",  price:" 10000 ", image:"https://i.gyazo.com/27fabfa34ba56b7c41d8c5ef15a649cc.png"},
        {id:2, title: "$10 off UQ-Shop",  price:" 8000 ", image:"../assets/rewards/pooltshirt.PNG"} ,
        {id:3, title: "Merlo Coffee \n20% Discount",  price:" 2500 ",image:"../assets/rewards/shopping-cart.png"}, 
        {id:4, title: "Main Course \n20% Discount",  price:" 3000 ", image:"../assets/rewards/Main-Course.png"}, 
        {id:5, title: "1YR UQ-Rewards Membership",  price:" 25000 ", image:"../assets/rewards/uqrewards.png"}, 
        {id:6, title: "Free Redroom Pint",  price:" 5000 ", image:"../assets/rewards/redroom.PNG"}, 
        
      ]
    };
  }

  Redeem = () => {
    Alert.alert('Success', 'Please get the following barcode scanned to claim your reward!')
    /*Display a random qr/bar code image, with a button saying finished HERE*/
    
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList style={styles.list}
          data={this.state.data}
          contentContainerStyle={styles.listContainer}
          numColumns={2}
          horizontal={false}

          keyExtractor= {(item) => {
            return item.id;
          }}
          /*Padding between rows */
          ItemSeparatorComponent={() => {
            return (
              <View style={styles.verticalSeparator}/>
            )
          }}
          renderItem={(post) => {
            const item = post.item;
            return (
              <View style={styles.items}>
               
               <View style={styles.itemHead}>
                  <View>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.price}>{item.price}</Text>
                  </View>
                </View>

                <Image style={styles.itemImg} source={{uri:item.image}}/> 
                
                
                <View style={styles.itemFooter}>
                  <View style={styles.barContainer}>
                    <View style={styles.barSection}>
                      <TouchableOpacity style={styles.barButton} onPress={() => this.Redeem()}>
                        <Image style={styles.shoppingIcon} source={require('../assets/shopping-cart.png')}/>
                        <Text style={[styles.barLabel, styles.redeemText]}>Redeem Now</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            )
          }}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:20,
  },
  /* padding between card and edge of screen */
  list: {
    paddingHorizontal: 6,
    backgroundColor:"#990099",
  },
  listContainer:{
    alignItems:'center'
  },
  verticalSeparator: {
    marginTop: 6,
  },
  /****** item box design**********/
  items:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 2
    },
    /*padding between boxes */
    marginVertical: 7,
    backgroundColor:"white",
    flexBasis: '48%',
    marginHorizontal: 5,
  },
  itemHead: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  
  itemFoot:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 1,
    paddingBottom: 15,
    paddingHorizontal: 19,
  },
  itemImg:{
    flex: 1,
    height: 155,
    /* width: null, */
  },
  /* Individual item elements */
  title:{
    fontSize:18,
    flex:5,
  },
  price:{
    fontSize:16,
    color: "green",
    marginTop: 5,
    alignSelf: 'flex-start'
  },
  shoppingIcon: {
    width:30,
    height:24,
  },
  redeemText:{
    color: "purple",
    alignSelf: 'flex-start'
  },
  
  /* bottom elements */
  barContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flexDirection: 'row',
    flex: 2
  },
  barSection: {
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 6,
  },
  
  barButton:{
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },


});  
 