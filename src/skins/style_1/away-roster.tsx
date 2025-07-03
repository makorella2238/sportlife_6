"use client";

import styled, { keyframes } from "styled-components";
import { useMatch } from "@/hooks";
export const AwayRoster = ({ show }: { show: boolean }) => {
  const match = useMatch();
  const players = match?.results_2?.slice(0, 10) || [];
  const teamName = match?.team_2?.name || "";

  return (
    <Container style={{ display: show ? "flex" : "none" }}>
      <Wrapper>
        <Header>
          <TourText>СОСТАВ {teamName}</TourText>
        </Header>
        <Row>
          <GridWrapper>
            {players.map((player, i) => (
              <PlayerBlock key={i}>
                <LeftImage src="/pers.png" />
                <NameBlock>
                  {player.player_fio.split(" ").map((word, idx) => (
                    <span key={idx}>
                      {word}
                      <br />
                    </span>
                  ))}
                </NameBlock>
                <NumberBlock>{player.player_number}</NumberBlock>
              </PlayerBlock>
            ))}
          </GridWrapper>
        </Row>

        <Trener>
          <TernBlock>
            <TrRole>главный тренер</TrRole>
            <CoachPlayerBlockWrapper>
              <CoachLeftImage src="/pers.png" />
              <CoachPlayerBlock>
                <CoachNameBlock>
                  {match?.team_1?.coaches[0].fio
                    .split(" ")
                    .map((word, idx, arr) => (
                      <div key={idx}>
                        {word}
                        {idx !== arr.length - 1 && <br />}
                      </div>
                    ))}
                </CoachNameBlock>
              </CoachPlayerBlock>
            </CoachPlayerBlockWrapper>
          </TernBlock>
          <TernBlock>
            <TrRole>представитель</TrRole>
            <CoachPlayerBlockWrapper>
              <CoachLeftImage src="/pers.png" />
              <CoachPlayerBlock>
                <CoachNameBlock>
                  {match?.team_1?.representativs[0].fio
                    .split(" ")
                    .map((word, idx, arr) => (
                      <div key={idx}>
                        {word}
                        {idx !== arr.length - 1 && <br />}
                      </div>
                    ))}
                </CoachNameBlock>
              </CoachPlayerBlock>
            </CoachPlayerBlockWrapper>
          </TernBlock>
        </Trener>
      </Wrapper>
    </Container>
  );
};

const slideDown = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const Container = styled.div`
  color: #fff; /* вместо text-color */
  width: 1720px;
  height: 820px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const animatedGradient = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 0.93;
  }
  50% {
    transform: scale(1.05);
    opacity: 1;
  }
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("/bgsost.png") no-repeat center center / cover;
  background-size: 200% 200%;
  animation: ${animatedGradient} 5s linear infinite;
  z-index: 4; /* Убедись, что ниже, чем всё остальное */
`;

const Header = styled.div`
  margin: 70px 0 80px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const TourText = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 56px;
  font-weight: 400;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 3px;
  text-shadow: 0 0 8px rgba(0, 0, 0, 0.7);
`;

const Wrapper = styled.div`
  position: relative;
  background: linear-gradient(-45deg, #0e173f, #001b94, #0e173f);
  background-size: 400% 400%;
  width: 1642px;
  height: 933px;
  overflow: hidden;
  animation: ${slideDown} 0.5s ease forwards;
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  gap: 45px 40px;
  z-index: 133;
`;

const PlayerBlock = styled.div`
  position: relative;
  width: 288px;
  height: 61px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LeftImage = styled.img`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 66px;
  height: 84px;
  object-fit: contain;
  z-index: 2;
`;
const NameBlock = styled.div`
  font-size: 20px;
  font-weight: 400;
  color: #000;
  line-height: 1.1;
  text-align: center; /* по центру текст */
  z-index: 3;
  color: #001134;
  white-space: pre-line;
  pointer-events: none;
  width: 100%;
  /* Если нужно центрировать сам блок, можно сделать flex в родителе */
`;

const NumberBlock = styled.div`
  position: absolute;
  top: -2px;
  right: -25px;
  width: 91px;
  height: 63px;
  background: #794bff;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  clip-path: polygon(33% 0%, 100% 0%, 73% 100%, 0% 100%);
  z-index: 3;
`;

const Row = styled.div`
  margin-top: 29px;
  display: flex;
  justify-content: center;
  width: 100%;
  z-index: 133;
`;

const Trener = styled.div`
  position: absolute;
  left: 230px;
  top: auto; /* если нужно */
  margin: 60px 0 32px 0;
  display: flex;
  gap: 54px;
  justify-content: flex-start;
  z-index: 9999;
  width: auto; /* по содержимому */
`;

const TrRole = styled.div`
  text-align: left;
  padding-left: 20px;
  position: absolute;
  top: -40px;
  left: -45px;
  width: 258px;
  height: 61px;
  padding-top: 10px;
  font-size: 16px;
  color: #ccc;
  font-weight: 400;
  margin-bottom: 6px;
  white-space: pre-line;

  text-transform: uppercase;
  background: #1c0a4f;
  text-align: center;

  clip-path: polygon(0% 0%, 100% 0%, 85% 100%, 15% 100%);
`;

const CoachPlayerBlockWrapper = styled.div`
  position: relative;
  width: 288px;
  height: 61px;
  display: flex;
  align-items: center;
`;

const CoachPlayerBlock = styled.div`
  flex-grow: 1;
  height: 61px;
  background: linear-gradient(90deg, #ffffff, #d6e4f7);
  display: flex;
  align-items: center;
  justify-content: center;

  clip-path: polygon(0% 0%, 100% 0%, 85% 100%, 15% 100%);

  overflow: visible; /* Чтобы содержимое не обрезалось */
`;

const CoachLeftImage = styled.img`
  margin-bottom: 17px;
  margin-left: -45px;
  position: relative; /* Убираем absolute */
  width: 66px;
  height: 84px;
  object-fit: contain;
  margin-right: -45px; /* Чуть сдвигаем влево, чтобы выглядело прибитым */
  z-index: 2;
`;

const TernBlock = styled.div`
  position: relative;
`;

const CoachNameBlock = styled.div`
  text-aign: left;
  font-size: 20px;
  font-weight: 700;
  color: #000;
  line-height: 1.1;
  text-align: center;
  z-index: 3;
  white-space: nowrap;
  pointer-events: none;
  padding-left: 0;
  width: 100%;
`;
