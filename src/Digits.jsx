import {ACTIONS} from "./App"

function Digits(props){
        let  {digit,dispatch} = props
        
    return (
        <button onClick={() =>{
            dispatch({type:ACTIONS.ADD_DIGIT,payload:{digit}})
        }}>{digit}</button>
    )
}
export default Digits