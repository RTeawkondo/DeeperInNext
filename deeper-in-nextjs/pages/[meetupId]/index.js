import MeetupDetail from "@/components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import React from "react";

export default function MeetupDetails(props) {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content="hehe" />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        address={props.meetupData.address}
        title={props.meetupData.title}
        description={props.meetupData.description}
      />
    </>
  );
}

export async function getStaticPaths() {
  //getStaticProps will re-generate all page, eventhough they are dynamic,
  //but the fact that how they know which values dynamic
  //so we must use getStaticPaths to help nextjs now which 1 will be dynamic?
  const client = await MongoClient.connect(
    "mongodb+srv://admin:6hy3BsRwMH9cRZUL@cluster0.3dcw6kq.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false, // false, value out off path below will return 404
    //true: nextjs will try to generate a page for miss path
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect(
    "mongodb+srv://admin:6hy3BsRwMH9cRZUL@cluster0.3dcw6kq.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });

  client.close();
  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      },
    },
  };
}
