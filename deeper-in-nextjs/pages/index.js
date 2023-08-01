import MeetupList from "@/components/meetups/MeetupList";
import { useEffect, useState } from "react";

const DUMMY_MEETUPS = [
    {
        id: "m1",
        title: "hehe",
        image: "https://learnopencv.com/wp-content/uploads/2021/04/image-15.png",
        address: "hohogegeheeheahha",
        description: "heeeeeeeeeeeeee"
    },
    {
        id: "m2",
        title: "hehe2",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvj2_Ocg29zF6vz2IepBqxucvDSYO_72zqSw&usqp=CAU",
        address: "hohogegeheeheahha2",
        description: "heeeeeeeeeeeeee2"
    },
]

export default function HomePage(props) {
  return (
    <>
    <MeetupList meetups={props.meetups}/>
    </>
  )
}

export async function getStaticProps() {
    // Call an external API endpoint to get posts.
    // You can use any data fetching library
    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
      props: {
        meetups: DUMMY_MEETUPS
      },
    }
  }