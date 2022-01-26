import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import "./cards.css";
import Pagination from '@mui/material/Pagination';
import { useNavigate ,useLocation, useSearchParams} from "react-router-dom";
import TextField from '@mui/material/TextField';
import { Autocomplete } from '@mui/material'


function Grouped() {
  const [data,setData]=React.useState(null);
  var options=[]
  const navigate=useNavigate();

  const handelselect=(data1)=>{
    if(data1.target.value!=""){
      console.log("triggered3")
      data.forEach(element => {
        if(element.name==data1.target.value){
          console.log("triggered2")
          if(element.ragistration_required=="true"){
           
            navigate('/authenticate',{state:{link:element.src}});
          }
          else if(element.ragistration_required=="false"){
            console.log("triggered")
            navigate('/simulation',{state:{link:element.src}});
          }
        }
      });
    }
  }

const search=()=>{
  if(data==null){
    return(
      <p>loading.....</p>
    )
  }
  else{
    return(
      <Autocomplete
        id="grouped-demo"
        options={data.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
        groupBy={(option) => option.firstLetter}
        getOptionLabel={(option) => option.name}
        sx={{ width: 300 }}
        onSelect={handelselect}
        renderInput={(params) => <TextField {...params} label="Search Simulations" />}
      />
    )
  }
}

  React.useEffect(()=>{
    fetch("/api")
    .then((res)=>res.json())
    .then((data)=>{
      console.log(data)
      options = data?.map((option) => {
       const firstLetter = option.name[0].toUpperCase();
       return {
         firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
         ...option,
       };
     });
     console.log(options)
     setData(options);
    })
      
  },[])

  return (
    <div>
      { 
        search()
      }
    </div>
  );
}

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

export default function PaginatedItems({ itemsPerPage }) {
  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = React.useState(null);
  const [pageCount, setPageCount] = React.useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = React.useState(0);
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    var division=document.getElementById("division1");
    division.style.height="auto";
    fetch("/api")
      .then((res) => res.json())
      .then((data) => {setData(data);
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
      <Grouped/>
      <BasicCard currentItems={currentItems}/>
      <Pagination count={pageCount} color="primary" className="pagination1" id='pagination1' onChange={handlePageClick}/>
    </div>
  );
}

