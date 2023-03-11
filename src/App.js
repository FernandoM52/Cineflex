import styled from "styled-components";
import HomePage from "./pages/HomePage/HomePage";
import SeatsPage from "./pages/SeatsPage/SeatsPage";
import SessionsPage from "./pages/SessionsPage/SessionsPage";
import SuccessPage from "./pages/SuccessPage/SuccessPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

export default function App() {
    const [sessions, setSessions] = useState([]);
    return (
        <>
            <NavContainer>CINEFLEX</NavContainer>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/sessoes/37/:idFilme" element={<SessionsPage sessions={sessions} setSessions={setSessions} />} />
                    <Route path="/assentos/240:idSessao" element={<SeatsPage />} />
                    <Route path="/sucesso" element={<SuccessPage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
};

const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    position: fixed;
    top: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
`;
