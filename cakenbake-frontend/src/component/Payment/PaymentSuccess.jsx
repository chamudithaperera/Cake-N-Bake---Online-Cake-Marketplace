import Lottie from 'lottie-react';
import paymentAnimation from '../../assets/payment_success.json';

const PaymentSuccess = () => {

    return(
    <Lottie animationData={paymentAnimation}
            loop={false}
            autoplay={true}
            style={{ width: '60%', height: 'auto' }}
    />
     ) ;
};

export default PaymentSuccess;