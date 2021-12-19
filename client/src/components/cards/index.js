import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import "./cards.css";
import SkyLight from 'react-skylight';
import ReactPaginate from 'react-paginate';
import image1 from "../../assets/fullscreen.png";

function BasicCard({currentItems}) {

  var myBigGreenDialog = {
    backgroundColor: '#00897B',
    color: '#ffffff',
    width: '64%',
    height: '600px',
    marginTop: '-300px',
    marginLeft: '-35%',
  };
 
  return (
      <div className='cards1' id='cards1'>
        {currentItems?.map((data, k) => (
                    <Card sx={{ minWidth: 275 }} key={k} onClick={()=>{
                      var frame1= document.getElementById("frame1");
                      frame1.src=data.src;
                      React.Component.customDialog.show()
                       }} className="cards-css">
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
                       <img src={image1} height={15} onClick={()=>{window.location.href=data.src}}></img>
                    </CardActions>            
                  </Card>
                ))
                }
                <div>
                  <SkyLight dialogStyles={myBigGreenDialog} hideOnOverlayClicked ref={ref => React.Component.customDialog = ref} title="Simulation">
                      <iframe src="https://www.simphy.com" id='frame1' height={500} width={900}></iframe>
                  </SkyLight>
                </div>
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
      setPageCount(Math.ceil(data.length / itemsPerPage));
    })
    // Fetch items from another resources.
   
  }, [itemOffset, itemsPerPage]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <div className='pagination_cards'>
      <BasicCard currentItems={currentItems} />
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </div>
  );
}