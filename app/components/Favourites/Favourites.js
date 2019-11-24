import React, { Component } from 'react';
import { Button } from 'react-native';
import * as commonFunctions from '../commonFunctions';

export default class Favourites extends Component {
    constructor(props) {
        super(props)
        this.state = {
            watchlistButton:false,
        }
    }

    componentDidMount(){
        commonFunctions._retrieveData('FAVOURITES').then(data => {                        
            if(!data){
                commonFunctions._storeData(JSON.stringify([]),'FAVOURITES') 
            }else if(data.length !== 0){
                if(data.some(item => item.url === this.props.data.url)){
                    this.setState({
                        watchlistButton:true,
                    })
                }
            }
        })        
    }

    handleButton =(bool)=>{
        this.setState({
            watchlistButton : bool,
            // data: this.props.data
        }, () => {
            commonFunctions._retrieveData('FAVOURITES').then( data => {
                let updatedData =[...data,this.props.data]
                commonFunctions._storeData(JSON.stringify(updatedData),'FAVOURITES') 
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

