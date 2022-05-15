import styled from "styled-components";

export const Main = styled.main`
  font-family: "Clear Sans", "Helvetica Neue", Arial, sans-serif;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100%;
  max-width: 500px;
  margin: 0 auto;
`;

export const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 100%;

  border-bottom: 1px solid #3a3a3c;

  font-weight: 700;
  font-size: 3.6rem;
  letter-spacing: 0.2rem;
  text-transform: uppercase;
`;

export const GameSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;
export const TileContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-gap: 5px;

  height: 420px;
  width: 350px;
`;
export const TileRow = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 5px;
`;
export const Tile = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  border: 2px solid #dee1e9;
  font-size: 3.2rem;
  font-weight: bold;
  line-height: 3.2rem;
  text-transform: uppercase;
  background-color: #f0f2f7;
  border-radius:5px;
  transition: background-color 200ms linear;

  ${({ hint }) => {
    if (hint === "green") {
        return `background-color: #6aaa64; color: white; border: 0px;`;
    }
    if (hint === "yellow") {
        return `background-color: #c9b458; color: white; border: 0px;`;
    }
    if (hint === "grey") {
        return `background-color: #787c7e; color: white; border: 0px;`;
    }
  }}

  user-select: none;
`;

export const KeyboardSection = styled.section`
  height: 200px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const KeyboardRow = styled.div`
  width: 100%;
  margin: 0 auto 8px;

  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const KeyboardButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0 6px 0 0;
  height: 58px;
  ${({ item }) => (item ? `flex: ${item};` : `flex: 1;`)}

  border: 0;
  border-radius: 4px;
  background-color: #dce1ed;
  font-weight: bold;
  text-transform: uppercase;
  color: #5a6376;
  font-size:14px;
  transition: background-color 200ms linear;

  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: #bfc3cd;

  ${({ hint }) => {
        if (hint === "green") {
            return `background-color: #578b52; color: white;`;
        }
        if (hint === "yellow") {
            return `background-color: #a9974a; color: white;`;
        }
        if (hint === "grey") {
            return `background-color: #595c5d; color: white;`;
        }
        if (hint === "default") {
            return `background-color: #bfc3cd; color: #5a6376;`;
        }
    }}
  }

  &:last-of-type {
    margin: 0;
  }

  ${({ hint }) => {
        if (hint === "green") {
            return `background-color: #6aaa64; color: white;`;
        }
        if (hint === "yellow") {
            return `background-color: #c9b458; color: white;`;
        }
        if (hint === "grey") {
            return `background-color: #787c7e; color: white;`;
        }
        if (hint === "default") {
            return `background-color: #dce1ed; color: #5a6376;`;
        }
    }}
`;

export const Flex = styled.div`
  ${({ item }) => `flex: ${item};`}
`;

export const ShareModal = styled.div`
  font-family: "Clear Sans", "Helvetica Neue", Arial, sans-serif;
`;

export const wordNotExistModal = styled.div`
  font-family: "Clear Sans", "Helvetica Neue", Arial, sans-serif;
`;

export const gameoverModal = styled.div`
  font-family: "Clear Sans", "Helvetica Neue", Arial, sans-serif;
`;

export const ShareButton = styled.button`
  font-size: 18px;
  padding: 8px 16px;
  border-radius: 4px;
  margin-left: 15px;
  background-color: #f0f2f7;
  margin-right: 15px;
  border: 2px solid #dee1e9;
  font-family: "Clear Sans", "Helvetica Neue", Arial, sans-serif;
  transition: background-color 0.2s ease-in;

  &:hover {
    background-color: #d2d4d8;
  }
`;

export const Heading = styled.h2`
  border-bottom: 1px solid #3a3a3c;
  padding-bottom: 8px;

  font-weight: 700;
  font-size: 3.6rem;
  letter-spacing: 0.2rem;
  text-transform: uppercase;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: "Clear Sans", "Helvetica Neue", Arial, sans-serif;
  margin: 16px auto;
`;
