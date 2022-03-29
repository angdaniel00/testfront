import React, { useState } from "react";
import { InputNumber } from "primereact/inputnumber";

export const Traveles = ({view, onLeave, cantF}) => {

    const [adults, setAdults] = useState(1);
    const [dAdults, setDAdults] = useState(false);

    const [students, setStudents] = useState(0);
    const [dStudents, setDStudents] = useState(false);

    const [youngs, setYoungs] = useState(0);
    const [dYoungs, setDYoungs] = useState(false);

    const [childs, setChilds] = useState(0);
    const [dChilds, setDChilds] = useState(false);

    const [babyAsient, setBabyAsient] = useState(0);
    const [dBabyAsient, setDBabyAsient] = useState(false);

    const [baby, setBaby] = useState(0);
    const [dBaby, setDBaby] = useState(false);

    const validCant = (inc) =>{
        if (cant() + 1 > 16 && inc){
            disable();
            return false;
        }
        if(adults + students < 9) {
            enableAdults();
        }
        if(youngs + childs + babyAsient + baby < 7){
            enableChilds()
        }
        return true;
    };

    const disable = () => {
        disableAdults();
        disableChilds();
    };

    const enableChilds = () =>{
        setDYoungs(false);
        setDChilds(false);
        setDBabyAsient(false);
        setDBaby(false);
    };

    const disableChilds = () => {
        setDYoungs(youngs === 0);
        setDChilds(childs === 0);
        setDBabyAsient(babyAsient === 0);
        setDBaby(baby === 0);
    };

    const disableAdults = () =>{
        setDAdults(adults === 0);
        setDStudents(students === 0);
    };

    const enableAdults = () => {
        setDAdults(false);
        setDStudents(false);
    };

    const validAdults = (inc) => {
        if ((adults + students + 1) > 9 && inc){
            disableAdults();
            return false;
        }
        enableAdults();
        return true;
    };

    const validChilds = (inc) => {
        if ((baby+babyAsient+childs+youngs+1) > 7 && inc){
            disableChilds();
            return false;
        }
        enableChilds();
        return true;
    };

    const finish = () => {
        if(cant()+1 === 16) {
            disable();
        }
    };

    const cant = () => (adults + students + youngs + childs + babyAsient + baby);

    const changeAdults = (e) => {
        const {name, value} = e.target;
        let inc = true;
        if((name === 'adults' && value < adults) || (name === 'students' && value < students)){
            inc = false;
        }
        if (validCant(inc) && validAdults(inc)) {
            if(name === 'adults'){
                setAdults(value);
            }
            else{
                setStudents(value);
            }
            if (inc && adults+students+1 === 9){
                disableAdults();
            }
            finish();
            const c = cant();
            cantF(inc?c+1:c-1);
        }
    };

    const changeChilds = (e) => {
      const {name, value} = e.target;
        let inc = true;
        if((name === 'youngs' && value < youngs) || (name === 'childs' && value < childs) || (name === 'babyAsient' && value < babyAsient) || (name === 'baby' && value < baby)){
            inc = false;
        }
        if (validCant(inc) && validChilds(inc)) {
            if(name === 'youngs'){
                setYoungs(value);
            }
            else if (name === 'childs'){
                setChilds(value);
            }
            else if (name === 'babyAsient'){
                setBabyAsient(value);
            }
            else{
                setBaby(value);
            }
            if (inc && baby+babyAsient+childs+youngs+1 === 7){
                disableChilds();
            }
            finish();
            const c = cant();
            cantF(inc?c+1:c-1);
        }
    };

    return (
        view?
        <div className="traveles shadow-2"  onMouseLeave={()=>onLeave()}>
            <div className="formgrid grid">
                <div className="flied grid">
                    <div className="field block">
                        <div className="col-4 inline">
                            <label>Adultos</label>
                        </div>
                        <div className="col-2 inline">
                            <InputNumber disabled={dAdults} value={adults} min={0}  max={9-students} name="adults" autoFocus={true} step={1} showButtons={true} onValueChange={changeAdults}/>
                        </div>
                    </div>
                    <div className="field block">
                        <div className="col-4">
                            <label>Estudiantes</label>
                        </div>
                        <div className="col-2">
                            <InputNumber disabled={dStudents} className="w-auto" value={students} name="students" min={0} max={9-adults} step={1} showButtons={true} onValueChange={changeAdults}/>
                        </div>
                    </div>
                    <div className="field block">
                        <div className="col-4 inline">
                            <label>J&oacute;venes</label>
                        </div>
                        <div className="col-2 inline">
                            <InputNumber disabled={dYoungs} value={youngs} min={0} max={7-childs-baby-babyAsient} name="youngs" step={1} showButtons={true} onValueChange={changeChilds}/>
                        </div>
                    </div>
                    <div className="field block">
                        <div className="col-4 inline">
                            <label>Ni&ntilde;os</label>
                        </div>
                        <div className="col-2 inline">
                            <InputNumber disabled={dChilds} value={childs} min={0} max={7-youngs-baby-babyAsient} step={1} name="childs" showButtons={true} onValueChange={changeChilds}/>
                        </div>
                    </div>
                    <div className="field block">
                        <div className="col-4 inline">
                            <label>Beb&eacute;s en asiento</label>
                        </div>
                        <div className="col-2 inline">
                            <InputNumber disabled={dBabyAsient} value={babyAsient} min={0} max={7-youngs-childs-baby} step={1} name="babyAsient" showButtons={true} onValueChange={changeChilds}/>
                        </div>
                    </div>
                    <div className="field block">
                        <div className="col-4 inline">
                            <label>Beb&eacute;s en regazo</label>
                        </div>
                        <div className="col-2 inline">
                            <InputNumber disabled={dBaby} value={baby} min={0} max={7-youngs-childs-babyAsient>=1?1:0} step={1} name="baby" showButtons={true} onValueChange={changeChilds}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>:null
    );
};