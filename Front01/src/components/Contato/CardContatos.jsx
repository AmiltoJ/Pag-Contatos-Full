import React from "react";
import { server} from "../../api/axios";

import styleContato from "./CardContatos.module.css";

 let cache = '';

 export async function Delete() {

  if(cache ===''){
      console.log('Contato não definido')
  }else{
    console.log("função delete id: " + cache);
    await server.delete(`user/${cache}`);
  }

  }

export async function Update(user) {

  if(cache ===''){
      console.log('Contato não definido')
  }else{
    console.log("função alterar id: " + cache);

    const Fullname = `${user.name.first} ${user.name.last}`;
    const avatar = user.picture.large;
    const Phone = user.cell;
    
    await server.put(`user/${cache}`, {
    name: Fullname,
    avatar: avatar,
    numero: Phone,
    });
  }

  }


export function CardContato({  avatar, name, celular, id}) {
  function Cache(id) {
    cache = id;
    console.log("Cache definido para " + cache);
  }

  return (
    <div className={styleContato.card} onClick={() => {Cache(id)}}>
      <img className={styleContato.avatar} src={avatar} alt="Avatar" />
      <p className={styleContato.p1}>{name}</p>
      <p className={styleContato.p2}>{celular}</p>
      </div>
  );
}
