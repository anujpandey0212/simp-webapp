import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import "../cards/cards.css";
import Pagination from '@mui/material/Pagination';
import { useNavigate ,useLocation} from "react-router-dom";

function BasicCard({currentItems},props) {
  let navigate = useNavigate();


  function handelonclick(data){
    console.log(data);
    if(data.ragistration_required=="true"){
      console.log("authenticate triggered")
      navigate('/authenticate',{state:{link:data.src}});
    }
    else if(data.ragistration_required=="false"){
      console.log("simulation triggered")
      navigate('/simulation',{state:{link:data.src}});
    }
  }

  return (
      <div className='cards1' id='cards1'>
        {currentItems?.map((data, k) => (
                    <Card sx={{ minWidth: 275 }} key={k} onClick={()=>{handelonclick(data)}} className="cards-css">
                    <CardContent>
                     <img src={data.image} width={275} className='image2'></img>
                     <Typography className='sim_name'>
                        {data.name}
                      </Typography>
                      <div className='description'>
                        <Typography className='sim_des'>
                          {data.description}
                        </Typography>
                      </div>
                    </CardContent>
                    <CardActions>  
                    </CardActions>            
                  </Card>
                ))
                }  
    </div>
   
  );
}

export default function Results({ itemsPerPage }) {
  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = React.useState(null);
  const [pageCount, setPageCount] = React.useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = React.useState(0);
  const [data, setData] = React.useState(0);
  const location=useLocation();
  React.useEffect(() => {
    var division=document.getElementById("division1");
    division.style.height="auto";
    fetch("/api")
      .then((res) => res.json())
      .then((data) => {
        var copy_data=[];
            data.forEach((e) => {
            //    console.log(e);
                if(e.topic_name===location.state.name){
                    copy_data.push(e);
                    setData(copy_data);
                }

            });
        setData(copy_data);
        console.log(copy_data);
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setCurrentItems(copy_data.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(copy_data.length /itemsPerPage));
    })
    // Fetch items from another resources.
   
  }, [itemOffset, itemsPerPage,location]);

  // Invoke when user click to request another page.
  const handlePageClick = (event,value) => {
    const newOffset = ((value-1) * itemsPerPage) % data.length;
    console.log(
      `User requested page number ${value}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <div className='pagination_cards'>
      <BasicCard currentItems={currentItems}/>
      <Pagination count={pageCount} color="primary" className="pagination1" id='pagination1' onChange={handlePageClick}/>
    </div>
  );
}