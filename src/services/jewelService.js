import * as SQLite from 'expo-sqlite'
import Cadena from '../../data/Chain.json'

export function initDatabase(){
  const db = SQLite.openDatabase('Jewellery.db')
  db.transaction(tx =>{
    tx.executeSql('CREATE TABLE IF NOT EXISTS Jewel (id INTEGER PRIMARY KEY AUTOINCREMENT, jewelType TEXT ,jewelId INTEGER, description TEXT, gold INTEGER, weight REAL, price INTEGER, note TEXT)'), 
    null,
    (txObj, res) => resolve(res.rows._array),
    (txObj, err) => console.log(err)  
    })
}
  

export async function getJewels(jewelType){
  const db = SQLite.openDatabase('Jewellery.db')
  return new Promise((resolve, reject) =>{
    db.transaction(tx =>{
      if(jewelType != ""){
        tx.executeSql('SELECT * FROM Jewel WHERE jewelType = ? ORDER BY jewelId ASC', [jewelType], 
        (txObj, res) => resolve(res.rows._array),
        (txObj, err) => console.log(err))  
      }
      else {
        tx.executeSql('SELECT * FROM Jewel ORDER BY jewelId ASC', null, 
        (txObj, res) => resolve(res.rows._array),
        (txObj, err) => console.log(err))
      }
    })
  })
}

export async function getJewelId(range){
  const db = SQLite.openDatabase('Jewellery.db')
  return new Promise((resolve, reject) =>{
    db.transaction(tx =>{
      tx.executeSql('SELECT jewelId from Jewel WHERE jewelId >= ? AND jewelId <= ? ORDER BY jewelId ASC',
      [range[0], range[1]],
      (txObj, res) => resolve(res.rows._array),
      (txObj, err) => console.log(err)
    )})
  })
}

export async function postJewel(type, jewelId, description, gold, weight, price, note, date){
  const db = SQLite.openDatabase('Jewellery.db')
  db.transaction(tx =>{
    tx.executeSql('INSERT INTO Jewel (jewelType, jewelId, description, gold, weight, price, note) VALUES (?,?,?,?,?,?,?)',              
      [type, jewelId, description, gold, weight, price, note],
      (txObj, res) => console.log("POSTED"),
      (txObj, err) => console.log(err)
    )
  })
}

export async function putJewel(id, description, gold, weight, price, note){
  const db = SQLite.openDatabase('Jewellery.db')
  db.transaction(tx =>{
    tx.executeSql('UPDATE Jewel SET description = ?, gold = ?, weight = ?, price = ?, note = ? WHERE id = ?',              
      [description, gold, weight, price, note, id],
      (txObj, res) => console.log("PUTED"),
      (txObj, err) => console.log(err)
    )
  })
}

export async function deleteJewel(id){
  const db = SQLite.openDatabase('Jewellery.db')
  db.transaction(tx =>{
    tx.executeSql('DELETE FROM Jewel WHERE id = ?',
      [id],
      (txObj, res) => console.log("DELETED"),
      (txObj, err) => console.log(err)
    )
  })
}


export async function addSaleJewel(id){
  const db = SQLite.openDatabase('Jewellery.db')
  db.transaction(tx =>{
    tx.executeSql('DELETE FROM Jewel WHERE id = ?',
      [id],
      (txObj, res) => console.log("DELETED"),
      (txObj, err) => console.log(err)
    )
  })
}

export async function create(){
  for (let f in Cadena){
    const x = Cadena[f]
    if( x.description != ""){
      await postJewel("Cadena", x.id, x.d, x.g, x.w, x.p, "")

    }
  }
}



