# events-vtt
Listen and dispatch media timed events from a .vtt file

### Install

```
npm install events-vtt
```
or

```
yarn install events-vtt
```

### Import

```JS
import EventManagerVtt from 'events-vtt';
```

### Usage

```JS
const test = new EventManagerVTT(player.current, {});

test.addEventListener('event:start', (event) => {
  console.info("New event requested:", event.detail)
})

test.addEventListener('event:end', (event) => {
  console.info("Event life time reached:", event.detail)
})
```
