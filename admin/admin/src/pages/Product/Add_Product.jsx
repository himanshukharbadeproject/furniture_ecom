import React, { useEffect, useState } from "react";
// import { AiOutlineMenu } from "react-icons/ai";
// import FileUploader from "../../common/Drop_Zone";
// import DescriptionEditor from "../../common/React_Quill";
import Header from "../../common/Header";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";

export default function Add_Product() {

  let navigate = useNavigate()

  let apiBaseUrl = import.meta.env.VITE_APIBASEURL;
  let [parentCategoryList, setParentCategoryList] = useState([]);
  let [subCategoryList, setSubCategoryList] = useState([]);
  let [subsubcategoryList, setsubsubcategoryList] = useState([]);
  let [colorList, setColorList] = useState([]);
  let [materialList, setMaterialList] = useState([]);
  let [fspreview, setFspreview] = useState(import.meta.env.VITE_PIMAGE);
  let [bspreview, setBspreview] = useState(import.meta.env.VITE_PIMAGE);
  let [gpreview, setgpreview] = useState([]);
  let [galleryFiles, setGalleryFiles] = useState([]);
  let [formData, setFormData] = useState({
    productName: "",
    productOrder: "",
    productStock: "",
    productSalePrice: "",
    productActualPrice: "",
    productParentCategory: "",
    productSubCategory: "",
    productSubSubCategory: "",
    productBestSelling: "",
    productTopRated: "",
    productUpSell: "",
    productType: "",
    productColor: [], // ✅ ADD
    productMaterial: [], // ✅ ADD
    productDesc: "",
  });

  let { id } = useParams();
  // console.log(id);

  useEffect(() => {
    if (id) {
      getProductDetails();
    }
  }, [id]);

  let getProductDetails = () => {
    axios
      .get(`${apiBaseUrl}product/single-view/${id}`)
      .then((res) => res.data)
      .then((finalRes) => {
        // console.log(finalRes.singleView);
        const product = finalRes.singleView[0];

        setFormData({
          productName: product.productName || "",
          productOrder: product.productOrder || "",
          productStock: product.productStock || "",
          productSalePrice: product.productSalePrice || "",
          productActualPrice: product.productActualPrice || "",
          productDesc: product.productDesc || "",
          productParentCategory:
            product.productParentCategory?._id ||
            product.productParentCategory ||
            "",
          productSubCategory:
            product.productSubCategory?._id || product.productSubCategory || "",
          productSubSubCategory:
            product.productSubSubCategory?._id ||
            product.productSubSubCategory ||
            "",
          productBestSelling: product.productBestSelling,
          productTopRated: product.productTopRated,
          productUpSell: product.productUpSell,
          productType: product.productType || "",
          productColor: product.productColor
            ? product.productColor.map((c) => c._id || c)
            : [],

          productMaterial: product.productMaterial
            ? product.productMaterial.map((m) => m._id || m)
            : [],
        });
        setFspreview(finalRes.StaticImagePath + product.productImage);
        setBspreview(finalRes.StaticImagePath + product.productBackImage);
        setgpreview(
          product.productGallery.map(
            (items) => finalRes.StaticImagePath + items,
          ),
        );
        if (product.productParentCategory?._id) {
          getSubCategory(product.productParentCategory._id);
        }
        if (product.productSubCategory?._id) {
          getSubSubCategory(product.productSubCategory._id);
        }
      });
  };

  useEffect(() => {
    getParentCategory();
    getColor();
    getMaterial();
  }, []);

  let getParentCategory = () => {
    axios
      .get(`${apiBaseUrl}product/parent-category`)
      .then((res) => res.data)
      .then((finalRes) => {
        setParentCategoryList(finalRes.data);
      });
  };

  let getSubCategory = (id) => {
    axios
      .get(`${apiBaseUrl}product/sub-category/${id}`)
      .then((res) => res.data)
      .then((finalRes) => {
        setSubCategoryList(finalRes.data);
      });
  };

  let getSubSubCategory = (id) => {
    axios
      .get(`${apiBaseUrl}product/subsub-category/${id}`)
      .then((res) => res.data)
      .then((finalRes) => {
        setsubsubcategoryList(finalRes.data);
      });
  };

  let getColor = () => {
    axios
      .get(`${apiBaseUrl}product/product-color`)
      .then((res) => res.data)
      .then((finalRes) => {
        setColorList(finalRes.data);
      });
  };

  let getMaterial = () => {
    axios
      .get(`${apiBaseUrl}product/product-material`)
      .then((res) => res.data)
      .then((finalRes) => {
        setMaterialList(finalRes.data);
      });
  };

//   let saveForm = (e) => {
//   e.preventDefault();

//   const formValue = new FormData();   // ✅ create empty

//   // ✅ ADD THIS HERE (for text + arrays)
//   Object.keys(formData).forEach((key) => {
//     if (Array.isArray(formData[key])) {
//       formData[key].forEach((val) => formValue.append(key, val));
//     } else {
//       formValue.append(key, formData[key]);
//     }
//   });

//   // FRONT IMAGE
//   if (e.target.productImage.files[0]) {
//     formValue.append("productImage", e.target.productImage.files[0]);
//   }

//   // BACK IMAGE
//   if (e.target.productBackImage.files[0]) {
//     formValue.append("productBackImage", e.target.productBackImage.files[0]);
//   }

//   // GALLERY
//   galleryFiles.forEach((file) => {
//     formValue.append("productGallery", file);
//   });

//   // API CALL
//   if (id) {
//     axios.post(`${apiBaseUrl}product/update-product/${id}`, formValue)
//       .then((res) => res.data)
//               .then((finalRes) => {
//                 toast.success(finalRes.msg);
//                 setInterval(() => {
//                   navigate("/view_product");
//                 }, 2000);
//               });
//   } else {
//     axios.post(`${apiBaseUrl}product/insert`, formValue)
//       .then((res) => res.data)
//               .then((finalRes) => {
//                 toast.success(finalRes.msg);
//                 setInterval(() => {
//                   navigate("/view_product");
//                 }, 2000);
//               });
//   }
// };

  let saveForm = (e) => {
  e.preventDefault();

  const formValue = new FormData();

  Object.keys(formData).forEach((key) => {
    const value = formData[key];

    if (Array.isArray(value)) {
      value.forEach((v) => formValue.append(key, v));
    } else if (value !== "" && value !== null && value !== undefined) {
      formValue.append(key, value);
    }
  });

  if (e.target.productImage.files[0]) {
    formValue.append("productImage", e.target.productImage.files[0]);
  }

  if (e.target.productBackImage.files[0]) {
    formValue.append("productBackImage", e.target.productBackImage.files[0]);
  }

  galleryFiles.forEach((file) => {
    formValue.append("productGallery", file);
  });

  const request = id
    ? axios.post(`${apiBaseUrl}product/update-product/${id}`, formValue)
    : axios.post(`${apiBaseUrl}product/insert`, formValue);

  request.then((res) => {
    toast.success(res.data.msg);
    setTimeout(() => navigate("/view_product"), 2000);
  });
};


  return (
    <div className="border">
      <Header />
      <div className="border-b-[3px] border-gray-300">
        <h2 className="text-left ps-[20px] text-[18px] text-gray-600 font-semibold my-[10px]">
          Home / Product / Product Details
        </h2>
      </div>
      <ToastContainer />
      <form
        onSubmit={saveForm}
        className="mx-[20px] px-[10px] ps-[30px] text-left  py-[10px] mt-[20px]"
      >
        <div className="grid grid-cols-[30%_35%_auto] gap-[20px]">
          <div className="flex flex-col">
            <div className="flex-col">
              <h3 className="mb-[10px] font-medium">Product Image</h3>
              <div className="h-[250px]">
                <img
                  src={fspreview}
                  className="w-[90%] h-[90%] border border-black"
                />
                <input
                  type="file"
                  name="productImage"
                  className="cursor-pointer"
                  onChange={(e) =>
                    setFspreview(URL.createObjectURL(e.target.files[0]))
                  }
                />
              </div>
            </div>

            <div className="flex-col">
              <h3 className="mb-[10px] font-medium">Back Image</h3>
              <div className="h-[250px]">
                <img
                  src={bspreview}
                  className="w-[90%] h-[90%] border border-black"
                />
                <input
                  type="file"
                  name="productBackImage"
                  className="cursor-pointer"
                  onChange={(e) =>
                    setBspreview(URL.createObjectURL(e.target.files[0]))
                  }
                />
              </div>
            </div>

            <div className="flex-col">
              <h3 className="mb-[10px] font-medium">Gallery Image</h3>
              <div className="h-[250px] border border-black">
                <div className="grid grid-cols-3 gap-2 h-[260px] overflow-y-auto">
                  {gpreview.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      className="w-full h-[100px] object-cover rounded"
                    />
                  ))}
                </div>

                <input
                  type="file"
                  name="productGallery"
                  multiple
                  onChange={(e) => {
                    const files = Array.from(e.target.files);

                    // store files for upload
                    setGalleryFiles((prev) => [...prev, ...files]);

                    // preview images
                    const newPreviews = files.map((file) =>
                      URL.createObjectURL(file),
                    );
                    setgpreview((prev) => [...prev, ...newPreviews]);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="">
            <h3 className="mb-[5px] font-medium">Product Name</h3>
            <input
              name="productName"
              type="text"
              value={formData.productName}
              onChange={(e) =>
                setFormData({ ...formData, productName: e.target.value })
              }
              placeholder="Product Name"
              className="border py-[5px] w-[100%] rounded-[5px] px-[10px] mb-[20px]"
            />
            <h3 className="mb-[5px] font-medium">Select Sub Category</h3>
            <select
              name="productSubCategory"
              value={formData.productSubCategory}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  productSubCategory: e.target.value,
                });
                getSubSubCategory(e.target.value); // keep cascading working
              }}
              // onChange={(e) => getSubSubCategory(e.target.value)}
              className="border py-[5px] w-[100%] rounded-[5px] px-[10px] mb-[20px]"
              placeholder="Select Category"
            >
              <option value="">Select Sub-Category</option>
              {subCategoryList.map((items, index) => (
                <option key={index} value={items._id}>
                  {items.subcategoryName}
                </option>
              ))}
            </select>
            <h3 className="mb-[5px] font-medium">Select Material</h3>
            <select
              name="productMaterial[]"
              multiple
              value={formData.productMaterial}
              onChange={(e) => {
                const values = Array.from(
                  e.target.selectedOptions,
                  (o) => o.value,
                );
                setFormData({ ...formData, productMaterial: values });
              }}
              className="border py-[5px] w-[100%] rounded-[5px] px-[10px] mb-[20px]"
            >
              {materialList.map((items) => (
                <option key={items._id} value={items._id}>
                  {items.materialName}
                </option>
              ))}
            </select>
            <h3 className="mb-[5px] font-medium">Select Product Type</h3>
            <select
              name="productType"
              className="border py-[5px] w-[100%] rounded-[5px] px-[10px] mb-[20px]"
              value={formData.productType}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  productType: e.target.value,
                });
              }}
              placeholder="Select Product Type"
            >
              <option value="">Select Product Type</option>
              <option value={1}>Featured</option>
              <option value={2}>New Arrival</option>
              <option value={3}>OnSale</option>
            </select>
            <h3 className="mb-[5px] font-medium">Is Top Rated</h3>
            <select
              name="productTopRated"
              className="border py-[5px] w-[100%] rounded-[5px] px-[10px] mb-[20px]"
              value={formData.productTopRated}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  productTopRated: e.target.value === "true",
                });
              }}
              placeholder="Select Top Rated"
            >
              <option value="">Select Top Rated</option>
              <option value="true">yes</option>
              <option value="false">no</option>
            </select>
            <h3 className="mb-[5px] font-medium">Actual Price</h3>
            <input
              type="number"
              placeholder="Actual Price"
              value={formData.productActualPrice}
              onChange={(e) =>
                setFormData({ ...formData, productActualPrice: e.target.value })
              }
              name="productActualPrice"
              className="border py-[5px] w-[100%] rounded-[5px] px-[10px] mb-[20px]"
            />
            <h3 className="mb-[5px] font-medium">Total In Stocks</h3>
            <input
              type="number"
              placeholder="Total Stocks"
              value={formData.productStock}
              onChange={(e) =>
                setFormData({ ...formData, productStock: e.target.value })
              }
              name="productStock"
              className="border py-[5px] w-[100%] rounded-[5px] px-[10px] mb-[20px]"
            />
          </div>
          <div className="">
            <h3 className="mb-[5px] font-medium">Select Parent Category</h3>
            <select
              name="productParentCategory"
              value={formData.productParentCategory}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  productParentCategory: e.target.value,
                });
                getSubCategory(e.target.value); // keep cascading working
              }}
              className="border py-[5px] w-[100%] rounded-[5px] px-[10px] mb-[20px]"
              placeholder="Select Category"
            >
              <option value="">Select Category</option>
              {parentCategoryList.map((items, index) => (
                <option key={index} value={items._id}>
                  {items.categoryName}
                </option>
              ))}
            </select>
            <h3 className="mb-[5px] font-medium">Select Sub Sub Category</h3>
            <select
              name="productSubSubCategory"
              value={formData.productSubSubCategory}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  productSubSubCategory: e.target.value,
                });
                //getSubCategory(e.target.value); // keep cascading working
              }}
              className="border py-[5px] w-[100%] rounded-[5px] px-[10px] mb-[20px]"
              placeholder="Select Sub Sub Category"
            >
              <option value="">Select Sub Sub Category</option>
              {subsubcategoryList.map((items, index) => (
                <option key={index} value={items._id}>
                  {items.subSubCategoryName}
                </option>
              ))}
            </select>
            <h3 className="mb-[5px] font-medium">Select Color</h3>
            <select
              name="productColor[]"
              multiple
              value={formData.productColor}
              onChange={(e) => {
                const values = Array.from(
                  e.target.selectedOptions,
                  (o) => o.value,
                );
                setFormData({ ...formData, productColor: values });
              }}
              className="border py-[5px] w-[100%] rounded-[5px] px-[10px] mb-[20px]"
            >
              {colorList.map((items) => (
                <option value={items._id} key={items._id}>
                  {items.colorName}
                </option>
              ))}
            </select>
            <h3 className="mb-[5px] font-medium">Is Best Selling</h3>
            <select
              name="productBestSelling"
              className="border py-[5px] w-[100%] rounded-[5px] px-[10px] mb-[20px]"
              value={formData.productBestSelling}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  productBestSelling: e.target.value === "true",
                });
              }}
              placeholder="Select Category"
            >
              <option value="">Select Best Selling</option>
              <option value="true">yes</option>
              <option value="false">no</option>
            </select>
            <h3 className="mb-[5px] font-medium">Is UpSell</h3>
            <select
              name="productUpSell"
              className="border py-[5px] w-[100%] rounded-[5px] px-[10px] mb-[20px]"
              value={formData.productUpSell}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  productUpSell: e.target.value === "true",
                });
              }}
              placeholder="Select Upsell"
            >
              <option value="">Select Upsell</option>
              <option value="true">yes</option>
              <option value="false">no</option>
            </select>
            <h3 className="mb-[5px] font-medium">Sale Price</h3>
            <input
              name="productSalePrice"
              type="number"
              value={formData.productSalePrice}
              onChange={(e) =>
                setFormData({ ...formData, productSalePrice: e.target.value })
              }
              placeholder="saleprice"
              className="border py-[5px] w-[100%] rounded-[5px] px-[10px] mb-[20px]"
            />
            <h3 className="mb-[5px] font-medium">Order</h3>
            <input
              name="productOrder"
              onWheel={(e) => e.target.blur()}
              value={formData.productOrder}
              onChange={(e) =>
                setFormData({ ...formData, productOrder: e.target.value })
              }
              type="number"
              placeholder="Order"
              className="border py-[5px] w-[100%] rounded-[5px] px-[10px] mb-[20px]"
            />
          </div>
        </div>
        <div className="mt-[50px]">
          <h3 className="font-medium mb-[10px]">Description</h3>
          <textarea
            name="productDesc"
            value={formData.productDesc}
            onChange={(e) =>
              setFormData({ ...formData, productDesc: e.target.value })
            }
            className="border border-black h-[200px] w-[97%] px-[20px]"
          ></textarea>
        </div>
        <button
          className={`${id ? "bg-black" : "bg-purple-700"} py-[7px] px-[20px] my-[20px] text-white font-medium rounded-[5px] cursor-pointer`}
        >
          {id ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
}
