import styled from "styled-components";
import { FaMoneyBillTransfer } from "react-icons/fa6";

const Container = styled.div`
    width: 80%;
    height: 100%;
    border-radius: 0 0.5rem 0.5rem 0;
    display: flex;
    justify-content: center;
    align-items: center;

    .img {
        font-size: 16rem;
        color: ${({theme}) => theme.colors.surface};
    }

`

const Initial = () => {
    return (
        <Container>
            <FaMoneyBillTransfer className="img"/>
        </Container>
    )
}

export default Initial;