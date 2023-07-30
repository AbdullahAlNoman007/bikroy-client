import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout.js/Main";
import Home from "../../Pages/Home/Home/Home";
import ServiceCategory from "../../Pages/ServiceCategory/ServiceCategory/ServiceCategory";
import SignUp from "../../Pages/SignUp/SignUp";
import SignIn from "../../Pages/SignIn/SignIn";
import DashBoard from "../../Pages/DashBoard/DashBoard";
import DashboardLayout from "../../Layout.js/DashboardLayout";
import AddProduct from "../../Pages/DashBoard/AddProduct/AddProduct";
import MyProduct from "../../Pages/DashBoard/MyProduct/MyProduct";
import Allbuyer from "../../Pages/DashBoard/Allbuyer/Allbuyer";
import Allproduct from "../../Pages/DashBoard/Allproduct/Allproduct";
import AllSeller from "../../Pages/DashBoard/AllSeller/AllSeller";
import AllAdvertised from "../../Pages/Shared/AllAdvertised/AllAdvertised";
import Blog from "../../Pages/Blog/Blog";
import Error from "../../Pages/Shared/404/404";
import Wishlist from "../../Pages/Wishlist/Wishlist";
import Payment from "../../Pages/Payment/Payment";
import PrivateRouter from "../PrivateRouter/PrivateRouter";
import SellerRoute from "../PrivateRouter/SellerRoute";
import AdminRoute from "../PrivateRouter/AdminRoute";
import BuyerRoute from "../PrivateRouter/BuyerRoute";

const Router=createBrowserRouter([
    {path:'/',element:<Main></Main>,children:[
        {path:'/',element:<Home></Home>},
        {path:'/category/:id',
        element:<ServiceCategory></ServiceCategory>,
        loader:({params})=>fetch(`https://bikroy-server.vercel.app/catgory/${params.id}`)
    },
    {path:'/signup',element:<SignUp></SignUp>},
    {path:'/signin',element:<SignIn></SignIn>},
    {path:'/allads',element:<AllAdvertised></AllAdvertised>},
    {path:'/blog',element:<Blog></Blog>},
    {path:'/wishlist',element:<Wishlist></Wishlist>},
    {path:'/payment/:id',element:<Payment></Payment>,
    loader:({params})=>fetch(`https://bikroy-server.vercel.app/product/${params.id}`)},
    {path:'/cartpayment/:id',element:<Payment></Payment>,
    loader:({params})=>fetch(`https://bikroy-server.vercel.app/cartproduct/${params.id}`)},
    {path:'*',element:<Error></Error>}
    ]},
    {path:'/dashboard',element:<PrivateRouter><DashboardLayout></DashboardLayout></PrivateRouter>,children:[
           {path:'/dashboard',element:<DashBoard></DashBoard>} ,
           { path:'/dashboard/addproduct',element:<SellerRoute><AddProduct></AddProduct></SellerRoute>},
            {path:'/dashboard/myProduct',element:<SellerRoute><MyProduct></MyProduct></SellerRoute>},
            {path:'/dashboard/allsellers',element:<AdminRoute><AllSeller></AllSeller></AdminRoute> },
            {path:'/dashboard/allbuyers',element:<AdminRoute><Allbuyer></Allbuyer></AdminRoute>},
            {path:'/dashboard/allproduct',element:<AdminRoute><Allproduct></Allproduct></AdminRoute>},
            {path:'/dashboard/myorders',element:<BuyerRoute><Wishlist></Wishlist></BuyerRoute>}
    ]},
   
])

export default Router