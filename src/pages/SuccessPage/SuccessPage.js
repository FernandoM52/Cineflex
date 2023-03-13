import { PageContainer, TextContainer, Loading } from "./styleSuccessPage";
import { Link, useLocation } from "react-router-dom";

export default function SuccessPage() {
    const location = useLocation();
    const { seats, selectedSeats, name, cpf } = location.state;

    function formatCPF(cpf) {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }

    return (
        <PageContainer>
            <h1>Pedido feito <br /> com sucesso!</h1>

            <TextContainer>
                <strong><p>Filme e sessão</p></strong>
                <p>{seats.movie.title}</p>
                <p>{seats.day.date} - {seats.name}</p>
            </TextContainer>

            <TextContainer>
                <strong><p>Ingressos</p></strong>

                {selectedSeats.map((s) => (
                    <p key={s}>Assento {s}</p>
                ))}

            </TextContainer>

            <TextContainer>
                <strong><p>Comprador</p></strong>
                <p>Nome: {name}</p>
                <p>CPF: {formatCPF(cpf)}</p>
            </TextContainer>

            <Link to={"/"}>
                <button data-test="go-home-btn">Voltar para Home</button>
            </Link>
        </PageContainer>
    );
};