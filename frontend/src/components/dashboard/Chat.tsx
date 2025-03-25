import { useEffect, useRef, useState } from "react";
import { AiOutlineMessage, AiOutlinePlus } from "react-icons/ai";
import { GrEmoji } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { add_friend, messageClear, send_message, updateMessage } from "../../store/reducers/chatReducer";
import toast from "react-hot-toast";
import { MessageSquareMore, Send } from "lucide-react";
import CustomerAvatar from "../CustomerAvatar";

const socket = io("http://localhost:8000");

export default function Chat() {
  const { sellerId } = useParams();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { friendMsg, myFriends, currentFriend, successMessage } = useSelector((state) => state.chat);
  const [text, setText] = useState("");
  const [receiverMessage, setReceiverMessage] = useState("");
  const [activeSeller, setActiveSeller] = useState([]);
  const scrollRef = useRef();

  const sendMsg = () => {
    if (text) {
      dispatch(send_message({ userId: userInfo.id, text, sellerId, name: userInfo.name }));
      setText("");
    }
  };
  console.log(currentFriend);

  useEffect(() => {
    socket.on("seller_message", (msg) => {
      setReceiverMessage(msg);
    });
    socket.on("activeSeller", (sellers) => {
      setActiveSeller(sellers);
    });
  }, []);

  useEffect(() => {
    socket.emit("add_user", userInfo.id, userInfo);
  }, []);

  useEffect(() => {
    dispatch(add_friend({ sellerId: sellerId || "", userId: userInfo.id }));
  }, [sellerId]);

  useEffect(() => {
    if (receiverMessage) {
      if (sellerId === receiverMessage.senderId && userInfo.id === receiverMessage.receiverId) {
        dispatch(updateMessage(receiverMessage));
      } else {
        toast.success(receiverMessage.senderName + " " + "Send a message");
        dispatch(messageClear());
      }
    }
  }, [receiverMessage]);

  useEffect(() => {
    if (successMessage) {
      socket.emit("send_customer_message", friendMsg[friendMsg.length - 1]);
      dispatch(messageClear());
    }
  }, [successMessage]);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [friendMsg]);

  return (
    <div className='bg-white p-3 rounded-md'>
      <div className='w-full flex'>
        <div className='w-[230px]'>
          <div className='flex  gap-2 items-center text-slate-600  h-[50px]'>
            <MessageSquareMore strokeWidth={1.5} />
            <span className='text-2xl'>Message</span>
          </div>
          <div className='w-full flex flex-col text-slate-600 py-4 h-[400px] pr-3 '>
            {myFriends &&
              myFriends.length !== 0 &&
              myFriends.map((f, i) => (
                <Link
                  to={`/dashboard/chat/${f.friendId}`}
                  key={i}
                  className={`flex gap-2 justify-start items-center pl-2 py-[5px] border rounded-sm`}
                >
                  <div className='w-[30px] h-[30px] rounded-full relative '>
                    {activeSeller.some((c) => c.sellerId == f.friendId) && (
                      <div className='w-[8px] h-[8px] rounded-full bg-green-500 absolute right-0 bottom-0'></div>
                    )}

                    <img src={f.image} alt='seller avatar' className='rounded-sm' />
                  </div>
                  <span>{f.name}</span>
                </Link>
              ))}
          </div>
        </div>
        <div className='w-[calc(100%-230px)]'>
          {currentFriend ? (
            <div className='w-full h-full'>
              <div className='flex justify-start gap-3 items-center text-slate-600 text-xl h-[50px]'>
                <div className='w-[30px] h-[30px] rounded-full relative'>
                  {activeSeller.some((c) => c.sellerId == currentFriend.friendId) && (
                    <div className='w-[8px] h-[8px] rounded-full bg-green-500 absolute right-0 bottom-0'></div>
                  )}

                  <img src={currentFriend.image} alt='seller avatar' className='rounded-sm' />
                </div>
                <span>{currentFriend.name}</span>
              </div>
              <div className='h-[400px] w-full bg-slate-100 p-3 rounded-md'>
                <div className='w-full h-full overflow-y-auto flex flex-col gap-3'>
                  {friendMsg.map((m, i) => {
                    if (currentFriend.friendId !== m.receiverId) {
                      return (
                        <div
                          key={i}
                          // ref={scrollRef}
                          className='w-full flex gap-2 justify-start items-center text-[14px]'
                        >
                          <img className='w-[30px] h-[30px] rounded-sm' src={currentFriend.image} alt='seller avatar' />
                          <div className='flex items-center'>
                            <span className='h-4 border border-r-slate-300 border-r-8 border-y-8 border-y-transparent border-l-0'></span>
                            <span className='bg-slate-300  py-1 px-2 rounded-sm'>{m.message}</span>
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          key={i}
                          // ref={scrollRef}
                          className='w-full flex gap-2 justify-end items-center text-[14px]'
                        >
                          <div className='flex items-center'>
                            <span className='bg-[#059473]  text-white py-1 px-2 rounded-sm'>{m.message}</span>
                            <span className='h-4 border border-l-[#059473] border-l-8 border-y-8 border-y-transparent border-r-0'></span>
                          </div>
                          <CustomerAvatar />
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
              <div className='flex items-center w-full gap-2 mt-2'>
                <input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  type='text'
                  placeholder='Input Message'
                  className='w-full rounded-sm h-10 outline-none p-3 border focus:ring-1 focus:ring-[#059473]'
                />
                <button
                  onClick={sendMsg}
                  className='flex border rounded-sm h-10 px-4 text-green-50 bg-[#059473] hover:bg-[#059473]/90 items-center gap-2'
                >
                  <span>Send</span>
                  <Send />
                </button>
              </div>
            </div>
          ) : (
            <div className='w-full h-full rounded-sm flex justify-center items-center text-lg ont-bold text-muted-foreground border'>
              <span>Please select a seller to chat</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
