import axios from "axios";
import { useEffect, useState } from "react";
import { PageContainer, ListContainer, MovieContainer, Loading } from "./styleHomePage";
import { Link } from "react-router-dom";
import loading from "../../assets/loading.gif";

export default function HomePage() {
    const [listaFilmes, setListaFilmes] = useState(undefined);

    useEffect(() => {
        const url = "https://mock-api.driven.com.br/api/v8/cineflex/movies";
        const promessa = axios.get(url);
        promessa.then(res => { setListaFilmes(res.data) });
        promessa.catch(err => { console.log(err.response.data) });
    }, []);

    if (listaFilmes === undefined) {
        return <Loading src={loading} />
    }

    return (
        <PageContainer>
            Selecione o filme

            <ListContainer>
                {listaFilmes.map((f) => (
                    <Link to={`/sessoes/${f.id}`} key={f.id}>
                        <MovieContainer data-test="movie" >
                            <img src={f.posterURL} alt={f.id} />
                        </MovieContainer>
                    </Link>
                ))}
            </ListContainer >

        </PageContainer >
    );
};