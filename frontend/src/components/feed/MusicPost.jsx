import React, { useState, useEffect } from "react"
import Vinyl from "../../assets/vinyl.PNG"
import { BsSpotify } from "react-icons/bs"
import { getLikes } from "../../api/api"
import { CommentSection } from "../../pages/CommentSection"
import { BsChat } from "react-icons/bs"
import { BsHeart } from "react-icons/bs"
import LikeButton from "../LikeButton"

const MusicPost = ({
  spotifyCover,
  spotifyLink,
  artist,
  song,
  time,
  userDescription,
  picture,
  username,
  url,
}) => {
  const [likes, setLikes] = useState([])
  const [likeCount, setLikeCount] = useState([])
  const postId = "63fb40a79c13727e0178c2a1"

  // Get likes in case we want usernames in the future
  // useEffect(() => {
  //   getLikes(postId).then((likeIds) => setLikes(likeIds))
  //   setLikeCount(likes.length)
  // }, [])

  return (
    <>
      <div className="mb-10 flex flex-col md:mx-60">
        <div className="flex justify-between mx-10 mb-4">
          <div className="mt-10 flex items-center">
            <div className="overflow-hidden object-cover">
              <div className="w-10 h-10 relative overflow-hidden border-sm">
                <img
                  className="inline my-auto h-full w-auto rounded-full"
                  src={picture}
                ></img>
              </div>
            </div>
            <p className="text-gray-400 ml-2 font-galos font-bold text-lg">
              {" "}
              {username}{" "}
            </p>
          </div>
          <div className="text-gray-400 mt-10 flex items-center font-galos text-lg">
            {time}
          </div>
        </div>

        <div
          className="relative mx-12 rounded-lg"
          style={{
            backgroundImage: `url(${spotifyCover}), linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)) `,
            backgroundSize: "cover",
          }}
        >
          <div className="mt-6 rounded-md max-w-md mx-10 z-1 sm:mx-auto height-wrap animate-spin-slow">
            <div className="flex mx-10 flex-col justify-center items-center ">
              <img
                className="absolute mx-auto top-28 z-2 width-wrap"
                src={spotifyCover}
              ></img>
              <img className="absolute mx-auto max-w-sm z-3 top-0" src={Vinyl}></img>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center my-4 mx-12">
          <div className="">
            <h1 className="text-white text-2xl font-galos font-bold">{song}</h1>
            <p className="text-gray-400">By {artist}</p>
          </div>
          <button
            className="bg-green-600 hover:bg-green-800 rounded p-1 text-white"
            onClick={spotifyLink}
          >
            <a href={url}>
              <div className="flex items-center mx-3 font-galos font-bold">
                <p className="w-15">Play on</p>

                <BsSpotify className="text-white text-xl ml-2" />
              </div>
            </a>
          </button>
        </div>
        <div className="flex-rows justify-between flex">
          <div className="w-60">
            <p className="text-white text-sm self-left justify-start mb-5 ml-12 font-galos">
              {userDescription}
            </p>
          </div>
          <div className="flex flex-row justify-right">
            <LikeButton className="text-white w-8 h-8 self-right mr-7" />
            <BsChat className="text-white w-8 h-8 self-right mr-14" />
          </div>
        </div>
        <h1 className="text-gray-200 text-md self-left mx-12 mb-5 font-galos ">
          {userDescription}
        </h1>
        <CommentSection postId={postId} />
      </div>
    </>
  )
}

export default MusicPost
