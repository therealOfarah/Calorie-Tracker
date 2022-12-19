import React,{useEffect,useState} from 'react';
import axios from 'axios';
import { Button,Form, Container,Modal } from 'react-bootstrap';
import SingleEntry from './SingleEntry';
import { getOverlayDirection } from 'react-bootstrap/esm/helpers';
function Entry() {
  const [entries,setEntries] = useState([])
  const [refreshData,setRefreshData] = useState(false)
  const [changeEntry,setChangeEntry]=useState({"change":false,"id":0})
  const [changeIngredient, setChangeIngredient]=useState({"change":false,"id":0})
  const [newIngredientName,setIngredientName]=useState("")
  const [addNewEntry, setAddNewEntry]=useState(false)
  const [newEntry,setNewEntry]=useState({
    "ingredients":"",
    "dish":"",
    "calories":"",
    "fats":"",
    "carb":"",
    "protein":"",
  })
  useEffect(()=>{
    getAllEntries()
  },[])

  if(refreshData){
    setRefreshData(false)
    getAllEntries()
  }
  const baseUrl = `http://localhost:8000/entry/`
  function addSingleEntry(){
    setAddNewEntry(false)
    let url = `${baseUrl}create`
    axios.post(url,{
      "ingredients":newEntry.ingredients,
      "dish":newEntry.dish,
      "calories":newEntry.calories,
      "fats":parseFloat(newEntry.fats),
      "carb":parseFloat(newEntry.carb),
      "protein":parseFloat(newEntry.protein),
    }).then(res=>{
      if (res.status== 200){
        setRefreshData(true)
      }
    })
  }
  function deleteSingleEntry(id:number){
    let url = `${baseUrl}/delete`+id
    axios(url,{

    }).then(res=>{
      if (res.status== 200){
        setRefreshData(true)
      }
    })
  }
  function getAllEntries(){
    let url = `http://localhost:8000/entries`
    axios.get(url,{
      responseType:'json'
    }).then(res=>{
      if(res.status == 200){
        setEntries(res.data)
      }
    })
  }
  function changeSingleEntry(){
    changeEntry.change =false
    let url = `${baseUrl}update`+changeEntry.id
    axios.post(url,{
      "ingredients":newEntry.ingredients,
      "dish":newEntry.dish,
      "calories":newEntry.calories,
      "fats":parseFloat(newEntry.fats),
      "carb":parseFloat(newEntry.carb),
      "protein":parseFloat(newEntry.protein),
    }).then(res=>{
      if(res.status == 200){
        setRefreshData(true)
      }
    })
  }
  function changeIngredientForEntry() {
    changeIngredient.change =false
    let url = `http://localhost:8000/ingredient/update/`+changeIngredient.id
    axios.post(url,{
      "ingredients":newEntry.ingredients,
    }).then(res=>{
      if(res.status == 200){
        setRefreshData(true)
      }
    })
  }
  return (
    <div>
      <Container>
        <Button onClick={()=> setAddNewEntry(true)}>Track Todays Calories</Button>
      </Container>
      <Container>
        {entries != null && entries.map((entry: any,i:number)=>(
          <SingleEntry entryData={entry} deleteSingleEntry={deleteSingleEntry} setChangeIngredient={setChangeIngredient} setChangeEntry={setChangeEntry}/>
        ))}
      </Container>
      <Modal show={addNewEntry} onHide={()=>setAddNewEntry(false)} centered>
          <Modal.Header>
            Add Calorie Info
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Dish</Form.Label>
              <Form.Control onChange={(evt)=>{newEntry.dish = evt.target.value}}></Form.Control>
              <Form.Label>Ingredients</Form.Label>
              <Form.Control onChange={(evt)=>{newEntry.ingredients = evt.target.value}}></Form.Control>
              <Form.Label>Carbs</Form.Label>
              <Form.Control onChange={(evt)=>{newEntry.carb = evt.target.value}}></Form.Control>
              <Form.Label>Protiens</Form.Label>
              <Form.Control onChange={(evt)=>{newEntry.protein = evt.target.value}}></Form.Control>
              <Form.Label>Fats</Form.Label>
              <Form.Control onChange={(evt)=>{newEntry.fats= evt.target.value}}></Form.Control>
              <Form.Label>Calories</Form.Label>
              <Form.Control onChange={(evt)=>{newEntry.calories= evt.target.value}}></Form.Control>
            </Form.Group>
            <Button onClick={()=>addSingleEntry()}>Add</Button>
            <Button onClick={()=>setAddNewEntry(false)}>Cancel</Button>
          </Modal.Body>
      </Modal>
      <Modal show={changeIngredient.change} onHide={()=>setChangeIngredient({"change":false,"id":0})} centered>
          <Modal.Header>
            Update Ingredients
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Dish</Form.Label>
              <Form.Control onChange={(evt)=>{newEntry.dish = evt.target.value}}></Form.Control>
              <Form.Label>Ingredients</Form.Label>
              <Form.Control onChange={(evt)=>{setIngredientName(evt.target.value)}}></Form.Control>
            </Form.Group>
            <Button onClick={()=>changeIngredientForEntry()}>Update</Button>
            <Button onClick={()=>setChangeIngredient({"change":false,"id":0})}>Cancel</Button>
          </Modal.Body>
      </Modal>
      <Modal show={changeEntry.change} onHide={()=>setChangeEntry({"change":false,"id":0})} centered>
          <Modal.Header>
            Change Calorie Info
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Dish</Form.Label>
              <Form.Control onChange={(evt)=>{newEntry.dish = evt.target.value}}></Form.Control>
              <Form.Label>Ingredients</Form.Label>
              <Form.Control onChange={(evt)=>{newEntry.ingredients = evt.target.value}}></Form.Control>
              <Form.Label>Calories</Form.Label>
              <Form.Control onChange={(evt)=>{newEntry.calories= evt.target.value}}></Form.Control>
              <Form.Label>Carbs</Form.Label>
              <Form.Control onChange={(evt)=>{newEntry.carb = evt.target.value}}></Form.Control>
              <Form.Label>Protiens</Form.Label>
              <Form.Control onChange={(evt)=>{newEntry.protein = evt.target.value}}></Form.Control>
              <Form.Label>Fats</Form.Label>
              <Form.Control onChange={(evt)=>{newEntry.fats= evt.target.value}}></Form.Control>
            </Form.Group>
            <Button onClick={()=>changeSingleEntry()}>Update</Button>
            <Button onClick={()=>setChangeEntry({"change":false,"id":0})}>Cancel</Button>
          </Modal.Body>
      </Modal>
    </div>
  );
}

export default Entry;