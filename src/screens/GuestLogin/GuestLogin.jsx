import "./GuestLogin.css"
import { InputField } from "../../components/InputField/inputfield"
import { Label } from "../../components/Label/label"
import { PayPalButton } from "react-paypal-button-v2"
import Header from "../../components/Header/header"
import axios from 'axios'
import {useNavigate} from "react-router-dom"
{/* <script src="https://www.paypal.com/sdk/js?client-id=Ad-ekPNzbwKr9zJhk15pyKyzU3lzDRSIe_yMrC3W_qRI-prfiU3WPstCr30B8JtDMOzijQd07aKM-w8J"></script> */}

export const GuestLogin = ()=>{
    const navigate = useNavigate()
    const handleSuccessPayment = async (paymentResults)=>{
        console.log("hi");
        console.log(paymentResults);
        await axios.post("http://127.0.0.1:5000/guest",{"id":paymentResults.id,"Email":paymentResults.payer.email_address,"FirstName":paymentResults.payer.name.given_name,
        "LastName":paymentResults.payer.name.surname,"Phone":paymentResults.payer.phone.phone_number.national_number,"Attendance":false
        ,"Amount":paymentResults.purchase_units[0].amount.value,"Address":paymentResults.purchase_units[0].shipping.address.address_line_1,"City":paymentResults.purchase_units[0].shipping.address.admin_area_2,"Status":paymentResults.status })
     
        // console.log(paymentResults);      
        alert("Payment success. You will be recieving an email regarding the payment.")
    
            navigate("/")
        
    }
    return(
        <>
        <Header/>
        <div className="guestContainer" style={{height:"100%",padding:"4rem 0"}}>
        
        <div className="guestLogin" style={{width:"35rem"}}>
        <h3 style={{color:"#006747",marginBottom:"10px"}}>Make your payment</h3>
        <p>In order to attend this conference, you are required to make a payment in order to recieve your pass on entering the conference</p>
        <div className="pay" style={{display:"flex",justifyContent:"center"}}>
            
        <h5 style={{color:"#000",marginBottom:"10px"}}>Amount : </h5>
        <h2 style={{color:"#006747",marginBottom:"10px"}}>  $50.00</h2>
        </div>
        <p style={{marginTop:"20px"}}>Payment options</p>
        <PayPalButton amount={50} onSuccess={(details,data)=>handleSuccessPayment(details)}/>
        <div className="pay">
            <a href="/login" style={{color:"#006747"}}>Go Back</a>
        </div>
        </div>
        </div>
        </>
    )
}