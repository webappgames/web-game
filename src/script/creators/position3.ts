import * as Immutable from "immutable";

export default function createPosition3(x:number,y:number,z:number):Immutable.Map{
   return(Immutable.Map({x,y,z}))
}