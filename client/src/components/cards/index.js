import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./cards.css";
import image2 from "../../assets/test.png"



export default function BasicCard() {

  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => {setData(data);
      console.log(data)
  });
  }, []);

  return (
      <div className='cards1' id='cards1'>
        {data?.map((data, k) => (
                    <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                     <img src={!data?"loading":data.image} height={110} className='image2'></img>
                     <Typography >
                        Category - {!data?"loading":data.name}
                      </Typography>
                      <Typography>
                        Topic Name - {!data?"loading":data.topic_name}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Learn More</Button>
                    </CardActions>
                  </Card>
                ))}
    </div>
  );
}