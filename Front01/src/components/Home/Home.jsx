
import style from "./Home.module.css";

import { CardPerson } from "../User/CardPerson";
import { CardContato, Delete, Update } from "../Contato/CardContatos";

import {BsFillTrash3Fill } from "react-icons/bs";
import {IoPencil, IoSearchOutline, IoAdd } from "react-icons/io5";

import { useEffect, useState } from "react";
import { api, server } from "../../api/axios";



export function Home() {

  let [persons, setPersons] = useState([]);
 
  useEffect(() => {
   Load()
}, []);

 async function Load() {
   const temp = await server.get("user/");
   console.log(temp)

   setPersons(temp.data);
   
   console.log(persons);
 }

 async function Adicionar(){
   event.preventDefault();
   console.log("função insert");

   const resultAPI = await api.get("/");

   const user = resultAPI.data.results[0];

   const Fullname = `${user.name.first} ${user.name.last}`;
   const avatar = user.picture.large;
   const Phone = user.cell;
   
   await server.post("user/", {
   name: Fullname,
   avatar: avatar,
   celular: Phone,
   });

   Load();
 }

 async function Deletar() {
 event.preventDefault();

 Delete();
 Load();
 }

 function Pesquisar() {
  event.preventDefault();  

  if (valor === '') { Load(); }
  else{
    console.log(`Nome procurado: ${valor}`);
    let results = [];

  persons.map((person => {

    if(person.name.toLowerCase().includes(valor.toLowerCase())) {
      results.push(person);
      return
    }
  }))

  console.log({results})
  setPersons(results)
  }
}

 async function Editar() {
   event.preventDefault();
   
   const resultAPI = await api.get("/");

   const user = resultAPI.data.results[0];
 
   Update(user);
   Load();
   }


  return (
    <div className={style.container}> 
    
      <CardPerson
        cover="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=350&q=50"
        avatar="https://github.com/AmiltoJ.png"
        name="Amilto J S"
        office="Vendedor da Oboticario"
      
      />
      <div className={style.contatos}>
      <div  className={style.controles}>
      <form >
      
      <div className={style.headerContatos}>
        <h1 className={style.title}>Meus contatos</h1>
        <div className={style.buttons}>
            <button className={style.buttom} onClick={Adicionar}> <IoAdd /> </button>
            <button className={style.buttom} onClick={Editar}> <IoPencil /> </button>
            <button className={style.buttom} onClick={Deletar}> <BsFillTrash3Fill /> </button>
        </div>
        </div>
            
            <div className={style.pesquisa}>
            <button  className={style.buttomPesquisa}> <IoSearchOutline /> </button>
            <button className={style.buttomPesquisa} onClick={Pesquisar}> <IoSearchOutline /> </button>
            <input type='text' name='pesquisa' className={style.inputPesquisa}/>
            </div>
            
            </form>
        </div>
      
        <div className={style.listaContatos}>

    <div className={style.listaCatalogo}>
    <h1 className={style.letraCatalogo}>All</h1>
    <div className={style.contatoCatalogo}>

  {
              persons.map((person, index) => (
                <CardContato key = {index} 
                avatar = {person.avatar}
                name = {person.name}
                numero = {person.numero}

                id = {person.id}
                />

              ))
            }

        </div> 
      </div>
    </div>
  </div>
</div>    
  );
}

