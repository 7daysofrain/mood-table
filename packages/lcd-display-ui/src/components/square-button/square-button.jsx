import styled from "@emotion/styled";
import {ButtonBase} from "@mui/material";

const SquareButton = styled(ButtonBase)(({ theme , color}) => ({
    position: 'relative',
    height: 200,
    width: 200,
    backgroundColor: color,
    color: 'black',
    fontSize: 40,
    padding: 10,

}));

export default SquareButton;
