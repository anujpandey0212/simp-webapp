import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./cards.css";
import SkyLight from 'react-skylight';
import ReactPaginate from 'react-paginate';

function BasicCard({currentItems}) {

  // const [data, setData] = React.useState(null);

  // React.useEffect(() => {
  //   fetch("/api")
  //     .then((res) => res.json())
  //     .then((data) => {setData(data);
  //     console.log(data)
  // });
  // }, []);

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
        {currentItems?.map((data, k) => (
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
                      <iframe src="https://www.simphy.com" id='frame1' height={500} width={900}></iframe>
                  </SkyLight>
                  </div>
                

    </div>
   
  );
}

// function Items({ currentItems }) {
//   return (
//     <>
//       {currentItems &&
//         currentItems.map((item) => (
//           <div>
//             <h3>Item #{item}</h3>
//           </div>
//         ))}
//     </>
//   );
// }

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