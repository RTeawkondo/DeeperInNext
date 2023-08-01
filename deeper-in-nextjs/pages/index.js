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
      revalidate: 10
    }
    //revalidate: unlock increment Static Generation, receive number
    //as second that page will re-generate on sever
    //like above it's take 10s after have a request to server that server rendering
    // for a SSG(static site generation) you must be redeploy every time data update without this values
  }