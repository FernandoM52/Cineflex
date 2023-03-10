import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function HomePage() {
    const [listaFilmes, setListaFilmes] = useState([]);

    useEffect(() => {
        const url = "https://mock-api.driven.com.br/api/v8/cineflex/movies";
        const requisiacao = axios.get(url);

        requisiacao.then((res) => { setListaFilmes(res.data) });
        requisiacao.catch((err) => { console.log(err.response.data) });
    }, [])
    console.log(listaFilmes)

    return (
        <PageContainer>
            Selecione o filme

            <ListContainer>
                {listaFilmes.map(f => (

                    <MovieContainer key={f.id} data-test="movie">
                        <img src={f.posterURL} alt={f.id} />
                    </MovieContainer>

                ))}
            </ListContainer>

        </PageContainer >
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-top: 70px;
`
const ListContainer = styled.ul`
    width: 330px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 10px;
`
const MovieContainer = styled.li`
    width: 145px;
    height: 210px;
    box-shadow: 0px 2px 4px 2px #0000001A;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    img {
        width: 130px;
        height: 190px;
    }
`