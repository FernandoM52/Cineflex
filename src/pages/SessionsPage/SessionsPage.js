import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PageContainer, SessionContainer, ButtonsContainer, FooterContainer, Loading } from "./styleSessionsPage";
import loading from "../../assets/loading.gif";

export default function SessionsPage() {
    const [sessions, setSessions] = useState(undefined);
    const { idFilme } = useParams();

    useEffect(() => {
        const url = `https://mock-api.driven.com.br/api/v8/cineflex/movies/${idFilme}/showtimes`;
        const promessa = axios.get(url);
        promessa.then(res => setSessions(res.data));
        promessa.catch(err => console.log(err.response.data));
    }, [idFilme]);

    if (sessions === undefined) {
        return <Loading src={loading} />
    };

    return (
        <PageContainer>
            Selecione o horário

            <div>
                {sessions.days.map((s) => (
                    <SessionContainer data-test="movie-day" key={s.id}>
                        {s.weekday} - {s.date}

                        <ButtonsContainer>
                            {s.showtimes.map((h) => (
                                <Link to={`/assentos/${h.id}`} key={h.id}>
                                    <button data-test="showtime">
                                        {h.name}
                                    </button>
                                </Link>
                            ))}
                        </ButtonsContainer>

                    </SessionContainer>
                ))}
            </div>

            <FooterContainer data-test="footer">
                <div>
                    <img src={sessions.posterURL} alt={sessions.title} />
                </div>
                <div>
                    <p>{sessions.title}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    );
};