import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { PageContainer, SessionContainer, ButtonsContainer, FooterContainer } from "./styleSessionsPage";

export default function SessionsPage({ sessions, setSessions }) {
    const { idFilme } = useParams();

    useEffect(() => {
        const url = `https://mock-api.driven.com.br/api/v8/cineflex/movies/${idFilme}/showtimes`;
        const promessa = axios.get(url);
        promessa.then(res => setSessions(res.data));
        promessa.catch(err => console.log(err.response.data));
    }, []);

    return (
        <PageContainer>
            Selecione o horário

            <div>
                {sessions && sessions.days && sessions.days.map((s) => (
                    <SessionContainer data-test="movie-day" key={s.id}>
                        {s.weekday} - {s.date}
                        <ButtonsContainer>
                            {s.showtimes.map((h) => (
                                <button data-test="showtime" key={h.id}>
                                    {h.name}
                                </button>
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