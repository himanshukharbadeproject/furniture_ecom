import React, { useState } from "react";
import { RiPieChart2Fill } from "react-icons/ri";
import { IoIosPerson } from "react-icons/io";
import { FaMessage } from "react-icons/fa6";
import { FaDroplet } from "react-icons/fa6";
import { RiMenu3Line } from "react-icons/ri";
import { MdShoppingBag } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { MdEditDocument } from "react-icons/md";
import { FaSliders } from "react-icons/fa6";
import { HiDocumentChartBar } from "react-icons/hi2";
import { TbMessages } from "react-icons/tb";
import { TbUserEdit } from "react-icons/tb";
import { BsCursorFill } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { HiMiniArrowsPointingOut } from "react-icons/hi2";
import { SiTarget } from "react-icons/si";
import { Link, Outlet } from "react-router";

export default function MainLayout() {

  let [menu, setMenu]= useState(0);

  let toggleMenu = (value)=>{
    setMenu(menu === value? null: value)
  }

  return (
    <div className="w-full">
        <aside className="bg-blue-950 px-[10px] fixed top-0 left-0 overflow-y-scroll h-screen">
          <div className="border-b-2 pb-[30px] border-white flex justify-center mt-5">
            <img src="https://www.wscubetech.com/images/wscube-tech-logo-2.svg" />
          </div>

          <Link
          to={"/"}
          >
           <div className="flex gap-5 my-[30px] justify-between items-center text-[26px] py-[3px] hover:bg-gray-600 hover: rounded-[5px] group cursor-pointer">
            <div className="flex gap-5 items-center">
              <RiPieChart2Fill className="text-gray-400 group-hover:text-white" />
              <h3 className="text-white font-medium text-[19px]">Dashboard</h3>
            </div>
          </div>
          </Link>

          <div className="flex-col mb-[18px]">
            <div onClick={()=>toggleMenu(1)}
            className="flex gap-5 justify-between py-[3px] items-center text-[26px] hover:bg-gray-600 hover: rounded-[5px] group cursor-pointer">
              <div className="flex gap-5 items-center">
                <IoIosPerson className="text-gray-400 group-hover:text-white" />
                <h3 className="text-white font-medium text-[19px]">Users</h3>
              </div>
              <IoIosArrowDown className="text-[14px] text-white me-1.5" />
            </div>
            <Link to={'/view_user'}>
             <div className={`flex-col mt-1.5 ${menu===1? "block": "hidden"}`}>
              <div className="flex gap-5 justify-between py-[3px] items-center text-[26px] hover:bg-gray-600 hover: rounded-[5px] group cursor-pointer">
                <div className="flex gap-5 items-center">
                  <SiTarget className="text-gray-400 group-hover:text-white text-[13px] ml-2" />
                  <h3 className="text-white font-medium text-[15px]">
                    View Users
                  </h3>
                </div>
              </div>
            </div>
            </Link>
          </div>

          <div className="flex-col mb-[18px]">
            <div 
            onClick={()=>toggleMenu(2)}
            className="flex gap-5 justify-between py-[3px] items-center text-[26px] hover:bg-gray-600 hover: rounded-[5px] group cursor-pointer">
              <div className="flex gap-5 items-center">
                <FaMessage className="text-gray-400 group-hover:text-white" />
                <h3 className="text-white font-medium text-[19px]">Enquiry</h3>
              </div>
              <IoIosArrowDown className="text-[14px] text-white me-1.5" />
            </div>
            <div className={`flex-col ${menu===2? "block": "hidden"}`}>
              <Link to={"/contact_enquiry"}>
               <div className="flex gap-5 justify-between py-[3px] items-center text-[26px] hover:bg-gray-600 hover: rounded-[5px] group cursor-pointer">
                <div className="flex gap-5 items-center">
                  <SiTarget className="text-gray-400 group-hover:text-white text-[13px] ml-2" />
                  <h3 className="text-white font-medium text-[15px]">
                    Contact Enquiry
                  </h3>
                </div>
              </div>
              </Link>
              <Link to={"/newsletters"}>
               <div className="flex gap-5 justify-between py-[3px] items-center text-[26px] hover:bg-gray-600 hover: rounded-[5px] group cursor-pointer">
                <div className="flex gap-5 items-center">
                  <SiTarget className="text-gray-400 group-hover:text-white text-[13px] ml-2" />
                  <h3 className="text-white font-medium text-[15px]">
                    Newsletter
                  </h3>
                </div>
              </div>
              </Link>
            </div>
          </div>

          <div className="flex-col mb-[18px]">
            <div 
            onClick={()=>toggleMenu(3)}
            className="flex gap-5 justify-between py-[3px] items-center text-[26px] hover:bg-gray-600 hover: rounded-[5px] group cursor-pointer">
              <div className="flex gap-5 items-center">
                <FaDroplet className="text-gray-400 group-hover:text-white" />
                <h3 className="text-white font-medium text-[19px]">Colors</h3>
              </div>
              <IoIosArrowDown className="text-[14px] text-white me-1.5" />
            </div>
            <div className={`flex-col ${menu === 3? "block": "hidden"}`}>
              <Link to={'/add_colors'}>
               <div className="flex gap-5 justify-between py-[3px] items-center text-[26px] hover:bg-gray-600 hover: rounded-[5px] group cursor-pointer">
                <div className="flex gap-5 items-center">
                  <SiTarget className="text-gray-400 group-hover:text-white text-[13px] ml-2" />
                  <h3 className="text-white font-medium text-[15px]">
                    Add Colors
                  </h3>
                </div>
              </div>
              </Link>
              <Link to={'/view_color'}>
               <div className="flex gap-5 justify-between py-[3px] items-center text-[26px] hover:bg-gray-600 hover: rounded-[5px] group cursor-pointer">
                <div className="flex gap-5 items-center">
                  <SiTarget className="text-gray-400 group-hover:text-white text-[13px] ml-2" />
                  <h3 className="text-white font-medium text-[15px]">
                    View Colors
                  </h3>
                </div>
              </div>
              </Link>
            </div>
          </div>

          <div className="flex-col mb-[18px]">
            <div 
            onClick={()=>toggleMenu(4)}
            className="flex gap-5 justify-between py-[3px] items-center text-[26px] hover:bg-gray-600 hover: rounded-[5px] group cursor-pointer">
              <div className="flex gap-5 items-center">
                <HiMiniArrowsPointingOut className="text-gray-400 group-hover:text-white" />
                <h3 className="text-white font-medium text-[19px]">Materials</h3>
              </div>
              <IoIosArrowDown className="text-[14px] text-white me-1.5" />
            </div>
            <div className={`flex-col ${menu === 4? "block": "hidden"}`}>
              <Link to={'/add_material'}>
               <div className="flex gap-5 justify-between py-[3px] items-center text-[26px] hover:bg-gray-600 hover: rounded-[5px] group cursor-pointer">
                <div className="flex gap-5 items-center">
                  <SiTarget className="text-gray-400 group-hover:text-white text-[13px] ml-2" />
                  <h3 className="text-white font-medium text-[15px]">
                    Add Materials
                  </h3>
                </div>
              </div>
              </Link>
              <Link to={'/view_material'}>
               <div className="flex gap-5 justify-between py-[3px] items-center text-[26px] hover:bg-gray-600 hover: rounded-[5px] group cursor-pointer">
                <div className="flex gap-5 items-center">
                  <SiTarget className="text-gray-400 group-hover:text-white text-[13px] ml-2" />
                  <h3 className="text-white font-medium text-[15px]">
                    View Materials
                  </h3>
                </div>
              </div>
              </Link>
            </div>
          </div>

          <div className="flex-col mb-[18px]">
            <div 
            onClick={()=>toggleMenu(5)}
            className="flex gap-5 justify-between py-[3px] items-center text-[26px] hover:bg-gray-600 hover: rounded-[5px] group cursor-pointer">
              <div className="flex gap-5 items-center">
                <RiMenu3Line className="text-gray-400 group-hover:text-white" />
                <h3 className="text-white font-medium text-[19px]">
                  Parent Category
                </h3>
              </div>
              <IoIosArrowDown className="text-[14px] text-white me-1.5" />
            </div>
            <div className={`flex-col ${menu === 5? "block": "hidden"}`}>
              <Link to={'/add_category'}>
               <div className="flex gap-5 justify-between py-[3px] items-center text-[26px] hover:bg-gray-600 hover: rounded-[5px] group cursor-pointer">
                <div className="flex gap-5 items-center">
                  <SiTarget className="text-gray-400 group-hover:text-white text-[13px] ml-2" />
                  <h3 className="text-white font-medium text-[15px]">
                    Add Category
                  </h3>
                </div>
              </div>
              </Link>
              <Link to={'/view_category'}>
               <div className="flex gap-5 justify-between py-[3px] items-center text-[26px] hover:bg-gray-600 hover: rounded-[5px] group cursor-pointer">
                <div className="flex gap-5 items-center">
                  <SiTarget className="text-gray-400 group-hover:text-white text-[13px] ml-2" />
                  <h3 className="text-white font-medium text-[15px]">
                    View Category
                  </h3>
                </div>
              </div>
              </Link>
            </div>
          </div>

          <div className="flex-col mb-[18px]">
            <div 
            onClick={()=>toggleMenu(6)}
            className="flex gap-5 justify-between py-[3px] items-center text-[26px] hover:bg-gray-600 hover: rounded-[5px] group cursor-pointer">
              <div className="flex gap-5 items-center">
                <RiMenu3Line className="text-gray-400 group-hover:text-white" />
                <h3 className="text-white font-medium text-[19px]">
                  Sub Category
                </h3>
              </div>
              <IoIosArrowDown className="text-[14px] text-white me-1.5" />
            </div>
            <div className={`flex-col ${menu === 6? "block": "hidden"}`}>
              <Link to={'/add_subcategory'}>
               <div className="flex gap-5 justify-between py-[3px] items-center text-[26px] hover:bg-gray-600 hover: rounded-[5px] group cursor-pointer">
                <div className="flex gap-5 items-center">
                  <SiTarget className="text-gray-400 group-hover:text-white text-[13px] ml-2" />
                  <h3 className="text-white font-medium text-[15px]">
                    Add Sub Category
                  </h3>
                </div>
              </div>
              </Link>
              <Link to={'/view_subcategory'}>
               <div className="flex gap-5 justify-between py-[3px] items-center text-[26px] hover:bg-gray-600 hover: rounded-[5px] group cursor-pointer">
                <div className="flex gap-5 items-center">
                  <SiTarget className="text-gray-400 group-hover:text-white text-[13px] ml-2" />
                  <h3 className="text-white font-medium text-[15px]">
                    View Sub Category
                  </h3>
                </div>
              </div>
              </Link>
            </div>
          </div>

          <div className="flex-col mb-[18px]">
            <div 
            onClick={()=>toggleMenu(7)}
            className="flex gap-5 justify-between py-[3px] items-center text-[26px] hover:bg-gray-600 hover: rounded-[5px] group cursor-pointer">
              <div className="flex gap-5 items-center">
                <RiMenu3Line className="text-gray-400 group-hover:text-white" />
                <h3 className="text-white font-medium text-[19px]">
                  Sub Sub Category
                </h3>
              </div>
              <IoIosArrowDown className="text-[14px] text-white me-1.5" />
            </div>
            <div className={`flex-col ${menu === 7? "block": "hidden"}`}>
              <Link to={'/add_subsubcategory'}>
               <div className="flex gap-5 justify-between py-[3px] items-center text-[26px] hover:bg-gray-600 hover: rounded-[5px] group cursor-pointer">
                <div className="flex gap-5 items-center">
                  <SiTarget className="text-gray-400 group-hover:text-white text-[13px] ml-2" />
                  <h3 className="text-white font-medium text-[15px]">
                    Add Sub Sub Category
                  </h3>
                </div>
              </div>
              </Link>
              <Link to={'/view_subsubcategory'}>
                <div className="flex gap-5 justify-between py-[3px] items-center text-[26px] hover:bg-gray-600 hover: rounded-[5px] group cursor-pointer">
                <div className="flex gap-5 items-center">
                  <SiTarget className="text-gray-400 group-hover:text-white text-[13px] ml-2" />
                  <h3 className="text-white font-medium text-[15px]">
                    View Sub Sub Category
                  </h3>
                </div>
              </div>
              </Link>
            </div>
          </div>

          <div className="flex-col mb-[18px]">
            <div 
            onClick={()=>toggleMenu(8)}
            className="flex gap-5 justify-between py-[3px] items-center text-[26px] hover:bg-gray-600 hover: rounded-[5px] group cursor-pointer">
              <div className="flex gap-5 items-center">
                <MdShoppingBag className="text-gray-400 group-hover:text-white" />
                <h3 className="text-white font-medium text-[19px]">Products</h3>
              </div>
              <IoIosArrowDown className="text-[14px] text-white me-1.5" />
            </div>
            <div className={`flex-col ${menu === 8? "block": "hidden"}`}>
              <Link to={'/add_product'}>
              <div className="flex gap-5 justify-between py-[3px] items-center text-[26px] hover:bg-gray-600 hover: rounded-[5px] group cursor-pointer">
                <div className="flex gap-5 items-center">
                  <SiTarget className="text-gray-400 group-hover:text-white text-[13px] ml-2" />
                  <h3 className="text-white font-medium text-[15px]">
                    Add Products
                  </h3>
                </div>
              </div>
              </Link>
              <Link to={'/view_product'}>
               <div className="flex gap-5 justify-between py-[3px] items-center text-[26px] hover:bg-gray-600 hover: rounded-[5px] group cursor-pointer">
                <div className="flex gap-5 items-center">
                  <SiTarget className="text-gray-400 group-hover:text-white text-[13px] ml-2" />
                  <h3 className="text-white font-medium text-[15px]">
                    View Products
                  </h3>
                </div>
              </div>
              </Link>
            </div>
          </div>

          <div className="flex-col mb-[18px]">
            <div 
            onClick={()=>toggleMenu(9)}
            className="flex gap-5 justify-between py-[3px] items-center text-[26px] hover:bg-gray-600 hover: rounded-[5px] group cursor-pointer">
              <div className="flex gap-5 items-center">
                <FaHistory className="text-gray-400 group-hover:text-white" />
                <h3 className="text-white font-medium text-[19px]">
                  Why Choose Us
                </h3>
              </div>
              <IoIosArrowDown className="text-[14px] text-white me-1.5" />
            </div>
            <div className={`flex-col ${menu === 9? "block": "hidden"}`}>
              <Link to={'/add_choose_us'}>
               <div className="flex gap-5 justify-between py-[3px] items-center text-[26px] hover:bg-gray-600 hover: rounded-[5px] group cursor-pointer">
                <div className="flex gap-5 items-center">
                  <SiTarget className="text-gray-400 group-hover:text-white text-[13px] ml-2" />
                  <h3 className="text-white font-medium text-[15px]">
                    Add Why Choose Us
                  </h3>
                </div>
              </div>
              </Link>
              <Link to={'/view_choose_us'}>
               <div className="flex gap-5 justify-between py-[3px] items-center text-[26px] hover:bg-gray-600 hover: rounded-[5px] group cursor-pointer">
                <div className="flex gap-5 items-center">
                  <SiTarget className="text-gray-400 group-hover:text-white text-[13px] ml-2" />
                  <h3 className="text-white font-medium text-[15px]">
                    View Why Choose Us
                  </h3>
                </div>
              </div>
              </Link>
            </div>
          </div>

          <div className="flex-col mb-[18px]">
            <div 
            onClick={()=>toggleMenu(10)}
            className="flex gap-5 justify-between py-[3px] items-center text-[26px] hover:bg-gray-600 hover: rounded-[5px] group cursor-pointer">
              <div className="flex gap-5 items-center">
                <MdEditDocument className="text-gray-400 group-hover:text-white" />
                <h3 className="text-white font-medium text-[19px]">Orders</h3>
              </div>
              <IoIosArrowDown className="text-[14px] text-white me-1.5" />
            </div>
            <div className={`flex-col ${menu === 10? "block": "hidden"}`}>
              <Link to={'/order'}>
               <div className="flex gap-5 justify-between py-[3px] items-center text-[26px] hover:bg-gray-600 hover: rounded-[5px] group cursor-pointer">
                <div className="flex gap-5 items-center">
                  <SiTarget className="text-gray-400 group-hover:text-white text-[13px] ml-2" />
                  <h3 className="text-white font-medium text-[15px]">Orders</h3>
                </div>
              </div>
              </Link>
            </div>
          </div>

          <div className="flex-col mb-[18px]">
            <div 
            onClick={()=>toggleMenu(11)}
            className="flex gap-5 justify-between py-[3px] items-center text-[26px] hover:bg-gray-600 hover: rounded-[5px] group cursor-pointer">
              <div className="flex gap-5 items-center">
                <FaSliders className="text-gray-400 group-hover:text-white" />
                <h3 className="text-white font-medium text-[19px]">Sliders</h3>
              </div>
              <IoIosArrowDown className="text-[14px] text-white me-1.5" />
            </div>
            <div className={`flex-col ${menu === 11? "block": "hidden"}`}>
              <Link to={'/add_slider'}>
               <div className="flex gap-5 justify-between py-[3px] items-center text-[26px] hover:bg-gray-600 hover: rounded-[5px] group cursor-pointer">
                <div className="flex gap-5 items-center">
                  <SiTarget className="text-gray-400 group-hover:text-white text-[13px] ml-2" />
                  <h3 className="text-white font-medium text-[15px]">
                    Add Sliders
                  </h3>
                </div>
              </div>
              </Link>
              <Link to={'/view_slider'}>
               <div className="flex gap-5 justify-between py-[3px] items-center text-[26px] hover:bg-gray-600 hover: rounded-[5px] group cursor-pointer">
                <div className="flex gap-5 items-center">
                  <SiTarget className="text-gray-400 group-hover:text-white text-[13px] ml-2" />
                  <h3 className="text-white font-medium text-[15px]">
                    View Sliders
                  </h3>
                </div>
              </div>
              </Link>
            </div>
          </div>

          <div className="flex-col mb-[18px]">
            <div 
            onClick={()=>toggleMenu(12)}
            className="flex gap-5 justify-between py-[3px] items-center text-[26px] hover:bg-gray-600 hover: rounded-[5px] group cursor-pointer">
              <div className="flex gap-5 items-center">
                <BsCursorFill className="text-gray-400 group-hover:text-white" />
                <h3 className="text-white font-medium text-[19px]">Country</h3>
              </div>
              <IoIosArrowDown className="text-[14px] text-white me-1.5" />
            </div>
            <div className={`flex-col ${menu === 12? "block": "hidden"}`}>
              <Link to={'/add_country'}>
               <div className="flex gap-5 justify-between py-[3px] items-center text-[26px] hover:bg-gray-600 hover: rounded-[5px] group cursor-pointer">
                <div className="flex gap-5 items-center">
                  <SiTarget className="text-gray-400 group-hover:text-white text-[13px] ml-2" />
                  <h3 className="text-white font-medium text-[15px]">
                    Add Country
                  </h3>
                </div>
              </div>
              </Link>
              <Link to={'/view_country'}>
               <div className="flex gap-5 justify-between py-[3px] items-center text-[26px] hover:bg-gray-600 hover: rounded-[5px] group cursor-pointer">
                <div className="flex gap-5 items-center">
                  <SiTarget className="text-gray-400 group-hover:text-white text-[13px] ml-2" />
                  <h3 className="text-white font-medium text-[15px]">
                    View Country
                  </h3>
                </div>
              </div>
              </Link>
            </div>
          </div>

          <div className="flex-col mb-[18px]">
            <div 
            onClick={()=>toggleMenu(13)}
            className="flex gap-5 justify-between py-[3px] items-center text-[26px] hover:bg-gray-600 hover: rounded-[5px] group cursor-pointer">
              <div className="flex gap-5 items-center">
                <TbUserEdit className="text-gray-400 group-hover:text-white" />
                <h3 className="text-white font-medium text-[19px]">Testimonials</h3>
              </div>
              <IoIosArrowDown className="text-[14px] text-white me-1.5" />
            </div>
            <div className={`flex-col ${menu === 13? "block": "hidden"}`}>
              <Link to={'/add_testimonial'}>
               <div className="flex gap-5 justify-between py-[3px] items-center text-[26px] hover:bg-gray-600 hover: rounded-[5px] group cursor-pointer">
                <div className="flex gap-5 items-center">
                  <SiTarget className="text-gray-400 group-hover:text-white text-[13px] ml-2" />
                  <h3 className="text-white font-medium text-[15px]">
                    Add Testimonials
                  </h3>
                </div>
              </div>
              </Link>
              <Link to={'/view_testimonial'}>
               <div className="flex gap-5 justify-between py-[3px] items-center text-[26px] hover:bg-gray-600 hover: rounded-[5px] group cursor-pointer">
                <div className="flex gap-5 items-center">
                  <SiTarget className="text-gray-400 group-hover:text-white text-[13px] ml-2" />
                  <h3 className="text-white font-medium text-[15px]">
                    View Testimonials
                  </h3>
                </div>
              </div>
              </Link>
            </div>
          </div>

          <div className="flex-col mb-[18px]">
            <div 
            onClick={()=>toggleMenu(14)}
            className="flex gap-5 justify-between py-[3px] items-center text-[26px] hover:bg-gray-600 hover: rounded-[5px] group cursor-pointer">
              <div className="flex gap-5 items-center">
                <TbMessages className="text-gray-400 group-hover:text-white" />
                <h3 className="text-white font-medium text-[19px]">FAQs</h3>
              </div>
              <IoIosArrowDown className="text-[14px] text-white me-1.5" />
            </div>
            <div className={`flex-col ${menu === 14? "block": "hidden"}`}>
              <Link to={'/add_faqs'}>
               <div className="flex gap-5 justify-between py-[3px] items-center text-[26px] hover:bg-gray-600 hover: rounded-[5px] group cursor-pointer">
                <div className="flex gap-5 items-center">
                  <SiTarget className="text-gray-400 group-hover:text-white text-[13px] ml-2" />
                  <h3 className="text-white font-medium text-[15px]">
                    Add FAQs
                  </h3>
                </div>
              </div>
              </Link>
              <Link to={'/view_faqs'}>
               <div className="flex gap-5 justify-between py-[3px] items-center text-[26px] hover:bg-gray-600 hover: rounded-[5px] group cursor-pointer">
                <div className="flex gap-5 items-center">
                  <SiTarget className="text-gray-400 group-hover:text-white text-[13px] ml-2" />
                  <h3 className="text-white font-medium text-[15px]">
                    View FAQs
                  </h3>
                </div>
              </div>
              </Link>
            </div>
          </div>

          <div className="flex gap-5 mb-[18px] justify-between items-center py-[3px] text-[26px] hover:bg-gray-600 hover: rounded-[5px] group cursor-pointer">
            <div 
            onClick={()=>toggleMenu(15)}
            className="flex gap-5 items-center">
              <HiDocumentChartBar className="text-gray-400 group-hover:text-white" />
              <h3 className="text-white font-medium text-[18px]">
                Terms & Conditions
              </h3>
            </div>
            <IoIosArrowDown className="text-[14px] text-white me-1.5" />
          </div>
        </aside>
        <div className="grid grid-cols-[18%_auto]">
          <aside className="h-screen bg-green-400"></aside>
           <Outlet/>
        </div>
    </div>
  );
}

