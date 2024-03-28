import { Routes, Route, Navigate } from "react-router-dom";
import { Posts } from "./views/PostsView";
import { Post } from "./views/PostView";
import { NotFound } from "./views/NotFound";
import { MessageProvider } from "./context/MessageContext";

import "./App.css";

function App() {
    return (
        <MessageProvider>
            <Routes>
                <Route path="/" element={<Navigate replace to="/posts" />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/post/:id" element={<Post />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </MessageProvider>
    );
}

export default App;
