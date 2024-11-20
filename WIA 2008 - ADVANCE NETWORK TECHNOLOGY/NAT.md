## Contents
- [[NAT#Use Local and Global NAT Terms]]
- [[NAT#PAT Port Address Translation]]
## Use Local and Global NAT Terms
- `inside local address`  :  The IP address assigned to a host on the inside network. This is the address configured as a parameter of the computer OS or received via dynamic address allocation protocols such as DHCP. The address is likely not a legitimate IP address assigned by the Network Information Center (NIC) or service provider.
- `inside global address` : A legitimate IP address assigned by the NIC or service provider that represents one or more inside local IP addresses to the outside world.
- `outside local address` : The IP address of an outside host as it appears to the inside network. Not necessarily a legitimate address, it is allocated from an address space routable on the inside.
- `outside global address` : The IP address assigned to a host on the outside network by the host owner. The address is allocated from a globally routable address or network space.


Packets sourced on the inside portion of the network have an inside local address as the source address and an outside local address as the destination address of the packet, while the packet resides on the inside portion of the network. When that same packet gets switched to the outside network, the source of the packet is now known as the inside global address and the destination of the packet is known as the outside global address.

Conversely, when a packet is sourced on the outside portion of the network, while it is on the outside network, its source address is known as the outside global address. The destination of the packet is known as the inside global address. When the same packet gets switched to the inside network, the source address is known as the outside local address and the destination of the packet is known as the inside local address.

**![[Pasted image 20241107235959.png]]**


### Example Configuration

#### Define Inside Local and Inside Global Addresses

In this configuration, when the NAT router receives a packet on its inside interface with a source address of 10.10.10.1, the source address is translated to 172.16.68.5. This also means that when the NAT router receives a packet on its outside interface with a destination address of 172.16.68.5, the destination address is translated to 10.10.10.1.

```console

ip nat inside source static 10.10.10.1 172.16.68.5

interface s 0
ip nat inside

interface s 1
ip nat outside

sh ip nat translation

```

```console

Pro    Inside global       Inside local        Outside local      Outside global
icmp   172.16.68.5:15      10.10.10.1:15       172.16.68.1:15     172.16.68.1:15
---    172.16.68.5         10.10.10.1
```
![[Pasted image 20241108000520.png]]


#### Define Outside Local and Outside Global Addresses
In this configuration, when the NAT router receives a packet on its outside interface with a source address of 172.16.68.1, the source address is translated to 10.10.10.5. This also means that if the NAT router receives a packet on its inside interface with a destination address of 10.10.10.5, the destination address is translated to 172.16.68.1.

```console

ip nat outside source static 172.16.68.1 10.10.10.5

interface s 0
ip nat inside

interface s 1
ip nat outside

sh ip nat translations
```

```c
Pro     Inside global     Inside local       Outside local        Outside global
          --- ---           ---              10.10.10.5           172.16.68.1
icmp    10.10.10.1:37     10.10.10.1:37      10.10.10.5:37        172.16.68.1:37
```

![[Pasted image 20241108000849.png]]

#### Define All Local and Global Addresses

In the this configuration, when the NAT router receives a packet on its inside interface with a source address of 10.10.10.1, the source address is translated to 172.16.68.5. The interface that corresponds to IP address 10.10.10.1 is the   **Inside Local Address**, whereas the interface that corresponds to IP address 172.16.68.5 is the  **Inside Global Address**. When the NAT router receives a packet on its outside interface with a source address of 172.16.68.1, the source address is translated to 10.10.10.5.

This also means that when the NAT router receives a packet on its outside interface with a destination address of 172.16.68.5, the destination address is translated to 10.10.10.1. Also, when the NAT router receives a packet on its inside interface with a destination address of 10.10.10.5, the destination address is translated to 172.16.68.1.

```console

ip nat inside source static 10.10.10.1 172.16.68.5
ip nat outside source static 172.16.68.1 10.10.10.5

interface s 0
ip nat inside

interface s 1
ip nat outside

sh ip nat translations

```

```c
Pro   Inside global      Inside local        Outside local       Outside global
         --- ---           ---                10.10.10.5          172.16.68.1
       172.16.68.5        10.10.10.1           —                   ---
```


reference : https://www.cisco.com/c/en/us/support/docs/ip/network-address-translation-nat/4606-8.html

## [[PAT (Port Address Translation)]]
#### Description:

Port Address Translation (PAT) {also known as Network Address Port Translator (NAPT)}.

Port Address Translation (PAT), is an extension to network address translation (NAT) that permits multiple devices on a local area network (LAN) to be mapped to a single public IP address. The goal of PAT is to conserve IP addresses.

Port Address Tranlation is also called porting, port overloading, port-level multiplexed NAT and single address NAT.

#### Complete Definition:

Port Address Translation (PAT) is a feature of a network device that translates TCP or UDP communications made between hosts on a private network and hosts on a public network. It allows a single public IP address to be used by many hosts on the private network, which is usually called a Local Area Network or LAN.

A PAT device transparently modifies IP packets as they pass through it. The modifications make all the packets which it sends to the public network from the multiple hosts on the private network appear to originate from a single host - the PAT device - on the public network.

Translation method that allows the user to conserve addresses in the global address pool by allowing source ports in [TCP](https://community.cisco.com/document/6896/tcp) connections or [UDP](https://community.cisco.com/document/6876/udp) conversations to be translated. Different local addresses then map to the same global address, with port translation providing the necessary uniqueness. When translation is required, the new port number is picked out of the same range as the original following the convention of Berkeley Standard Distribution (SD).

This prevents end stations from seeing connection requests with source ports apparently corresponding to the Telnet, [HTTP](https://community.cisco.com/document/7281/http), or FTP daemon, for example. As a result, Cisco IOS PAT supports about 4000 local addresses that can be mapped to the same global address.

#### Configuring PAT:

To configure PAT/NAT correctly the first time, you need to understand the Cisco NAT terminology and how your IP networks/addresses map to each of the entities listed below:  [[PORT ADDRESS TRANSLATION(PAT)]]

    Inside Local—This is the local IP address of a private host on your network (e.g., a workstation's IP address).

    Inside Global—This is the public IP address that the outside network sees as the IP address of your local host.

    Outside Local—This is the local IP address from the private network, which your local host sees as the IP address of the remote host.

    Outside Global—This is the public IP address of the remote host (e.g., the IP address of the remote Web server that a workstation is connecting to).

You'll configure your Cisco router using seven commands. Let's assume that your Internet service provider gave you a 30-bit network containing two public IP addresses. This configuration would allow one address for your router and one address for your internal clients and devices.

```c
ip nat pool mypool 63.63.63.2 63.63.63.2 prefix 30
ip nat pool NAME FIRST_IP_ADDRESS LAST_IP_ADDRESS netmask SUBNET_MASK

access-list 1 permit 10.10.10.0 0.0.0.255

ip nat inside source list 1 pool mypool overload

interface <interface_name>
ip nat inside

interface <interface_name>
ip nat outside

sh ip nat translations
sh ip nat statistics
```


#### Configure PAT - Port Address Translation - Cisco
```console

configure terminal

interface $INSIDE_INTF

ip nat inside

exit

interface $OUTSIDE_INTF

ip nat outside

exit

access-list $ACL_ID permit $SOURCE_ADDRESS $SUBNET_MASK

ip nat pool $POOL_NAME $POOL_ADDRESS $POOL_ADDRESS netmask $NETMASK

ip nat inside source list $ACL_ID pool $POOL_NAME overload

exit

show ip nat translations

write memory
```
#### RFCs

- [RFC 5135](http://tools.ietf.org/html/rfc5135 "http://tools.ietf.org/html/rfc5135") IP Multicast Requirements for a Network Address Translator ([NAT](https://community.cisco.com/document/6851/nat)) and a Network Address Port Translator (NAPT)
- [RFC 1918](http://tools.ietf.org/html/rfc1918 "http://tools.ietf.org/html/rfc1918") - Address Allocation for Private Internets

#### Reference
- [Reference](https://community.cisco.com/t5/security-knowledge-base/pat/ta-p/3114711)
