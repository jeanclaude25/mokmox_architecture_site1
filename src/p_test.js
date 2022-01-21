import { scene } from "./c_scene";
import { makeTriangle } from "./l_geometry";

export const test = () => {
    const new_tri = makeTriangle()
    console.log(new_tri)
    scene.add(new_tri)

}
