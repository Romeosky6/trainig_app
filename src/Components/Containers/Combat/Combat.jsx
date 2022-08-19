import { useState } from "react";
import randomNumberInRange from "../../../lib/index";
import Button from '../../UI/Button/Button';

function Combat() {

//F° RANDOM INTEGER
// function randomNumberInRange(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
//   }

//SQUALL
    const squallName = "Squall";
    const squallStrenght = 10;
    const [squallHp, setSquallHp] = useState(500);
    const [squallMp, setSquallMp] = useState(75);
    const [squallArmor, setSquallArmor] = useState(0);
    const [squallDmg, setSquallDmg] = useState(0);
    

// BAHAMUT
    const bahamutName = "Bahamut";
    const bahamutStrenght = 15;
    const [bahamutHp, setBahamutHp] = useState(500);
    const [bahamutMp, setBahamutMp] = useState(75);
    const [bahamutArmor, setBahamutArmor] = useState(0);
    const [bahamutDmg, setBahamutDmg] = useState(0);

    //F° Attack
    const attack = (opponent) => {
        console.log("ATTACK opponent is -->", opponent);
        let random = randomNumberInRange(1,50);
        // SQUALL ATTACK
        if (opponent === bahamutName)  {
            //let random = randomNumberInRange(1,50);
                // if 
            let dmg = squallStrenght + random;
            setSquallDmg(dmg);
            let hpResolve = dmg - bahamutArmor;
            console.log("baha hpResolve", hpResolve);
            setBahamutHp((previous) => previous - hpResolve);
            counter();
            combatLog("attack", opponent);
            setSquallDmg(0);
            ///console.log("Reset Sq to 0 ->", squallDmg);

            } else { //BAHAMUT ATTACK
                let dmg = bahamutStrenght + random;
                setBahamutDmg((previous) => dmg);
                let hpResolve = dmg - squallArmor;
                console.log("sq hpResolve", hpResolve);
                setSquallHp((previous) => previous - hpResolve);
                combatLog("attack", opponent);
                setBahamutDmg(0);
               // console.log("Reset to 0 ->", bahamutDmg);
            }
    }

    // //F° Defend
    const defend = (defender) => {

        let random = randomNumberInRange(1,10);

        

            if (defender === squallName) {
                if(squallArmor < 50){
                    setSquallArmor((previous) => previous + random);
                    counter();
                } else {
                    // AFFICHER ARMURE MAX ATTEINTE JOUEZ AUTRE CHOSE
                }
            //LOG
         } else { //Bahamut Defend
                    setBahamutArmor((previous) => previous + random);
                }
         
    }
    

    // //F° Spell
    const spell = (opponent) => {

    //     // SQUALL CAST SPELL
        if (opponent === bahamutName && squallMp > 0)  {
            let random = randomNumberInRange(1, squallMp);
            setSquallMp((previous) => previous - random);
            setSquallDmg((previous) => random)
            setBahamutHp((previous) => previous - random);
            counter();
            //log displayCombatLog(type, attacker, defender, dmg)
            setSquallDmg(0);
        }
        if (opponent === bahamutName && squallMp <= 0) {
            //LOG PLUS DE MAGIE JOUEZ AUTRE CHOSE
        
        } else {  // BAHA CAST SPELL || Baha.Mp already verified by counter()
             let random = randomNumberInRange(1, bahamutMp);
             //console.log("opponents is", opponent);
             setBahamutMp((previous) => previous - random);
             setBahamutDmg((previous) => random);
             setSquallHp((previous) => previous - random);
             //LOG
             setBahamutDmg(0);
         }

    }

    const counter = () => {
         let random = randomNumberInRange(1,3);
         if(random === 1) {
             attack(squallName);
            
         }
         if(random === 2){
            if (bahamutArmor < 50) {
                defend(bahamutName);
            } else {
                counter();
            }
             
            
         }
         if(random === 3){
             if(bahamutMp > 0){
                 spell(squallName);
             } else {
                 counter();
             }
        }
    }
    const combatLog = (type, opponent) => {
        const log = document.getElementById("combat-log");
        if (type === "attack") {
            if(opponent === bahamutName) {
                const log = document.getElementById("combat-log")
                log.innerHTML = `<p>${squallName} attaque ${opponent}</p> <p>${opponent} a désormais ${bahamutHp}</p>`
            } else {
                log.innerHTML = `<p>${bahamutName} attaque ${opponent}</p> <p>${opponent} a désormais ${squallHp}</p>`
            }
            
        
    }
    }

    //const combatLog = () => {

    //}


  return (
    <>
    <section>
        <Button onClickHandler={() => attack(bahamutName)}>ATTACK</Button>
        <Button onClickHandler={() => defend(squallName)}>DEFEND</Button>
        <Button onClickHandler={() => spell(bahamutName)}>CAST SPELL</Button>
        {/* <Button onClickHandler={() => defend({squallName})}>DEFEND</Button>
        <Button onClickHandler={() => spell({bahamutName})}>CAST SPELL</Button> */}
        <aside id="squall-stats">
            <h3>{squallName} stats</h3>
            <p>{squallName}</p>
            <p>{squallName} attack strenght : {squallStrenght}</p>
            <p>{squallName} armor : {squallArmor}</p>
            <p>{squallName} health point : {squallHp}</p>
            <p>{squallName} mana point : {squallMp}</p>
        </aside>
        <aside id="bahamut-stats">
            <h3>{bahamutName} stats</h3>
            <p>{bahamutName}</p>
            <p>{bahamutName} attack strenght : {bahamutStrenght}</p>
            <p>{bahamutName} armor : {bahamutArmor}</p>
            <p>{bahamutName} health point : {bahamutHp}</p>
            <p>{bahamutName} mana point : {bahamutMp}</p>
        </aside>
    </section>
    <section id="combat-log">
        <h3>Combat log</h3>

    </section>      
    </>
  )}

export default Combat