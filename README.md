# events-vtt
Listen and dispatch media timed events from a .vtt file

### Install

```
npm install @btzr-io/events-vtt@0.0.1
```
or

```
yarn install @btzr-io/events-vtt@0.0.1
```

### Import

```JS
import EventManagerVtt from 'events-vtt';
```

### Usage

Add a track element indside your media element (video or audio):

- Set the track kind attribute as `metadata` type.

- Set the label attribute value equal to `events`.


> Note: The track source should contain a url to a valid .vtt file. 


```
<mediaElement>
  <track default src="./events.vtt" kind="metadata" label="events" />
</mediaElement>
```

Create a instance of the `EventManagerVtt` class to listen for the event's life.


```JS
const test = new EventManagerVTT(player.current, {});

test.addEventListener('event:start', (event) => {
  console.info("New event requested:", event.detail)
})

test.addEventListener('event:end', (event) => {
  console.info("Event life time reached:", event.detail)
})
```

### WebVTT

Here is an example of a .vtt file that contains data for each event.
Please check the current standars for more information: https://www.w3.org/TR/webvtt1/

```
WEBVTT

NOTE
This file contains timed events for the interactive video demo. For a more advance usage you can use frameworks for state and event manager like Redux.

1
00:00:00.250 --> 00:00:03.000
{
 "type": "hot-event-type",
 "title": "🔥 Feature message",
 "url": "https://en.wikipedia.org/wiki/Samurai_Pizza_Cats"
}

2
00:07.810 --> 00:14.221
{
 "type": "poll-event",
 "title": "🐈 Are cats awesome ?"
}
```
