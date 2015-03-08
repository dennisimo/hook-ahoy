# Hook

Connect to apps near you.

## What the... ?

Hook makes it easy to connect to apps over your local network. You don't need to know any IP addresses, ports or URLs; you simply type in a 4 to 6 letter passcode and you're connected directly to the app.

In order to work, you just need:

- A network running IPv4 (Hook doesnt work with IPv6)
- An [Ahoy](https://npmjs.com/package/ahoy)-enabled server (to generate your passcode)

## Example

The easiest way to see how Hook and Ahoy work is by running an example.

If you have `python` installed on your system, open a terminal window, `cd` into the `hook` directory (e.g. `/Users/dennisimo/sketches/hook`) and type `python -m SimpleHTTPServer`. If you don't have `python` installed, there are all kinds of other ways to get a local server running on port 8000 -- go for it!

Then open a browser window at `http://localhost:8000/example` and you'll see an input for you to enter a passcode.

Next, you'll need to set up an Ahoy server, so open another terminal window and type the following commands:

- `npm install -g ahoy` (if you don't have `ahoy` installed already)
- `mkdir test-ahoy && cd test-ahoy` (or whatever you want the directory to be called)
- `echo "{\"location\": \"success.html\"}" > ahoy.json`
- `echo "Success\!" > success.html`
- `ahoy` (to run the `ahoy` server)

You show get a message shomething like this:

```
  Now serving /Users/dennisimo/sketches/test-ahoy/example
           at http://10.0.1.8:1941/
  Passcode is EEEREG
```

Now you just type the passcode into the input in your browser window and press `ENTER`.

If everything worked out, you should be redirected to `10.0.1.8:1941/success.html` and should see your "Success!" message.

Congratulations! You've just hooked into your first server :)
