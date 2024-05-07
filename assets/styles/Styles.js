import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({

background: {
  flex: 1,
  backgroundColor: '#0278A4',

},
root: {
    alignItems: 'center',        
    padding: 10,
    backgroundColor: '#0278A4',
    flex: 1,
},

LoginText: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 10,
    width: 200,
  },

LoginBox: {

  backgroundColor:'white',
  borderColor:'blue',

  borderWidth: 4,
  borderRadius: 15,

  paddingHorizontal: 10,
  
  marginVertical: 10,
},

LoadingCircle:  {

  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',

},

LoginButton: {

  width: '90%',
  padding:20,
  marginVertical: 10,
 
  borderRadius: 20,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor:'#ffbaff',
  borderRadius: 15,
  borderWidth: 4,
  borderColor: '#990099',

},
LoginButton_Text: {

  textAlign:'center',
  fontWeight:'bold',
  color: 'black',
  fontSize: 20,

}
});

export default Styles;