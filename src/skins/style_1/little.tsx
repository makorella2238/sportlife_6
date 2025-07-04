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
        <OverlayBox>
          <TimerText>1T 26:03</TimerText>

          {scoreboard.is_fouls && (
            <FoulsRowNew>
              <FoulNumber>{scoreboard?.team_1_fouls ?? 0}</FoulNumber>
              <FoulText>ФОЛЫ</FoulText>
              <FoulNumber>{scoreboard?.team_2_fouls ?? 0}</FoulNumber>
            </FoulsRowNew>
          )}
        </OverlayBox>

        <Row>
          <TeamBox side="left">
            <TeamLogo side="left" src={match?.team_1?.img} />
            <InnerBox side="left">
              <CenteredContent>
                <TeamName side="left">{"МЕХ"}</TeamName>
              </CenteredContent>
              <Prym side="left" />
            </InnerBox>
          </TeamBox>
          <ScoreBox>
            <MainScore>
              <ScoreValue>{scoreboard?.team_1_score}</ScoreValue>
              <div style={{ width: "8px" }} />{" "}
              {/* Просто отступ вместо пробела */}
              <ScoreValue>{scoreboard?.team_2_score}</ScoreValue>
            </MainScore>
          </ScoreBox>

          <TeamBox side="right">
            <TeamLogo side="right" src={match?.team_2?.img} />
            <InnerBox side="right">
              <TeamName side="right">{"ФЕЛ"}</TeamName>
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

const OverlayBox = styled.div`
  font-weight: 400;
  position: absolute;
  top: -27px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px; // Расстояние между фолами и таймером
  height: 24px;
  z-index: 15;
  pointer-events: none;
`;

const Wrapper = styled.div`
  position: absolute;
  top: 70px;
  left: 62px;
  width: 536px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0;
  z-index: 100;
  overflow: visible;
  animation: ${slideDown} 0.5s ease forwards;
  position: relative; // Чтобы абсолютные дети позиционировались относительно Wrapper
`;

const TeamBox = styled.div<{ side: "left" | "right" }>`
  border-radius: ${({ side }) =>
    side === "right" ? "0 10px 10px 0" : "10px 0 0 10px"};
  background: #fff;
  height: 56px;
  width: 238px; // фиксированная ширина
  position: relative;
  padding: 0 12px;
  box-sizing: border-box;
  display: flex;
  justify-content: center; // Центрируем содержимое по горизонтали
  align-items: center;
  gap: 20px;
`;

const TeamLogo = styled.img<{ side: "left" | "right" }>`
  position: absolute;
  top: 51%;
  transform: translateY(-51%);
  width: 90px;
  height: 90px;
  object-fit: contain;
  ${({ side }) => (side === "left" ? "left: -31px;" : "right: -31px;")}
  z-index: 1;
`;

const TeamName = styled.div<{ side: "left" | "right" }>`
  font-family: "Furore", sans-serif;
  font-weight: 400;
  font-size: 39px;
  line-height: 48px;
  letter-spacing: 0%;
  text-transform: uppercase;
  color: #001134;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  padding-bottom: 5px;
  text-align: center;
  z-index: 1;
`;

const MainScore = styled.div`
  position: absolute;
  top: -28.9px;
  left: 50%;
  transform: translateX(-50%);
  display: grid;
  grid-template-columns: 1fr auto 1fr; // три колонки
  align-items: center;
  justify-items: center;
  background: url("/litil.png") no-repeat center center / cover;
  height: 54.5px;
  width: 140px;
  z-index: 200;
`;

const InnerBox = styled.div<{ side: "left" | "right" }>`
  display: flex;
  flex-direction: ${({ side }) => (side === "right" ? "row-reverse" : "row")};
  align-items: center;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  padding-right: ${({ side }) => (side === "right" ? "35px" : "0")};

  padding-left: ${({ side }) => (side === "left" ? "28px" : "0")};
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
  width: 120px;
  height: 24px;
  background: #0c1a27;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 0 8px;
  box-sizing: border-box;
`;

const TimerText = styled.div`
  width: 120px;
  height: 24px;
  background: #0c1a27;
  font-size: 18px;
  font-weight: 400;
  color: #fff;
  display: flex;
  justify-content: center;
`;

const FoulNumber = styled.div`
  color: #fff;
  font-weight: 400;
`;

const ScoreValue = styled.div`
  font-size: 37px;
  min-width: 32px; // достаточно для двух знаков
  text-align: center;
  font-weight: 700;
  color: white;
`;

const CenteredContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 100%;
`;

const Row = styled.div`
  height: 56px;
  display: flex;
  background: #fff;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
  z-index: 10;
  overflow: visible;
  border-radius: 12px;
`;

const FoulText = styled.div`
  font-size: 16px; // было 20px
  padding: 0 8px;
  height: auto;
  font-weight: 400;
  text-transform: uppercase;
  color: #fff;
`;

const Prym = styled.div<{ side: "left" | "right" }>`
  position: absolute;
  top: -4px;
  ${({ side }) => (side === "left" ? "left: -12px;" : "right: -12px;")};
  width: 8px;
  height: 56px;
  background: ${({ side }) => (side === "right" ? "#F12A20" : "#611FF2")};

  /* Скошенные углы: для левого — скос справа, для правого — скос слева */
  border-radius: ${({ side }) =>
    side === "right" ? "0 10px 10px 0" : "10px 0 0 10px"};
`;
