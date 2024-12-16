"use client"

import { useState } from "react";

export default function Page() {
    const [albums, setAlbums]:any = useState([]);
    
    var Discogs = require('disconnect').Client;

    var dis = new Discogs({
        consumerKey: 'KjPFUtvenJPQUCwwCAIz', 
        consumerSecret: 'ukRQkYiKjlhZPQUbmilfsIHydehHMdkE'
    });

    var db = dis.database();

    const handleChange = (event: any) => {
        if(event.target.value.length >= 3){
            db.search({query: event.target.value, type: 'master', year: "2024"}, function(err: any, data: any){
                if(data){
                    console.log(data["results"])
                    setAlbums(data["results"])
                }
            });
        }
        
    }    

    return (
        <div className="flex flex-col items-center">
            <input className="bg-red-400" onChange={handleChange}></input>
            {albums.map((album: any) => (
                <div key={album["title"]}>
                    {album["title"]}
                    <img src={album["cover_image"]}></img>
                </div>
                
            ))
            }
        </div>
    )
}