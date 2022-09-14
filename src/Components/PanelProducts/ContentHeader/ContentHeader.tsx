import { Box, Button } from "@mui/material";
import { PButton, PTitle } from "../../../Styles/panelCommon";
import { Add } from "@mui/icons-material";
import { ContentWrapper, simpleBtn } from "../../../Styles/PanelProducts";
import { useNavigate } from "react-router-dom";

interface T {
  title: string;
}

const ContentHeader = ({ title }: T) => {
  const navigate = useNavigate();
  return (
    <ContentWrapper>
      <PTitle>{title}</PTitle>
      <Box sx={{ display: "flex", gap: 1 }}>
        <PButton
          variant="contained"
          onClick={() => navigate("/panel/products/add")}
        >
          <Add />
          create new
        </PButton>
      </Box>
    </ContentWrapper>
  );
};

export default ContentHeader;
