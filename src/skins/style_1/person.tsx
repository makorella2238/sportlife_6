import { useMatch } from "@/hooks";
import styled, { keyframes } from "styled-components";

export const Person = ({ kind, show }: { kind: string; show: boolean }) => {
  const match = useMatch();
  return (
    <Wrapper style={{ display: show ? "flex" : "none" }}>
      <TeamBoxWrapper>
        {kind == "goal" && <PersImage src="/personCard.png" alt="Player" />}

        {kind == "goal" && <Goal>ГОЛ!</Goal>}
        {kind == "yellow" && <YellowBarLeft />}
        {(kind == "red" || kind == "goal") && <RedBarLeft />}
        <TeamBox side="left">
          <Col>
            <Row>
              <TeamName side="left">Иванов Олег 37’</TeamName>
            </Row>
            <TeamNameLit side="right">экспресс офис</TeamNameLit>
          </Col>
        </TeamBox>
        <TeamLogo side="right" src={match?.team_1?.img} />
      </TeamBoxWrapper>
    </Wrapper>
  );
};

const slideInFromRight = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const Row = styled.div`
  display: flex;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative; // позволяет позиционировать внутри
  z-index: 9999;
`;

const TeamBoxWrapper = styled.div`
  position: absolute;
  bottom: 120px; // блок поднимается от низа
  left: 50%;
  transform: translateX(-50%);
  width: 475px;
  display: flex;
  align-items: flex-start;
  animation: ${slideInFromRight} 0.6s ease-out forwards;
  z-index: 10;
  background: transparent; // на всякий случай
`;

const YellowBarLeft = styled.div`
  position: absolute;
  top: 0;
  left: 0px;
  width: 22px;
  border-radius: 12px 0 0 12px;
  height: 100%;
  background: #ffc70f;

  z-index: 3;
`;

const RedBarLeft = styled.div`
  position: absolute;
  width: 22px;
  border-radius: 12px 0 0 12px;
  height: 100%;
  background: rgba(255, 15, 15, 1);

  z-index: 3;
`;

const Goal = styled.div`
  position: absolute;
  top: -50px;
  right: 110px;
  border-radius: 80px 80px 0 0;
  width: 212px;
  height: 50px;
  background: linear-gradient(90deg, #f2071a 0%, #181818 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Furore", sans-serif;
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  z-index: 4;
  overflow: hidden;
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 2px;
    width: 100%;
    background: linear-gradient(90deg, #0B7AC4 0%, #FFFFFF 100%);
    border-top-left-radius: 80px;
    border-top-right-radius: 80px;
    z-index: 5;
  }
`;


const PersImage = styled.img`
  position: absolute;
  top: -130px;
  right: 10px;
  width: 120px;
  height: 130px;
  object-fit: cover;
  z-index: 2;
`;

const TeamLogo = styled.img<{ side: "left" | "right" }>`
  position: absolute;
  top: -34px;
  right: -90px;
  height: 186px;
  width: 186px;
  object-fit: contain;
  margin-left: 20px;
  z-index: 3;
  align-self: center;
`;

const TeamBox = styled.div<{ side: "left" | "right" }>`
  background: linear-gradient(90deg, #1e3c94 0%, #0098dc 100%);
  position: relative;
  display: flex;
  height: 120px;
  align-items: center;
  overflow: hidden;
  justify-content: flex-end;
  padding-left: 100px;
  border-radius: 12px 0 0 12px;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 2;
  margin-right: 100px;
  align-items: flex-end;
`;

const TeamName = styled.div<{ side: "left" | "right" }>`
  height: 40px;
  display: flex;
  align-items: center;
  font-family: "Furore", sans-serif;
  font-size: 35px;
  font-weight: 600;
  text-transform: uppercase;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  z-index: 1;
`;

const TeamNameLit = styled.div<{ side: "left" | "right" }>`
  height: 40px;
  display: flex;
  align-items: center;
  font-weight: 600;
  font-family: "Furore", sans-serif;
  font-size: 28px;
  text-transform: uppercase;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  z-index: 1;
  ${({ side }) =>
    side === "left"
      ? `
        padding-left: 40px;
        justify-content: flex-end;
      `
      : `
        padding-right: 15px;
        justify-content: flex-end;
      `}
`;
