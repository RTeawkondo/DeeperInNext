import MeetupList from "@/components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";
import { useEffect, useState } from "react";


export default function HomePage(props) {

  return (
    <>
    <Head>
      <title>First Test hehe</title>
      <meta name="description" content="hehe"/>
    </Head>
    <MeetupList meetups={props.meetups}/>
    </>
  )
}

export async function getStaticProps() {
    // Call an external API endpoint to get posts.
    // You can use any data fetching library
    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time

    const client = await MongoClient.connect("mongodb+srv://admin:6hy3BsRwMH9cRZUL@cluster0.3dcw6kq.mongodb.net/meetups?retryWrites=true&w=majority")
    const db = client.db()

    const meetupsCollection = db.collection("meetups")
    const meetups = await meetupsCollection.find().toArray()
    client.close()

    return {
      props: {
        meetups: meetups.map(meetup => ({
          title: meetup.title,
          address: meetup.address,
          image: meetup.image,
          id: meetup._id.toString()
        }))
      },
      revalidate: 10
    }
    //revalidate: unlock increment Static Generation, receive number
    //as second that page will re-generate on sever
    //like above it's take 10s after have a request to server that server rendering
    // for a SSG(static site generation) you must be redeploy every time data update without this values
  }

// export async function getServerSideProps(context){
//     const req = context.req
//     const res = context.res
//     // won't run during the build process
//     //but always on the server after deployment
//     // code here always run on the server, server only
//     //this function run for any request come to server
//     //serversideprops is slower than staticprops
//     return {
//         props:{
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }