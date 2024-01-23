import { ACTIONS } from "./App"
function Character(props){
    let {character,dispatch} = props
    return (
        <button onClick={()=>{
            dispatch({type:ACTIONS.CHOOSE_OPERATOR,payload:{character}})
        }}>{character}</button>
    )
}
export default Character