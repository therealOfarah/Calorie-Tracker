import React,{useEffect,useState} from 'react';
import "bootstrap/dist/css/bootstrap.css"
import { Button,Form, Container,Modal, Card, Row, Col } from 'react-bootstrap';

function SingleEntry({entryData, setChangeIngredient, deleteSingleEntry, setChangeEntry}:any) {
  function changeIngredient(){
    setChangeIngredient(
      {
        "change":true,
        "id":entryData._id
      }
    )
  }
  function changeEntry(){
    setChangeEntry(
      {
        "change":true,
        "id":entryData._id
      }
    )
  }
  console.log(entryData)
  return (
    <div>
      <Card>
      <Row>
        <Col>Dish:{entryData !== undefined && entryData.dish}</Col>
        <Col>Ingredinets:{entryData !== undefined && entryData.ingredients}</Col>
        <Col>Calories:{entryData !== undefined && entryData.calories}</Col>
        <Col>Carbs:{entryData !== undefined && entryData.carb}</Col>
        <Col>Protiens:{entryData !== undefined && entryData.protein}</Col>
        <Col>Fats:{entryData !== undefined && entryData.fat}</Col>
        <Col><Button onClick={()=>deleteSingleEntry(entryData._id)}>Delete</Button></Col>
        <Col><Button onClick={()=>changeIngredient()}>Change Ingredients</Button></Col>
        <Col><Button onClick={()=>changeEntry()}>Change Dish</Button></Col>
      </Row>
    </Card>
    </div>
  );
}

export default SingleEntry;