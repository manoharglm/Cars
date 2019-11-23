import React, { Component } from 'react';
import { Button } from 'react-native';
import { 
    StyleSheet,
    AsyncStorage
} from 'react-native';

export default class Favourites extends Component {
    constructor(props) {
        super(props)
        this.state = {
            watchlistButton:false,
        }
    }

    componentDidMount(){
        // AsyncStorage.removeItem('WATCHLIST')
        this._retrieveData().then(data => {                        
            if(!data){
                this._storeData(JSON.stringify([])) 
            }else if(data.length !== 0){
                if(data.some(item => item.url === this.props.data.url)){
                    this.setState({
                        watchlistButton:true,
                    })
                }
            }
        })        
    }

    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('FAVOURITES');
            return JSON.parse(value)
        } catch (error) {
            console.log(error);
        }
    }

    _storeData = async (data) => {
        if(data){
            try {
                await AsyncStorage.setItem('FAVOURITES', data)
              } catch (error) {
                  console.log(error);
              }
        }
    }
    handleButton =(bool)=>{
        this.setState({
            watchlistButton : bool,
            // data: this.props.data
        }, () => {
            this._retrieveData().then( data => {
                let updatedData =[...data,this.props.data]
                this._storeData(JSON.stringify(updatedData)) 
            })
        })
    }
    render(){
        let buttonTitle = this.state.watchlistButton ? "Added to Favourites" : "Add to Favourites"
        return(
            <Button 
                disabled={this.state.watchlistButton} 
                onPress={()=>this.handleButton(true)} 
                title={buttonTitle}
                color="black"
            />
        )
    }
}

