"use client";

import styled, { keyframes } from "styled-components";
import { useMatch, useScoreboard, useScenario } from "@/hooks";

const getShortName = (name?: string) => (name ? name.slice(0, 4) : "");

export const Little = ({ show }: { show: boolean }) => {
  const match = useMatch();
  const { scoreboard } = useScoreboard();

  return (
    <PageWrapper>
      <Wrapper style={{ display: show ? "flex" : "none" }}>
        <Row>
          <TeamBox side="left">
            <InnerBox side="left">
              <TeamLogo side="left" src="/logo1.png" />
              <TeamName>{"МЕХ"}</TeamName>
              <Prym side="left"></Prym>
            </InnerBox>
          </TeamBox>

          <ScoreBox>
            {scoreboard.is_fouls && (
              <FoulsRowNew>
                <FoulNumber>{scoreboard?.team_1_fouls ?? 0}</FoulNumber>
                <FoulText>ФОЛЫ</FoulText>
                <FoulNumber>{scoreboard?.team_2_fouls ?? 0}</FoulNumber>
              </FoulsRowNew>
            )}

            <MainScore>
              <ScoreValue>{scoreboard?.team_1_score}</ScoreValue>
              <ScoreValue>–</ScoreValue>
              <ScoreValue>{scoreboard?.team_2_score}</ScoreValue>
            </MainScore>

            <TimerText>1T {"26:03"}</TimerText>
          </ScoreBox>

          <TeamBox side="right">
            <InnerBox side="right">
              <TeamLogo side="right" src="/logo2.png" />
              <TeamName>{"ФЕЛ"}</TeamName>
              <Prym side="right"></Prym>
            </InnerBox>
          </TeamBox>
        </Row>
      </Wrapper>
    </PageWrapper>
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

const PageWrapper = styled.div`
  background-color: #888888; /* серый фон */
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 20px; /* отступы для удобства */
  box-sizing: border-box;
`;

const Wrapper = styled.div`
  position: absolute;
  top: 70px;
  left: 62px;
  width: 472px; /* фиксированная ширина */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0;
  z-index: 100;
  overflow: visible;
  animation: ${slideDown} 0.5s ease forwards;
`;

const TeamBox = styled.div<{ side: "left" | "right" }>`
  border-radius: ${({ side }) =>
    side === "right" ? " 0 10px 10px 0" : "10px 0 0 10px"};
  background: #fff;
  display: flex;
  align-items: center;
  padding: ${({ side }) => (side === "right" ? "0 10px 0 0" : "0 0 0 10px")};
  justify-content: ${({ side }) =>
    side === "left" ? "flex-start" : "flex-end"};
  height: 56px;
  width: 100%;
  position: relative;
  padding: 0 12px;
  box-sizing: border-box;
  gap: 20px;
`;

const InnerBox = styled.div<{ side: "left" | "right" }>`
  display: flex;
  flex-direction: ${({ side }) => (side === "right" ? "row-reverse" : "row")};
  align-items: center;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
  position: relative;
`;

const ScoreBox = styled.div`
  position: relative;
  margin-top: 4px;
  width: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FoulsRowNew = styled.div`
  position: absolute;
    top: -4px;
  left: 0;
  width: 120px;
  height: 24px;            /* высота 24px */
  background: #0C1A27;
  border-radius: 12px 12px 0  0 ; /* скругление верхний левый */
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 0 8px;
  box-sizing: border-box;
`;

const FoulNumber = styled.div`
  color: #fff;
  font-weight: 600;
`;
const MainScore = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  background: linear-gradient(to right, #1e3c94 0%, #0098dc 100%);
  height: 56px;
  width: 100%;
  margin: 22px 0 26px 0; /* сдвиг на 2px вверх */
`;


const ScoreValue = styled.div`
  font-size: 37px; // было 39px
  width: 25px; // было 50px
  text-align: center;
  font-weight: 700;
  color: white;
`;

const TimerText = styled.div`
  background: #0C1A27;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 24px;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  text-align: center;
  border-radius: 0 0 12px 12px;

  display: flex;
  align-items: center;   /* вертикальное выравнивание */
  justify-content: center; /* по горизонтали (если нужно) */
`;

const Row = styled.div`
  height: 56px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
  z-index: 10;
  overflow: visible;
`;
const TeamLogo = styled.img<{ side: "left" | "right" }>`
  width: 47px;
  height: 47px;
  object-fit: contain;
`;

const TeamName = styled.div`
  font-family: "Furore", sans-serif;
  font-weight: 600;
  font-size: 39px;
  line-height: 48px;
  letter-spacing: 0%;
  text-transform: uppercase;
  color: #001134 ;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  z-index: 1;
`;

const FoulText = styled.div`
  font-size: 16px; // было 20px
  padding: 0 8px;
  height: auto;
  font-weight: 600;
  text-transform: uppercase;
  color: #fff;
`;

const Prym = styled.div<{ side: "left" | "right" }>`
  position: absolute;
  top: -4px;
  ${({ side }) => (side === "left" ? "left: -12px;" : "right: -12px;")};
  width: 8px;
  height: 56px;
  background: ${({ side }) => (side === "right" ? "#03A8FC" : "#D43927")};

  /* Скошенные углы: для левого — скос справа, для правого — скос слева */
  border-radius: ${({ side }) =>
    side === "right" ? "0 10px 10px 0" : "10px 0 0 10px"};
`;
