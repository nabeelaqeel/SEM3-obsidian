### How can I have it where I have one IP address that sits on the Internet but many web names ? 

It's part of the HTTP 1.1 protocol.

Specifically, the HTTP 1.1 protocol includes a header called "host:" which specifies which web site on a particular server the client is attempting to access.

So, if snoopy.net and woodstock.org both share 192.0.32.10 and your browser is trying to get content from `http://snoopy.net/doghouse` the specific http request would look like:

```
GET /doghouse HTTP/1.1
Host: snoopy.net
```

If the desired url is `http://woodstock.org/seeds` the request would look like

```
GET /seeds HTTP/1.1
Host: woodstock.org
```

In both cases, there would be a tcp socket between your computer and port 80 of the server. The server would know to get content from /var/www/snoopy.net or /var/www/woodstock.org/ based on the Host header.

There would be other headers for cookies and other stuff like browser type and allowed content, but the "Host" header specifically is what allows the web server to know which virtual web site is desired.

There's more in the [RFC9910](https://www.rfc-editor.org/rfc/rfc9110.html)

This is also why https sites _must_** have their own IP address -- the ssl key exchange and certificate verification take place prior to the http transaction, so the http server won't know to give out the certificate for "woodstock.org" or "snoopy.net" when it receives an https connection on port 443 of 192.0.32.10.


The technique for hosting more than one domain/subdomain on a single IP address/host is called [virtual hosts](http://en.wikipedia.org/wiki/Virtual_hosts)


-  Reference : [stackExchange](https://serverfault.com/questions/106882/how-do-you-have-one-ip-address-and-many-websites)
--- 

### Understanding sockets concepts

Last Updated: 2021-06-25

A socket uniquely identifies the endpoint of a communication link between two application ports.

A port represents an application process on a TCP/IP host, but the port number itself does not indicate the protocol being used: TCP, UDP, or IP. The application process might use the same port number for TCP or UDP protocols. To uniquely identify the destination of an IP packet arriving over the network, you have to extend the port principle with information about the protocol used and the IP address of the network interface; this information is called a socket. A socket has three parts: protocol, local-address, local-port.

[Figure 1](https://www.ibm.com/docs/en/zos/2.4.0?topic=concepts-understanding-sockets#itcsocketcon__sockcon) illustrates the concept of a socket.

Figure 1. Socket concept

![Diagram that shows the connection between socket A and socket B, who use the same protocol of TCP, different IP addresses and ports.](https://www.ibm.com/docs/en/SSLTBW_2.4.0/graphics/zosgif/dwsl0045.gif)

The term _association_ is used to specify completely the two processes that comprise a connection:

(protocol,local-address,local-port,foreign-address,foreign-port).

The terms _socket_ and _port_ are sometimes used as synonyms, but note that the terms _port number_ and _socket address_ are not like one another. A port number is one of the three parts of a socket address, and can be represented by a single number (for example, 1028) while a socket address can be represented by (tcp,myhostname,1028).

A socket descriptor (sometimes referred to as a socket number) is a binary integer that acts as an index to a table of sockets; the sockets are currently allocated to a given process. A socket descriptor represents the socket, but is not the socket itself.























![[Pasted image 20241114231458.png]]