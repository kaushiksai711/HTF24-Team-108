// src/components/Dashboard.js
import { Book, Award, MessageCircle, Calendar, Clock, Bookmark, TrendingUp, Flag, PlayCircle } from 'lucide-react';
import React from "react";
import { auth ,signOut,db} from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try { await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome, {auth.currentUser?.displayName}!</h1>
      <p>Email: {auth.currentUser?.email}</p>
      <img
        src={auth.currentUser?.photoURL}
        alt="User profile"
        style={{ borderRadius: "50%", margin: "20px", width: "100px" }}
      />
      <button onClick={handleSignOut} style={{ padding: "10px 20px" }}>
        Sign Out
      </button>
    </div>
  );
};

// const LanguageDashboard = () => {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Top Navigation */}
//       <header className="bg-white border-b border-gray-200">
//         <div className="flex items-center justify-between p-4">
//           <div className="flex items-center gap-4">
//             <h1 className="text-xl font-semibold">Language Dashboard</h1>
//             <select className="border rounded-lg px-3 py-1 bg-gray-50">
//               <option>Spanish</option>
//               <option>French</option>
//               <option>German</option>
//             </select>
//           </div>
//           <div className="flex items-center gap-4">
//             <div className="flex items-center gap-2">
//               <Flag className="text-green-600" size={20} />
//               <span className="font-medium">Current Streak: 12 days</span>
//             </div>
//             <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
//               <span className="font-semibold text-blue-600">JD</span>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="flex">
//         {/* Sidebar */}
//         <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-4">
//           <nav className="space-y-2">
//             <div className="flex items-center gap-2 p-2 bg-blue-50 text-blue-600 rounded-lg">
//               <Book size={20} />
//               <span>Lessons</span>
//             </div>
//             <div className="flex items-center gap-2 p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
//               <MessageCircle size={20} />
//               <span>Practice Speaking</span>
//             </div>
//             <div className="flex items-center gap-2 p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
//               <Award size={20} />
//               <span>Achievements</span>
//             </div>
//             <div className="flex items-center gap-2 p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
//               <Bookmark size={20} />
//               <span>Vocabulary</span>
//             </div>
//           </nav>
//         </aside>

//         {/* Main Content */}
//         <main className="flex-1 p-6">
//           {/* Daily Goals & Progress */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//             <div className="bg-white p-6 rounded-lg border border-gray-200">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="font-semibold">Daily Goal</h3>
//                 <Clock className="text-blue-600" size={20} />
//               </div>
//               <div className="h-2 bg-gray-100 rounded-full mb-2">
//                 <div className="h-2 bg-blue-600 rounded-full w-3/4"></div>
//               </div>
//               <p className="text-sm text-gray-600">30 minutes left today</p>
//             </div>
            
//             <div className="bg-white p-6 rounded-lg border border-gray-200">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="font-semibold">Vocabulary</h3>
//                 <Book className="text-green-600" size={20} />
//               </div>
//               <p className="text-2xl font-bold mb-1">248</p>
//               <p className="text-sm text-gray-600">Words learned</p>
//             </div>

//             <div className="bg-white p-6 rounded-lg border border-gray-200">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="font-semibold">Fluency Score</h3>
//                 <TrendingUp className="text-purple-600" size={20} />
//               </div>
//               <p className="text-2xl font-bold mb-1">B1</p>
//               <p className="text-sm text-gray-600">Intermediate</p>
//             </div>
//           </div>

//           {/* Today's Lessons */}
//           <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
//             <h2 className="text-lg font-semibold mb-4">Continue Learning</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {[
//                 {
//                   title: "Past Tense Review",
//                   duration: "15 min",
//                   progress: 60,
//                   type: "Grammar"
//                 },
//                 {
//                   title: "Restaurant Vocabulary",
//                   duration: "20 min",
//                   progress: 0,
//                   type: "Vocabulary"
//                 }
//               ].map((lesson) => (
//                 <div key={lesson.title} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50">
//                   <PlayCircle className="text-blue-600" size={24} />
//                   <div className="flex-1">
//                     <h3 className="font-medium">{lesson.title}</h3>
//                     <div className="flex items-center gap-2 text-sm text-gray-600">
//                       <span>{lesson.type}</span>
//                       <span>•</span>
//                       <span>{lesson.duration}</span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Review Schedule */}
//           <div className="bg-white p-6 rounded-lg border border-gray-200">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-lg font-semibold">Vocabulary Review Schedule</h2>
//               <Calendar className="text-gray-400" size={20} />
//             </div>
//             <div className="space-y-4">
//               {[
//                 { time: "Today", words: ["cerveza", "biblioteca", "zapatos"] },
//                 { time: "Tomorrow", words: ["playa", "trabajo", "ventana"] }
//               ].map((review) => (
//                 <div key={review.time} className="border-b pb-4">
//                   <p className="text-sm text-gray-600 mb-2">{review.time}</p>
//                   <div className="flex gap-2 flex-wrap">
//                     {review.words.map((word) => (
//                       <span key={word} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
//                         {word}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default LanguageDashboard;

export default Dashboard;
