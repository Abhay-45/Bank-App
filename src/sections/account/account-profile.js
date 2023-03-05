import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';
import { useState, useEffect, useContext } from 'react';
import { CustomerContext } from 'src/contexts/customer-context';
import { getCustomerDetails } from 'src/services/APIService';

const user = {
  avatar: 'https://cdn3.vectorstock.com/i/1000x1000/30/97/flat-business-man-user-profile-avatar-icon-vector-4333097.jpg',
  city: 'Edinburgh',
  country: 'UK',
  jobTitle: 'Senior Developer',
  name: 'Demo User',
  timezone: 'GTM'
};



export const AccountProfile = () => {
  const [customerDetails, setCustomerDetails] = useState([])

  const { authData } = useContext(CustomerContext)


  const userEmail = authData?.email
  console.log("THis is autdata", userEmail)

  useEffect(() => {
    if (authData && authData?.email) {
      getCustomerDetails(authData?.email)
        .then(response => {
          setCustomerDetails(response.customers[0])
          console.log("Responce", response)
        }).catch(err => {
          console.log(err)
        })

    }
  }, [])

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            src={user.avatar}
            sx={{
              height: 80,
              mb: 2,
              width: 80
            }}
          />
          <Typography
            gutterBottom
            variant="h5"
            textTransform={"capitalize"}
          >
            {customerDetails?.first_name} {customerDetails?.last_name}
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            {user.city} {user.country}
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            {user.timezone}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          fullWidth
          variant="text"
        >
          Upload picture
        </Button>
      </CardActions>
    </Card>
  )

};
