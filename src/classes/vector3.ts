export class Vector3 {
    constructor(public x:number, public y:number, public z:number) {
    }

    static distance(vectorA:Vector3,vectorB:Vector3){
        return(Math.sqrt(Math.pow(vectorA.x-vectorB.x,2)+Math.pow(vectorA.y-vectorB.y,2)+Math.pow(vectorA.z-vectorB.z,2)))
    }


    static add(vectorA:Vector3,vectorB:Vector3){
        return(new Vector3(
            vectorA.x+vectorB.x,
            vectorA.y+vectorB.y,
            vectorA.z+vectorB.z,
        ));
    }

    static subtract(vectorA:Vector3,vectorB:Vector3){
        return(new Vector3(
            vectorA.x-vectorB.x,
            vectorA.y-vectorB.y,
            vectorA.z-vectorB.z
        ));
    }

}
