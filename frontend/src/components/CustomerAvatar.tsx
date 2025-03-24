import { useSelector } from "react-redux";

export default function CustomerAvatar() {
  const { userInfo } = useSelector((state) => state.auth);
  const fullNameArr = userInfo.name.split(" ") || [];
  let shortName;
  fullNameArr.length > 1
    ? (shortName = fullNameArr[0]?.charAt(0) + fullNameArr[1]?.charAt(0))
    : (shortName = fullNameArr[0]?.charAt(0));
  return <span className='rounded-sm border bg-blue-500 text-blue-50 p-1 px-2'>{shortName}</span>;
}
