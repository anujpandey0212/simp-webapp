import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import "./cards.css";
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
                     <Typography >
                        Category - {data.name}
                      </Typography>
                      <Typography>
                        Topic Name - {data.topic_name}
                      </Typography>
                    </CardContent>
                    <CardActions>  
                    </CardActions>            
                  </Card>
                ))
                }  
    </div>
   
  );
}

export default function PaginatedItems({ itemsPerPage }) {
  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = React.useState(null);
  const [pageCount, setPageCount] = React.useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = React.useState(0);
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => {setData(data);
      console.log(data);
      const endOffset = itemOffset + itemsPerPage;
      console.log(`Loading items from ${itemOffset} to ${endOffset}`);
      setCurrentItems(data.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(data.length /itemsPerPage));
    })
    // Fetch items from another resources.
   
  }, [itemOffset, itemsPerPage]);

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
      <Pagination count={pageCount} color="primary" className="pagination1" onChange={handlePageClick}/>
    </div>
  );
}