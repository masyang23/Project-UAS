
import React, { Component } from 'react';
 
import { StyleSheet, View, Alert, TextInput, Button, Text, Platform, TouchableOpacity, ListView, ActivityIndicator } from 'react-native';
 
import { StackNavigator } from 'react-navigation';


import Logo from './src/Logo';

class HomeStack extends Component{

  static navigationOptions =
  {
    header: false,
  };
  render() {
    return (

      <View style={ styles.MainContainer2 }>
      <Logo/>
              <TouchableOpacity
                        activeOpacity={0.5 }
                        style={styles.TouchableOpacityStyle3}
                        onPress ={() => this.props.navigation.navigate('First') }>
                      <Text style={styles.TextStyle }>DAFTAR</Text>
            </TouchableOpacity>
         </View>

    );
  }

}

class Home extends Component {
 
constructor(props) {
 
   super(props)
 
   this.state = {
 
     TextInput_Nama: '',
     TextInput_Judul: '',
     TextInput_pem1: '',
     TextInput_pem2: '',
 
   }
 
 }
 static navigationOptions =
 {
   title: 'Data Skripsi Mahasiswa',
 };
 
 InsertStudentRecordsToServer = () =>{
 
      fetch('https://kadekmasyang199.000webhostapp.com/db/InsertStudentData.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
 
       nama : this.state.TextInput_Nama,
 
        judul : this.state.TextInput_Judul,
 
        pem1 : this.state.TextInput_pem1,
 
        pem2: this.state.TextInput_pem2
 
      })
 
      }).then((response) => response.json())
          .then((responseJson) => {
 
            // Showing response message coming from server after inserting records.
            Alert.alert(responseJson);
 
          }).catch((error) => {
            console.error(error);
          });
          this.props.navigation.navigate('First');
 
}
 
 GoTo_Show_StudentList_Activity_Function = () =>
  {
    this.props.navigation.navigate('Second');
    
  }
 
 render() {
   return (
 
<View style={styles.MainContainer}>

       <Text style={{marginRight:270,fontSize: 20,paddingTop:30, marginBottom: 7}}> Nama Mahasiswa </Text>
       <TextInput
         
         placeholder =" Nama Mahasiswa"
 
         onChangeText={ TextInputValue => this.setState({ TextInput_Nama : TextInputValue }) }
 
         underlineColorAndroid='transparent'
 
         style={styles.TextInputStyleClass}
       />
      <Text style={{marginRight:310,fontSize: 20, marginBottom: 7}}> Judul Skripsi </Text>
      <TextInput
         
         placeholder=" Judul Skripsi"
 
         onChangeText={ TextInputValue => this.setState({ TextInput_Judul : TextInputValue }) }
 
         underlineColorAndroid='transparent'
 
         style={styles.TextInputStyleClass}
       />
      <Text style={{marginRight:230,fontSize: 20, marginBottom: 7}}> Dosen Pembimbing 1 </Text>
      <TextInput
         
         placeholder="Dosen Pembimbing 1"
 
         onChangeText={ TextInputValue => this.setState({ TextInput_pem1 : TextInputValue }) }
 
         underlineColorAndroid='transparent'
 
         style={styles.TextInputStyleClass}
       />
      <Text style={{marginRight:230,fontSize: 20, marginBottom: 7}}> Dosen Pembimbing 2 </Text>
       <TextInput
 
         placeholder="Dosen Pembimbing 2"
 
         onChangeText={ TextInputValue => this.setState({ TextInput_pem2 : TextInputValue }) }
 
         underlineColorAndroid='transparent'
 
         style={styles.TextInputStyleClass}
       />
 
      <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} 
        onPress={this.InsertStudentRecordsToServer} >
 
        <Text style={styles.TextStyle}> SUBMIT</Text>
 
      </TouchableOpacity>
 
      <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle2}
       onPress={this.GoTo_Show_StudentList_Activity_Function} >
 
        <Text style={styles.TextStyle}> LIHAT DATA MAHASISWA </Text>
 
      </TouchableOpacity>
</View>
           
   );
 }
}
 
class List extends Component {
 
  constructor(props) { 
 
    super(props);
 
    this.state = {
 
      isLoading: true
    }
  }
 
  static navigationOptions =
  {
     title: 'Data Mahasiswa',
  };
 
  componentDidMount() {
    
       return fetch('https://kadekmasyang199.000webhostapp.com/db/ShowallStudentList.php')
         .then((response) => response.json())
         .then((responseJson) => {
           let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
           this.setState({
             isLoading: false,
             dataSource: ds.cloneWithRows(responseJson),
           }, function() {
             // In this block you can do something with new state.
           });
         })
         .catch((error) => {
           console.error(error);
         });
     }
    
     GetnimFunction=(nim,nama, judul, pem1, pem2)=>{
 
          this.props.navigation.navigate('Third', { 
 
            ID : nim,
            NAME :nama,
            CLASS : judul,
            PHONE_NUMBER : pem1,
            EMAIL : pem2
 
          });
     }
 
     ListViewItemSeparator = () => {
       return (
         <View
           style={{
             height:2,
             width: "100%",
             backgroundColor: "#2196F3",
           }}
         />
       );
     }
 
     render() {
      if (this.state.isLoading) {
        return (
          <View style={{flex: 1, paddingTop: 20}}>
            <ActivityIndicator />
          </View>
        );
      }
   
      return (
   
        <View style={styles.ContainerList}>
   
          <ListView
   
            dataSource={this.state.dataSource}
   
            renderSeparator= {this.ListViewItemSeparator}
   
            renderRow={ (rowData) => <Text style={styles.rowViewContainer} 
 
                      onPress={this.GetnimFunction.bind(
                        this, rowData.nim,
                         rowData.nama, 
                         rowData.judul, 
                         rowData.pem1, 
                         rowData.pem2
                         )} > 

                     <Text style={{fontSize: 20}} >{rowData.nama}</Text>
                      
                      </Text> }
                      
   />
        </View>
      );
    }
 
}
 
class Edit extends Component {
  
  constructor(props) {
    
       super(props)
    
       this.state = {
    
         TextInput_nim: '',
         TextInput_Nama: '',
         TextInput_Judul: '',
         TextInput_pem1: '',
         TextInput_pem2: '',
    
       }
    
     }
 
     componentDidMount(){
 
      // Received Student Details Sent From Previous Activity and Set Into State.
      this.setState({ 
        TextInput_nim : this.props.navigation.state.params.ID,
        TextInput_Nama: this.props.navigation.state.params.NAME,
        TextInput_Judul: this.props.navigation.state.params.CLASS,
        TextInput_pem1: this.props.navigation.state.params.PHONE_NUMBER,
        TextInput_pem2: this.props.navigation.state.params.EMAIL,
      })
 
     }
  
    static navigationOptions =
    {
       title: 'Merubah Data',
    };
 
    UpdateStudentRecord = () =>{
      
            fetch('https://kadekmasyang199.000webhostapp.com/db/UpdateStudentRecord.php', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
      
              nim : this.state.TextInput_nim,
 
             nama : this.state.TextInput_Nama,
      
              judul : this.state.TextInput_Judul,
      
              pem1 : this.state.TextInput_pem1,
      
              pem2: this.state.TextInput_pem2
      
            })
      
            }).then((response) => response.json())
                .then((responseJson) => {
      
                  // Showing response message coming from server updating records.
                  Alert.alert(responseJson);
      
                }).catch((error) => {
                  console.error(error);
                });
                this.props.navigation.navigate('First');
      
      }
      DeleteStudentRecord = () =>{
        
        fetch('https://kadekmasyang199.000webhostapp.com/db/DeleteStudentRecord.php', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
      
          nim : this.state.TextInput_nim
      
        })
      
        }).then((response) => response.json())
        .then((responseJson) => {
      
          // Showing response message coming from server after inserting records.
          Alert.alert(responseJson);
      
        }).catch((error) => {
           console.error(error);
        });
  
        this.props.navigation.navigate('First');
  
    }
    render() {
 
      return (
   
   <View style={styles.MainContainer}>
   
          <Text style={{fontSize: 20, textAlign: 'center', marginBottom: 7}}> Edit Data Mahasiswa </Text>
    
          <TextInput
            
            placeholder="Nama Mahasiswa"
            
            value={this.state.TextInput_Nama}
   
            onChangeText={ TextInputValue => this.setState({ TextInput_Nama : TextInputValue }) }
   
            underlineColorAndroid='transparent'
   
            style={styles.TextInputStyleClass}
          />
   
         <TextInput
            
            placeholder="Judul Skripsi"
 
            value={this.state.TextInput_Judul}
   
            onChangeText={ TextInputValue => this.setState({ TextInput_Judul : TextInputValue }) }
   
            underlineColorAndroid='transparent'
   
            style={styles.TextInputStyleClass}
          />
   
         <TextInput
            
            placeholder="Dosen Pembiming 1"
 
            value={this.state.TextInput_pem1}
   
            onChangeText={ TextInputValue => this.setState({ TextInput_pem1 : TextInputValue }) }
   
            underlineColorAndroid='transparent'
   
            style={styles.TextInputStyleClass}
          />
   
          <TextInput
   
            placeholder="Dosen Pembimbing 2"
 
            value={this.state.TextInput_pem2}
   
            onChangeText={ TextInputValue => this.setState({ TextInput_pem2 : TextInputValue }) }
   
            underlineColorAndroid='transparent'
   
            style={styles.TextInputStyleClass}
          />
   
         <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this.UpdateStudentRecord} >
   
            <Text style={styles.TextStyle}> SUMBMIT </Text>
   
         </TouchableOpacity>
         <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this.DeleteStudentRecord} >
   
            <Text style={styles.TextStyle}> HAPUS DATA </Text>
   
         </TouchableOpacity>
   </View>
              
      );
    }
 
}


export default MyNewProject = StackNavigator(
 
  {
    Home: { screen: HomeStack },
 
    First: { screen: Home },
 
    Second: { screen: List },
 
    Third: { screen: Edit }

 
  });
 
const styles = StyleSheet.create({
 
  MainContainer :{
 
    alignItems: 'center',
    flex:1,
    paddingTop: 5,
    backgroundColor: '#fff'
 
  },
  MainContainer2 :{
 
    alignItems: 'center',
    flex:1,
    paddingTop: 30,
    backgroundColor: '#87CEFA'
 
  },

  TextInputStyleClass: {
 
    textAlign:'center',
    marginTop:7,
    marginBottom:7,
    width:'90%',
    height:40,
    borderWidth:1,
    borderRadius:5,
    borderColor:'#000'
 
  },
  TouchableOpacityStyle: {
    marginTop:10,
    paddingTop:10,
    paddingBottom:10,
    borderRadius:5,
    width: '90%',
    backgroundColor: '#2196F3'
  
 
  },
  TouchableOpacityStyle2: {
    marginTop:10,
    paddingTop:10,
    paddingBottom:10,
    borderRadius:5,
    width: '90%',
    backgroundColor: '#2196F3'
  
 
  },
  TouchableOpacityStyle3: {
    marginTop:10,
    paddingTop:10,
    paddingBottom:10,
    borderRadius:5,
    width: '30%',
    backgroundColor: '#2196F3'
  
 
  },
  TextStyle:{
    color:'#fff',
    textAlign:'center',
  },
  rowViewContainer: {
    
    flex:1,
    fontSize: 20,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
 ContainerList:{
   flex:1,
   paddingTop:20,
   marginLeft: 5,
   marginBottom:5
 }
});