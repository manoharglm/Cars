import React from 'react';
import { FlatList, Text, View } from 'react-native';
import SQLite from "react-native-sqlite-storage"
SQLite.enablePromise(true);
// var db = openDatabase({ name: 'cars.db', createFromLocation : 1});

export default class home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataArr: [],
        };

        (async () => {

            const db = await SQLite.openDatabase({ name: 'a', createFromLocation: 1, location: 'Library' }, this.openCB, this.errorCB);
            
            db.transaction((tx) => {
                tx.executeSql('SELECT * FROM cars_list WHERE ROWID > 0 AND ROWID < 11', [], (tx, results) => {            
                    let len = results.rows.length;
                    let dataArr = []
                    for (let i = 0; i < len; i++) {
                      dataArr.push(results.rows.item(i))
                    }
                    this.setState(prevState => {
                        return {
                            dataArr: [...prevState.dataArr,dataArr]
                        }
                    })
                  });
              });
        })()

    }

    openCB = () => {
        console.log("OPENED");
    }
    errorCB = () => {
        console.log("OPENED");
    }
    render() {
        console.log(this.state.dataArr);
        
        return (
            <View>
                <Text>HELLO</Text>
            </View>
        );
    }
}