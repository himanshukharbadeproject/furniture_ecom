import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FaFilter } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import { Link } from "react-router";
import { FaSearch } from "react-icons/fa";
import ResponsivePagination from 'react-responsive-pagination';
import Header from "../../common/Header";

export default function View_Material() {

  let apiBaseUrl = import.meta.env.VITE_APIBASEURL;

  let [materialList, setMaterialList] = useState([])
  let [ids,setIds] = useState([])
  let [selectAll, setSelectAll] = useState(false)
  let [materialName, setMaterialName] = useState("")
  let [currentPage, setCurrentPage] = useState(1)
  let [totalPages, setTotalPages] = useState(1)
  let [limit, setLimit] = useState(1)
  let [materialOrder, setMaterialOrder] = useState(null)

  let getMaterial = ()=>{
    axios.get(`${apiBaseUrl}material/view`,{
      params:{
        materialName,
        currentPage,
        materialOrder
      }
    }).then((res)=>res.data).then((finalRes)=>{
      setMaterialList(finalRes.viewRes)
      setTotalPages(finalRes.totalPages)
      setLimit(finalRes.limit)
    })
  }

  let allCheckedBoxes = (event)=>{
    if(event.target.checked && !ids.includes(event.target.value)){
      setIds([...ids,event.target.value])
    }
    else{
      setIds(ids.filter((v)=>v!=event.target.value))
    }
  }

  let multiDelete = ()=>{
    console.log("selected Ids: "+ids)
    axios.post(`${apiBaseUrl}material/multidel`,{ids}).then((res)=>res.data).then((finalRes)=>
      {
        getMaterial();
        setIds([])
      });
  }

  let changeStatus = ()=>{
    axios.post(`${apiBaseUrl}material/change-status`,{ids}).then((res)=>res.data).then((finalRes)=>{
      getMaterial();
      setIds([])
    });
  }

  let handleAll = (event)=>{
    if(event.target.checked){
      let allIds = materialList.map((items)=>items._id)
      setIds(allIds)
    }
    else{
      setIds([])
    }
    setSelectAll(!selectAll)
  }

  useEffect(()=>{
    if(materialList.length>=1){
      if(materialList.length==ids.length){
        setSelectAll(true)
      }
      else{
        setSelectAll(false)
      }
    }
  },[ids])

  useEffect(()=>{
    getMaterial();
  },[materialName,currentPage,materialOrder])

  return (
    <div className="border">
      <Header/>
      <div className="border-b-[3px] border-gray-300">
        <h2 className="text-left ps-[20px] text-[18px] text-gray-600 font-semibold my-[10px]">
          Home / Material / View
        </h2>
      </div>



      <div className="flex mx-[20px] my-[30px] w-[620px]">
        <input
        placeholder="Enter Material Name"
        onChange={(event)=>setMaterialName(event.target.value)}
        type="text" className="h-[40px] w-[300px] px-2.5 border me-[20px]"/>

        <input 
        placeholder="Enter Material Order"
        onChange={(event)=>setMaterialOrder(event.target.value)}
        type="number" className="h-[40px] w-[300px] px-2.5 border"/>

        <button
        onClick={getMaterial}
        className="bg-blue-600 h-10 w-[50px]"><FaSearch className="text-white mt-0.5 ms-3.5 text-[20px]"/></button>
      </div>



      <div className="flex justify-between border mx-[20px] px-[20px] items-center mt-[40px] bg-blue-50 py-[10px] rounded-t-[10px]">
        <h3 className="font-medium text-[25px]">View Material</h3>
        <div className="flex gap-[10px]">
          <div className="bg-blue-600 p-[5px] rounded-[50%]">
            <FaFilter className="text-white text-[19px] mt-[7px] mx-[10px] cursor-pointer" />
          </div>
          <button 
          onClick={changeStatus}
          className="text-white bg-green-600 text-[16px] rounded-[10px] p-[10px] font-medium px-[15px] cursor-pointer">
            Change Status
          </button>
          <button 
          onClick={multiDelete}
          className="text-white bg-red-600 p-[10px] rounded-[10px] px-[15px] font-medium cursor-pointer">
            Delete
          </button>
        </div>
      </div>
      <table className="mx-[20px] bg-blue-950 py-[40px] text-white w-[96%] text-left border-collapse">
        
        <colgroup>
          <col className="w-[5%]" />
          <col className="w-[10%]"/>
          <col className="w-[40%]" /> 
          <col className="w-[20%]" /> 
          <col className="w-[15%]" /> 
          <col className="w-[10%]" /> 
        </colgroup>

        <thead className="font-bold">
          <tr>
            <th className="border border-white text-[15px] p-2">
              <input 
              onChange={handleAll}
              checked={selectAll}
              type="checkbox" className="ms-[14px]" />
            </th>
            <th className="border border-white text-[15px]">SR. NO.</th>
            <th className="border border-white text-[15px]">MATERIAL NAME</th>
            <th className="border border-white text-[15px]">ORDER</th>
            <th className="border border-white text-[15px]">STATUS</th>
            <th className="border border-white text-[15px]">ACTION</th>
          </tr>
        </thead>

        <tbody>{
          materialList.length>=1?
          materialList.map((items,index)=>{
            return(
              <tr key={items._id}>
            <td className="border border-white p-4">
              <input type="checkbox"
              checked={ids.includes(items._id)}
                value={items._id}
                onChange={allCheckedBoxes}
              className="ms-[8px]" />
            </td>
            <td className="border border-white px-[20px]">{((currentPage-1)*limit)+index+1}</td>
            <td className="border border-white">{items.materialName}</td>
            <td className="border border-white">{items.materialOrder}</td>
            <td className="border border-white">
              {
                items.materialStatus? <button className="bg-green-500 px-3 py-1 rounded-md font-medium cursor-pointer">
                Active
              </button>
              :
              <button className="bg-red-500 px-3 py-1 rounded-md font-medium cursor-pointer">
                Deactive
              </button> 
              }
            </td>
            <td className="border border-white">
              <Link to={`/edit_material/${items._id}`}>
                <div className="mx-[30px] py-[8px] bg-blue-800 rounded-[50%] flex items-center justify-center cursor-pointer">
                <MdOutlineEdit className="text-white text-[20px]" />
              </div>
              </Link>
            </td>
          </tr>
            );
          })
          :
            <tr>
              <td colSpan={6}>No Data Found</td>
            </tr>
          }
        </tbody>
      </table>
      <div className="py-[50px]">
          <ResponsivePagination
            current={currentPage}
            total={totalPages}
            onPageChange={setCurrentPage}
          />
      </div>
    </div>
  );
}


