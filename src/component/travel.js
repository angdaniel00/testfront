import React from "react";
import { ListBox } from "primereact/listbox";

export const Travel = ({value, view, options, onChange, onLeave}) => {
    return (
        view?
        <div className="calendar-custom" onMouseLeave={onLeave}>
            <ListBox value={value} options={options} optionLabel="name" onChange={onChange} optionValue="name" filter={true} filterBy="name"/>
        </div>:null
    )
};