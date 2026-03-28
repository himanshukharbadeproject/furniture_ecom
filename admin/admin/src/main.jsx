import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import View_User from './pages/Users/View_User.jsx'
import Contact_Enquiry from './pages/Contact_Enquiry/Contact_Enquiry.jsx'
import Newsletters from './pages/Contact_Enquiry/Newsletters.jsx'
import Add_Colors from './pages/Colors/Add_Colors.jsx'
import View_Color from './pages/Colors/View_Color.jsx'
import Add_Material from './pages/Material/Add_Material.jsx'
import View_Material from './pages/Material/View_Material.jsx'
import Add_Category from './pages/Category/Add_Category.jsx'
import View_Category from './pages/Category/View_Category.jsx'
import Add_SubCategory from './pages/SubCategory/Add_SubCategory.jsx'
import View_SubCategory from './pages/SubCategory/View_SubCategory.jsx'
import View_SubSubCategory from './pages/SubSubCategory/View_SubSubCategory.jsx'
import Add_SubSubCategory from './pages/SubSubCategory/Add_SubSubCategory.jsx'
import Add_Product from './pages/Product/Add_Product.jsx'
import View_Product from './pages/Product/View_Product.jsx'
import Add_Choose_Us from './Why_Choose_Us/Add_Choose_Us.jsx'
import View_Choose_Us from './Why_Choose_Us/View_Choose_Us.jsx'
import Order from './pages/Orders/Order.jsx'
import Add_Slider from './pages/Sliders/Add_Slider.jsx'
import View_Slider from './pages/Sliders/View_Slider.jsx'
import Add_Country from './pages/Country/Add_Country.jsx'
import View_Country from './pages/Country/View_Country.jsx'
import Add_Testimonial from './pages/Testimonial/Add_Testimonial.jsx'
import View_Testimonial from './pages/Testimonial/View_Testimonial.jsx'
import View_FAQs from './pages/FAQs/View_FAQ.jsx'
import Add_FAQs from './pages/FAQs/Add_FAQ.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import MainLayout from './pages/MainLayout.jsx'
import 'react-responsive-pagination/themes/classic-light-dark.css';
import Login from './pages/Login/login.jsx'
import MainContext from './pages/Context/MainContext.jsx'
import ForgetPassword from './pages/ForgetPassword/ForgetPassword.jsx'
import Profile from './pages/profile/profile.jsx'

createRoot(document.getElementById('root')).render(
  
  <MainContext>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/forgot-password' element={<ForgetPassword/>}/>
      <Route path='/' element={<MainLayout/>}>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/view_user' element={<View_User/>}/>

        <Route path='/profile' element={<Profile/>}/>

        <Route path='/contact_enquiry' element={<Contact_Enquiry/>}/>
        <Route path='/newsletters' element={<Newsletters/>}/>

        <Route path='/add_colors' element={<Add_Colors/>}/>
        <Route path='/view_color' element={<View_Color/>}/>
        <Route path='/edit_colors/:id' element={<Add_Colors/>}/>

        <Route path='/add_material' element={<Add_Material/>}/>
        <Route path='/view_material' element={<View_Material/>}/>
        <Route path='/edit_material/:id' element={<Add_Material/>}/>

        <Route path='/add_category' element={<Add_Category/>}/>
        <Route path='/view_category' element={<View_Category/>}/>
        <Route path='/edit_category/:id' element={<Add_Category/>}/>

        <Route path='/add_subcategory' element={<Add_SubCategory/>}/>
        <Route path='/view_subcategory' element={<View_SubCategory/>}/>
        <Route path='/edit_subcategory/:id' element={<Add_SubCategory/>}/>

        <Route path='/add_subsubcategory' element={<Add_SubSubCategory/>}/>
        <Route path='/view_subsubcategory' element={<View_SubSubCategory/>}/>
        <Route path='/edit_subsubcategory/:id' element={<Add_SubSubCategory/>}/>

        <Route path='/add_product' element={<Add_Product/>}/>
        <Route path='/view_product' element={<View_Product/>}/>
        <Route path='/edit_product/:id' element={<Add_Product/>}/>

        <Route path='/add_choose_us' element={<Add_Choose_Us/>}/>
        <Route path='/view_choose_us' element={<View_Choose_Us/>}/>
        <Route path='/edit_choose_us/:id' element={<Add_Choose_Us/>}/>

        <Route path='/order' element={<Order/>}/>

        <Route path='/add_slider' element={<Add_Slider/>}/>
        <Route path='/view_slider' element={<View_Slider/>}/>
        <Route path='/edit_slider/:id' element={<Add_Slider/>}/>

        <Route path='/add_country' element={<Add_Country/>}/>
        <Route path='/view_country' element={<View_Country/>}/>
        <Route path='/edit_country/:id' element={<Add_Country/>}/>

        <Route path='/add_testimonial' element={<Add_Testimonial/>}/>
        <Route path='/view_testimonial' element={<View_Testimonial/>}/>
        <Route path='/edit_testimonial/:id' element={<Add_Testimonial/>}/>

        <Route path='/add_faqs' element={<Add_FAQs/>}/>
        <Route path='/view_faqs' element={<View_FAQs/>}/>
        <Route path='/edit_faqs/:id' element={<Add_FAQs/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  </MainContext>
)