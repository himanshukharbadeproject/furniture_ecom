// import axios from "axios";
// import { useState } from "react";
// import { AiOutlineMenu } from "react-icons/ai";
// import { ToastContainer, toast } from "react-toastify";

// export default function Add_Material() {
//   let apiBaseUrl = import.meta.env.VITE_APIBASEURL;

//   let [materialName, setMaterialName] = useState("");
//   let [materialOrder, setMaterialOrder] = useState("");

//   let MaterialSave = (event) => {
//     event.preventDefault();
//     let obj = {
//       materialName,
//       materialOrder: Number(materialOrder),
//       materialStatus: true,
//     };
//     axios
//       .post(`${apiBaseUrl}material/insert`, obj)
//       .then((res) => res.data)
//       .then((finalRes) => {
//         if (finalRes.status) {
//           toast.success(finalRes.msg);
//         } else {
//           toast.error(finalRes.msg);
//         }
//         setMaterialName("");
//         setMaterialOrder("");
//       });
//   };

//   return (
//     <div className="border">
//       <ToastContainer />
//       <header className="py-[10px] border-b-[3px] border-gray-300">
//         <div className="flex justify-between items-center">
//           <div className="flex gap-[20px] px-[20px]">
//             <AiOutlineMenu className="text-[26px] text-gray-500 mt-[5px]" />
//             <p className="text-[22px] text-gray-500 font-semibold">Dashboard</p>
//           </div>
//           <img
//             src="https://www.tribuneindia.com/sortd-service/imaginary/v22-01/jpg/large/high?url=dGhldHJpYnVuZS1zb3J0ZC1wcm8tcHJvZC1zb3J0ZC9tZWRpYTJkODg3YTMwLTRlNmYtMTFlZi04MGUwLTg5MTBmNjk1YjZkZS5qcGc="
//             alt=""
//             className="w-[45px] h-[45px] rounded-[50%] mr-[20px]"
//           />
//         </div>
//       </header>
//       <div className="border-b-[3px] border-gray-300">
//         <h2 className="text-left ps-[20px] text-[18px] text-gray-600 font-semibold my-[10px]">
//           Home / Material / Add
//         </h2>
//       </div>

//       <div className="border mx-[20px] px-[20px] text-left mt-[40px] bg-blue-50 py-[10px] rounded-t-[10px]">
//         <h3 className="font-medium text-[25px]">Add Material</h3>
//       </div>
//       <form
//         onSubmit={MaterialSave}
//         className="border mx-[20px] px-[10px] ps-[30px] text-left  py-[10px]"
//       >
//         <h3 className="mb-[5px]">Material Name</h3>
//         <input
//           value={materialName}
//           onChange={(event) => setMaterialName(event.target.value)}
//           type="text"
//           placeholder="Material Name"
//           className="border py-[5px] w-[100%] rounded-[5px] px-[10px] mb-[20px]"
//         />
//         <h3 className="mb-[5px]">Order</h3>
//         <input
//           value={materialOrder}
//           onChange={(event) => setMaterialOrder(event.target.value)}
//           type="number"
//           placeholder="Order"
//           className="border py-[5px] w-[100%] rounded-[5px] px-[10px] mb-[20px]"
//         />
//         <button className="py-[7px] px-[20px] bg-purple-700 rounded-[5px] text-white font-medium my-[30px] cursor-pointer">
//           Add Material
//         </button>
//       </form>
//     </div>
//   );
// }

import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { useNavigate, useParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import Header from "../../common/Header";

export default function Add_Material() {
  let navigate = useNavigate();

  let apiBaseUrl = import.meta.env.VITE_APIBASEURL;

  let {id} = useParams();
  // console.log(id)

  let [formValue, setFormValue] = useState({
    materialName: "",
    materialOrder: "",
  });

  let MaterialSave = (event) => {
    if(id){
      event.preventDefault();
      axios.put(`${apiBaseUrl}material/update/${id}`,formValue).then((res)=>res.data).then((finalRes)=>{
        if (finalRes.status) {
          toast.success(finalRes.msg);

          setInterval(() => {
            navigate("/view_material");
          }, 2000);
        } else {
          toast.error(finalRes.msg);
        }
        setFormValue({
          materialName: "",
          materialOrder: "",
        });
      })
    }
    else{
      event.preventDefault();
    axios
      .post(`${apiBaseUrl}material/insert`, formValue)
      .then((res) => res.data)
      .then((finalRes) => {
        if (finalRes.status) {
          toast.success(finalRes.msg);

          setInterval(() => {
            navigate("/view_material");
          }, 2000);
        } else {
          toast.error(finalRes.msg);
        }
        setFormValue({
          materialName: "",
          materialOrder: "",
        });
      });
    }
  };

  useEffect(()=>{

    setFormValue({
      materialName:"",
      materialOrder:""
    })

    if(id){
      console.log("ID:"+id)
      axios.get(`${apiBaseUrl}material/view/${id}`).then((res)=>res.data).then((finalRes)=>{
        setFormValue({
          materialName: finalRes.singleMaterialRes.materialName,
          materialOrder: finalRes.singleMaterialRes.materialOrder,
          materialStatus: finalRes.singleMaterialRes.materialStatus
        })
      })
    }
  },[id])

  return (
    <div className="border">
      <ToastContainer />
      <Header/>
      <div className="border-b-[3px] border-gray-300">
        <h2 className="text-left ps-[20px] text-[18px] text-gray-600 font-semibold my-[10px]">
          Home / Material / Add
        </h2>
      </div>

      <div className="border mx-[20px] px-[20px] text-left mt-[40px] bg-blue-50 py-[10px] rounded-t-[10px]">
        <h3 className="font-medium text-[25px]">Add Material</h3>
      </div>
      <form
        onSubmit={MaterialSave}
        className="border mx-[20px] px-[10px] ps-[30px] text-left  py-[10px]"
      >
        <h3 className="mb-[5px]">Material Name</h3>
        <input
          value={formValue.materialName}
          onChange={(e) => {
            let obj = { ...formValue };
            obj["materialName"] = e.target.value;
            setFormValue(obj);
          }}
          type="text"
          placeholder="Material Name"
          className="border py-[5px] w-[100%] rounded-[5px] px-[10px] mb-[20px]"
        />
        <h3 className="mb-[5px]">Order</h3>
        <input
          value={formValue.materialOrder}
          onChange={(e) => {
            let obj = { ...formValue };
            obj["materialOrder"] = e.target.value;
            setFormValue(obj);
          }}
          type="number"
          placeholder="Order"
          className="border py-[5px] w-[100%] rounded-[5px] px-[10px] mb-[20px]"
        />
        <button className="py-[7px] px-[20px] bg-purple-700 rounded-[5px] text-white font-medium my-[30px] cursor-pointer">
          {id? "Update Material" : "Add Material"}
        </button>
      </form>
    </div>
  );
}
