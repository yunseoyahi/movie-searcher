import { createContext, useContext, useState, useEffect } from "react";

const BookmarkContext = createContext();
export function BookmarkProvider({children}){
    const [bookmarks, setBookmarks]=useState(()=>{
        const saved= localStorage.getItem("movie_bookmarks");
        return saved? JSON.parse(saved) : [];
    });

useEffect(()=>{
    localStorage.setItem("movie_bookmarks", JSON.stringify(bookmarks));
    console.log("북마크에 뭐가 있을까요오옹",bookmarks);
}, [bookmarks]);

const toggleBookmark =(movie)=>{
    setBookmarks((prev)=>{
        const exists =prev.some((item)=>item.id===movie.id);
        if(exists){
            return prev.filter((item)=>item.id!==movie.id);
        }else{
            return [...prev, movie];
        }
    })
};

const isBookmarked =(id)=>{
    return bookmarks.some((item)=>item.id===id);
};

return (
    <BookmarkContext.Provider value={{bookmarks, toggleBookmark, isBookmarked}}>
        {children}
    </BookmarkContext.Provider>
)
}

export const useBookmark=()=>useContext(BookmarkContext)