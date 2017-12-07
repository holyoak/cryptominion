### Milestone 1

## proof of concept

* event driven
* live tickers
* level 3 orderbooks on multiple exchanges
* live authenticated trading platform
* profit/loss accounting
* logging history
* 1 passive simple strategy (auto reverse)
* 2 active simple strategies (stop loss, railing stop)
* support 2 exchanges (GDAX and Poloniex)

current issues:
* orderbooks are not backfilling or culling on the taken side of the book

---
### Milestone 2

## architecture and infrastructure

* UML diagrammed
* 3 user cases (standalone client, served client, managed client)
* 2 views, Vue (majority of users) and t-kit (max performance/security)
* remotely hosted server
* 1 year historical data
* backtesting
* full FIFO/LIFO and profit/loss/invest accounting support
* support all available fiat currencies
* support 6 exchanges (add Binance, Bitfinex, Bitstamp, Bittrex)

---
### Milestone 3

## working alpha

* authorization
* charting
* cookies
* themes
* locales
* desktop, tablet, and mobile GUI views
* all historical data for supported exchanges
* support all supported currencies/assets
* support all major exchanges with websocker feeds

---
### Milestone 4

## working beta

* full TA support
* advanced data viz
* advanced strategies
* graceful failover to backup server
* all available historical data
* database replication and sharding
* support all available exchanges

---
### Milestone 5

## ready for production

* pen testing
* C++ optimizations
* colocation
* DDOS protection
* 100% e2e test coverage
