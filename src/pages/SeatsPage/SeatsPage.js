import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PageContainer, SeatsContainer, FormContainer, CaptionContainer, CaptionCircle, CaptionItem, SeatItem, FooterContainer } from "./styleSeatsPage";

export default function SeatsPage() {
    const [seats, setSeats] = useState(undefined);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const { idSessao } = useParams();

    useEffect(() => {
        const url = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`;
        const promisse = axios.get(url);
        promisse.then(res => setSeats(res.data));
        promisse.catch(err => console.log(err.response.data));
    }, [idSessao]);


    if (seats === undefined) {
        return <div>Carregando...</div>
    }

    function selectSeatClick(seat) {
        const isSelected = selectedSeats.includes(seat.id);

        if (seat.isAvailable === false) {
            alert("Este assento está indisponível");
        }
        if (!isSelected && seat.isAvailable === true) {
            setSelectedSeats([...selectedSeats, seat.id]);
        } else {
            setSelectedSeats(selectedSeats.filter(id => id !== seat.id));
        }
    }

    console.log(selectedSeats)

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {seats.seats.map((s) => (
                    <SeatItem
                        key={s.id}
                        data-test="seat"
                        onClick={() => selectSeatClick(s)}
                        selected={selectedSeats.includes(s.id)}
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

            <FooterContainer data-test="footer">
                <div>
                    <img src={seats.movie.posterURL} alt={seats.movie.title} />
                </div>
                <div>
                    <p>{seats.movie.title}</p>
                    <p>{seats.day.weekday}  - {seats.name}</p>
                </div>
            </FooterContainer>

        </PageContainer >
    );
};