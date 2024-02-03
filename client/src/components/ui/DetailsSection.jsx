import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Header = styled.h2`
  font-size: 18px;
  text-transform: uppercase;
  font-weight: 900;
  margin-bottom: 10px;
`;

const Details = styled.div`
  padding: 15px 25px;
  display: flex;
  flex-direction: column;
  border: 1px solid #e6e6e6;
`;

const Row = styled.div`
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
    font-weight: ${({ $boldLastRow }) => $boldLastRow && "bold"};
  }

  &:nth-last-child(2) {
    border-bottom: ${({ $buttons }) => $buttons && "none"};
    font-weight: ${({ $buttons, $boldLastRow }) =>
      $buttons && $boldLastRow && "bold"};
  }
`;

const Field = styled.span`
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
  color: gray;
`;

const ValueContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
`;

const Value = styled.span`
  &::first-letter {
    text-transform: capitalize;
  }
`;

const ButtonContainer = styled.div`
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: right;
  gap: 8px;
`;

const Button = styled.button`
  padding: 10px;
  border: 2px solid;
  border-color: black;
  background-color: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  cursor: pointer;
  transition: all 300ms ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const DetailsSection = ({
  header = null,
  details = null,
  buttons = null,
  boldLastRow = false,
}) => {
  return (
    <Container>
      {header && <Header>{header}</Header>}
      <Details>
        {details.map(({ field, value }) => (
          <Row key={field} $buttons={buttons} $boldLastRow={boldLastRow}>
            <Field>{field}</Field>
            {typeof value === "object" ? (
              <ValueContainer>
                {Object.entries(value).map(([key, val]) => (
                  <Value key={key}>{val}</Value>
                ))}
              </ValueContainer>
            ) : (
              <Value>{value}</Value>
            )}
          </Row>
        ))}
        {buttons && (
          <ButtonContainer>
            {buttons.map(({ text, link, bgColor, textColor }) => (
              <Link to={link} key={text}>
                <Button type="button" $bg={bgColor} $color={textColor}>
                  {text}
                </Button>
              </Link>
            ))}
          </ButtonContainer>
        )}
      </Details>
    </Container>
  );
};

export default DetailsSection;
