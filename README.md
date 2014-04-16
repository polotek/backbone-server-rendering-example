# Backbone rendering on server and client.

The example in this repo is modeled after [this one using React](https://github.com/petehunt/react-server-rendering-example/blob/master/server.js) to render on both client and server. Setting aside the client-side benefits of React, I wanted to draw a comparison and explore the differences.

I'm open to questions and comments about this. I created a space here. https://github.com/polotek/backbone-server-rendering-example/issues/1

## Usage
Just `npm install` and then `npm start`. Then open your browser to http://localhost:4000/

## Analysis
The React example is pretty straight forward. The Backbone example was much less so. Backbone is coupled to the DOM in some pretty glaring ways. So getting around that, even for a simple example, requires some hacks.

### Server-side rendering
React comes with built-in support for rendering a Component as a string. I worked up an ad-hoc mixin to do this with Backbone Views. Consequently that's where most of the hacks reside. I didn't look for an existing module that may accomplish this in a more robust way. But to be fair, once the complexity is encapsulated here, doing the server-side rendering is just as straight forward with Backbone.

### Client-side js delivery
We're using browserify to bundle the client-side js. I had a hell of a time getting Backbone to find jQuery and use it. There may be a better way to accomplish this. React includes all dependecies so this was a no-issue.

### DOM dependency
Backbone depends on jQuery or a jQuery-like library. On the node side, I have to patch `Backbone.$`. It's called on initialization, even though it's not strictly needed.

Backbone likes to have a top level DOM element, and the `render()` method just fills in the inner content. This makes rendering the full template server-side less than straight-forward. The method I'm using is hacky. And it doesn't support attributes on the top level element. This is the biggest source of incompatibility IMO.

### Dynamic client-side updates
The scope of the example adds a client-side interval that updates data for some interactivity. On the node side, letting the interval run will cause re-renders which can cause errors. React side-steps this problem due to the lifecycle support. The interval tick is only called when DOM is being used. I haven't dug into the details of Reacts lifecycle, but it is handy here. I had to hack browser environment detection for Backbone. Backbone really needs lifecycle events.

Another issue in the Backbone example is that the input field is constantly re-rendered as part of the Timer view. So it constantly loses focus and you can't type into it. This could be fixed by moving the input markup outside of the view. But avoiding full re-renders is not be an unreasonable requirement in real code. Partial update methods like React (and Ember I assume) have a clear advantage here.
