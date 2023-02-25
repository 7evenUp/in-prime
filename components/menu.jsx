import React from 'react';
import { useState } from 'react';
import {useEffect} from 'react'; // don't forget

function Menu(props) {

    const resolution = props.resolution
    const currentY = props.currentY
    const setCurrentY = props.setCurrentY

    function toggleMenu(position){
        window.scrollTo({
            top: position,
            behavior: 'smooth',
          });
        setCurrentY(position)
    }

    const categories = [
        {number:'01', name:'Главная', position:{
            lgg:0,
            lg:0
        }},
        {number:'02', name:'Преимущества', position:{
            lgg:1100,
            lg:780
        }},
        {number:'03', name:'Возможности', position:{
            lgg:1750,
            lg:1481
        }},
        {number:'04', name:'Кейсы', position:{
            lgg:4200,
            lg:3400
        }},
        {number:'05', name:'Команда', position:{
            lgg:5000,
            lg:4210
        }},
        {number:'06', name:'Подписка', position:{
            lgg:7200,
            lg:6200
        }},
        {number:'07', name:'FAQ', position:{
            lgg:8100,
            lg:6950
        }},
    ]
    return (
        <>
            {resolution != 'lgg' || resolution != 'lg' ?
            <div className="app__menu">
            {categories.map((elem,index)=>{
                    return <div className="app__menu__category" onClick={() => toggleMenu(elem.position[resolution])} key={index}>
                    <div className="number">{elem.number}</div>
                    <div className="name">{elem.name}</div>
                    {currentY>=elem.position[resolution] && (index == categories.length-1 || currentY<categories[index+1].position[resolution])? <div className="vector"></div>: ''}
                    </div>
                })}
            </div>
            : 
            ''
            } 
        </> 
    );
}

export default Menu;