"use client";

import styled, { keyframes } from "styled-components";
import { useMatch } from "@/hooks";
export const HomeRoster = ({ show }: { show: boolean }) => {
  const match = useMatch();
  const players = match?.results_1 || [];
  const teamName = match?.team_1?.name || "";

  return (
    <Container style={{ display: show ? "flex" : "none" }}>
      <Wrapper>
        <BackgroundImage />
        <Mach1 src="/sostimg.png" />
        <Mach2Blur src="/sostimgblur.png" />
        <Header>
          <TitleContainer>
            <TitleLine>{teamName}</TitleLine>
            <TeamLogo src={match?.team_1?.img} alt="Team Logo" />
          </TitleContainer>
          <TeamsContainer>
            <TourText>СОСТАВ</TourText>
          </TeamsContainer>
        </Header>
        <Trener>
          <TrItem>
            <TrName>{match?.team_1?.coaches[0].fio}</TrName>
            <TrTitle>ТРЕНЕР</TrTitle>
          </TrItem>
          <TrItem>
            <TrName>{match?.team_1?.representativs[0].fio}</TrName>
            <TrTitle>представитель</TrTitle>
          </TrItem>
        </Trener>

        <Row>
          <GridWrapper>
            {players.map((player, i) => (
              <PlayerBlock key={i}>
                <LeftImage src="/pers.png" />
                <RightInfo>
                  <NameBlock>{player.player_fio}</NameBlock>
                </RightInfo>
                <NumberBlock>{player.player_number}’</NumberBlock>
              </PlayerBlock>
            ))}
          </GridWrapper>
        </Row>
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
  text-color: #fff;
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
const gradientPulse = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("/bgsost.png") no-repeat center center / cover;
  z-index: 0; /* Убедись, что ниже, чем всё остальное */
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TitleContainer = styled.div`
  position: relative;
  width: 646px;
  padding: 38px 35px;
  border-radius: 0 0 24px 24px;
  background: linear-gradient(90deg, #1e3c94, #0098dc);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 6;
  position: relative;
`;

const TitleLine = styled.div`
  font-weight: 600;
  font-size: 56px;
  line-height: 70px;
  letter-spacing: -2%;
  text-align: center;
  color: #fff;
  text-transform: uppercase;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
`;

const TourText = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 37px;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 3px;
  text-shadow: 0 0 8px rgba(0, 0, 0, 0.7);
`;

const Trener = styled.div`
margin: 0 120px;
  display: flex;
  gap: 54px; /* исправлено */
  margin-top: 30px;
  margin-bottom: 32px;
  justify-content: space-between; /* Центрирование */
 z-index: 9999;
  position: relative;
`;

const TrTitle = styled.div`
  font-weight: 400;
  font-size: 20px;
  color: #fff;
  margin-bottom: 8px;
  text-transform: uppercase;
`;

const TeamsContainer = styled.div`
  width: 388px;
  height: 98px;
  display: flex;
  padding-top: 45px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: -50px; /* Заходим под TitleContainer */
  z-index: 5;
  background: url("/sostimgsubtitle.png") no-repeat center center / cover;
  clip-path: polygon(0 0, 100% 0, 80% 100%, 20% 100%);
  position: relative;
`;


const Wrapper = styled.div`
  position: relative;
  background: linear-gradient(-45deg, #0e173f, #001b94, #0e173f);
  background-size: 400% 400%;
  animation: ${slideDown} 1s ease forwards, ${gradientPulse} 10s ease infinite;
  width: 1642px;
  height: 933px;
  overflow: hidden;
`;

const TeamLogo = styled.img`
  position: absolute;
  right: -60px;
  top: 0;
  width: 155px;
  height: 146px;
  object-fit: contain;
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 259pxpx);
  gap: 10px 10px;
`;

const PlayerBlock = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 272px;
  height: 112px;
  background: linear-gradient(90deg, #1e3c94 0%, #0098dc 100%);
  border-radius: 12px;
  padding-left: 0;
  overflow: hidden;
`;

const LeftImage = styled.img`
  width: 70px;
  height: 80px;
  object-fit: cover;
  margin-left: 0;
  margin-right: 16px;
`;

const RightInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
`;

const Row = styled.div`
  margin-top: 29px;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const NameBlock = styled.div`
  font-size: 18px;
  font-weight: 600;
  text-transform: uppercase;
  line-height: 1.2;
  white-space: pre-line;
`;

const NumberBlock = styled.div`
  position: absolute;
  bottom: 8px;
  right: 16px;
  color: #ffffff;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
`;

const Mach1 = styled.img`
  position: absolute;
  top: -40px;
  left: 0;
  width: 354px;
  height: 354px;
  z-index: 1;
`;

const Mach2Blur = styled.img`
  position: absolute;
  bottom: 0;
  right: -100px;
  width: 260px;
  height: 260px;
  z-index: 1;
`;

const TrItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 280px; /* достаточно широкая, чтобы ФИО помещалось */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TrName = styled.div`
  font-weight: 900;
  font-size: 20px;
  color: #fff;
  max-width: 100%;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
