import { formatDistanceToNow } from "date-fns";
import PropTypes from "prop-types";
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import EllipsisVerticalIcon from "@heroicons/react/24/solid/EllipsisVerticalIcon";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SvgIcon,
} from "@mui/material";
import { getOffers } from "src/services/APIService";
import { useEffect, useState } from "react";

export const OverviewLatestProducts = (props) => {
  const { products = [], sx } = props;

  const [offers, setOffers] = useState([]);


  useEffect(() => {
    getOffers()
      .then((res) => {
        console.log("These are the payments", res);
        setOffers(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (offers === "NA") return <p>Payments</p>;

  return (
    <Card sx={sx}>
      <CardHeader title="Latest Offers" />
      <List>
        {offers?.loyality_offers?.map((offer, index) => {
          const hasDivider = index < offer.length - 1;
          // const ago = formatDistanceToNow(offer.updatedAt);

          return (
            <ListItem divider={hasDivider} key={offer.id}>
              <ListItemAvatar>
                {offer.image ? (
                  <Box
                    component="img"
                    src={offer.image}
                    sx={{
                      borderRadius: 1,
                      height: 48,
                      width: 48,
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      borderRadius: 1,
                      backgroundColor: "neutral.200",
                      height: 48,
                      width: 48,
                    }}
                  />
                )}
              </ListItemAvatar>
              <ListItemText
                primary={offer.title}
                primaryTypographyProps={{ variant: "subtitle1" }}
                // secondary={`Updated ${ago} ago`}
                secondaryTypographyProps={{ variant: "body2" }}
              />

            </ListItem>
          );
        })}
      </List>
      <Divider />

    </Card>
  );
};

OverviewLatestProducts.propTypes = {
  products: PropTypes.array,
  sx: PropTypes.object,
};
