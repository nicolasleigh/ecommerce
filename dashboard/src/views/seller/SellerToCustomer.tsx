import { useEffect, useRef, useState } from "react";
import { FaList } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  get_customer_message,
  get_customers,
  messageClear,
  send_message,
  updateMessage,
} from "../../store/reducers/chatReducer";
import { Link, useParams } from "react-router-dom";
import { socket } from "../../utils/utils";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, SendHorizontal } from "lucide-react";

export default function SellerToCustomer() {
  const [show, setShow] = useState(false);
  const sellerId = 65;
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { customers, messages, currentCustomer, successMessage } = useSelector((state) => state.chat);
  const { customerId } = useParams();
  const [text, setText] = useState("");
  const [receiverMessage, setReceiverMessage] = useState("");
  // const [activeCustomer, setActiveCustomer] = useState([]);
  const scrollRef = useRef();

  const sendMsg = (e) => {
    e.preventDefault();
    dispatch(
      send_message({ senderId: userInfo._id, receiverId: customerId, text, name: userInfo?.shopInfo?.shopName })
    );
    setText("");
  };

  useEffect(() => {
    dispatch(get_customers(userInfo._id));
  }, []);

  useEffect(() => {
    if (customerId) {
      dispatch(get_customer_message(customerId));
    }
  }, [customerId]);

  useEffect(() => {
    if (successMessage) {
      socket.emit("send_seller_message", messages[messages.length - 1]);
      dispatch(messageClear());
    }
  }, [successMessage]);

  useEffect(() => {
    socket.on("customer_message", (msg) => {
      setReceiverMessage(msg);
    });
    // socket.on("activeCustomer", (customer) => {
    //   setActiveCustomer(customer);
    // });
  }, []);

  // useEffect(() => {
  //   console.log(activeCustomer);
  // }, [activeCustomer]);

  useEffect(() => {
    if (receiverMessage) {
      if (customerId === receiverMessage.senderId && userInfo._id === receiverMessage.receiverId) {
        dispatch(updateMessage(receiverMessage));
      } else {
        toast.success(receiverMessage.senderName + " " + "Send a message");
        dispatch(messageClear());
      }
    }
  }, [receiverMessage]);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className='px-2 lg:px-7 py-5'>
      <div className='w-full border px-4  rounded-md h-[calc(100vh-140px)]'>
        <div className='flex w-full h-full relative'>
          <div
            className={`w-[280px] h-full absolute z-10 backdrop-blur-3xl border-r pr-4 pt-2 ${
              show ? "-left-[16px]" : "-left-[336px]"
            } md:left-0 md:relative transition-all`}
          >
            <div className='w-full h-[calc(100vh-177px)]  md:bg-transparent overflow-y-auto'>
              <div className='flex text-xl justify-between items-center p-4 md:p-0 md:px-3 md:pb-3 '>
                <h2>Customers</h2>
                <span onClick={() => setShow(!show)} className='block cursor-pointer md:hidden'>
                  <IoMdClose />
                </span>
              </div>
              <div className='space-y-2 overflow-auto '>
                {customers &&
                  customers.length !== 0 &&
                  customers.map((c, i) => (
                    <Link
                      to={`/chat-customer/${c.friendId}`}
                      key={i}
                      className={`h-[60px] flex justify-start gap-2 items-center border px-2 py-2 rounded-md cursor-pointer `}
                    >
                      <div className='relative'>
                        <img
                          src='/customerDefaultAvatar.jpg'
                          alt='customer default avatar'
                          className='w-[38px] h-[38px] border-2 max-w-[38px] p-[2px] rounded-full'
                        />
                        <div className='w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0'></div>
                      </div>
                      <div className='flex justify-center items-start flex-col w-full'>
                        <div className='flex justify-between items-center w-full'>
                          <h2 className='text-base font-semibold'>{c.name}</h2>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>

          <div className='w-full md:w-[calc(100%-200px)] md:pl-4'>
            <div className='flex mt-4 justify-between items-center'>
              {sellerId && (
                <div className='flex justify-start items-center gap-3'>
                  <div className='relative'>
                    <img
                      src='/customerDefaultAvatar.jpg'
                      alt='admin image'
                      className='w-[45px] h-[45px] border-green-500 border-2 max-w-[45px] p-[2px] rounded-full'
                    />
                    <div className='w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0'></div>
                  </div>
                  <h2 className='text-base  font-semibold'>{currentCustomer.name}</h2>
                </div>
              )}
              <div
                onClick={() => setShow(!show)}
                className='w-[35px] flex md:hidden h-[35px] rounded-sm  border justify-center cursor-pointer items-center '
              >
                <span>
                  <FaList />
                </span>
              </div>
            </div>

            <div className='py-4'>
              <div className='border h-[calc(100vh-290px)]  rounded-md p-3 overflow-y-auto'>
                {customerId ? (
                  messages.map((m, i) => {
                    if (m.senderId === customerId) {
                      return (
                        <div key={i} ref={scrollRef} className='w-full  flex justify-start items-center'>
                          <div className='flex items-center gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]'>
                            <div>
                              <img
                                src='/customerDefaultAvatar.jpg'
                                alt='customer default avatar'
                                className='w-10 aspect-square rounded-full border p-[2px]'
                              />
                            </div>
                            <div className='flex items-center'>
                              <span className='h-4 border border-r-gray-300 border-r-8 border-y-8 border-y-transparent border-l-0'></span>
                              <span className='bg-gray-300 text-black py-1 px-2 rounded-sm'>{m.message}</span>
                            </div>
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div key={i} ref={scrollRef} className='w-full flex justify-end items-center'>
                          <div className='flex items-center gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]'>
                            <div className='flex items-center'>
                              <span className='bg-blue-500  text-white py-1 px-2 rounded-sm'>{m.message}</span>
                              <span className='h-4 border border-l-blue-500 border-l-8 border-y-8 border-y-transparent border-r-0'></span>
                            </div>
                            <div>
                              <img
                                src={userInfo.image}
                                alt='admin image'
                                className='w-10 aspect-square rounded-full border p-[2px]'
                              />
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })
                ) : (
                  <div className='w-full h-full flex text-muted-foreground justify-center items-center gap-2 flex-col'>
                    <span>Select Customer</span>
                  </div>
                )}
              </div>
            </div>
            <form onSubmit={sendMsg} className='flex gap-3'>
              <Input
                value={text}
                onChange={(e) => setText(e.target.value)}
                type='text'
                placeholder='Input Your Message'
                disabled={!customerId}
              />
              <Button className='bg-blue-500 hover:bg-blue-600 text-blue-50' disabled={!customerId}>
                Send <Send />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
