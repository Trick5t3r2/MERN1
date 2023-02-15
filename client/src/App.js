import React from "react";
import { Container} from '@mui/material';

import { GoogleOAuthProvider } from "@react-oauth/google";
import Navbar from "./components/Navbar/Navbar";
import { Route,Routes,BrowserRouter } from "react-router-dom";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";


const App = () => (
    <BrowserRouter>
        <Container maxWidth='xlg'>
            <Navbar />
            <Routes>
               <Route path="/" exact element={<Home />} /> 
               <Route path="/auth" exact element={<Auth />} />
            </Routes>
        </Container>
    </BrowserRouter>    
);

export default App;