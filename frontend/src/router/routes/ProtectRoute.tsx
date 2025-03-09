// import { Suspense } from "react";
// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";

// export default function ProtectRoute({ route, children }) {
//   const { role, userInfo } = useSelector((state) => state.auth);
//   if (role) {
//     if (route.role) {
//       if (userInfo) {
//         if (userInfo.role === route.role) {
//           if (route.status) {
//             if (route.status === userInfo.status) {
//               return <Suspense fallback={null}>{children}</Suspense>;
//             } else {
//               if (userInfo.status === "pending") {
//                 return <Navigate to='/seller/account-pending' replace />;
//               } else {
//                 return <Navigate to='/seller/account-deactive' replace />;
//               }
//             }
//           }
//         } else {
//           if (route.visibility) {
//             if (route.visibility.some((route) => route === userInfo.status)) {
//               return <Suspense fallback={null}>{children}</Suspense>;
//             } else {
//               <Navigate to='/seller/account-pending' replace />;
//             }
//           } else {
//             return <Suspense fallback={null}>{children}</Suspense>;
//           }
//         }
//       } else {
//         return <Navigate to='/unauthorized' replace />;
//       }
//     } else {
//       if (route.ability === "seller") {
//         return <Suspense fallback={null}>{children}</Suspense>;
//       }
//     }
//   } else {
//     return <Navigate to='/login' replace />;
//   }
// }

import { Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectRoute({ route, children }) {
  const { role, userInfo } = useSelector((state) => state.auth);
  if (role) {
    if (userInfo) {
      if (userInfo.role === route.role) return <Suspense fallback={null}>{children}</Suspense>;
      else return <Navigate to='/unauthorized' replace />;
    }
  } else return <Navigate to='/login' replace />;
}
