import PropTypes from 'prop-types';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ClockIcon from '@heroicons/react/24/solid/ClockIcon';
import { Avatar, Box, Card, CardContent, Divider, Stack, SvgIcon, Typography } from '@mui/material';

export const CompanyCard = (props) => {
  const { company } = props;

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pb: 3,
            boxShadow: "md"
          }}
        >
          <img
            height={"240px"}
            src={company.image}
          />
        </Box>
        <Typography
          align="center"
          gutterBottom
          variant="h5"
        >
          {company.title}
        </Typography>
        <Typography
          align="center"
          variant="body1"
        >
          {company.description}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ p: 2 }}
      >
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
          style={{ fontSize: 20 }}
        >
          <Typography
            color="text.secondary"
            display="inline"
            style={{ fontSize: 20 }}
          
          >
          Discount for our Tier Holders
          </Typography>
        </Stack>
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
        >
          <SvgIcon
            color="action"
            fontSize="small"
          >
            {/* <ArrowDownOnSquareIcon /> */}
          </SvgIcon>
          <Typography
            color="text.secondary"
            display="inline"
            style={{ fontSize: 20 }}
          
          >
          {company?.discount_percentage}%

          </Typography>

        </Stack>
      </Stack>
    </Card>
  );
};

CompanyCard.propTypes = {
  company: PropTypes.object.isRequired
};
