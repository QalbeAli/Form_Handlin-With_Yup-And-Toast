import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastContainer = (error:any) => {
  toast.error(error.message, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 3000, // Close the toast after 3 seconds
  });
};

export default ToastContainer