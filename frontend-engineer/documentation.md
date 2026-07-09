# Frontend Engineer Challenge Documentation

## Task

Build a responsive React and TypeScript chat interface for the Doodle frontend engineering challenge.

The application should:

- display chat messages from all senders.
- message owner should display on the right as shown in the ui
- messages of other members should display on the left
- be able to send new chat messages to the provided backend API.
- include pagination. Only display a subset of messages at a time.
- be responsive. Display correctly on common desktop, tablet and mobile browsers.
- support accessibility, performance, readability.

**Frontend framework**
React/Ts

**State management**
Redux, Redux saga

**SPA Routing**
No routing included

**Styling**
Vanilla css sufficient. No need for frameworks

**UI lib**
Material ui for ready components

**Testing lib**
React testing library, Jest

**Documentation**
Storybook

**Performance optimization**
React window

**CI & Containerization**
github workflow, docker, docker compose

**Bundler**
Vite

## Tasks

- [x] Create the React and TypeScript app.
- [x] Build the chat layout from the provided assets.
- [x] Connect to the backend messages API.
- [x] Implement message sending.
- [x] Add responsive and accessible interaction states.
- [x] Improve message thread performance

By using mui, a substantial number of accessibility comes built in. In cases where these are missing or required to be custom as demanded by the feature, I have also added the accessibility. An example case is in the MessageBox.tsx component.