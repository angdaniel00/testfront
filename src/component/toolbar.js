import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Traveles } from "./traveles";
import { Travel } from "./travel";
import { Chip } from "primereact/chip";
import image  from '../asssets/7674192151596026962-128.png';
import { GENERATOR, MULTI, ROUND, ROUNDTRIP, BUSSINESS, ECONOMIC, ECONOMICPREMIUM, FIRST, MIXED } from "../util/constants";
import {servicePlaces} from "../services/service";

export const ToolBar = () => {

    const [origin, setOrigin] = useState(null);
    const [destination, setDestination] = useState(null);
    const [type, setType] = useState(null);
    const [classFly, setClassFly] = useState(null);

    const [dateRange, setDateRange] = useState([]);
    const [cant, setCant] = useState(1);

    const [view, setView] = useState(false);
    const [viewCalendar, setViewCalendar] = useState(false);

    const [viewTravelFrom, setViewTravelFrom] = useState(false);
    const [viewTravelTo, setViewTravelTo] = useState(false);

    const int = () =>{
        const aux = origin;
        setOrigin(destination);
        setDestination(aux);
    };

    const items = [
        {name:'Solo ida', value: ROUND},
        {name:'Ida y Vuelta', value: ROUNDTRIP},
        {name:'Multi-destino', value: MULTI},
        {name:'Generador de viajes', value: GENERATOR}
    ];

    const items2 = [
        {name:'Económica', value: ECONOMIC},
        {name:'Económica Premium', value: ECONOMICPREMIUM},
        {name:'Negocios', value: BUSSINESS},
        {name:'Primera', value: FIRST},
        {name:'Mixta', value: MIXED}
    ];

    const onChangeTo = (e) => {
        setDestination(e.target.value);
        setViewTravelTo(false);
    };

    const onChangeFrom = (e) => {
        setOrigin(e.target.value);
        setViewTravelFrom(false);
    };

    const emptyTravelFrom =  (
        <div className="m-auto ml-1 cursor-pointer">
            <img src={image} height="20px" width="20px"/>
            <label className="label-custom cursor-pointer">Origen</label>
        </div>
    );

    const emptyTravelTo = (
        <div className="m-auto ml-1 cursor-pointer">
            <img className="to" src={image} height="20px" width="20px"/>
            <label className="label-custom cursor-pointer">Destino</label>
        </div>
    );

    const calendar = (s) => {
        return (
            <div className="m-auto ml-1 cursor-pointer">
                <i className="pi pi-calendar"></i>
                <label className="label-custom cursor-pointer">{s}</label>
            </div>
        );
    };

    const onClick = (e) =>{
        setView(!view);
    };

    const calendarRange = (
        <div className="calendar-custom" onMouseLeave={()=>setViewCalendar(false)}>
            <Calendar inputId='range' readOnlyInput={false} value={dateRange} onChange={(e)=>setDateRange(e.target.value)} selectionMode='range' inline={true} minDate={new Date()}/>
        </div>
    );

    const badge = (to = false) =>{
        return (
        <div className="m-auto ml-1 cursor-pointer">
            <Chip label={to?destination:origin} icon="pi pi-briefcase" removable={true} onRemove={()=>to?setDestination(null):setOrigin(null)}/>
        </div>
        );
    };

    return(
        <div className="toolbar">
            <div className="grid ml-auto mr-auto" style={{maxWidth:'58rem'}}>
                <h1 className="col-12 font-bold text-center h1-none">Busca en cientos de webs de vuelos a la vez.</h1>
                <div className="flied formgrid grid col-12">
                    <div className="ml-auto mr-auto">
                        <Dropdown className="mr-2" value={type} placeholder="Tipo" style={{width:'8rem'}} options={items} optionLabel="name" optionValue="value" onChange={(e)=>setType(e.target.value)}/>
                        <div className="mt-auto mb-auto" style={{display:"inline"}} onMouseEnter={onClick}>
                            <Traveles view={view} onLeave={()=>setView(false)} cantF={setCant}/>
                            <Button className="p-button-icon p-button-text p-0 h-1rem ml-1 mr-1 btn-custom" icon="pi pi-chevron-down" label={`Viajeros (${cant})`}/>
                        </div>
                        <Dropdown className="ml-2" value={classFly} placeholder="Clase" style={{width:'8rem'}} options={items2} optionLabel="name" optionValue="value" onChange={(e)=>setClassFly(e.target.value)}/>
                    </div>
                </div>
                <div className="field formgrid grid col-12 mb-1">
                    <div className="col-12 md:col-3 pl-1 pr-0 mb-1">
                        <Travel value={origin} options={destination?servicePlaces().filter((value)=>value.name !== destination): servicePlaces()} view={viewTravelFrom} onLeave={()=>setViewTravelFrom(false)} onChange={onChangeFrom}/>
                        <div className="bc w-full h-3rem border-round border-1 border-black-alpha-10 flex cursor-pointer" onClick={()=>setViewTravelFrom(true)}>
                            {origin?badge():emptyTravelFrom}
                            <i className="pi pi-plus color-icon m-auto mr-1"></i>
                        </div>
                    </div>

                    <div className="col-1 p-0 ml-1 w-auto div-int">
                        <button className="p-button p-button-icon pr-1 pl-1 h-3rem" onClick={int}>
                            <i className="pi pi-chevron-left"></i>
                            <i className="pi pi-chevron-right"></i>
                        </button>
                    </div>

                    <div className="col-12 md:col-3 pl-1 pr-0 mb-1">
                        <Travel value={destination} view={viewTravelTo} options={origin?servicePlaces().filter((value)=>value.name !== origin): servicePlaces()} onLeave={()=>setViewTravelTo(false)} onChange={onChangeTo}/>
                        <div className="bc w-full h-3rem border-round border-1 border-black-alpha-10 flex cursor-pointer" onClick={()=>setViewTravelTo(true)}>
                            {destination?badge(true):emptyTravelTo}
                            <i className="pi pi-plus color-icon m-auto mr-1"></i>
                        </div>
                    </div>

                    <div className="field flex col-12 md:col-4 pb-0 mb-1 pr-0 pl-1 date-custom" style={{height:'fit-content'}}>
                        {viewCalendar?calendarRange:null}
                        <div className="bc h-3rem col-12 md:col-6 date border-round ml-0 mr-auto border-1 border-black-alpha-10 flex" onClick={()=>setViewCalendar(true)}>
                            {dateRange[0] ?calendar(dateRange[0].toDateString().substring(4)):calendar(new Date().toDateString().substring(4))}
                        </div>
                        <div className="bc h-3rem col-12 md:col-6 date border-round ml-auto mr-0 pr-0 border-1 border-black-alpha-10 flex" onClick={()=>setViewCalendar(true)}>
                            {dateRange[1]?calendar(dateRange[1].toDateString().substring(4)): calendar("Regreso")}
                        </div>
                    </div>
                    <div className="col-12 md:col-1 p-0 md:-pl-1">
                        <Button icon="pi pi-search" className="p-button-icon btn-custom-search w-full h-3rem"/>
                    </div>
                </div>
            </div>
        </div>
    );
};