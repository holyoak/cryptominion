![](https://github.com/holyoak/cryptominion/blob/master/src/client/assets/logo.svg)
# Cryptominion

> A platform for trading cryptocurrencies

This project currently requires Node 8!  If it is not working check your Node version!

```node -v```


### To install

```git clone https://github.com/holyoak/cryptominion.git cryptominion```

then

```cd cryptominion && npm i```

### To run the whole app at once

```npm start```

For real dev work, you will want to run the datastreams and the client in separate terminals.  This allows the client to hot reload without affecting the datastream.  You can also avoid the overhead of the datastreams during dev this way(no charting, tickers, or reactive math elements)

To run just the client (and its dev server)

```npm run dev```

To run just the datastream sockets

```npm run datastreams```

The client needs to start (or be refreshed) after the market data loads

---
### Wanna help?

Check out the [roadmap](https://github.com/holyoak/cryptominion/blob/master/ROADMAP.md) and read the [definitions](https://github.com/holyoak/cryptominion/blob/master/TERMINOLOGY.md) :)
