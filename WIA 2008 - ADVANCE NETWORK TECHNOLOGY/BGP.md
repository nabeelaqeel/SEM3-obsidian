### Reference

- [cisco](https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/iproute_bgp/configuration/xe-16/irg-xe-16-book/configuring-a-basic-bgp-network.html)
- [Cisco Press](https://www.ciscopress.com/articles/article.asp?p=2756480)

## Basic BGP Configuration

When configuring BGP, it is best to think of the configuration from a modular perspective. BGP router configuration requires the following components:

- **BGP Session Parameters:** BGP session parameters provide settings that involve establishing communication to the remote BGP neighbor. Session settings include the ASN of the BGP peer, authentication, and keepalive timers.
    
- **Address-Family Initialization:** The address-family is initialized under the BGP router configuration mode. Networks advertisement and summarization occur within the address-family.
    
- **Activate the Address-Family on the BGP Peer:** Activate the address-family on the BGP peer. For a session to initiate, one address-family for that neighbor must be activated. The router’s IP address is added to the neighbor table, and BGP attempts to establish a BGP session or accepts a BGP session initiated from the peer router.
    

For the remainder of this chapter, the BGP context is directed toward IPv4 routing. Other address families are throughout the book.

### IOS

The steps for configuring BGP on an IOS router are as follows:

- **Step 1.** Create the BGP Routing Process. Initialize the BGP process with the global command
```c
 router bgp <as-number>
```
    
- **Step 2.** Identify the BGP Neighbor’s IP address and Autonomous System Number. Identify the BGP neighbor’s IP address and autonomous system number with the BGP router configuration command
```c
neighbor <_ip-address_> remote-as <_as-number_>
```
    
		NOTE: 
		IOS activates the IPv4 address-family by default. This can simplify the              configuration in an IPv4 environment because Steps 3 and 4 are optional,            but may cause confusion when working with other address families. The BGP           router configuration command **no bgp default ip4-unicast** disables the            automatic activation of the IPv4 AFI so that Steps 3 and 4 are required.
    
- **Step 3.** Initialize the address-family with the BGP router configuration command 
```c
address-family <_afi> <safi_>
```
    
- **Step 4.** Activate the address-family for the BGP neighbor with the BGP address-family configuration command 
```c
neighbor <_ip-address_> activate
```
    

		NOTE
		
		On IOS routers, the default address-family modifier for the IPv4 and IPv6 address families is unicast and is optional. The address-family modifier is required on IOS XR nodes.
		
		Example 1-2 demonstrates how to configure R1 and R2 using the IOS default and optional IPv4 AFI modifier CLI syntax. R1 is configured using the default IPv4 address-family enabled, and R2 disables IOS’s default IPv4 address-family and manually activates it for the specific neighbor 10.1.12.1.

#### **Example 1-2** _IOS Basic BGP Configuration_

```console

R1 (Default IPv4 Address-Family Enabled)
router bgp 65100
 neighbor 10.1.12.2 remote-as 65100
```

```console
R2 (Default IPv4 Address-Family Disabled)
router bgp 65100
 no bgp default ipv4-unicast
 neighbor 10.1.12.1 remote-as 65100
 !
 address-family ipv4
  neighbor 10.1.12.1 activate
 exit-address-family
```