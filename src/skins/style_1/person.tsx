"use client";

import { useMatch } from "@/hooks";
import styled, { keyframes } from "styled-components";
import { useEffect, useMemo, useRef, useState } from "react";

const getFontSizeByLength = (text: string) => {
  const length = text.length;

  if (length <= 15) return 40;
  if (length <= 20) return 32;
  if (length <= 22) return 28;
  if (length <= 25) return 24;
  return 17;
};

const fio = "Иванов Олег 37’";

export const Person = ({ kind, show }: { kind: string; show: boolean }) => {
  const match = useMatch();

  const nameRef = useRef<HTMLDivElement>(null);
  const dynamicFontSize = useMemo(() => getFontSizeByLength(fio), [fio]);

  return (
    <Wrapper style={{ display: show ? "flex" : "none" }}>
      <TeamBoxWrapper>
        {kind == "goal" && <Goal>гооол!</Goal>}
        {kind == "yellow" && <PersImage src="/personCard.png" alt="Player" />}
        <TeamBox side="left">
          {kind == "yellow" && <Yellow />}
          {kind == "red" && <Red />}
          <Col>
            <TeamName ref={nameRef} side="left" fontSize={dynamicFontSize}>
              {fio}
            </TeamName>
            <TeamNameLit side="right">
              Тульский комбинат экспресс офис
            </TeamNameLit>
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

const Goal = styled.div`
  background: linear-gradient(to right, #611ff2, #21028a);
  color: #ffffff;
  width: 130px;
  padding: 18px 25px;
  position: absolute;
  top: 50%;
  left: -90px;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-family: "Furore", sans-serif;
  border-radius: 4px;

  /* Скошен левый нижний угол */
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 20px 100%);
  z-index: 999;
`;

const Wrapper = styled.div`
  position: absolute;
  right: 162px;
  bottom: 62px;
  width: 620px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TeamBoxWrapper = styled.div`
  width: 575px;
  position: relative;
  display: flex;
  align-items: flex-start;
  animation: ${slideInFromRight} 0.6s ease-out forwards;
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
  top: -30px;
  right: -107px;
  height: 186px;
  width: 186px;
  object-fit: contain;
  margin-left: 20px;
  z-index: 3;
  align-self: center;
`;

const TeamBox = styled.div<{ side: "left" | "right" }>`
  position: relative;
  display: flex;
  height: 120px;
  width: 630px;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(to right, #611ff2, #21028a);
  justify-content: flex-end;
  padding-left: 100px;
  clip-path: polygon(20px 0%, 100% 0%, 100% 100%, 10% 100%);
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 2;
  margin-right: 80px;
  align-items: flex-end;
`;

const Yellow = styled.div`
  position: absolute;
  top: 0px;
  left: 0; /* заменил 'px' на 0 */
  height: 120px;
  width: 78px; /* добавил ; */
  background: #FFC70F;
  z-index: 10;
`;

const Red = styled.div`
  position: absolute;
  top: 0px;
  left: 0; /* заменил 'px' на 0 */
  height: 120px;
  width: 78px; /* добавил ; */
  background: #FF370F;

  z-index: 10;
`;


const TeamName = styled.div<{ side: "left" | "right"; fontSize: number }>`
  height: 40px;
  display: flex;
  margin-bottom: 5px;
  align-items: center;
  font-family: "Furore", sans-serif;
  font-size: ${({ fontSize }) => `${fontSize}px`};
  text-transform: uppercase;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  z-index: 1;
  padding-left: ${(props) => (props.fontSize == 17 ? "0px" : "40px")};
`;

const TeamNameLit = styled.div<{ side: "left" | "right" }>`
  height: 40px;
  max-width: 320px;
  display: flex;
  align-items: center;
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
        justify-content: flex-start;
      `
      : `
        padding-right: 15px;
        justify-content: flex-start;
      `}

  /* Эффект затухания справа */
  -webkit-mask-image: linear-gradient(to right, black 80%, transparent 100%);
  mask-image: linear-gradient(to right, black 80%, transparent 100%);
`;
