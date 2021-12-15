import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./cards.css";
import SkyLight from 'react-skylight';


export default function BasicCard() {

  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => {setData(data);
      console.log(data)
  });
  }, []);

  var myBigGreenDialog = {
    backgroundColor: '#00897B',
    color: '#ffffff',
    width: '70%',
    height: '600px',
    marginTop: '-300px',
    marginLeft: '-35%',
  };
 
  return (
      <div className='cards1' id='cards1'>
        {data?.map((data, k) => (
                    <Card sx={{ minWidth: 275 }} key={k}>
                    <CardContent>
                     <img src={data.image} height={110} className='image2'></img>
                     <Typography >
                        Category - {data.name}
                      </Typography>
                      <Typography>
                        Topic Name - {data.topic_name}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" onClick={()=>{React.Component.customDialog.show()
                     var frame1= document.getElementById("frame1");
                     frame1.src=data.src;
                      }}>Learn More</Button>
                    </CardActions>
                    
                  </Card>
                  
                ))
                }
                <div>
                  <SkyLight dialogStyles={myBigGreenDialog} hideOnOverlayClicked ref={ref => React.Component.customDialog = ref} title="A Custom Modal">
                      I'm a custom modal!
                      <iframe src="https://www.simphy.com" id='frame1' height={500} ></iframe>
                  </SkyLight>
                  </div>
                

    </div>
   
  );
}

// function customElements(){
// return(
  
// )
// }