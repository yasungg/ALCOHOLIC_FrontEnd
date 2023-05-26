import { createGlobalStyle } from "styled-components";
import OpenSans from "./OpenSans.ttf"

export default OpenSans `
    @font-face {
        font-family: "OpenSans",
        src: url(${OpenSans.ttf}) format("truetype");
    }
`;