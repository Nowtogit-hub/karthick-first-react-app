import { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useParams, Link} from "react-router-dom";
import "./TodoApp.css"

export default function TodoApp(){
    return (
        <div className="TodoApp">
            
            <BrowserRouter>
                <HeaderComponent/>
                <Routes>
                    <Route path='/' element={<LoginComponent/>}/> 
                    <Route path='/login' element={<LoginComponent/>}/> 
                    <Route path='/welcome/:username' element={<WelcomeComponent/>}/>
                    <Route path='/logout' element={<LogoutComponent/>}/> 
                    <Route path='/todos' element={<ListTodosComponent/>}/> 

                    <Route path='*' element={<ErrorComponent/>}/> 


                    
                </Routes>
                <FooterComponent/>
            </BrowserRouter>
            
        </div>
    );
}

function LoginComponent(){

    const[username, setUsername] = useState();
    const[password, setPassword] = useState();
    
    const[successMessage,setSuccessMessage]=useState(false)
    const[errorMessage,setErrorMessage]=useState(false)

    const navigate = useNavigate();


    function handleSubmit(){

        if(username==='karthick' && password==='no'){
            setSuccessMessage(true)
            setErrorMessage(false)
            console.log("Success")
            navigate(`/welcome/${username}`);

        }else{
            setSuccessMessage(false)
            setErrorMessage(true)
            console.log("not success")
        }
    }
    function SuccessMessage(){
  
        if(successMessage){
           return <div className="successMessage">Authenticated Successfully</div>   
        }
        return null;
    }
    function ErrorMessage(){
      
        if(errorMessage){
           return <div className="errorMessage">Authenticated Failed</div>   
        }
        return null;
    }
    
    
    return(
        <div className="Login">
            <div className="LoginForm">
                <div>
                    <label>User Name</label>
                    <input type="text" 
                        name="username" onChange={(event)=>setUsername(event.target.value)}/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" onChange={(event)=>setPassword(event.target.value)}/>
                </div>
                <div>
                    <button type="button" onClick={handleSubmit}>login</button>
                </div>
                <SuccessMessage></SuccessMessage>
                <ErrorMessage></ErrorMessage>
   
            </div>
        </div>
    );
}
function WelcomeComponent(){

    const {username} = useParams()
    return(
        <div className="Welcome">
            <h1>Welcome {username} </h1>
            <div>
                Manage your todos -<Link to="/todos">Click here</Link>
            </div>
        </div>
    )
} 

function ListTodosComponent(){

    const today = new Date();

    const targetDate = new Date(today.getFullYear()+1, today.getMonth(), today.getDay())

    const todos =[
        {id:1, description:'learn fullstact in first year', isDone:false, targetDate:targetDate},
        {id:2, description:'learn dsa in first year', isDone:false, targetDate:targetDate}


    ]
    return(
        <div className="container">
            <h1>ListTodosComponent</h1>
            <div>
               <table className="table">
                    <thead>
                        <tr key={todos.id}>
                            <td>id</td>
                            <td>description</td>
                            <td>is done?</td>
                            <td>target date</td>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        todos.map(
                            todo=>(
                                <tr>
                                <td>{todo.id}</td>
                                <td>{todo.description}</td>
                                <td>{todo.isDone.toString()}</td>
                                <td>{todo.targetDate.toDateString()}</td>
                            </tr>
    
                            )
                        )
                    }
                    </tbody>
               </table>
            </div>
        </div>

    )
}
function ErrorComponent(){
    return(
        <div className="Error">
           <h1>We are working realy hard!</h1>
           <div>
                Apologies for the 404. Reach out to our team at ABC-DEF-GHIJ 
            </div> 
        </div>
    )
} 


function HeaderComponent(){
    return(
        <header className="border-bottom-light border-5 mb-5 p-2">
            <div className = "container">
                <div className="row">
                    <nav className="navbar navbar-expand-lg">
                       <a className="navbar-brand ms-2 fs-2 fw-bold text-black" href="www.youtube.com">youtube</a>
                       <div className="collapse navbar-collapse">
                            <ul className="navbar-nav">
                                <li className="nav-item"><Link className="nav-link" to="/welcome/:username">home</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/todos">todos</Link></li>
                            </ul>
                        </div>
                        <ul className="navbar-nav">
                            <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/logout">Logout</Link></li>
                        </ul>  
                    </nav>
                </div>
            </div>
        </header>
    );
} 

function FooterComponent(){
    return(
        <footer className="footer">
            <div className="container">
                 Footer 
            </div>
        </footer>
    );
}
function LogoutComponent(){
    return(
        <div className="LogoutComponent">
           <h1>You are logged out!</h1>
           <div>
                Thank you for using out app. Come Back soon
           </div> 
        </div>
    )
} 
