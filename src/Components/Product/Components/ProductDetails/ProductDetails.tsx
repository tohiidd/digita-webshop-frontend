import { useState } from "react";
import {
  Grid,
  Button,
  Link,
  Divider,
  Box,
  Rating,
  Typography,
  Modal,
} from "@mui/material";
import {
  CartButtonsStyle,
  ProductDetailsStyle,
  productTitle,
  starRating,
  productMetaStyle,
  linkStyle,
  filledPrice,
  starLink,
  productButtonStyles,
  productIconStyles,
} from "../../../../Styles/Product/index";
import {
  DeleteForever,
  Favorite,
  FavoriteBorder,
  Shuffle,
} from "@mui/icons-material";
import Gallery from "./Gallery/Gallery";
import ColorPicker from "./ColorPicker/ColorPicker";
import { IProduct } from "@/Services/Types/product";
import { Link as NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/features/store";
import {
  useAddWishMutation,
  useDeleteWishMutation,
} from "@/features/wishlist/wishlistApi";
import WishModal from "../../../Products/Components/Modals/WishModal/WishModal";
import { useGetReviewsQuery } from "@/features/reviews/reviewsApi";
import { isInList } from "@/Utils/isInList";
import { useGetAllCartItemQuery } from "@/features/cart/cartApi";
import QuantityInput from "@/Components/Cart/Components/QuantityInput/QuantityInput";
import { useDispatch } from "react-redux";
import { removeFromCart } from "@/features/cart/cartSlice";
import { useAddToCart } from "@/hooks/useAddToCart";

interface Props {
  product: IProduct;
  wished: boolean;
}
const ProductDetails = ({ product, wished }: Props) => {
  const { role, user } = useAppSelector((state) => state.reducer.auth);
  const { cartList } = useAppSelector((state) => state.reducer.cart);
  const [openCart, setOpenCart] = useState(false);
  const [openWish, setOpenWish] = useState(false);
  const [addedWish, setAddedWish] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: reviewsData } = useGetReviewsQuery({
    path: "products",
    id: product._id!,
  });
  const reviewsLength = reviewsData?.data.length ?? 0;

  const { data: cartData } = useGetAllCartItemQuery();
  const cart = cartData?.data.products ?? [];
  const cartItems = user ? cart : cartList;
  const inCart = isInList(cartItems, product?._id!);
  const cartItem = cartItems.find(
    (item) => item.productId._id === product?._id
  );

  const { addToCartHandler } = useAddToCart(inCart, product, setOpenCart);

  const [addWish, { isLoading: addLoading }] = useAddWishMutation();
  const [deleteWish, { isLoading: delLoading }] = useDeleteWishMutation();
  const {
    _id,
    title,
    price,
    offPrice,
    rating,
    sku,
    colors,
    shortDescription,
    gallery,
  } = product;

  const wishlistHandler = async () => {
    if (!user || !role) {
      navigate(
        { pathname: location.pathname, search: "login=open" },
        { replace: true, state: { from: location } }
      );
      return;
    }
    try {
      let response;
      if (!wished) {
        response = await addWish({ path: role!, id: _id }).unwrap();
        setAddedWish(true);
      } else {
        response = await deleteWish({ path: role!, id: _id }).unwrap();
        setAddedWish(false);
      }
      setOpenWish(true);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const cartItemDeleteHandler = () => {
    dispatch(removeFromCart(cartItem?._id!));
  };
  return (
    <Box my={5}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Gallery gallery={gallery} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: "relative", overflow: "hidden" }}>
            <Box sx={{ position: "absolute", zIndex: "11111" }}>
              <div id="myPortal" />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h4" sx={productTitle}>
                {title}
              </Typography>
            </Box>
            <Box sx={starLink}>
              <Rating
                title="read-only"
                defaultValue={rating}
                size="small"
                readOnly
                sx={starRating}
              />
              <NavLink
                to={`${location.pathname}?tab=reviews#reviews`}
                className="customerReview"
              >{`(${reviewsLength} customer ${
                reviewsLength > 1 ? "reviews" : "review"
              })`}</NavLink>
            </Box>
            <Box sx={filledPrice}>
              <bdi>{`$${offPrice ? offPrice : price}`}</bdi>
              {offPrice && (
                <Typography
                  component={"span"}
                  sx={{
                    position: "relative",
                    fontSize: "16px",
                    marginLeft: "14px",
                    "&:after": {
                      content: '" "',
                      position: "absolute",
                      top: "55%",
                      left: "0",
                      width: "100%",
                      height: "1.5px",
                      backgroundColor: "common.digitaBlack",
                    },
                  }}
                >{`$${price}`}</Typography>
              )}
            </Box>

            <Typography variant="body2" sx={ProductDetailsStyle} component="p">
              {shortDescription}
            </Typography>

            <ColorPicker colors={colors} />
            <Box>
              <Box sx={CartButtonsStyle}>
                {!inCart && (
                  <Button
                    variant="contained"
                    className="addCart"
                    onClick={addToCartHandler}
                  >
                    Add To Cart
                  </Button>
                )}
                {inCart && (
                  <>
                    <QuantityInput cartItem={cartItem!} />
                    <Button
                      variant="outlined"
                      color="error"
                      sx={{
                        padding: "0 20px!important",
                        "&:hover .delete-icon": { color: "#fff" },
                      }}
                      onClick={cartItemDeleteHandler}
                    >
                      <DeleteForever className="delete-icon" />
                    </Button>
                    <Button
                      variant="contained"
                      component={NavLink}
                      to="/cart"
                      sx={{ height: "100%" }}
                    >
                      View Cart
                    </Button>
                  </>
                )}
              </Box>
            </Box>

            <Box sx={productButtonStyles}>
              <Link
                component="button"
                onClick={wishlistHandler}
                sx={{
                  color: wished ? "#f03637 !important" : "common.digitaBlack",
                }}
                className={addLoading || delLoading ? "wishLoading" : ""}
              >
                {wished ? (
                  <Favorite
                    sx={{ color: "common.digitaRed", ...productIconStyles }}
                    className={addLoading || delLoading ? "wishLoading" : ""}
                  />
                ) : (
                  <FavoriteBorder
                    sx={productIconStyles}
                    className={addLoading || delLoading ? "wishLoading" : ""}
                  />
                )}
                Wishlist
              </Link>

              <Link component="button">
                <Shuffle />
                Compare
              </Link>
            </Box>
          </Box>
          <Divider sx={{ width: "100%" }} />
          <Box sx={productMetaStyle}>
            <Box>
              <Typography component="span" className="span">
                SKU : {sku}
              </Typography>
              <Typography component="span">{sku}</Typography>
            </Box>
            <Box>
              <Typography component="span" className="span">
                Category :
              </Typography>
              <Link sx={linkStyle}>{" Audio & Video Game"}</Link>
            </Box>
            <Box>
              <Typography component="span" className="span">
                Tags :
              </Typography>
              <Link sx={linkStyle}>{" Tag-02"}</Link>
              <Link sx={linkStyle}>{"  Tag-08"}</Link>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Modal
        open={openWish}
        onClose={() => setOpenWish(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <WishModal
            setOpenWish={setOpenWish}
            addedWish={addedWish}
            role={role}
          />
        </div>
      </Modal>
    </Box>
  );
};

export default ProductDetails;
