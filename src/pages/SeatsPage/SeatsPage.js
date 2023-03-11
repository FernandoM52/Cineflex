import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PageContainer, SeatsContainer, FormContainer, CaptionContainer, CaptionCircle, CaptionItem, SeatItem, FooterContainer } from "./styleSeatsPage";

export default function SeatsPage() {
    const [seats, setSeats] = useState([]);
    const [film, setFilm] = useState([]);
    const { idSessao } = useParams();

    useEffect(() => {
        const url = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`;
        const promisse = axios.get(url);
        promisse.then((res) => {
            setSeats(res.data)
            setFilm(res.data.movie)
        });
        promisse.catch(err => console.log(err.response.data));
    }, [idSessao]);

    console.log(seats)

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {seats && seats.seats && seats.seats.map((s) => (
                    <SeatItem
                        key={s.id}
                        data-test="seat"
                    >
                        {s.name}
                    </SeatItem>
                ))}
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle />
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer>
                Nome do Comprador:
                <input placeholder="Digite seu nome..." data-test="client-name" />

                CPF do Comprador:
                <input placeholder="Digite seu CPF..." data-test="client-cpf" />

                <button data-test="book-seat-btn">Reservar Assento(s)</button>
            </FormContainer>

            <FooterContainer >
                <div data-test="footer">
                    <img src={seats.movie && seats.movie.posterURL} alt={film.title} />
                </div>
                <div>
                    <p>{seats.movie && seats.movie.title}</p>
                    <p>{seats.day && seats.day.weekday}  - {seats.name}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    );
};