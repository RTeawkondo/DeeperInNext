import MeetupDetail from "@/components/meetups/MeetupDetail";
import React from "react";

export default function MeetupDetails() {
  return (
    <MeetupDetail image="" address ="hehe" title="hoho" description="hihi"/>
  );
}

export async function getStaticPaths(){
  //getStaticProps will re-generate all page, eventhough they are dynamic,
  //but the fact that how they know which values dynamic
  //so we must use getStaticPaths to help nextjs now which 1 will be dynamic?
  return {
    fallback: false, // false, value out off path below will return 404
    //true: nextjs will try to generate a page for miss path
    paths: [{
      params: {
        meetupId: "m1"
      }
    },
    {
      params: {
        meetupId: "m2"
      }
    }]
  }
}

export async function getStaticProps(context){
  const meetupId = context.params.meetupId
  console.log(meetupId);
  return {
    props: {
      meetupData: {
        image:"",
        id: meetupId,
        address:"hehe",
        title:"hoho",
        description:"haha"
      }
    }
  }
}