# Project Terminology Definitions

It is imperative that developers use the same definitions and relative syntax to refer to abstact concepts when coding.  Common English terms used  in this space are not bound by this stricture, and thus loosely typed.  The following definitions bind common English terms to the project architecture.

---
### Account

An interface provided by an Exchange to access Markets.  Each account must have a many to one relationship with a User.  Accounts can either be fetched at runtime (real accounts) or user generated virtual accounts (sandbox accounts)


### Asset

An item traded on a Market (the word currency has numerous legal and technical connotations that are not applicable).  Common Assets have a static asset dictionary (display name, icon, ...) which includes a default fallback.  Assets are fetched*.


### Exchange

An entity where users can create Accounts and access Markets.  Every exchange must have at least one child market instance and many potential Accounts to meet the class definition.  Exchanges have a static asset dictionary (display name, icon, theme, etc..) in src/assets and a dynamic data state (markets, orders) fetched at runtime from the exchange.  Exchanges are statically declared as support for each Exchange is added, with a default fallback for supporting all non websocket Exchanges.


### Market

An interface where Users with Accounts can access an Orderbook.  Markets have a many to one relationship with Exchanges.  Each market must have an Orderbook, a base asset, and a quote asset.  Paths, keys and ids must follow the format '<base>-<quote>' once they pass the app Parser (server side non parsed data preserves inherited format).  Markets are fetched*.


### Order

An interface to a Market via that Orderbook.  Orders can generated from the app or from other sources.  All orders are assigned an app ID.  Orders must have one to one relationships with an Exchange, a Market, a base Asset, a quote Asset, a rate (the price), a side (buy or sell), a size (the amount), and a state.  Orders can have the following states: pending, open, canceled, filled, and partially filled.  Open and partial orders are feched at runtime.

### Orderbook

Two collections of Orders for a Market, a collection of Asks (sellers) and a collection of Bids.  Orderbooks are fetched.


### Position

An interface to manage an aggregation of internal Orders.  Unlike orders, Positions can accept Strategies.


### Strategy

An interface for defining the logic for automated handling of changes in Position state.



*not yet implemented, still a static definition
