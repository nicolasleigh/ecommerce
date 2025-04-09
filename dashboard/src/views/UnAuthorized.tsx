import { LockKeyhole } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function UnAuthorized() {
  const navigate = useNavigate();
  return (
    <div className='h-full w-52 mx-auto mt-60'>
      <div className='text-2xl text-muted-foreground flex items-center justify-center gap-2'>
        <LockKeyhole />
        <span>UnAuthorized</span>
      </div>
      <div
        className='underline hover:no-underline underline-offset-4 text-center text-sm mt-6 cursor-pointer'
        onClick={() => navigate(-1)}
      >
        Go back to the previous page
      </div>
    </div>
  );
}
