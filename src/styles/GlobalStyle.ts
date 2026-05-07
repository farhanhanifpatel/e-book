// styles/GlobalStyles.ts
import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text};
    transition: all 0.3s ease;
  }
`;
