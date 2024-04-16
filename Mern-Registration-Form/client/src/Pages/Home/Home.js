import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// import Table.
import Table from '../../Components/Tables/Table.js';

// import addData for show message when we insert any data.
import { addData, dlData, updateData } from '../../Components/Context/ContextProvider.js';
import Alert from 'react-bootstrap/Alert';

// Import API (Client-Side)
import { getAllUserFunction } from '../../Services/Api.js'; // For Get All Data.
import { deleteUserFunction } from '../../Services/Api.js'; // For Delete specific Data.
import { exportToCSV } from '../../Services/Api.js';

// Import Spiner.
import Spiner from '../../Components/Spiner/Spiner.js';
import { toast } from 'react-toastify';

const Home = () => {
 
  const [userData, setUserData] = useState([]);
  const [showPin, setShowPin] = useState(true);

  // For Filteration.
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("All");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("new");

  // For Pagination.
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
   
  // contextProvider.js file.
  const { userAdd, setUserAdd } = useContext(addData); // For when we add new Data.
  const { userDelete, setUserDelete } =  useContext(dlData); // For when we deleted data.
  const { userUpdate, setUserUpdate } = useContext(updateData);

  const history = useNavigate();

  const handleClick = () => {
    history('/register');
  }


  // For NextPage handle.
  const handleNext = () => {
     setPage(()=>{
      if(page === pageCount) return page;
      return page + 1;
     })
  }

  // For PreviousPage handle.
  const handlePrev = () => {
    setPage(()=>{
      if(page === 1) return page;
      return page - 1;
    })
  }

  // For Get All Data from Server.
  const userGetAll = useCallback(async() => {
    try {
      const res = await getAllUserFunction(search, gender, status, sort, page);
      console.log(res);
     //  condition check.
     if(res && res.data) {
       setUserData(res.data.users);
       setPageCount(res.data.pagination.pageCount);
       console.log("Home page inside :: ", res.data);
     } else {
       console.log("no data");
       setUserData(res.data)
     }

    } catch (error) {
      console.log("Error for gettig Data in server :: ", error.message);
    }
 },[search, gender, status, sort, page]);

  // useEffcet Call.
  useEffect(()=>{
    userGetAll(search, gender, status, sort);
    setTimeout(()=>{
      setShowPin(false);
    },1200);
}, [search, gender, status, sort, userGetAll, page]); // Include userGetAll in the dependency array


  // custom confirm.
  const customConfirm = (message) => {
    return new Promise((resolve, reject) => {
        const confirmation = window.confirm(message);
        if (confirmation) {
            resolve();
        } else {
            reject(new Error('User cancelled the operation.'));
        }
    });
  };
  
  // Delete Function.
  const deleteFunction = async (id) => {
      try {
          await customConfirm(`Are you sure you want to delete this user?`);
          const res = await deleteUserFunction(id);
          console.log(res);
          if (res && res.status === 200) {
              setUserDelete(res.data);
              console.log("Data deleted successfully.");
              userGetAll(); //when user delete gayab from display also. 
          }
      } catch (error) {
          console.log("Error:", error.message);
          toast.error(error.message, { position: "top-right" });
      }
  };

  // For download CSV.
  const handleCSV = async() => {
      try {
        const res = await exportToCSV();
        console.log("ye hai ::",res);
        if(res.status === 200) {
          window.open(res.data.downloadUrl, "_blank");
        }
      } catch (error) {
         console.log("denotion",error);
      }
  }

  // For handlePrint.
  const handlePrint = () => {
    window.print();
  }

  return (
    <>
      <div className='container-fluid mt-5 p-4'>
        {/* For User Add Data */}
        {
          userAdd ?  <Alert variant="success" className='mt-2' onClose={() => setUserAdd("")} dismissible>{userAdd.firstName.toUpperCase()} Succesfully Added</Alert> : ""
        }

        {/* For user Delete PopUp message */}
        { 
          userDelete ? <Alert variant="danger" className='mt-2' onClose={() => setUserDelete("")} dismissible>{userDelete.firstName.toUpperCase()} Succesfully Deleted</Alert> : ""
        }
        {/* For user Update PopUp Message */}
        {
          userUpdate ? <Alert variant="success" className='mt-2' onClose={() => setUserUpdate("")} dismissible>{userUpdate.firstName.toUpperCase()} Update Succesfully</Alert> : ""
        }

        <div className='row'>
          {/* Filteration */}
          <div className='col-lg-3 col-md-4 col-12 mb-4 mt-4'>
            <div className='border rounded px-4 py-3 pb-5 text-white'>
              <h5 className='fw-bold border-bottom pb-2'>Filteration</h5>
              
              {/* Filter by Gender */}
              <div className='mb-4 mt-4'>
                <div className='fw-bold mb-2'>Filter By Gender</div>
                <div className="form-check mx-3">
                  <input className="form-check-input" type="radio" name="filterGender" id="all" value="All" onChange={(e)=>setGender(e.target.value)} defaultChecked/>
                  <label className="form-check-label" htmlFor="all">All</label>
                </div>
                <div className="form-check  mx-3">
                  <input className="form-check-input" type="radio" name="filterGender" id="male" value="M" onChange={(e)=>setGender(e.target.value)}/>
                  <label className="form-check-label" htmlFor="male">Male</label>
                </div>
                <div className="form-check  mx-3">
                  <input className="form-check-input" type="radio" name="filterGender" id="female" value="F" onChange={(e)=>setGender(e.target.value)}/>
                  <label className="form-check-label" htmlFor="female">Female</label>
                </div>
              </div>

              {/* Filter by Status */}
              <div className='mb-4'>
                <div className='fw-bold mb-2'>Filter By Status</div>
                <div className="form-check mx-3">
                  <input className="form-check-input" type="radio" name="filterStatus" id="allStatus" defaultChecked value="All" onChange={(e)=>setStatus(e.target.value)}/>
                  <label className="form-check-label" htmlFor="allStatus">All</label>
                </div>
                <div className="form-check mx-3">
                  <input className="form-check-input" type="radio" name="filterStatus" id="active" value="Active" onChange={(e)=>setStatus(e.target.value)}/>
                  <label className="form-check-label" htmlFor="active">Active</label>
                </div>
                <div className="form-check mx-3">
                  <input className="form-check-input" type="radio" name="filterStatus" id="inactive" value="Inactive" onChange={(e)=>setStatus(e.target.value)}/>
                  <label className="form-check-label" htmlFor="inactive">Inactive</label>
                </div>
              </div>

              {/* Sort By Value */}
              <div className="fw-bold mb-2">Sort By Date</div>
                <div className="dropdown mx-3 mb-4">
                  <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Choose
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <button className="dropdown-item" onClick={() => setSort("old")}>Old Data</button>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={() => setSort("new")}>New Data</button>
                    </li>
                  </ul>
                </div>

                {/* Export to CSV and Print PDf  */}
                <div className='mb-4'>
                  <button className='btn btn-info mx-2 my-1' onClick={handleCSV}>Export to CSV</button>
                  <button className='btn btn-secondary mx-2 my-1' onClick={handlePrint}>Print</button>
                </div>
            </div>
          </div>

          {/* Search and Add User */}
          <div className='col-lg-9 col-md-8 col-12 mb-4 mt-4'>
            <div className='row justify-content-center mb-4'>
              {/* Search */}
              <div className='col-lg-6 col-md-6 col-8'>
                <form className="d-flex">
                  <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e)=>setSearch(e.target.value)} />
                  <button className="btn btn-outline-success" type="submit"><Search/></button>
                </form>
              </div>
              
              {/* Add User */}
              <div className='col-lg-2 col-md-4 col-4 d-flex justify-content-end'>
                <button type='button' className='btn btn-success' onClick={handleClick}>
                  <Plus/> Add User
                </button>
              </div>
            </div>
            <div className='row'>
              <div className='col-lg-12 col-md-12 col-12 mb-5'>
                {showPin ? <Spiner/> : <Table userData={userData} deleteFunction={deleteFunction} userGetAll={userGetAll} handleNext={handleNext} handlePrev={handlePrev} page={page} pageCount={pageCount} setPage={setPage} /> }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home;