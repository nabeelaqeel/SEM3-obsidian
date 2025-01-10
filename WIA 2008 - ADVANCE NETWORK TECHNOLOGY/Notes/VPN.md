![Pasted image 20241206180124.png](../../images/Pasted%20image%2020241206180124.png)
- https://youtu.be/KXq065YrpiU


- https://youtu.be/qgzpJnStGto


---

## ISAKMP 



![../../images/Pasted image 20241222083022.png](../../images/Pasted%20image%2020241222083022.png)


Reference
- [Cisco Community](https://community.cisco.com/t5/security-knowledge-base/isakmp/ta-p/3113882)

---

VPN Types
- Clientless [VPN](VPN.md) connection
- Client-based [VPN](VPN.md) connection


### SSL VPNs
When a client negotiates an [[(Secure Socket Layer) SSL]] VPN connection with the VPN gateway, it actually connects using [[Transport Layer Security (TLS)]]. TLS is the newer version of SSL and is sometimes expressed as` SSL/TLS.` However, both terms are often used interchangeably.

SSL uses the public key infrastructure and digital certificates to authenticate peers. Both [IP Security (IPsec)](IP%20Security%20(IPsec).md) and SSL VPN technologies offer access to virtually any network application or resource. However, when security is an issue, IPsec is the superior choice. If support and ease of deployment are the primary issues, consider SSL. The type of VPN method implemented is based on the access requirements of the users and the organization’s IT processes. The table compares IPsec and SSL remote access deployments.
![../../images/Pasted image 20241230170343.png](../../images/Pasted%20image%2020241230170343.png)

It is important to understand that IPsec and SSL VPNs are not mutually exclusive. Instead, they are complementary; both technologies solve different problems, and an organization may implement IPsec, SSL, or both, depending on the needs of its telecommuters.


## Site-to-Site VPN
Site-to-site VPNs are used to connect networks across another untrusted network such as the internet. In a site-to-site VPN, end hosts send and receive normal unencrypted TCP/IP traffic through a VPN terminating device. The VPN terminating is typically called a VPN gateway. A VPN gateway device could be a router or a firewall, as shown in the figure. For example, the Cisco Adaptive Security Appliance (ASA) shown on the right side of the figure is a standalone firewall device that combines firewall, VPN concentrator, and intrusion prevention functionality into one software image.

![../../images/Pasted image 20241230170601.png](../../images/Pasted%20image%2020241230170601.png)

The VPN gateway encapsulates and encrypts outbound traffic. It then sends the traffic through a VPN tunnel over the internet to a VPN gateway at the target site. Upon receipt, the receiving VPN gateway strips the headers, decrypts the content, and relays the packet toward the target host inside its private network.

Site-to-site VPNs are typically created and secured using [IP Security (IPsec)](IP%20Security%20(IPsec).md)
## GRE 

[[Generic Routing Encapsulation (GRE)]] is a non-secure site-to-site VPN tunneling protocol. It can encapsulate various network layer protocols. It also supports multicast and broadcast traffic which may be necessary if the organization requires routing protocols to operate over a VPN. However, GRE does not by default support encryption; and therefore, it does not provide a secure VPN tunnel.

A standard IPsec VPN (non-GRE) can only create secure tunnels for unicast traffic. Therefore, routing protocols will not exchange routing information over an IPsec VPN.

To solve this problem, we can encapsulate routing protocol traffic using a GRE packet, and then encapsulate the GRE packet into an IPsec packet to forward it securely to the destination VPN gateway.

The terms used to describe the encapsulation of GRE over IPsec tunnel are passenger protocol, carrier protocol, and transport protocol, as shown in the figure.


![../../images/Pasted image 20241230170758.png](../../images/Pasted%20image%2020241230170758.png)

For example, in the figure displaying a topology, Branch and HQ would like to exchange OSPF routing information over an IPsec VPN. However, IPsec does not support multicast traffic. Therefore, GRE over IPsec is used to support the routing protocol traffic over the IPsec VPN. Specifically, the OSPF packets (i.e., passenger protocol) would be encapsulated by GRE (i.e., carrier protocol) and subsequently encapsulated in an IPsec VPN tunnel.

![../../images/Pasted image 20241230170909.png](../../images/Pasted%20image%2020241230170909.png)

## Dynamic Multipoint VPNs
Site-to-site IPsec VPNs and GRE over IPsec are adequate to use when there are only a few sites to securely interconnect. However, they are not sufficient when the enterprise adds many more sites. This is because each site would require static configurations to all other sites, or to a central site.

Dynamic Multipoint VPN (DMVPN) is a Cisco software solution for building multiple VPNs in an easy, dynamic, and scalable manner. Like other VPN types, DMVPN relies on IPsec to provide secure transport over public networks, such as the internet.

DMVPN simplifies the VPN tunnel configuration and provides a flexible option to connect a central site with branch sites. It uses a hub-and-spoke configuration to establish a full mesh topology. Spoke sites establish secure VPN tunnels with the hub site, as shown in the figure.

![../../images/Pasted image 20241230171301.png](../../images/Pasted%20image%2020241230171301.png)

Each site is configured using [[Multipoint Generic Routing Encapsulation (mGRE)]]**.** The mGRE tunnel interface allows a single GRE interface to dynamically support multiple IPsec tunnels. Therefore, when a new site requires a secure connection, the same configuration on the hub site would support the tunnel. No additional configuration would be required.

Spoke sites could also obtain information about other spoke sites from the central site and create virtual spoke-to-spoke tunnels as shown in the figure.


## IPsec Virtual Tunnel Interface
Like DMVPNs, [[IPsec Virtual Tunnel Interface (VTI)]] simplifies the configuration process required to support multiple sites and remote access. IPsec VTI configurations are applied to a virtual interface instead of static mapping the IPsec sessions to a physical interface.

IPsec VTI is capable of sending and receiving both IP unicast and multicast encrypted traffic. Therefore, routing protocols are automatically supported without having to configure GRE tunnels.

IPsec VTI can be configured between sites or in a hub-and-spoke topology.
![../../images/Pasted image 20241230171459.png](../../images/Pasted%20image%2020241230171459.png)

## Service Provider MPLs VPNs

Traditional service provider WAN solutions such as leased lines, Frame Relay, and ATM connections were inherently secure in their design. Today, service providers use MPLS in their core network. Traffic is forwarded through the [[Multiprotocol Label Switching (MPLS)]] backbone using labels that are previously distributed among the core routers. Like legacy WAN connections, traffic is secure because service provider customers cannot see each other’s traffic.

MPLS can provide clients with managed VPN solutions; therefore, securing traffic between client sites is the responsibility of the service provider. There are two types of MPLS VPN solutions supported by service providers:

- **Layer 3 MPLS VPN** - The service provider participates in customer routing by establishing a peering between the customer’s routers and the provider’s routers. Then customer routes that are received by the provider’s router are then redistributed through the MPLS network to the customer’s remote locations.
- **Layer 2 MPLS VPN** - The service provider is not involved in the customer routing. Instead, the provider deploys a Virtual Private LAN Service (VPLS) to emulate an Ethernet multiaccess LAN segment over the MPLS network. No routing is involved. The customer’s routers effectively belong to the same multiaccess network.

The figure shows a service provider that offers both Layer 2 and Layer 3 MPLS VPNs.

![../../images/Pasted image 20241230171942.png](../../images/Pasted%20image%2020241230171942.png)

## Reference 
- Netacad