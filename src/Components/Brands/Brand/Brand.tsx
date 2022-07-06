import {
  Box,
  Divider,
  CardContent,
  Card,
  CardMedia,
  Typography,
} from "@mui/material";
import { cardWrapper, titleWrapper, titleStyle } from "../../../Styles/Brands";

interface T{
  id: number;
  name: string;
  image: string;
  count: number;
}

const Brand = ({name, image, count}: T) => {
  return (
    <Card sx={cardWrapper}>
      <CardMedia
        component="img"
        height="100"
        image={image}
        alt="brand-img"
        sx={{ backgroundColor: "#f2f2f3cc", objectFit: "contain" }}
      />
      <Divider sx={{ borderColor: "common.panelBorderGrey", opacity: ".1" }} />
      <CardContent sx={titleWrapper}>
        <Typography component="p" sx={titleStyle}>
          {name}
        </Typography>
        <Typography
          variant="h6"
          component="div"
          sx={{ pt: "2px", fontSize: "16px", color: "#f03637" }}
        >
          {count} items
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Brand;
