import React, { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { SketchPicker } from "react-color";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router";
import Header from "../../common/Header";

export default function Add_FAQs() {

  let [question, setQuestion] = useState("")
  let [answer, setAnswer] = useState("")
  let [faqOrder, setFaqOrder] = useState("")

  let apiBaseUrl = import.meta.env.VITE_APIBASEURL;

  let navigate = useNavigate()

  let {id} = useParams()

  useEffect(()=>{
    setQuestion("")
      setAnswer("")
      setFaqOrder("")
    if(id){
      axios.get(`${apiBaseUrl}faq/view/${id}`).then((res)=>res.data).then((finalRes)=>{
        setQuestion(finalRes.singleData.question)
        setAnswer(finalRes.singleData.answer)
        setFaqOrder(finalRes.singleData.faqOrder)
      })
    }
  },[id])

  let obj = {
    question,
    answer,
    faqOrder: Number(faqOrder)
  }

  let FaqSave = (event)=>{
   if(id){
    event.preventDefault();
    axios.put(`${apiBaseUrl}faq/update/${id}`,obj)
    .then((res)=>res.data).then((finalRes)=>{
      if(finalRes.status){
        toast.success(finalRes.msg)
        setInterval(()=>{
          navigate("/view_faqs")
        },2000)
      }
      else{
        toast.error(finalRes.msg)
      }
      setQuestion("")
      setAnswer("")
      setFaqOrder("")
    })
   }
   else{
     event.preventDefault();
    axios.post(`${apiBaseUrl}faq/insert`,obj)
    .then((res)=>res.data).then((finalRes)=>{
      if(finalRes.status){
        toast.success(finalRes.msg)
        setInterval(()=>{
          navigate("/view_faqs")
        },2000)
      }
      else{
        toast.error(finalRes.msg)
      }
      setQuestion("")
      setAnswer("")
      setFaqOrder("")
    })
   }
  }

  return (
          <div className="border">
            <ToastContainer />
            <Header/>
            <div className="border-b-[3px] border-gray-300">
              <h2 className="text-left ps-[20px] text-[18px] text-gray-600 font-semibold my-[10px]">
                Home / FAQ / Add
              </h2>
            </div>

            <div className="border mx-[20px] px-[20px] text-left mt-[40px] bg-blue-50 py-[10px] rounded-t-[10px]">
              <h3 className="font-medium text-[25px]">Add FAQ</h3>
            </div>
            <form 
            onSubmit={FaqSave}
            className="border mx-[20px] px-[10px] ps-[30px] text-left  py-[10px]">
              <h3 className="mb-[5px]">Question</h3>
              <input
                value={question}
                onChange={(e)=>setQuestion(e.target.value)}
                type="text"
                placeholder="Question"
                className="border py-[5px] w-[100%] rounded-[5px] px-[10px] mb-[20px]"
              />
              <h3 className="mb-[5px]">Answer</h3>
              <textarea
                value={answer}
                onChange={(e)=>setAnswer(e.target.value)}
                type="text"
                className="border py-[5px] w-[100%] rounded-[5px] px-[10px] mb-[20px] h-[100px]"
              />
              <h3 className="mb-[5px]">Order</h3>
              <input
                value={faqOrder}
                onChange={(e)=>setFaqOrder(e.target.value)}
                type="text"
                placeholder="Enter Order"
                className="border py-[5px] w-[100%] rounded-[5px] px-[10px] mb-[20px]"
              />
              <button className="py-[7px] px-[20px] bg-purple-700 rounded-[5px] text-white font-medium my-[30px] cursor-pointer">{id? "Update FAQ": "Add FAQ"}</button>
            </form>
          </div>
  );
}
