"use client";

import { useMatch, useScoreboard, useScenario } from "@/hooks";
import styled, { keyframes } from "styled-components";

export const Big = ({ show }: { show: boolean }) => {
  const match = useMatch();
  const { scoreboard } = useScoreboard();
  const scenario = useScenario();

  return (
    <Wrapper style={{ display: show ? "flex" : "none" }}>
      <ScenarioContainer>
        <ScenarioGradientLeft />
        <ScenarioGradientRight />
      </ScenarioContainer>

      <TeamLogo side="left" src={match?.team_1?.img} />
      <Row>
        <TeamBox side="left" color={match?.team_1?.color}>
          <TeamName side="left">{match?.team_1?.name}</TeamName>
        </TeamBox>

        <ScoreBox>
          <ScoreText>
            <ScoreNumber side="left">{scoreboard?.team_1_score}</ScoreNumber>
            <Moln />

            <ScoreNumber side="right">{scoreboard?.team_2_score}</ScoreNumber>
          </ScoreText>
        </ScoreBox>

        <TeamBox side="right" color={match?.team_2?.color}>
          <TeamName side="right">{match?.team_2?.name}</TeamName>
        </TeamBox>
      </Row>

      <TeamLogo side="right" src={match?.team_2?.img} />

      <ScenarioContainerStart>
        <ScenarioText>{scenario}</ScenarioText>
      </ScenarioContainerStart>
    </Wrapper>
  );
};

const slideUp = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const SlideUpDiv = styled.div`
  animation: ${slideUp} 0.5s ease forwards;
`;

const lightningStrike = keyframes`
  0%, 100% {
    filter: brightness(1) drop-shadow(0 0 0 transparent);
    transform: translateX(0);
    opacity: 1;
  }
  10% {
    filter: brightness(3) drop-shadow(0 0 10px #fff);
    opacity: 1;
    transform: translateX(2px);
  }
  20% {
    filter: brightness(1.5) drop-shadow(0 0 5px #f0f8ff);
    opacity: 0.8;
    transform: translateX(-2px);
  }
  30% {
    filter: brightness(2.5) drop-shadow(0 0 12px #aaf);
    opacity: 1;
    transform: translateX(1px);
  }
  50% {
    filter: brightness(1) drop-shadow(0 0 0 transparent);
    opacity: 0.7;
    transform: translateX(0);
  }
`;

const Wrapper = styled.div`
  position: absolute;
  bottom: 60px;
  left: 13%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0;
  font-family: "Furore", sans-serif;
  z-index: 100;
  animation: ${slideUp} 0.5s ease forwards;
`;

const Row = styled.div`
  width: 1480px;
  position: relative;
  display: flex;

  align-items: center;
  justify-content: space-between;
  gap: 0;
  height: 115px;
  box-sizing: border-box;

  /* Перевернутая трапеция */
  clip-path: polygon(
    0% 0%,
    /* левый верхний угол */ 100% 0%,
    /* правый верхний угол */ 95% 100%,
    /* правый нижний угол (сдвинут внутрь) */ 5% 100%
      /* левый нижний угол (сдвинут внутрь) */
  );

  border-radius: 0;
`;

const ScoreBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background: url("bigimg.png") no-repeat center center / cover;
  width: 380px; /* можно подкорректировать */
  height: 145px;

  color: #fff;

  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 15; /* поверх TeamBox */
`;

const ScenarioContainer = styled.div`
  position: relative;
  width: 820px;
  height: 43px;
  margin: 0 auto;
  display: flex;
  top: 60px;
  left: auto;
  z-index: 0;

  /* Форма трапеции */
  clip-path: polygon(
    10px 0%,
    /* немного скошенный левый верхний */ calc(100% - 10px) 0%,
    /* скошенный правый верхний */ 100% 100%,
    /* правый нижний */ 0% 100% /* левый нижний */
  );
  background: linear-gradient(90deg, #00a954 0%, #095102 51.98%, #00a954 100%);
`;

const TeamBox = styled.div<{ side: "left" | "right"; color?: string }>`
  width: 590px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 90px;
  background: ${(props) =>
    props.side === "left"
      ? "linear-gradient(to right, #21028A, #611FF2)"
      : "linear-gradient(to right, #F12A20, #8D080B)"};

  clip-path: ${(props) =>
    props.side === "left"
      ? "polygon(0 0, calc(100% - 8px) 0, 100% 100%, 0% 100%)"
      : "polygon(8px 0, 100% 0, 100% 100%, 0 100%)"};

  ${(props) =>
    props.side === "left"
      ? "transform: translateX(8px);"
      : "transform: translateX(-8px);"}

  z-index: 10;
  overflow: visible;

  padding-left: ${(props) => (props.side === "right" ? "80px" : "0")};
`;

const TeamLogo = styled.img<{ side: "left" | "right" }>`
  position: absolute;
  width: 180px;
  height: 180px;
  object-fit: contain;
  left: ${(props) => (props.side === "left" ? "-60px" : "auto")};
  right: ${(props) => (props.side === "right" ? "-90px" : "auto")};
  top: ${(props) => (props.side === "right" ? "105px" : "103px")};
  transform: translateY(-50%);
  z-index: 20;
`;

const TeamName = styled.div<{ side: "left" | "right" }>`
  width: calc(100% - 100px);
  font-family: "Furore", sans-serif;
  font-weight: 400;
  font-size: 46px;
  line-height: 48px;
  letter-spacing: 0%;
  text-transform: uppercase;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  white-space: nowrap;
  overflow: hidden;
  max-width: 100%;

  text-align: ${(props) => (props.side === "left" ? "right" : "left")};

  padding-left: ${(props) => (props.side === "left" ? "40px" : "80px")};
  margin-right: ${(props) => (props.side === "right" ? "60px" : "30px")};

  position: relative;
  mask-image: linear-gradient(to right, black 90%, transparent 100%);
  -webkit-mask-image: linear-gradient(to right, black 90%, transparent 100%);
  z-index: 1;
`;

const ScenarioGradientLeft = styled.div`
  width: 50%;
  height: 100%;
  clip-path: polygon(8px 0, 100% 0, 100% 100%, 0% 100%);
  background: linear-gradient(90deg, #00a954 0%, #095102 51.98%, #00a954 100%);
  position: relative;
  z-index: 1;
`;

const ScenarioGradientRight = styled.div`
  width: 50%; // правая половина
  height: 100%;
  clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 100%, 0% 100%);
  background: red;
  position: relative;
  z-index: 2;
`;

const ScenarioContainerStart = styled.div`
  position: absolute;
  top: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: 416px;
  height: 62px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #222222;
  /* Форма трапеции */
  clip-path: polygon(
    40px 0%,
    /* немного скошенный левый верхний */ calc(100% - 40px) 0%,
    /* скошенный правый верхний */ 100% 100%,
    /* правый нижний */ 0% 100% /* левый нижний */
  );
  z-index: -1;
`;

// Скорректируем ScenarioText, чтобы занял всё пространство
const ScenarioText = styled.div`
  flex: 1;
  font-family: "Furore", sans-serif;
  font-size: 24px;
  font-weight: 400;
  color: #fff;
  padding: 0 20px;
  line-height: 1;
  white-space: nowrap;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 15px;
`;

const ScoreText = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: -30px;
  font-size: 74px;
  font-weight: 700;
  line-height: 1;
  padding-bottom: 10px;
`;

const ScoreNumber = styled.span<{ side?: "left" | "right" }>`
  padding-left: ${(props) => (props.side === "right" ? "30px" : "0px")};
`;

const Moln = styled.div`
    margin-top:9px;
  margin-left: 56px;
  width: 80px;
  height: 162px;
  background: url("/molia.png") no-repeat center center;
  background-size: contain;
  animation: ${lightningStrike} 2.5s ease-in-out infinite;
  z-index: 9999;
`;
