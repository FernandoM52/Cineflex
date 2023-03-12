import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PageContainer, SeatsContainer, FormContainer, CaptionContainer, CaptionCircle, CaptionItem, SeatItem, FooterContainer, Loading } from "./styleSeatsPage";
import loading from "../../assets/loading.gif";

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
        return <Loading src={loading} />
    }

    function selectSeatClick(seat) {
        const isSelected = selectedSeats.includes(seat.id);

        if (seat.isAvailable === false) {
            alert("Esse assento não está disponível.");
        }
        if (!isSelected && seat.isAvailable === true) {
            setSelectedSeats([...selectedSeats, seat.id]);
        } else {
            setSelectedSeats(selectedSeats.filter(id => id !== seat.id));
        }
    }

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
                        available={s.isAvailable}
                    >
                        {s.name}
                    </SeatItem>
                ))}
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle borderColor="#0E7D71" backgroundColor="#1AAE9E" />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle borderColor="#7B8B99" backgroundColor="#C3CFD9" />
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle borderColor="#F7C52B" backgroundColor="#FBE192" />
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