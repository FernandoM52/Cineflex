import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PageContainer, SeatsContainer, FormContainer, CaptionContainer, CaptionCircle, CaptionItem, SeatItem, FooterContainer, Loading } from "./styleSeatsPage";
import loading from "../../assets/loading.gif";

export default function SeatsPage() {
    const [seats, setSeats] = useState(undefined);
    const [ids, setIds] = useState([]);
    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const [formValid, setFormValid] = useState(false);
    const { idSessao } = useParams();

    useEffect(() => {
        const url = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`;
        const promisse = axios.get(url);
        promisse.then(res => setSeats(res.data));
        promisse.catch(err => console.log(err.response.data));
    }, [idSessao]);

    if (seats === undefined) {
        return <Loading src={loading} />
    };

    function selectSeatClick(seat) {
        const isSelected = ids.includes(seat.id);

        if (seat.isAvailable === false) {
            alert("Esse assento não está disponível.");
        }
        if (!isSelected && seat.isAvailable === true) {
            setIds([...ids, seat.id]);
        } else {
            setIds(ids.filter(id => id !== seat.id));
        }
    };

    function validateCpf(e) {
        const cpfValue = e.target.value.replace(/[^\d]/g, "");

        if (cpfValue.length !== 11) {
            setFormValid(false);
        } else {
            setFormValid(!!name && !!cpfValue);
        }

        setCpf(cpfValue);
    };

    function reserveSeats(e) {
        e.preventDefault();
        const urlPost = "https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many";
        const postObject = { ids, name, cpf };

        if (formValid && ids.length > 0) {
            const promisse = axios.post(urlPost, postObject);
            promisse.then(res => alert("Assentos foram reservados"))
            promisse.catch(err => console.log(err.response.data));
        } else {
            alert("Verifique se os campos estão preenchidos corretamente e se foi selecionado um assento dispnível.");
        }
    };

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {seats.seats.map((s) => (
                    <SeatItem
                        key={s.id}
                        data-test="seat"
                        onClick={() => selectSeatClick(s)}
                        selected={ids.includes(s.id)}
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

            <FormContainer onSubmit={reserveSeats}>
                <label htmlFor="name">Nome do Comprador:</label>
                <input
                    data-test="client-name"
                    id="name"
                    placeholder="Digite seu nome..."
                    type="text"
                    required
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                        setFormValid(!!cpf && !!e.target.value);
                    }}
                />

                <label htmlFor="cpf">CPF do Comprador:</label>
                <input
                    data-test="client-cpf"
                    id="cpf"
                    placeholder="Digite seu CPF..."
                    type="text"
                    required
                    value={cpf}
                    onChange={validateCpf}
                />

                <button type="submit" data-test="book-seat-btn">Reservar Assento(s)</button>
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